// Motor de cálculo y configuraciones para el Rubro: Movimiento de Suelo, Canteras y Bateas Volcadoras

export interface MaterialOption {
  id: string;
  name: string;
  density: number; // tn/m3
  swellFactor: number; // Coeficiente de esponjamiento (1.20 - 1.35)
  wearLevel: 'medio' | 'alto' | 'severo';
  description: string;
}

export const MATERIAL_PRESETS: MaterialOption[] = [
  {
    id: 'tosca',
    name: 'Tosca / Suelo Seleccionado',
    density: 1.75, // tn/m3
    swellFactor: 1.25,
    wearLevel: 'alto',
    description: 'Material estándar para terraplenes, bases y sub-bases viales.',
  },
  {
    id: 'tierra_negra',
    name: 'Tierra Negra / Descapote',
    density: 1.25,
    swellFactor: 1.30,
    wearLevel: 'medio',
    description: 'Tierra vegetal liviana, desmonte y nivelación de parcelas.',
  },
  {
    id: 'arena',
    name: 'Arena Gruesa / Fina',
    density: 1.60,
    swellFactor: 1.15,
    wearLevel: 'medio',
    description: 'Acarreo desde areneras o puertos. Alta abrasividad en caja.',
  },
  {
    id: 'piedra_partida',
    name: 'Piedra Partida / Áridos 6-20',
    density: 1.65,
    swellFactor: 1.20,
    wearLevel: 'severo',
    description: 'Carga de cantera para hormigón y asfaltos. Alto impacto en neumáticos.',
  },
  {
    id: 'escombros',
    name: 'Escombro / Cascote / Demolición',
    density: 1.45,
    swellFactor: 1.40,
    wearLevel: 'severo',
    description: 'Bordes cortantes, fierros y cascotes. Riesgo extremo de tajeo de cubiertas.',
  },
  {
    id: 'barro_arcilla',
    name: 'Barro / Arcilla Saturada',
    density: 1.95,
    swellFactor: 1.20,
    wearLevel: 'severo',
    description: 'Zanjeo en napas altas. Muy pesado, se pega al fondo de la batea al volcar.',
  },
];

export interface EquipmentOption {
  id: string;
  name: string;
  type: 'batea_semi' | 'volcador_6x4' | 'volcador_4x2' | 'batea_30';
  volumeM3: number;
  tareWeightTons: number; // Tara del equipo vacío
  grossWeightLimitTons: number; // Límite legal / técnico de peso bruto total
  tireCount: number; // Cantidad de cubiertas
  ptoLitersPerDump: number; // Consumo de gasoil por cada levante hidráulico de batea
  offRoadTireLifeKm: number; // Vida útil de cubierta en obra (km)
  roadTireLifeKm: number;
}

export const EQUIPMENT_PRESETS: EquipmentOption[] = [
  {
    id: 'batea_25',
    name: 'Semirremolque Batea 25 m³ (Tractor 4x2 + Semi 2+1 o 1+1+1)',
    type: 'batea_semi',
    volumeM3: 25,
    tareWeightTons: 15.5,
    grossWeightLimitTons: 45.0, // Ley de escalabilidad estándar
    tireCount: 18,
    ptoLitersPerDump: 1.2, // 1.2 litros consumidos por volteo hidráulico
    offRoadTireLifeKm: 45000,
    roadTireLifeKm: 160000,
  },
  {
    id: 'volcador_6x4',
    name: 'Camión Chasis Volcador 6x4 (14 a 16 m³)',
    type: 'volcador_6x4',
    volumeM3: 14,
    tareWeightTons: 11.5,
    grossWeightLimitTons: 26.0,
    tireCount: 10,
    ptoLitersPerDump: 0.8,
    offRoadTireLifeKm: 35000,
    roadTireLifeKm: 120000,
  },
  {
    id: 'volcador_4x2',
    name: 'Camión Chasis Volcador 4x2 (8 m³)',
    type: 'volcador_4x2',
    volumeM3: 8,
    tareWeightTons: 7.2,
    grossWeightLimitTons: 17.0,
    tireCount: 6,
    ptoLitersPerDump: 0.5,
    offRoadTireLifeKm: 40000,
    roadTireLifeKm: 130000,
  },
  {
    id: 'batea_30',
    name: 'Semirremolque Batea 30 m³ Trídem (Escalado 52.5 tn)',
    type: 'batea_30',
    volumeM3: 30,
    tareWeightTons: 16.8,
    grossWeightLimitTons: 52.5,
    tireCount: 22,
    ptoLitersPerDump: 1.5,
    offRoadTireLifeKm: 45000,
    roadTireLifeKm: 160000,
  },
];

export interface EarthmovingTripInputs {
  materialId: string;
  equipmentId: string;
  oneWayKm: number; // Distancia ida (cantera/pozo a obra)
  dirtRoadPct: number; // % del camino en tierra/huella/obra (vs asfalto)
  pavingSpeedKmh: number; // Velocidad media en asfalto (ej 60 km/h)
  dirtRoadSpeedKmh: number; // Velocidad media en tierra/obra (ej 20 km/h)
  loadingWaitMinutes: number; // Tiempo de espera y carga con retro/pala
  dumpAndSpreadMinutes: number; // Tiempo de maniobra, destape y volteo hidráulico
  workHoursPerDay: number; // Horas de la jornada de obra (ej 8 o 9 h)
  rainyIdleDaysPerMonth: number; // Días promedio de lluvia/obra parada al mes (ej 4 a 6 días)
  gasoilPrice: number; // $/litro
  baseLoadedConsumptionRoad: number; // L/100km en asfalto cargado (ej 42 L)
  baseEmptyConsumptionRoad: number; // L/100km en asfalto vacío (ej 28 L)
  dirtRoadConsumptionMultiplier: number; // Multiplicador de consumo en tierra/huella (ej 1.45x)
  targetMarginPct: number; // Margen de ganancia pretendido (ej 25%)
  contractorCommissionPct: number; // Comisión intermediario / empresa constructora (ej 5%)
  tireCostEach: number; // Costo de cada neumático nuevo
  fixedCostPerDay: number; // Costo fijo por día hábil (del Módulo 01)
  maintenancePerHourInSite: number; // Desgaste extra por polvo, engrase de tolva y cilindro hidráulico ($/h)
}

export function calcEarthmovingMetrics(inp: EarthmovingTripInputs) {
  const mat = MATERIAL_PRESETS.find((m) => m.id === inp.materialId) || MATERIAL_PRESETS[0];
  const eq = EQUIPMENT_PRESETS.find((e) => e.id === inp.equipmentId) || EQUIPMENT_PRESETS[0];

  // Capacidad de carga real (limitada por volumen o por peso máximo legal)
  const theoreticalCargoByVolumeTons = eq.volumeM3 * mat.density;
  const maxAllowedNetCargoTons = Math.max(0, eq.grossWeightLimitTons - eq.tareWeightTons);
  const actualCargoTons = Math.min(theoreticalCargoByVolumeTons, maxAllowedNetCargoTons);
  const actualCargoM3 = mat.density > 0 ? actualCargoTons / mat.density : 0;
  const isLimitedByWeight = theoreticalCargoByVolumeTons > maxAllowedNetCargoTons;

  // Tiempos de viaje y ciclo
  const dirtDistance = (inp.oneWayKm * (inp.dirtRoadPct / 100));
  const roadDistance = (inp.oneWayKm * (1 - inp.dirtRoadPct / 100));

  const dirtTimeHours = inp.dirtRoadSpeedKmh > 0 ? dirtDistance / inp.dirtRoadSpeedKmh : 0;
  const roadTimeHours = inp.pavingSpeedKmh > 0 ? roadDistance / inp.pavingSpeedKmh : 0;
  const oneWayTravelMinutes = (dirtTimeHours + roadTimeHours) * 60;

  // Tiempo de retorno vacío (un poco más ágil en tierra)
  const emptyDirtSpeed = Math.min(inp.dirtRoadSpeedKmh * 1.25, 40);
  const emptyRoadSpeed = Math.min(inp.pavingSpeedKmh * 1.05, 75);
  const returnDirtTimeHours = emptyDirtSpeed > 0 ? dirtDistance / emptyDirtSpeed : 0;
  const returnRoadTimeHours = emptyRoadSpeed > 0 ? roadDistance / emptyRoadSpeed : 0;
  const returnTravelMinutes = (returnDirtTimeHours + returnRoadTimeHours) * 60;

  // Ciclo total de 1 viaje (en minutos)
  const totalCycleMinutes =
    inp.loadingWaitMinutes +
    oneWayTravelMinutes +
    inp.dumpAndSpreadMinutes +
    returnTravelMinutes;

  // Viajes posibles por día hábil
  const totalWorkMinutes = inp.workHoursPerDay * 60;
  const maxTripsPerDay = totalCycleMinutes > 0 ? totalWorkMinutes / totalCycleMinutes : 0;
  const realisticTripsPerDay = Math.floor(maxTripsPerDay);

  // Consumo de Combustible en el viaje
  // Ida cargado
  const loadedRoadLiters = (roadDistance / 100) * inp.baseLoadedConsumptionRoad;
  const loadedDirtLiters =
    (dirtDistance / 100) * inp.baseLoadedConsumptionRoad * inp.dirtRoadConsumptionMultiplier;
  // Vuelta vacío (100% de retorno en vacío en movimiento de suelo)
  const emptyRoadLiters = (roadDistance / 100) * inp.baseEmptyConsumptionRoad;
  const emptyDirtLiters =
    (dirtDistance / 100) * inp.baseEmptyConsumptionRoad * (inp.dirtRoadConsumptionMultiplier * 0.9);

  // Gasoil de maniobra y Toma de Fuerza (PTO) para levantar batea
  const ptoFuelLiters = eq.ptoLitersPerDump;
  const totalTripFuelLiters =
    loadedRoadLiters + loadedDirtLiters + emptyRoadLiters + emptyDirtLiters + ptoFuelLiters;
  const tripFuelCost = totalTripFuelLiters * inp.gasoilPrice;

  // Desgaste de Neumáticos en Movimiento de Suelo
  const totalKmTrip = inp.oneWayKm * 2;
  const blendedTireLifeKm =
    (eq.offRoadTireLifeKm * (inp.dirtRoadPct / 100)) +
    (eq.roadTireLifeKm * (1 - inp.dirtRoadPct / 100));
  const tireWearPerKm = blendedTireLifeKm > 0 ? (inp.tireCostEach * eq.tireCount) / blendedTireLifeKm : 0;
  const tripTireCost = tireWearPerKm * totalKmTrip;

  // Mantenimiento severo por hora de equipo
  const cycleHours = totalCycleMinutes / 60;
  const tripMaintenanceCost = cycleHours * inp.maintenancePerHourInSite;

  // Costo Variable Total por Viaje
  const totalVariableCostPerTrip = tripFuelCost + tripTireCost + tripMaintenanceCost;

  // Costo Fijo Prorrateado por Viaje (ajustado por días de lluvia al mes)
  // Si llueve 5 días al mes de 22 hábiles, quedan 17 días para absorber TODO el costo fijo mensual
  const standardDays = 22;
  const effectiveOperatingDays = Math.max(1, standardDays - inp.rainyIdleDaysPerMonth);
  const fixedCostInflationFactor = standardDays / effectiveOperatingDays;
  const adjustedDailyFixedCost = inp.fixedCostPerDay * fixedCostInflationFactor;

  const tripsCountForProrate = realisticTripsPerDay >= 1 ? realisticTripsPerDay : maxTripsPerDay;
  const fixedCostPerTrip = tripsCountForProrate > 0 ? adjustedDailyFixedCost / tripsCountForProrate : adjustedDailyFixedCost;

  // Costo Total del Viaje (Punto de Equilibrio Puro)
  const totalCostPerTrip = totalVariableCostPerTrip + fixedCostPerTrip;

  // Tarifa Sugerida según margen y comisión de constructora
  const denominator = (1 - inp.targetMarginPct / 100) * (1 - inp.contractorCommissionPct / 100);
  const suggestedTariffPerTrip = denominator > 0 ? totalCostPerTrip / denominator : totalCostPerTrip * 1.35;

  // Métricas Clave de Movimiento de Suelo
  const costPerM3 = actualCargoM3 > 0 ? totalCostPerTrip / actualCargoM3 : 0;
  const suggestedTariffPerM3 = actualCargoM3 > 0 ? suggestedTariffPerTrip / actualCargoM3 : 0;

  const costPerTon = actualCargoTons > 0 ? totalCostPerTrip / actualCargoTons : 0;
  const suggestedTariffPerTon = actualCargoTons > 0 ? suggestedTariffPerTrip / actualCargoTons : 0;

  const costPerM3Km = (actualCargoM3 > 0 && inp.oneWayKm > 0) ? totalCostPerTrip / (actualCargoM3 * inp.oneWayKm) : 0;
  const suggestedTariffPerM3Km = (actualCargoM3 > 0 && inp.oneWayKm > 0) ? suggestedTariffPerTrip / (actualCargoM3 * inp.oneWayKm) : 0;

  // Tarifa por Hora de Camión con Chofer en Obra
  const tripDurationHours = totalCycleMinutes / 60;
  const hourlyRateSuggested = tripDurationHours > 0 ? suggestedTariffPerTrip / tripDurationHours : 0;

  // Proyección Diaria con Equipo Activo
  const dailyTotalM3 = actualCargoM3 * realisticTripsPerDay;
  const dailyTotalTons = actualCargoTons * realisticTripsPerDay;
  const dailyRevenue = suggestedTariffPerTrip * realisticTripsPerDay;
  const dailyProfit = (suggestedTariffPerTrip - totalCostPerTrip) * realisticTripsPerDay;

  return {
    mat,
    eq,
    actualCargoTons,
    actualCargoM3,
    isLimitedByWeight,
    totalCycleMinutes,
    maxTripsPerDay,
    realisticTripsPerDay,
    totalTripFuelLiters,
    tripFuelCost,
    tripTireCost,
    tripMaintenanceCost,
    totalVariableCostPerTrip,
    adjustedDailyFixedCost,
    fixedCostPerTrip,
    totalCostPerTrip,
    suggestedTariffPerTrip,
    costPerM3,
    suggestedTariffPerM3,
    costPerTon,
    suggestedTariffPerTon,
    costPerM3Km,
    suggestedTariffPerM3Km,
    hourlyRateSuggested,
    dailyTotalM3,
    dailyTotalTons,
    dailyRevenue,
    dailyProfit,
    rainImpactExtraCostPerDay: adjustedDailyFixedCost - inp.fixedCostPerDay,
  };
}
