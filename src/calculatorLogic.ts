export interface CalculationInputs {
  fuelPrice: number; // $/L
  loadedConsumption: number; // L / 100km
  emptyConsumption: number; // L / 100km
  billedKm: number; // km ida (facturado)
  emptyKm: number; // km vuelta vacía
  dailyFixedCost: number; // $/día (seguro, patente, sueldo base, amortización temporal)
  tripDays: number; // días insumidos en el viaje
  tollsAndRouteExpenses: number; // $/viaje (peajes, pesajes, lavadero)
  driverViatics: number; // $/viaje (CCT 40/89 viáticos, permanencia, comida)
  amortizationAndTiresPerKm: number; // $/km (cubiertas, recapado, aceite, depreciación)
  targetMarginPct: number; // % margen pretendido (ej: 25%)
  referenceTariffPerTrip: number; // $/viaje (tarifa de referencia mercado / FADEEAC)
}

export interface CalculationOutputs {
  totalKm: number;
  emptyKmPct: number;
  fuelLoadedLiters: number;
  fuelEmptyLiters: number;
  totalFuelLiters: number;
  totalFuelCost: number;
  fuelCostPerBilledKm: number;
  fuelLoadedOnlyCostPerKm: number;
  fuelCostIncreasePct: number;
  maintenanceCost: number;
  totalVariableCost: number;
  totalFixedCost: number;
  totalCost: number;
  costPerBilledKm: number;
  breakEvenTariff: number;
  recommendedTariff: number;
  referenceMargin: number;
  marketDiscountMargin: number; // Si el mercado paga 70% de la referencia
  isIndifferenceProfitable: boolean;
}

export const defaultInputs: CalculationInputs = {
  fuelPrice: 1320,
  loadedConsumption: 38,
  emptyConsumption: 28,
  billedKm: 580,
  emptyKm: 520,
  dailyFixedCost: 115000,
  tripDays: 2,
  tollsAndRouteExpenses: 48000,
  driverViatics: 85000,
  amortizationAndTiresPerKm: 285,
  targetMarginPct: 22,
  referenceTariffPerTrip: 1480000,
};

export function calculateLogistics(input: CalculationInputs): CalculationOutputs {
  const totalKm = input.billedKm + input.emptyKm;
  const emptyKmPct = totalKm > 0 ? (input.emptyKm / totalKm) * 100 : 0;

  const fuelLoadedLiters = (input.billedKm / 100) * input.loadedConsumption;
  const fuelEmptyLiters = (input.emptyKm / 100) * input.emptyConsumption;
  const totalFuelLiters = fuelLoadedLiters + fuelEmptyLiters;
  const totalFuelCost = totalFuelLiters * input.fuelPrice;

  const fuelLoadedOnlyCostPerKm = (input.loadedConsumption / 100) * input.fuelPrice;
  const fuelCostPerBilledKm = input.billedKm > 0 ? totalFuelCost / input.billedKm : 0;
  const fuelCostIncreasePct = fuelLoadedOnlyCostPerKm > 0
    ? ((fuelCostPerBilledKm - fuelLoadedOnlyCostPerKm) / fuelLoadedOnlyCostPerKm) * 100
    : 0;

  const maintenanceCost = totalKm * input.amortizationAndTiresPerKm;
  const totalVariableCost = totalFuelCost + maintenanceCost + input.tollsAndRouteExpenses + input.driverViatics;
  const totalFixedCost = input.dailyFixedCost * input.tripDays;
  const totalCost = totalVariableCost + totalFixedCost;

  const costPerBilledKm = input.billedKm > 0 ? totalCost / input.billedKm : 0;
  const breakEvenTariff = totalCost;
  const recommendedTariff = totalCost * (1 + input.targetMarginPct / 100);

  const referenceMargin = input.referenceTariffPerTrip - totalCost;
  const market70Tariff = input.referenceTariffPerTrip * 0.70;
  const marketDiscountMargin = market70Tariff - totalCost;

  return {
    totalKm,
    emptyKmPct,
    fuelLoadedLiters,
    fuelEmptyLiters,
    totalFuelLiters,
    totalFuelCost,
    fuelCostPerBilledKm,
    fuelLoadedOnlyCostPerKm,
    fuelCostIncreasePct,
    maintenanceCost,
    totalVariableCost,
    totalFixedCost,
    totalCost,
    costPerBilledKm,
    breakEvenTariff,
    recommendedTariff,
    referenceMargin,
    marketDiscountMargin,
    isIndifferenceProfitable: marketDiscountMargin > 0,
  };
}
