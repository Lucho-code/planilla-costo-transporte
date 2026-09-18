// Complete mathematical calculation engine for all 14 modules of the 2026 Logistics Spreadsheet

// --- MÓDULO 01: COSTO FIJO DEL DÍA ($/día) ---
export interface Mod01Inputs {
  insuranceMonthly: number; // Seguros del camión y acoplado
  patenteTaxesMonthly: number; // Patente, tasas y RUTA
  driverBaseMonthly: number; // Sueldo básico chofer con cargas sociales
  garageMonthly: number; // Cochera / galpón
  technicalInspectionMonthly: number; // VTV / RTO prorrateada
  fixedAdminMonthly: number; // Contador, telefonía, seguimiento satelital
  truckLoanDebtMonthly?: number; // Cuota de crédito, leasing o deuda prendaria ("tu deuda")
  operatingDaysPerMonth: number; // Días operativos al mes (ej. 22)
  workingHoursPerDay: number; // Horas laborales por día (ej. 8)
}

export function calcMod01(inp: Mod01Inputs) {
  const totalFixedMonthly =
    inp.insuranceMonthly +
    inp.patenteTaxesMonthly +
    inp.driverBaseMonthly +
    inp.garageMonthly +
    inp.technicalInspectionMonthly +
    inp.fixedAdminMonthly +
    (inp.truckLoanDebtMonthly || 0);
  const fixedCostPerDay = inp.operatingDaysPerMonth > 0 ? totalFixedMonthly / inp.operatingDaysPerMonth : 0;
  const fixedCostPerHour = inp.workingHoursPerDay > 0 ? fixedCostPerDay / inp.workingHoursPerDay : 0;
  const driverCostRatio = totalFixedMonthly > 0 ? (inp.driverBaseMonthly / totalFixedMonthly) * 100 : 0;
  const idleDayCost = fixedCostPerDay; // Lo que cuesta el camión parado un día hábil

  return {
    totalFixedMonthly,
    fixedCostPerDay,
    fixedCostPerHour,
    driverCostRatio,
    idleDayCost,
  };
}

// --- MÓDULO 02: GASOIL CON Y SIN CARGA ($/km · litros) ---
export interface Mod02Inputs {
  gasoilPrice: number;
  loadedConsumption: number;
  emptyConsumption: number;
  billedKm: number;
  emptyKm: number;
  maneuverSurchargePct: number;
}

export function calcMod02(inp: Mod02Inputs) {
  const loadedLiters = (inp.billedKm / 100) * inp.loadedConsumption;
  const emptyLiters = (inp.emptyKm / 100) * inp.emptyConsumption;
  const baseLiters = loadedLiters + emptyLiters;
  const totalLiters = baseLiters * (1 + inp.maneuverSurchargePct / 100);
  const totalFuelCost = totalLiters * inp.gasoilPrice;
  const fuelCostPerBilledKm = inp.billedKm > 0 ? totalFuelCost / inp.billedKm : 0;
  const loadedOnlyCostPerKm = (inp.loadedConsumption / 100) * inp.gasoilPrice;
  const returnCost = emptyLiters * (1 + inp.maneuverSurchargePct / 100) * inp.gasoilPrice;
  const totalKm = inp.billedKm + inp.emptyKm;
  const unbilledKmPct = totalKm > 0 ? (inp.emptyKm / totalKm) * 100 : 0;
  const increasePct = loadedOnlyCostPerKm > 0
    ? ((fuelCostPerBilledKm - loadedOnlyCostPerKm) / loadedOnlyCostPerKm) * 100
    : 0;

  return {
    fuelCostPerBilledKm,
    totalFuelCost,
    totalLiters,
    returnCost,
    unbilledKmPct,
    loadedOnlyCostPerKm,
    increasePct,
  };
}

// --- MÓDULO 03: AMORTIZACIÓN DEL EQUIPO ($/km) ---
export interface Mod03Inputs {
  truckReplacementValue: number; // Valor tractor 0km ($)
  trailerReplacementValue: number; // Valor acoplado/batea 0km ($)
  truckResidualPct: number; // Valor residual chasis al final (ej 20%)
  trailerResidualPct: number; // Valor residual remolque (ej 20%)
  truckUsefulLifeKm: number; // Vida útil tractor en km (ej 1.000.000)
  trailerUsefulLifeKm: number; // Vida útil remolque en km (ej 1.200.000)
  monthlyEstimatedKm: number; // Km promedio mensual (ej 9.000)
}

export function calcMod03(inp: Mod03Inputs) {
  const truckDepreciable = inp.truckReplacementValue * (1 - inp.truckResidualPct / 100);
  const trailerDepreciable = inp.trailerReplacementValue * (1 - inp.trailerResidualPct / 100);
  const truckAmortPerKm = inp.truckUsefulLifeKm > 0 ? truckDepreciable / inp.truckUsefulLifeKm : 0;
  const trailerAmortPerKm = inp.trailerUsefulLifeKm > 0 ? trailerDepreciable / inp.trailerUsefulLifeKm : 0;
  const totalAmortPerKm = truckAmortPerKm + trailerAmortPerKm;
  const monthlyFund = totalAmortPerKm * inp.monthlyEstimatedKm;
  const tripAmortCost1000Km = totalAmortPerKm * 1000;

  return {
    totalAmortPerKm,
    truckAmortPerKm,
    trailerAmortPerKm,
    monthlyFund,
    tripAmortCost1000Km,
  };
}

// --- MÓDULO 04: DESGASTE PROGRAMADO ($/km · $/mes) ---
export interface Mod04Inputs {
  tiresCount: number; // Cantidad de cubiertas (ej. 18 o 22)
  newTireCost: number; // Costo por cubierta nueva ($)
  newTireLifeKm: number; // Km vida nueva (ej. 130.000)
  retreadsCount: number; // Cantidad de recapados por cubierta (ej. 2)
  retreadCost: number; // Costo por cada recapado ($)
  retreadLifeKm: number; // Km por cada recapado (ej. 80.000)
  oilFilterServiceCost: number; // Costo service completo ($)
  oilFilterIntervalKm: number; // Intervalo de service (ej. 30.000 km)
  brakesClutchPer100kKm: number; // Frenos, embrague, aire por cada 100.000 km ($)
  monthlyKm: number; // Km al mes (ej 9.000)
}

export function calcMod04(inp: Mod04Inputs) {
  // Total km per tire cycle = new life + (retreads * retread life)
  const tireTotalKm = inp.newTireLifeKm + inp.retreadsCount * inp.retreadLifeKm;
  const tireTotalCost = inp.newTireCost + inp.retreadsCount * inp.retreadCost;
  const singleTireCostPerKm = tireTotalKm > 0 ? tireTotalCost / tireTotalKm : 0;
  const allTiresCostPerKm = singleTireCostPerKm * inp.tiresCount;

  const oilCostPerKm = inp.oilFilterIntervalKm > 0 ? inp.oilFilterServiceCost / inp.oilFilterIntervalKm : 0;
  const brakesCostPerKm = inp.brakesClutchPer100kKm / 100000;
  const totalWearPerKm = allTiresCostPerKm + oilCostPerKm + brakesCostPerKm;
  const totalWearMonthly = totalWearPerKm * inp.monthlyKm;

  return {
    totalWearPerKm,
    allTiresCostPerKm,
    oilCostPerKm,
    brakesCostPerKm,
    totalWearMonthly,
  };
}

// --- MÓDULO 05: COSTO TOTAL DEL VIAJE ($/km · $/viaje) ---
export interface Mod05Inputs {
  totalKmTrip: number; // Km totales recorridos (ida + vuelta)
  billedKmTrip: number; // Km facturados
  tripDays: number; // Días que insume el viaje
  dailyFixedCost: number; // Del Módulo 01 ($198.788)
  fuelTripCost: number; // Del Módulo 02 ($558.465)
  wearAndAmortPerKm: number; // Módulo 03 + 04 ($/km)
  tollsAndExpenses: number; // Peajes y pesajes ($)
  driverViatics: number; // Viáticos chofer ($)
}

export function calcMod05(inp: Mod05Inputs) {
  const totalFixedCost = inp.dailyFixedCost * inp.tripDays;
  const maintenanceCost = inp.totalKmTrip * inp.wearAndAmortPerKm;
  const totalVariableCost = inp.fuelTripCost + maintenanceCost + inp.tollsAndExpenses + inp.driverViatics;
  const totalTripCost = totalFixedCost + totalVariableCost;
  const costPerTraveledKm = inp.totalKmTrip > 0 ? totalTripCost / inp.totalKmTrip : 0;
  const costPerBilledKm = inp.billedKmTrip > 0 ? totalTripCost / inp.billedKmTrip : 0;
  const fixedRatioPct = totalTripCost > 0 ? (totalFixedCost / totalTripCost) * 100 : 0;

  return {
    totalTripCost,
    costPerTraveledKm,
    costPerBilledKm,
    totalFixedCost,
    totalVariableCost,
    fixedRatioPct,
  };
}

// --- MÓDULO 06: PEAJES Y GASTOS DE RUTA ($/viaje) ---
export interface Mod06Inputs {
  outboundTolls: number; // Peajes ida ($)
  inboundTolls: number; // Peajes vuelta ($)
  scalesWeighing: number; // Balanzas y pesajes ($)
  parkingAndGuard: number; // Estacionamiento y pernocte seguro ($)
  portAndTerminalFees: number; // Tasa ingreso a puerto / SENASA ($)
  tripKm: number; // Km del viaje (ej. 800)
}

export function calcMod06(inp: Mod06Inputs) {
  const totalTolls = inp.outboundTolls + inp.inboundTolls;
  const totalOtherExpenses = inp.scalesWeighing + inp.parkingAndGuard + inp.portAndTerminalFees;
  const totalRouteExpenses = totalTolls + totalOtherExpenses;
  const expensePerKm = inp.tripKm > 0 ? totalRouteExpenses / inp.tripKm : 0;
  const tollsRatioPct = totalRouteExpenses > 0 ? (totalTolls / totalRouteExpenses) * 100 : 0;

  return {
    totalRouteExpenses,
    totalTolls,
    totalOtherExpenses,
    expensePerKm,
    tollsRatioPct,
  };
}

// --- MÓDULO 07: VIÁTICOS DEL CHOFER ($/viaje · $/km) ---
export interface Mod07Inputs {
  travelKm: number; // Km recorridos (ej. 800)
  ratePerKmCCT: number; // Tarifa viático km CCT 40/89 ($/km)
  tripDays: number; // Días del viaje (ej. 2)
  foodAllowancePerDay: number; // Comida CCT 40/89 ($/día)
  stayAllowancePerDay: number; // Pernoctada / estadía ($/día)
  bonusAndCrossing: number; // Cruce de frontera / adicional zona fría ($)
}

export function calcMod07(inp: Mod07Inputs) {
  const kmViaticTotal = inp.travelKm * inp.ratePerKmCCT;
  const foodTotal = inp.tripDays * inp.foodAllowancePerDay;
  const stayTotal = inp.tripDays * inp.stayAllowancePerDay;
  const totalViatics = kmViaticTotal + foodTotal + stayTotal + inp.bonusAndCrossing;
  const viaticPerKm = inp.travelKm > 0 ? totalViatics / inp.travelKm : 0;
  const viaticPerDay = inp.tripDays > 0 ? totalViatics / inp.tripDays : 0;

  return {
    totalViatics,
    kmViaticTotal,
    foodTotal,
    stayTotal,
    viaticPerKm,
    viaticPerDay,
  };
}

// --- MÓDULO 08: COSTO DE LA HORA DE ESPERA ($/hora) ---
export interface Mod08Inputs {
  dailyFixedCost: number;
  dailyWorkHours: number;
  waitingHoursThisTrip: number;
  waitsPerMonth: number;
  fadeeacStayReference: number;
  freeHoursBeforeStay: number;
}

export function calcMod08(inp: Mod08Inputs) {
  const hourlyWaitingCost = inp.dailyWorkHours > 0 ? inp.dailyFixedCost / inp.dailyWorkHours : 0;
  const tripWaitCost = hourlyWaitingCost * inp.waitingHoursThisTrip;
  const monthWaitCost = tripWaitCost * inp.waitsPerMonth;
  const givenAwayHoursPerMonth = inp.waitingHoursThisTrip * inp.waitsPerMonth;
  const stayReferenceCoveragePct = inp.dailyFixedCost > 0
    ? (inp.fadeeacStayReference / inp.dailyFixedCost) * 100
    : 0;

  return {
    tripWaitCost,
    hourlyWaitingCost,
    monthWaitCost,
    stayReferenceCoveragePct,
    givenAwayHoursPerMonth,
  };
}

// --- MÓDULO 09: TARIFA DEL VIAJE EVENTUAL ($/viaje · $/tn) ---
export interface Mod09Inputs {
  tripCost: number;
  targetMarginPct: number;
  cargoTons: number;
  commissionPct: number;
  referenceTariffPerTon: number;
  marketPctOfReference: number;
}

export function calcMod09(inp: Mod09Inputs) {
  const denominator = (1 - inp.targetMarginPct / 100) * (1 - inp.commissionPct / 100);
  const minTripTariff = denominator > 0 ? inp.tripCost / denominator : 0;
  const minTariffPerTon = inp.cargoTons > 0 ? minTripTariff / inp.cargoTons : 0;
  const totalRefTariff = inp.referenceTariffPerTon * inp.cargoTons;
  const refMarginAmount = totalRefTariff * (1 - inp.commissionPct / 100) - inp.tripCost;
  const marketGrossTariff = totalRefTariff * (inp.marketPctOfReference / 100);
  const marketMarginAmount = marketGrossTariff * (1 - inp.commissionPct / 100) - inp.tripCost;
  const marginOnRefPct = totalRefTariff > 0 ? (refMarginAmount / totalRefTariff) * 100 : 0;

  return {
    minTripTariff,
    minTariffPerTon,
    refMarginAmount,
    marketMarginAmount,
    marginOnRefPct,
  };
}

// --- MÓDULO 10: TARIFA DEL VIAJE FIJO ($/viaje · %) ---
export interface Mod10Inputs {
  singleTripCost: number; // Costo del viaje individual ($)
  tripsPerMonthGuaranteed: number; // Viajes garantizados al mes (ej. 16)
  targetMonthlyProfit: number; // Ganancia neta mensual pretendida con este cliente ($)
  efficiencySavingPct: number; // Ahorro por ruta fija/retorno asegurado (ej. 12%)
  paymentDelayDays: number; // Días de plazo de pago (ej. 45 días)
  monthlyInflationPct: number; // Inflación mensual esperada para costo financiero (ej. 3.5%)
}

export function calcMod10(inp: Mod10Inputs) {
  const adjustedTripCost = inp.singleTripCost * (1 - inp.efficiencySavingPct / 100);
  const monthlyTotalCost = adjustedTripCost * inp.tripsPerMonthGuaranteed;
  const financialCostFactor = 1 + (inp.monthlyInflationPct / 100) * (inp.paymentDelayDays / 30);
  const requiredMonthlyRevenue = (monthlyTotalCost + inp.targetMonthlyProfit) * financialCostFactor;
  const suggestedTariffPerTrip = inp.tripsPerMonthGuaranteed > 0 ? requiredMonthlyRevenue / inp.tripsPerMonthGuaranteed : 0;
  const maxDiscountAllowedPct = inp.singleTripCost > 0
    ? ((inp.singleTripCost - adjustedTripCost) / inp.singleTripCost) * 100
    : 0;

  return {
    suggestedTariffPerTrip,
    requiredMonthlyRevenue,
    monthlyTotalCost,
    adjustedTripCost,
    maxDiscountAllowedPct,
  };
}

// --- MÓDULO 11: TARIFA POR BULTO Y PALLET ($/entrega · kg) ---
export interface Mod11Inputs {
  fullTripCostWithMargin: number; // Costo total del viaje con margen ($)
  totalPalletPositions: number; // Capacidad batea/furgón en pallets (ej. 28)
  cargoVolumeM3: number; // Capacidad en m3 (ej. 85 m3)
  extraDropsCount: number; // Cantidad de paradas / multidrop (ej. 4)
  extraDropFee: number; // Tarifa por parada extra ($/drop)
  totalCargoWeightKg: number; // Carga total transportada en kg (ej. 24.000)
}

export function calcMod11(inp: Mod11Inputs) {
  const extraDropsTotal = inp.extraDropsCount * inp.extraDropFee;
  const totalBilledTrip = inp.fullTripCostWithMargin + extraDropsTotal;
  const tariffPerPallet = inp.totalPalletPositions > 0 ? inp.fullTripCostWithMargin / inp.totalPalletPositions : 0;
  const tariffPerM3 = inp.cargoVolumeM3 > 0 ? inp.fullTripCostWithMargin / inp.cargoVolumeM3 : 0;
  const tariffPerKg = inp.totalCargoWeightKg > 0 ? totalBilledTrip / inp.totalCargoWeightKg : 0;

  return {
    tariffPerPallet,
    tariffPerM3,
    tariffPerKg,
    extraDropsTotal,
    totalBilledTrip,
  };
}

// --- MÓDULO 12: ACTUALIZACIÓN POR ÍNDICE ($ · %) ---
export interface Mod12Inputs {
  contractTariffBase: number; // Tarifa acordada en mes base ($)
  fadeeacIndexBase: number; // Índice FADEEAC mes base (ej. 1450.2)
  fadeeacIndexCurrent: number; // Índice FADEEAC mes actual (ej. 1624.8)
  fuelIncidencePct: number; // Ponderación combustible en contrato (ej. 35%)
  fuelIncreasePct: number; // Aumento del gasoil en el período (ej. 24%)
  otherCostsIncreasePct: number; // Aumento resto de costos (ej. 10%)
}

export function calcMod12(inp: Mod12Inputs) {
  const fadeeacIncreasePct = inp.fadeeacIndexBase > 0
    ? ((inp.fadeeacIndexCurrent - inp.fadeeacIndexBase) / inp.fadeeacIndexBase) * 100
    : 0;
  const tariffByFadeeac = inp.contractTariffBase * (1 + fadeeacIncreasePct / 100);

  // Polinómica = (Gasoil * %Gasoil) + (Resto * %Resto)
  const polynomialIncreasePct =
    (inp.fuelIncreasePct * (inp.fuelIncidencePct / 100)) +
    (inp.otherCostsIncreasePct * ((100 - inp.fuelIncidencePct) / 100));
  const tariffByPolynomial = inp.contractTariffBase * (1 + polynomialIncreasePct / 100);
  const differenceAmount = tariffByPolynomial - inp.contractTariffBase;

  return {
    tariffByPolynomial,
    polynomialIncreasePct,
    tariffByFadeeac,
    fadeeacIncreasePct,
    differenceAmount,
  };
}

// --- MÓDULO 13: PUNTO DE INDIFERENCIA ($ · aceptar/rechazar) ---
export interface Mod13Inputs {
  offeredPrice: number;
  variableCost: number;
  fixedCostTotalDays: number;
  returnProbabilityPct: number;
  returnRevenue: number;
  returnVariableCost: number;
}

export function calcMod13(inp: Mod13Inputs) {
  const asOfferedResult = inp.offeredPrice - inp.variableCost - inp.fixedCostTotalDays;
  const minTariffBreakEven = inp.variableCost + inp.fixedCostTotalDays;
  const variableCovered = inp.offeredPrice - inp.variableCost;
  const returnNetContribution = inp.returnRevenue - inp.returnVariableCost;
  const expectedReturnContribution = returnNetContribution * (inp.returnProbabilityPct / 100);
  const resultWithExpectedReturn = asOfferedResult + expectedReturnContribution;

  return {
    asOfferedResult,
    minTariffBreakEven,
    variableCovered,
    expectedReturnContribution,
    resultWithExpectedReturn,
  };
}

// --- MÓDULO 14: EQUILIBRIO Y RETIRO REAL ($/hora · viajes) ---
export interface Mod14Inputs {
  targetOwnerSalaryMonthly: number; // Sueldo pretendido por el dueño ($)
  totalFixedCostsMonthly: number; // Costos fijos del Módulo 01 ($)
  averageNetMarginPerTrip: number; // Margen neto promedio por viaje ($)
  averageKmPerTrip: number; // Km promedio de cada viaje (ej. 600 km)
  workingDaysMonth: number; // Días laborales al mes (ej. 22)
  hoursPerDay: number; // Horas por día (ej. 8)
}

export function calcMod14(inp: Mod14Inputs) {
  const totalMonthlyNeed = inp.totalFixedCostsMonthly + inp.targetOwnerSalaryMonthly;
  const tripsNeededForBreakEven = inp.averageNetMarginPerTrip > 0
    ? totalMonthlyNeed / inp.averageNetMarginPerTrip
    : 0;
  const kmNeededMonthly = tripsNeededForBreakEven * inp.averageKmPerTrip;
  const totalHoursMonth = inp.workingDaysMonth * inp.hoursPerDay;
  const realHourlyRate = totalHoursMonth > 0 ? inp.targetOwnerSalaryMonthly / totalHoursMonth : 0;
  const fixedCostCoverageTrips = inp.averageNetMarginPerTrip > 0
    ? inp.totalFixedCostsMonthly / inp.averageNetMarginPerTrip
    : 0;

  return {
    tripsNeededForBreakEven,
    totalMonthlyNeed,
    kmNeededMonthly,
    realHourlyRate,
    fixedCostCoverageTrips,
  };
}
