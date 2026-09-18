// Exact formulas and calculations extracted from the spreadsheet images:
//
// -------------------------------------------------------------
// IMAGE 1 (GRID DE 14 MÓDULOS):
// 01: Costo Fijo del Día ($/día)
// 02: Gasoil con y sin Carga ($/km · litros)
// 03: Amortización del Equipo ($/km)
// 04: Desgaste Programado ($/km · $/mes)
// 05: Costo Total del Viaje ($/km · $/viaje)
// 06: Peajes y Gastos de Ruta ($/viaje)
// 07: Viáticos del Chofer ($/viaje · $/km)
// 08: Costo de la Hora de Espera ($/hora)
// 09: Tarifa del Viaje Eventual ($/viaje · $/tn)
// 10: Tarifa del Viaje Fijo ($/viaje · %)
// 11: Tarifa por Bulto y Pallet ($/entrega · kg)
// 12: Actualización por Índice ($ · %)
// 13: Punto de Indiferencia ($ · aceptar/rechazar)
// 14: Equilibrio y Retiro Real ($/hora · viajes)
//
// -------------------------------------------------------------
// IMAGE 2 (CASO 01 - MÓDULO 02: ESTRUCTURA - GASOIL CON Y SIN CARGA):
// Formula visible en barra de formulas H8:
// =($D$11*$D$9/100+$D$12*$D$10/100)*$D$8*(1+$D$13/100)/$D$11
// Donde:
// D8 = Precio del gasoil = 2.048 $/L
// D9 = Consumo cargado = 38 L/100 km
// D10 = Consumo en vacío = 27 L/100 km
// D11 = Kilómetros cargados (los que facturás) = 420 km
// D12 = Kilómetros en vacío (posicionamiento y retorno) = 380 km
// D13 = Recargo por maniobras y espera con motor encendido = 4 %
//
// RESULTADOS EXACTOS CALCULADOS:
// Gasoil cargado litros = (420 / 100) * 38 = 159.6 L
// Gasoil vacío litros = (380 / 100) * 27 = 102.6 L
// Litros base = 159.6 + 102.6 = 262.2 L
// Litros del viaje con recargo 4% = 262.2 * 1.04 = 272.688 L -> 272,7 L
// Gasoil del viaje completo = 272.688 * 2.048 = $558.465,02 -> 558.465 $
// Gasoil por kilómetro facturado (H8) = 558.465,02 / 420 = 1.329,678 -> 1.329,68 $/km
// Consumo sólo cargado = (38/100) * 2.048 = 778,24 $/km
// Aumento % = (1329.68 - 778.24) / 778.24 = 70.857% -> 70,9 % más
// Lo que cuesta volver vacío = (380/100)*27 * 1.04 * 2.048 = 218.529,9 -> 218.530 $
// Kilómetros que no le cobrás a nadie = 380 / (420 + 380) = 47.5 %
//
// -------------------------------------------------------------
// IMAGE 3 (CASO 02 - MÓDULO 09: TARIFA - TARIFA DEL VIAJE EVENTUAL):
// Formula visible en barra de formulas H8:
// =$D$8/(1-$D$9/100)/(1-$D$11/100)
// Donde:
// D8 = Costo total del viaje (módulo 05) = 1.562.492 $
// D9 = Margen que querés dejar = 18 %
// D10 = Toneladas de la carga = 30 tn
// D11 = Comisión del dador de carga o la app = 6 %
// D12 = Tarifa de referencia para esa distancia = 67.680 $/tn
// D13 = Porcentaje de la referencia que paga el mercado = 70 %
//
// RESULTADOS EXACTOS CALCULADOS:
// Tarifa mínima del viaje = 1.562.492 / (1 - 0.18) / (1 - 0.06)
// = 1.562.492 / 0.82 / 0.94 = 2.027.104,8 -> 2.027.104 $
// Tarifa mínima por tonelada = 2.027.104,8 / 30 = 67.570,16 -> 67.570 $/tn
// Tarifa de referencia total = 67.680 * 30 = 2.030.400 $
// Lo que deja la tarifa de referencia = (2.030.400 * (1 - 0.06)) - 1.562.492
// = 1.908.576 - 1.562.492 = 346.084 $
// Precio que paga el mercado = 2.030.400 * 0.70 = 1.421.280 $
// Lo que deja el precio real del mercado = (1.421.280 * (1 - 0.06)) - 1.562.492
// = 1.336.003,2 - 1.562.492 = -226.488,8 -> -226.489 $
// Margen sobre la tarifa de referencia = 346.084 / 2.030.400 = 17,04% -> 17,0 %
//
// -------------------------------------------------------------
// IMAGE 4 (CASO 03 - MÓDULO 13: DECISIÓN - CUÁNDO CONVIENE RECHAZAR EL VIAJE):
// Formula visible en barra de formulas H8:
// =$D$8-$D$9-$D$10
// Donde:
// D8 = Lo que te ofrecen por el viaje = 1.350.000 $
// D9 = Costo variable del viaje (gasoil, ruta, viáticos, desgaste, amortización) = 1.363.704 $
// D10 = Costo fijo del día x días del viaje = 198.788 $
// D11 = Probabilidad de conseguir carga de retorno = 35 %
// D12 = Lo que pagaría ese retorno = 780.000 $
// D13 = Costo variable extra del retorno = 465.000 $
//
// RESULTADOS EXACTOS CALCULADOS:
// Resultado del viaje como te lo ofrecen = 1.350.000 - 1.363.704 - 198.788 = -212.492 $
// Tarifa mínima para no perder = Costo variable + Costo fijo = 1.363.704 + 198.788 = 1.562.492 $
// Cuánto cubre del costo variable = 1.350.000 - 1.363.704 = -13.704 $ (¡No cubre ni el gasoil!)
// Margen neto del retorno si sale = 780.000 - 465.000 = 315.000 $
// Lo que aporta el retorno esperado = 315.000 * 35% = 110.250 $
// Resultado con el retorno esperado = -212.492 + 110.250 = -102.242 $ (Sigue a pérdida)
//
// -------------------------------------------------------------
// IMAGE 5 & 6 (CASO 04 - MÓDULO 08: OPERACIÓN - LO QUE TE CUESTA ESPERAR QUE TE CARGUEN):
// Formula visible en barra de formulas H8:
// =$D$8/$D$9*$D$10
// Donde:
// D8 = Costo fijo del día de camión (módulo 01) = 198.788 $/día
// D9 = Horas de trabajo del día = 8 h
// D10 = Horas de espera de este viaje = 6,50 h
// D11 = Esperas por mes = 14 esperas
// D12 = Estadía de referencia FADEEAC = 223.180 $/día
// D13 = Horas libres antes de que corra la estadía = 24 h
//
// RESULTADOS EXACTOS CALCULADOS:
// Costo de la hora parada = 198.788 / 8 = 24.848,5 -> 24.849 $/h
// Lo que te costó la espera = 24.848,5 * 6,5 = 161.515,25 -> 161.515 $
// Esperas de un mes = 161.515,25 * 14 = 2.261.213,5 -> 2.261.214 $/mes
// Horas que regalás por mes = 6,5 * 14 = 91,0 h
// La estadía de referencia cubre = 223.180 / 198.788 = 112,27% -> 112,3 %
// -------------------------------------------------------------

export interface Module02Inputs {
  gasoilPrice: number; // 2048
  loadedConsumption: number; // 38
  emptyConsumption: number; // 27
  billedKm: number; // 420
  emptyKm: number; // 380
  maneuverSurchargePct: number; // 4
}

export interface Module09Inputs {
  tripCost: number; // 1562492
  targetMarginPct: number; // 18
  cargoTons: number; // 30
  commissionPct: number; // 6
  referenceTariffPerTon: number; // 67680
  marketPctOfReference: number; // 70
}

export interface Module13Inputs {
  offeredPrice: number; // 1350000
  variableCost: number; // 1363704
  fixedCostTotalDays: number; // 198788
  returnProbabilityPct: number; // 35
  returnRevenue: number; // 780000
  returnVariableCost: number; // 465000
}

export interface Module08Inputs {
  dailyFixedCost: number; // 198788
  dailyWorkHours: number; // 8
  waitingHoursThisTrip: number; // 6.5
  waitsPerMonth: number; // 14
  fadeeacStayReference: number; // 223180
  freeHoursBeforeStay: number; // 24
}

export function calcModule02(inp: Module02Inputs) {
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
    loadedLiters,
    emptyLiters,
    totalLiters,
    totalFuelCost,
    fuelCostPerBilledKm,
    loadedOnlyCostPerKm,
    returnCost,
    unbilledKmPct,
    increasePct,
  };
}

export function calcModule09(inp: Module09Inputs) {
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
    totalRefTariff,
    refMarginAmount,
    marketGrossTariff,
    marketMarginAmount,
    marginOnRefPct,
  };
}

export function calcModule13(inp: Module13Inputs) {
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
    returnNetContribution,
    expectedReturnContribution,
    resultWithExpectedReturn,
  };
}

export function calcModule08(inp: Module08Inputs) {
  const hourlyWaitingCost = inp.dailyWorkHours > 0 ? inp.dailyFixedCost / inp.dailyWorkHours : 0;
  const tripWaitCost = hourlyWaitingCost * inp.waitingHoursThisTrip;
  const monthWaitCost = tripWaitCost * inp.waitsPerMonth;
  const givenAwayHoursPerMonth = inp.waitingHoursThisTrip * inp.waitsPerMonth;
  const stayReferenceCoveragePct = inp.dailyFixedCost > 0
    ? (inp.fadeeacStayReference / inp.dailyFixedCost) * 100
    : 0;

  return {
    hourlyWaitingCost,
    tripWaitCost,
    monthWaitCost,
    givenAwayHoursPerMonth,
    stayReferenceCoveragePct,
  };
}
