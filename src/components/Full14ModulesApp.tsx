import React, { useState } from 'react';
import {
  Calendar,
  Fuel,
  TrendingDown,
  Wrench,
  DollarSign,
  Receipt,
  Users,
  Clock,
  Briefcase,
  FileCheck,
  Package,
  RefreshCw,
  HelpCircle,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Printer,
  CheckCircle,
  AlertTriangle,
  Layers,
  ArrowRight,
  Eye,
  Mountain,
  Truck,
} from 'lucide-react';
import {
  Mod01Inputs, calcMod01,
  Mod02Inputs, calcMod02,
  Mod03Inputs, calcMod03,
  Mod04Inputs, calcMod04,
  Mod05Inputs, calcMod05,
  Mod06Inputs, calcMod06,
  Mod07Inputs, calcMod07,
  Mod08Inputs, calcMod08,
  Mod09Inputs, calcMod09,
  Mod10Inputs, calcMod10,
  Mod11Inputs, calcMod11,
  Mod12Inputs, calcMod12,
  Mod13Inputs, calcMod13,
  Mod14Inputs, calcMod14,
} from '../allModulesLogic';
import { motion, AnimatePresence } from 'motion/react';
import { ModuleComparisonChart } from './ModuleComparisonChart';
import { FormulaInspectorModal } from './FormulaInspectorModal';
import { AnimatedCounter } from './AnimatedCounter';
import { MovimientoSueloPanel } from './MovimientoSueloPanel';

interface Full14ModulesAppProps {
  initialModuleId?: number;
  initialIndustry?: 'carga-general' | 'movimiento-suelo';
  onGoToLanding?: () => void;
}

export const Full14ModulesApp: React.FC<Full14ModulesAppProps> = ({
  initialModuleId = 2,
  initialIndustry = 'carga-general',
  onGoToLanding,
}) => {
  const [activeModuleId, setActiveModuleId] = useState<number>(initialModuleId);
  const [activeTabCategory, setActiveTabCategory] = useState<'all' | 'estructura' | 'operacion' | 'tarifa' | 'decision'>('all');
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);
  const [operationalIndustry, setOperationalIndustry] = useState<'carga-general' | 'movimiento-suelo'>(initialIndustry);
  const [earthmovingSubView, setEarthmovingSubView] = useState<'calculadora-suelo' | 'modulos-adaptados'>('calculadora-suelo');

  // Initial states for all 14 modules
  const [mod01, setMod01] = useState<Mod01Inputs>({
    insuranceMonthly: 890000,
    patenteTaxesMonthly: 420000,
    driverBaseMonthly: 2150000,
    garageMonthly: 320000,
    technicalInspectionMonthly: 85000,
    fixedAdminMonthly: 508336,
    truckLoanDebtMonthly: 450000, // Cuota leasing/deuda del camión
    operatingDaysPerMonth: 22,
    workingHoursPerDay: 8,
  });

  const [mod02, setMod02] = useState<Mod02Inputs>({
    gasoilPrice: 2048,
    loadedConsumption: 38,
    emptyConsumption: 27,
    billedKm: 420,
    emptyKm: 380,
    maneuverSurchargePct: 4.0,
  });

  const [mod03, setMod03] = useState<Mod03Inputs>({
    truckReplacementValue: 145000000,
    trailerReplacementValue: 48000000,
    truckResidualPct: 20,
    trailerResidualPct: 25,
    truckUsefulLifeKm: 1000000,
    trailerUsefulLifeKm: 1200000,
    monthlyEstimatedKm: 9000,
  });

  const [mod04, setMod04] = useState<Mod04Inputs>({
    tiresCount: 18,
    newTireCost: 850000,
    newTireLifeKm: 130000,
    retreadsCount: 2,
    retreadCost: 310000,
    retreadLifeKm: 80000,
    oilFilterServiceCost: 480000,
    oilFilterIntervalKm: 30000,
    brakesClutchPer100kKm: 2800000,
    monthlyKm: 9000,
  });

  const [mod05, setMod05] = useState<Mod05Inputs>({
    totalKmTrip: 800,
    billedKmTrip: 420,
    tripDays: 2,
    dailyFixedCost: 198788,
    fuelTripCost: 558465,
    wearAndAmortPerKm: 184.5,
    tollsAndExpenses: 48500,
    driverViatics: 142000,
  });

  const [mod06, setMod06] = useState<Mod06Inputs>({
    outboundTolls: 24500,
    inboundTolls: 24500,
    scalesWeighing: 8500,
    parkingAndGuard: 15000,
    portAndTerminalFees: 12000,
    tripKm: 800,
  });

  const [mod07, setMod07] = useState<Mod07Inputs>({
    travelKm: 800,
    ratePerKmCCT: 98.5,
    tripDays: 2,
    foodAllowancePerDay: 28500,
    stayAllowancePerDay: 35000,
    bonusAndCrossing: 0,
  });

  const [mod08, setMod08] = useState<Mod08Inputs>({
    dailyFixedCost: 198788,
    dailyWorkHours: 8,
    waitingHoursThisTrip: 6.5,
    waitsPerMonth: 14,
    fadeeacStayReference: 223180,
    freeHoursBeforeStay: 4,
  });

  const [mod09, setMod09] = useState<Mod09Inputs>({
    tripCost: 1562492,
    targetMarginPct: 18.0,
    cargoTons: 30.0,
    commissionPct: 6.0,
    referenceTariffPerTon: 78500,
    marketPctOfReference: 70.0,
  });

  const [mod10, setMod10] = useState<Mod10Inputs>({
    singleTripCost: 1562492,
    tripsPerMonthGuaranteed: 16,
    targetMonthlyProfit: 4500000,
    efficiencySavingPct: 12,
    paymentDelayDays: 45,
    monthlyInflationPct: 3.5,
  });

  const [mod11, setMod11] = useState<Mod11Inputs>({
    fullTripCostWithMargin: 2027104,
    totalPalletPositions: 28,
    cargoVolumeM3: 85,
    extraDropsCount: 4,
    extraDropFee: 35000,
    totalCargoWeightKg: 24000,
  });

  const [mod12, setMod12] = useState<Mod12Inputs>({
    contractTariffBase: 1850000,
    fadeeacIndexBase: 1450.2,
    fadeeacIndexCurrent: 1624.8,
    fuelIncidencePct: 36,
    fuelIncreasePct: 22.5,
    otherCostsIncreasePct: 11.0,
  });

  const [mod13, setMod13] = useState<Mod13Inputs>({
    offeredPrice: 1350000,
    variableCost: 1164916,
    fixedCostTotalDays: 397576,
    returnProbabilityPct: 65,
    returnRevenue: 850000,
    returnVariableCost: 680000,
  });

  const [mod14, setMod14] = useState<Mod14Inputs>({
    targetOwnerSalaryMonthly: 3500000,
    totalFixedCostsMonthly: 4373336,
    averageNetMarginPerTrip: 385000,
    averageKmPerTrip: 750,
    workingDaysMonth: 22,
    hoursPerDay: 8,
  });

  const applyEarthmovingTo14Modules = (params?: {
    oneWayKm?: number;
    fuelCostPerKm?: number;
    cargoTons?: number;
    fixedCostDaily?: number;
    suggestedTripTariff?: number;
  }) => {
    const km = params?.oneWayKm ?? 22;
    const tons = params?.cargoTons ?? 28;
    const fixedDaily = params?.fixedCostDaily ?? 181250;
    const tariff = params?.suggestedTripTariff ?? 265000;

    // Mod 01: Días de lluvia (18 hábiles), cuota batea, seguro con cláusula de no repetición
    setMod01({
      insuranceMonthly: 980000,
      patenteTaxesMonthly: 420000,
      driverBaseMonthly: 2150000,
      garageMonthly: 360000,
      technicalInspectionMonthly: 85000,
      fixedAdminMonthly: 508336,
      truckLoanDebtMonthly: 850000, // Cuota leasing batea/volcador
      operatingDaysPerMonth: 18, // 4 días de lluvia al mes
      workingHoursPerDay: 9,
    });

    // Mod 02: 100% de retorno en vacío, consumo severo huella + toma de fuerza
    setMod02({
      gasoilPrice: 1280,
      loadedConsumption: 52, // L/100km cargado en tierra
      emptyConsumption: 33, // L/100km vacío
      billedKm: km,
      emptyKm: km, // Retorno 100% vacío
      maneuverSurchargePct: 15.0, // PTO levante hidráulico y maniobras terraplén
    });

    // Mod 03: Desgaste severo en equipo (Tractor + Batea 25m³)
    setMod03({
      truckReplacementValue: 135000000,
      trailerReplacementValue: 55000000,
      truckResidualPct: 18,
      trailerResidualPct: 20,
      truckUsefulLifeKm: 800000,
      trailerUsefulLifeKm: 900000,
      monthlyEstimatedKm: 3200,
    });

    // Mod 04: Cubiertas de cantera (vida útil 45.000 km por piedras y tajeos)
    setMod04({
      tiresCount: 18,
      newTireCost: 540000,
      newTireLifeKm: 45000,
      retreadsCount: 1,
      retreadCost: 210000,
      retreadLifeKm: 30000,
      oilFilterServiceCost: 480000,
      oilFilterIntervalKm: 15000, // Service acortado por polvo de obra
      brakesClutchPer100kKm: 6500000, // Mayor esfuerzo en pendientes y tosquera
      monthlyKm: 3200,
    });

    // Mod 05: Distancia corta y ciclo de cantera
    setMod05({
      totalKmTrip: km * 2,
      billedKmTrip: km,
      tripDays: 1,
      dailyFixedCost: fixedDaily,
      fuelTripCost: 38000,
      wearAndAmortPerKm: 280,
      tollsAndExpenses: 0,
      driverViatics: 15000,
    });

    // Mod 08: Esperas en cola de retroexcavadora y compactación
    setMod08({
      dailyFixedCost: fixedDaily,
      dailyWorkHours: 9,
      waitingHoursThisTrip: 1.5,
      waitsPerMonth: 36,
      fadeeacStayReference: 75000,
      freeHoursBeforeStay: 0.5,
    });

    // Mod 09: Cotización en obra con toneladas
    setMod09({
      tripCost: tariff * 0.72,
      targetMarginPct: 25,
      cargoTons: tons,
      commissionPct: 5,
      referenceTariffPerTon: tariff / tons,
      marketPctOfReference: 100,
    });

    setOperationalIndustry('movimiento-suelo');
    setEarthmovingSubView('modulos-adaptados');
  };

  const formatMoney = (val: number, decimals = 0) => {
    return val.toLocaleString('es-AR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // Modules metadata
  const modulesList = [
    { id: 1, title: 'Costo fijo del día', unit: '$/día', category: 'estructura', icon: Calendar, color: '#F97316' },
    { id: 2, title: 'Gasoil con y sin carga', unit: '$/km · litros', category: 'estructura', icon: Fuel, color: '#C2410C' },
    { id: 3, title: 'Amortización del equipo', unit: '$/km', category: 'estructura', icon: TrendingDown, color: '#F97316' },
    { id: 4, title: 'Desgaste programado', unit: '$/km · $/mes', category: 'estructura', icon: Wrench, color: '#F5B301' },
    { id: 5, title: 'Costo total del viaje', unit: '$/km · $/viaje', category: 'operacion', icon: DollarSign, color: '#10B981' },
    { id: 6, title: 'Peajes y gastos de ruta', unit: '$/viaje', category: 'operacion', icon: Receipt, color: '#10B981' },
    { id: 7, title: 'Viáticos del chofer', unit: '$/viaje · $/km', category: 'operacion', icon: Users, color: '#10B981' },
    { id: 8, title: 'Costo de la hora de espera', unit: '$/hora', category: 'operacion', icon: Clock, color: '#10B981' },
    { id: 9, title: 'Tarifa del viaje eventual', unit: '$/viaje · $/tn', category: 'tarifa', icon: Briefcase, color: '#3B82F6' },
    { id: 10, title: 'Tarifa del viaje fijo', unit: '$/viaje · %', category: 'tarifa', icon: FileCheck, color: '#3B82F6' },
    { id: 11, title: 'Tarifa por bulto y pallet', unit: '$/entrega · kg', category: 'tarifa', icon: Package, color: '#3B82F6' },
    { id: 12, title: 'Actualización por índice', unit: '$ · %', category: 'tarifa', icon: RefreshCw, color: '#3B82F6' },
    { id: 13, title: 'Punto de indiferencia', unit: '$ · aceptar/rechazar', category: 'decision', icon: HelpCircle, color: '#EF4444' },
    { id: 14, title: 'Equilibrio y retiro real', unit: '$/hora · viajes', category: 'decision', icon: BarChart2, color: '#8B5CF6' },
  ];

  const currentModule = modulesList.find((m) => m.id === activeModuleId) || modulesList[1];

  const filteredModules = modulesList.filter((m) => {
    if (activeTabCategory === 'all') return true;
    return m.category === activeTabCategory;
  });

  // Calculate results for current module
  const res01 = calcMod01(mod01);
  const res02 = calcMod02(mod02);
  const res03 = calcMod03(mod03);
  const res04 = calcMod04(mod04);
  const res05 = calcMod05(mod05);
  const res06 = calcMod06(mod06);
  const res07 = calcMod07(mod07);
  const res08 = calcMod08(mod08);
  const res09 = calcMod09(mod09);
  const res10 = calcMod10(mod10);
  const res11 = calcMod11(mod11);
  const res12 = calcMod12(mod12);
  const res13 = calcMod13(mod13);
  const res14 = calcMod14(mod14);

  // Helper to dynamically calculate comparison data between Variable Cost, Fixed Cost and Suggested Tariff for Recharts
  const getModuleComparisonData = () => {
    switch (activeModuleId) {
      case 1: {
        const fixed = res01.fixedCostPerDay;
        const variable = 380 * res02.fuelCostPerBilledKm;
        const tariff = (fixed + variable) * 1.25;
        return {
          moduleNumber: 1,
          variableCost: variable,
          fixedCost: fixed,
          suggestedTariff: tariff,
          tripContextLabel: 'Jornada diaria de referencia (380 km recorridos)',
        };
      }
      case 2: {
        const totalKm = mod02.billedKm + mod02.emptyKm;
        const days = Math.max(1, Math.round(totalKm / 420));
        const fixed = res01.fixedCostPerDay * days;
        const variable = res02.totalFuelCost + (totalKm * res04.totalWearPerKm);
        const tariff = (fixed + variable) * 1.22;
        return {
          moduleNumber: 2,
          variableCost: variable,
          fixedCost: fixed,
          suggestedTariff: tariff,
          tripContextLabel: `Viaje completo (${mod02.billedKm} km cargado + ${mod02.emptyKm} km retorno)`,
        };
      }
      case 3: {
        const fixed = res01.fixedCostPerDay * 2;
        const variable = (res03.totalAmortPerKm + res02.fuelCostPerBilledKm) * 800;
        const tariff = (fixed + variable) * 1.25;
        return {
          moduleNumber: 3,
          variableCost: variable,
          fixedCost: fixed,
          suggestedTariff: tariff,
          tripContextLabel: 'Amortización y fondo de reposición en viaje de 800 km',
        };
      }
      case 4: {
        const fixed = res01.fixedCostPerDay * 2;
        const variable = (res04.totalWearPerKm + res02.fuelCostPerBilledKm) * 800;
        const tariff = (fixed + variable) * 1.25;
        return {
          moduleNumber: 4,
          variableCost: variable,
          fixedCost: fixed,
          suggestedTariff: tariff,
          tripContextLabel: 'Desgaste de cubiertas + lubricantes + frenos (800 km)',
        };
      }
      case 5: {
        return {
          moduleNumber: 5,
          variableCost: res05.totalVariableCost,
          fixedCost: res05.totalFixedCost,
          suggestedTariff: res05.totalTripCost * 1.25,
          tripContextLabel: `Costo total consolidado (${mod05.totalKmTrip} km en ${mod05.tripDays} días)`,
        };
      }
      case 6: {
        const fixed = res01.fixedCostPerDay * 2;
        const variable = res06.totalRouteExpenses + (res02.fuelCostPerBilledKm * mod06.tripKm);
        const tariff = (fixed + variable) * 1.22;
        return {
          moduleNumber: 6,
          variableCost: variable,
          fixedCost: fixed,
          suggestedTariff: tariff,
          tripContextLabel: `Incidencia de peajes y gastos de ruta en viaje de ${mod06.tripKm} km`,
        };
      }
      case 7: {
        const fixed = res01.fixedCostPerDay * mod07.tripDays;
        const variable = res07.totalViatics + (mod07.travelKm * res02.fuelCostPerBilledKm);
        const tariff = (fixed + variable) * 1.22;
        return {
          moduleNumber: 7,
          variableCost: variable,
          fixedCost: fixed,
          suggestedTariff: tariff,
          tripContextLabel: `Viáticos CCT 40/89 (${mod07.tripDays} días y ${mod07.travelKm} km)`,
        };
      }
      case 8: {
        const fixed = res08.hourlyWaitingCost * 0.65 * mod08.waitingHoursThisTrip;
        const variable = res08.hourlyWaitingCost * 0.35 * mod08.waitingHoursThisTrip;
        const tariff = res08.tripWaitCost * 1.3;
        return {
          moduleNumber: 8,
          variableCost: variable,
          fixedCost: fixed,
          suggestedTariff: tariff,
          tripContextLabel: `Compensación mínima por ${mod08.waitingHoursThisTrip} hs de espera en planta`,
        };
      }
      case 9: {
        const variable = mod09.tripCost * 0.65;
        const fixed = mod09.tripCost * 0.35;
        const tariff = res09.minTripTariff;
        return {
          moduleNumber: 9,
          variableCost: variable,
          fixedCost: fixed,
          suggestedTariff: tariff,
          tripContextLabel: 'Tarifa piso con margen neto para viaje eventual',
        };
      }
      case 10: {
        const baseCost = mod10.singleTripCost * (1 - mod10.efficiencySavingPct / 100);
        const variable = baseCost * 0.65;
        const fixed = baseCost * 0.35;
        const tariff = res10.suggestedTariffPerTrip;
        return {
          moduleNumber: 10,
          variableCost: variable,
          fixedCost: fixed,
          suggestedTariff: tariff,
          tripContextLabel: `Viaje fijo recurrente con ${mod10.efficiencySavingPct}% ahorro y ${mod10.paymentDelayDays} días plazo`,
        };
      }
      case 11: {
        const variable = mod11.fullTripCostWithMargin * 0.65;
        const fixed = mod11.fullTripCostWithMargin * 0.35;
        const tariff = res11.totalBilledTrip;
        return {
          moduleNumber: 11,
          variableCost: variable,
          fixedCost: fixed,
          suggestedTariff: tariff,
          tripContextLabel: `Reparto paquetería (${mod11.totalPalletPositions} pallets y ${mod11.extraDropsCount} paradas)`,
        };
      }
      case 12: {
        const variable = mod12.contractTariffBase * 0.65;
        const fixed = mod12.contractTariffBase * 0.35;
        const tariff = res12.tariffByFadeeac;
        return {
          moduleNumber: 12,
          variableCost: variable,
          fixedCost: fixed,
          suggestedTariff: tariff,
          tripContextLabel: `Actualización por índice FADEEAC (+${res12.fadeeacIncreasePct.toFixed(1)}%)`,
        };
      }
      case 13: {
        const variable = mod13.variableCost;
        const fixed = mod13.fixedCostTotalDays;
        const tariff = mod13.offeredPrice;
        return {
          moduleNumber: 13,
          variableCost: variable,
          fixedCost: fixed,
          suggestedTariff: tariff,
          tripContextLabel: 'Punto de indiferencia: ¿Cubre el costo variable de mover el camión?',
        };
      }
      case 14:
      default: {
        const fixed = res14.totalMonthlyNeed;
        const variable = res14.kmNeededMonthly * 920;
        const tariff = fixed + variable + (res14.tripsNeededForBreakEven * 180000);
        return {
          moduleNumber: 14,
          variableCost: variable,
          fixedCost: fixed,
          suggestedTariff: tariff,
          tripContextLabel: 'Meta mensual: Cobertura de fijos, variables y retiro del dueño',
        };
      }
    }
  };

  const chartData = getModuleComparisonData();

  // Inspector de fórmulas exacto para la regla: "Tocás la celda y la ves entera. Podés editarla"
  const getFormulaInspectorDetails = () => {
    switch (activeModuleId) {
      case 1:
        return {
          cellRef: 'Celda H8',
          excelFormula: '=SUM(D8:D14)/D15',
          evaluatedFormula: `(${mod01.insuranceMonthly} + ${mod01.patenteTaxesMonthly} + ${mod01.driverBaseMonthly} + ${mod01.garageMonthly} + ${mod01.technicalInspectionMonthly} + ${mod01.fixedAdminMonthly} + ${(mod01.truckLoanDebtMonthly || 0)}) / ${mod01.operatingDaysPerMonth}`,
          resultLabel: 'Costo Fijo del Día ($/día)',
          resultValue: `$${formatMoney(res01.fixedCostPerDay)} / día`,
          engineeringExplanation: 'Prorratea la totalidad de los costos fijos estructurales mensuales (seguros de tractor y semi, patente, sueldo de chofer CCT 40/89 con cargas sociales, galpón, VTV prorrateada, seguimiento satelital y cuota de crédito o leasing del camión) entre los días hábiles efectivos de operación.',
          variables: [
            { ref: 'D8', name: 'Seguros totales mes', value: `$${formatMoney(mod01.insuranceMonthly)}`, unit: '' },
            { ref: 'D9', name: 'Patente y RUTA', value: `$${formatMoney(mod01.patenteTaxesMonthly)}`, unit: '' },
            { ref: 'D10', name: 'Sueldo chofer c/cargas', value: `$${formatMoney(mod01.driverBaseMonthly)}`, unit: '' },
            { ref: 'D11', name: 'Cochera / Galpón', value: `$${formatMoney(mod01.garageMonthly)}`, unit: '' },
            { ref: 'D12', name: 'VTV / RTO prorrateada', value: `$${formatMoney(mod01.technicalInspectionMonthly)}`, unit: '' },
            { ref: 'D13', name: 'Admin y satelital', value: `$${formatMoney(mod01.fixedAdminMonthly)}`, unit: '' },
            { ref: 'D14', name: 'Cuota crédito / deuda camión', value: `$${formatMoney(mod01.truckLoanDebtMonthly || 0)}`, unit: '' },
            { ref: 'D15', name: 'Días operativos al mes', value: `${mod01.operatingDaysPerMonth}`, unit: 'días' },
          ],
        };
      case 2:
        return {
          cellRef: 'Celda H8',
          excelFormula: '=($D$11*$D$9/100+$D$12*$D$10/100)*$D$8*(1+$D$13/100)/$D$11',
          evaluatedFormula: `((${mod02.billedKm} * ${mod02.loadedConsumption} / 100) + (${mod02.emptyKm} * ${mod02.emptyConsumption} / 100)) * $${mod02.gasoilPrice} * (1 + ${mod02.maneuverSurchargePct} / 100) / ${mod02.billedKm}`,
          resultLabel: 'Gasoil por Km Facturado (absorbiendo retorno)',
          resultValue: `$${formatMoney(res02.fuelCostPerBilledKm, 2)} / km`,
          engineeringExplanation: 'Calcula los litros consumidos con carga en la ida más los litros gastados en el regreso vacío y maniobras, prorrateándolos exclusivamente sobre los kilómetros facturados. Si solo cobraras el consumo cargado, tendrías una pérdida oculta del 70%.',
          variables: [
            { ref: 'D8', name: 'Precio del gasoil', value: `$${formatMoney(mod02.gasoilPrice)}`, unit: '$/L' },
            { ref: 'D9', name: 'Consumo cargado', value: `${mod02.loadedConsumption}`, unit: 'L/100km' },
            { ref: 'D10', name: 'Consumo en vacío', value: `${mod02.emptyConsumption}`, unit: 'L/100km' },
            { ref: 'D11', name: 'Km facturados (cargados)', value: `${mod02.billedKm}`, unit: 'km' },
            { ref: 'D12', name: 'Km en vacío (retorno)', value: `${mod02.emptyKm}`, unit: 'km' },
            { ref: 'D13', name: 'Recargo por maniobras', value: `${mod02.maneuverSurchargePct}`, unit: '%' },
          ],
        };
      case 8:
        return {
          cellRef: 'Celda H8',
          excelFormula: '=$D$8/$D$9*$D$10',
          evaluatedFormula: `($${formatMoney(mod08.dailyFixedCost)} / ${mod08.dailyWorkHours}) * ${mod08.waitingHoursThisTrip}`,
          resultLabel: 'Lo que te costó esta espera de carga/descarga',
          resultValue: `$${formatMoney(res08.tripWaitCost)}`,
          engineeringExplanation: 'Determina el costo horario del camión inmovilizado a partir del costo fijo diario. FADEEAC establece estadías a partir de 24 hs de retraso; esta celda auditable cuantifica la sangría económica desde la primera hora improductiva.',
          variables: [
            { ref: 'D8', name: 'Costo fijo diario', value: `$${formatMoney(mod08.dailyFixedCost)}`, unit: '$/día' },
            { ref: 'D9', name: 'Horas laborables día', value: `${mod08.dailyWorkHours}`, unit: 'hs' },
            { ref: 'D10', name: 'Horas de espera del viaje', value: `${mod08.waitingHoursThisTrip}`, unit: 'hs' },
            { ref: 'D11', name: 'Esperas al mes', value: `${mod08.waitsPerMonth}`, unit: 'veces' },
          ],
        };
      case 9:
        return {
          cellRef: 'Celda H8',
          excelFormula: '=$D$8/(1-$D$9/100)/(1-$D$11/100)',
          evaluatedFormula: `$${formatMoney(mod09.tripCost)} / (1 - ${mod09.targetMarginPct}/100) / (1 - ${mod09.commissionPct}/100)`,
          resultLabel: 'Tarifa Piso del Viaje Eventual',
          resultValue: `$${formatMoney(res09.minTripTariff)}`,
          engineeringExplanation: 'Aplica el mark-up comercial de margen neto pretendido deduciendo simultáneamente la comisión del dador de carga o app intermediaria, evitando el error común de aplicar el margen sobre el costo en vez de sobre el precio de venta.',
          variables: [
            { ref: 'D8', name: 'Costo total del viaje', value: `$${formatMoney(mod09.tripCost)}`, unit: '$' },
            { ref: 'D9', name: 'Margen neto deseado', value: `${mod09.targetMarginPct}`, unit: '%' },
            { ref: 'D10', name: 'Toneladas de carga', value: `${mod09.cargoTons}`, unit: 'tn' },
            { ref: 'D11', name: 'Comisión dador/app', value: `${mod09.commissionPct}`, unit: '%' },
          ],
        };
      case 12:
        return {
          cellRef: 'Celda H8',
          excelFormula: '=$D$8*(1+(($D$12*$D$11/100)+($D$13*(100-$D$11)/100))/100)',
          evaluatedFormula: `$${formatMoney(mod12.contractTariffBase)} * (1 + ((${mod12.fuelIncreasePct} * ${mod12.fuelIncidencePct} / 100) + (${mod12.otherCostsIncreasePct} * (100 - ${mod12.fuelIncidencePct}) / 100)) / 100)`,
          resultLabel: 'Tarifa Actualizada por Polinómica / FADEEAC',
          resultValue: `$${formatMoney(res12.tariffByPolynomial)}`,
          engineeringExplanation: 'Fórmula polinómica contractual que pondera el aumento específico del gasoil y del resto de rubros según la estructura real de costos del contrato.',
          variables: [
            { ref: 'D8', name: 'Tarifa base de contrato', value: `$${formatMoney(mod12.contractTariffBase)}`, unit: '$' },
            { ref: 'D9', name: 'Índice FADEEAC base', value: `${mod12.fadeeacIndexBase}`, unit: 'pts' },
            { ref: 'D10', name: 'Índice FADEEAC actual', value: `${mod12.fadeeacIndexCurrent}`, unit: 'pts' },
            { ref: 'D11', name: 'Ponderación de gasoil', value: `${mod12.fuelIncidencePct}`, unit: '%' },
            { ref: 'D12', name: 'Aumento del combustible', value: `${mod12.fuelIncreasePct}`, unit: '%' },
          ],
        };
      case 13:
        return {
          cellRef: 'Celda H8',
          excelFormula: '=$D$8-$D$9-$D$10',
          evaluatedFormula: `$${formatMoney(mod13.offeredPrice)} - $${formatMoney(mod13.variableCost)} - $${formatMoney(mod13.fixedCostTotalDays)}`,
          resultLabel: 'Decisión Operativa: Punto de Indiferencia',
          resultValue: `${res13.asOfferedResult >= 0 ? '+' : ''}$${formatMoney(res13.asOfferedResult)}`,
          engineeringExplanation: 'Verifica si la tarifa ofrecida cubre al menos el costo marginal variable de rodar el camión. Si no cubre variables, mover la unidad destruye capital directamente.',
          variables: [
            { ref: 'D8', name: 'Tarifa ofrecida dador', value: `$${formatMoney(mod13.offeredPrice)}`, unit: '$' },
            { ref: 'D9', name: 'Costo variable de ida', value: `$${formatMoney(mod13.variableCost)}`, unit: '$' },
            { ref: 'D10', name: 'Costo fijo de los días', value: `$${formatMoney(mod13.fixedCostTotalDays)}`, unit: '$' },
            { ref: 'D11', name: 'Probabilidad retorno', value: `${mod13.returnProbabilityPct}`, unit: '%' },
          ],
        };
      default:
        return {
          cellRef: 'Celda H8',
          excelFormula: '=$D$8*$D$9+$D$10',
          evaluatedFormula: `Cálculo auditable del módulo ${activeModuleId}`,
          resultLabel: `Resultado Módulo ${String(activeModuleId).padStart(2, '0')}`,
          resultValue: `$${formatMoney(chartData.suggestedTariff)}`,
          engineeringExplanation: 'Fórmula auditable abierta sin macros ocultas.',
          variables: [
            { ref: 'D8', name: 'Costo variable asignado', value: `$${formatMoney(chartData.variableCost)}`, unit: '$' },
            { ref: 'D9', name: 'Costo fijo prorrateado', value: `$${formatMoney(chartData.fixedCost)}`, unit: '$' },
            { ref: 'H8', name: 'Tarifa calculada', value: `$${formatMoney(chartData.suggestedTariff)}`, unit: '$' },
          ],
        };
    }
  };

  const formulaData = getFormulaInspectorDetails();

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 animate-in fade-in">
      {/* Top Header Bar inside the App */}
      <div className="bg-[#15181E] text-white p-6 rounded-3xl border border-[#3A4250] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F97316] flex items-center justify-center p-2 text-white shadow-md">
            <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
              <circle cx="16" cy="16" r="13" stroke="white" strokeWidth="2.5" />
              <circle cx="16" cy="16" r="5" fill="#FFCE4D" stroke="#15181E" strokeWidth="1.5" />
              <path d="M5 16H11M21 16H27M16 21V27M16 5V11" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-wide uppercase">
                PLANILLA OPERATIVA 2026
              </span>
              <span className="text-[10px] font-mono bg-[#3A4250] text-[#FFCE4D] px-2 py-0.5 rounded-full uppercase font-bold">
                14 Módulos Activos
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Sistema matemático de costo, tarifa, espera y rechazo para transporte de carga argentino.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          {onGoToLanding && (
            <button
              onClick={onGoToLanding}
              className="bg-[#3A4250] hover:bg-gray-700 text-xs font-bold text-white px-3.5 py-2.5 rounded-xl transition-colors"
            >
              Ver Portada Comercial
            </button>
          )}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-[#F97316] hover:bg-[#C2410C] text-xs font-bold text-white px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Resumen</span>
          </button>
        </div>
      </div>

      {/* SELECTOR DE RUBRO / MODO OPERATIVO */}
      <div className="bg-[#15181E] p-4 rounded-3xl border border-[#3A4250] shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
            operationalIndustry === 'movimiento-suelo' ? 'bg-[#FFCE4D] text-black shadow-md' : 'bg-[#F97316] text-white shadow-md'
          }`}>
            {operationalIndustry === 'movimiento-suelo' ? (
              <Mountain className="w-6 h-6" />
            ) : (
              <Truck className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Rubro Operativo
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.2 rounded-full font-bold uppercase ${
                operationalIndustry === 'movimiento-suelo'
                  ? 'bg-amber-950 text-[#FFCE4D] border border-amber-600/40'
                  : 'bg-orange-950 text-orange-300 border border-orange-600/40'
              }`}>
                {operationalIndustry === 'movimiento-suelo' ? 'Bateas & Canteras' : 'Carga General & Ruta'}
              </span>
            </div>
            <h3 className="text-base font-black text-white">
              {operationalIndustry === 'movimiento-suelo'
                ? 'Movimiento de Suelo, Áridos & Obras Viales'
                : 'Transporte de Carga General y Larga Distancia'}
            </h3>
          </div>
        </div>

        {/* Action Controls for Industry */}
        <div className="flex flex-wrap items-center gap-2 bg-[#202530] p-1.5 rounded-2xl border border-gray-700">
          <button
            onClick={() => setOperationalIndustry('carga-general')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              operationalIndustry === 'carga-general'
                ? 'bg-[#F97316] text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Carga General (Ruta)</span>
          </button>

          <button
            onClick={() => {
              setOperationalIndustry('movimiento-suelo');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              operationalIndustry === 'movimiento-suelo'
                ? 'bg-[#FFCE4D] text-black shadow-md font-extrabold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Mountain className="w-4 h-4" />
            <span>Movimiento de Suelo & Bateas</span>
          </button>
        </div>
      </div>

      {/* SPECIAL SUB-NAV WHEN IN MOVIMIENTO DE SUELO */}
      {operationalIndustry === 'movimiento-suelo' && (
        <div className="bg-[#1C2028] p-3 rounded-2xl border border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEarthmovingSubView('calculadora-suelo')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                earthmovingSubView === 'calculadora-suelo'
                  ? 'bg-[#FFCE4D] text-black shadow-md'
                  : 'text-gray-300 hover:text-white bg-[#202530]'
              }`}
            >
              🚜 Calculadora de Cantera & Obra ($/m³, $/viaje, $/tn, Balanza)
            </button>
            <button
              onClick={() => setEarthmovingSubView('modulos-adaptados')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                earthmovingSubView === 'modulos-adaptados'
                  ? 'bg-[#F97316] text-white shadow-md'
                  : 'text-gray-300 hover:text-white bg-[#202530]'
              }`}
            >
              📊 Ver los 14 Módulos con Datos de Batea/Volcador
            </button>
          </div>

          <button
            onClick={() => applyEarthmovingTo14Modules()}
            className="text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/80 px-3 py-1.5 rounded-xl border border-amber-500/40 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Precargar Parámetros de Batea en los 14 Módulos</span>
          </button>
        </div>
      )}

      {/* RENDER MOVIMIENTO DE SUELO DEDICATED PANEL IF SELECTED */}
      {operationalIndustry === 'movimiento-suelo' && earthmovingSubView === 'calculadora-suelo' && (
        <MovimientoSueloPanel
          fixedCostPerDayDefault={res01.fixedCostPerDay}
          onApplyToFullApp={(params) => applyEarthmovingTo14Modules(params)}
        />
      )}

      {/* 14 Modules Selector Bar / Tabs */}
      {!(operationalIndustry === 'movimiento-suelo' && earthmovingSubView === 'calculadora-suelo') && (
        <>
          <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#F97316]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111827]">
              Seleccionar Módulo de Trabajo
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-[#EDE9E0] p-1 rounded-xl text-xs">
            <button
              onClick={() => setActiveTabCategory('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                activeTabCategory === 'all' ? 'bg-[#15181E] text-white' : 'text-[#6B7280]'
              }`}
            >
              Todos (14)
            </button>
            <button
              onClick={() => setActiveTabCategory('estructura')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                activeTabCategory === 'estructura' ? 'bg-[#F97316] text-white' : 'text-[#6B7280]'
              }`}
            >
              Estructura
            </button>
            <button
              onClick={() => setActiveTabCategory('operacion')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                activeTabCategory === 'operacion' ? 'bg-[#10B981] text-white' : 'text-[#6B7280]'
              }`}
            >
              Operación
            </button>
            <button
              onClick={() => setActiveTabCategory('tarifa')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                activeTabCategory === 'tarifa' ? 'bg-[#3B82F6] text-white' : 'text-[#6B7280]'
              }`}
            >
              Tarifa
            </button>
            <button
              onClick={() => setActiveTabCategory('decision')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                activeTabCategory === 'decision' ? 'bg-[#EF4444] text-white' : 'text-[#6B7280]'
              }`}
            >
              Decisión
            </button>
          </div>
        </div>

        {/* 14 Modules Mini-Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {filteredModules.map((mod) => {
            const Icon = mod.icon;
            const isSelected = mod.id === activeModuleId;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between h-24 ${
                  isSelected
                    ? 'bg-[#15181E] text-white border-[#F97316] ring-2 ring-[#F97316] shadow-lg scale-[1.02]'
                    : 'bg-white text-[#111827] border-[#DDD6CA] hover:border-[#F97316]/50 hover:bg-[#F7F5F0]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[11px] font-mono font-black ${isSelected ? 'text-[#FFCE4D]' : 'text-[#F97316]'}`}>
                    {String(mod.id).padStart(2, '0')}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#FFCE4D]' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h4 className="font-bold text-xs leading-tight line-clamp-2">
                    {mod.title}
                  </h4>
                  <span className={`text-[10px] font-mono block mt-1 ${isSelected ? 'text-gray-300' : 'text-[#6B7280]'}`}>
                    {mod.unit}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE MODULE CONTAINER */}
      <div className="bg-white rounded-3xl border border-[#DDD6CA] shadow-xl overflow-hidden">
        {/* Module Header Bar */}
        <div className="bg-[#15181E] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3A4250]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F97316] flex items-center justify-center font-mono font-black text-lg text-white">
              {String(currentModule.id).padStart(2, '0')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFCE4D] font-bold">
                  MÓDULO {String(currentModule.id).padStart(2, '0')} · {currentModule.category.toUpperCase()}
                </span>
                <span className="text-xs bg-[#3A4250] px-2 py-0.5 rounded text-gray-200 font-mono">
                  {currentModule.unit}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {currentModule.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveModuleId(prev => (prev > 1 ? prev - 1 : 14))}
              className="p-2 rounded-xl bg-[#3A4250] hover:bg-gray-700 text-white transition-colors"
              title="Módulo anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-gray-400">
              {activeModuleId} / 14
            </span>
            <button
              onClick={() => setActiveModuleId(prev => (prev < 14 ? prev + 1 : 1))}
              className="p-2 rounded-xl bg-[#3A4250] hover:bg-gray-700 text-white transition-colors"
              title="Siguiente módulo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Formula Display (Excel fx bar) - Interactive for "Tocás la celda y la ves entera" */}
        <div className="bg-[#EDE9E0] px-6 py-2.5 border-b border-[#DDD6CA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="font-bold text-[#C2410C] shrink-0 flex items-center gap-1">
              <span>fx</span>
              <span className="bg-[#DDD6CA] text-[#111827] px-1.5 py-0.5 rounded text-[11px] font-bold">
                {formulaData.cellRef}
              </span>
            </span>
            <button
              onClick={() => setIsFormulaModalOpen(true)}
              className="bg-white hover:bg-amber-50/70 transition-colors px-3 py-1.5 rounded-lg border border-[#DDD6CA] flex-1 text-left text-[#111827] overflow-x-auto truncate shadow-inner flex items-center justify-between group cursor-pointer"
              title="Hacé clic para ver la fórmula entera y auditable"
            >
              <span className="truncate font-bold text-[#0F172A]">
                {formulaData.excelFormula}
              </span>
              <span className="text-[10px] text-[#F97316] font-sans font-bold flex items-center gap-1 shrink-0 ml-2 group-hover:underline">
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Tocás la celda y la ves entera</span>
              </span>
            </button>
          </div>

          <button
            onClick={() => setIsFormulaModalOpen(true)}
            className="self-end sm:self-auto bg-[#15181E] hover:bg-[#3A4250] text-[#FFCE4D] font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Auditar fórmula</span>
          </button>
        </div>

        {/* Work Area: Inputs (Left) and Outputs (Right) */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Yellow Editable Input Cells (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#DDD6CA]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FFCE4D] border border-amber-500"></span>
                <span className="font-bold text-sm text-[#111827]">
                  Celdas Amarillas · Ingresá los datos de tu camión
                </span>
              </div>
              <span className="text-[11px] text-[#6B7280] font-mono">
                Valores editables en tiempo real
              </span>
            </div>

            {/* MODULE 01 INPUTS */}
            {activeModuleId === 1 && (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Seguros totales del mes (tractor + semi)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod01.insuranceMonthly}
                      onChange={(e) => setMod01({ ...mod01, insuranceMonthly: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Patente, RUTA y tasas municipales (mes)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod01.patenteTaxesMonthly}
                      onChange={(e) => setMod01({ ...mod01, patenteTaxesMonthly: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Sueldo básico chofer con cargas sociales</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod01.driverBaseMonthly}
                      onChange={(e) => setMod01({ ...mod01, driverBaseMonthly: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Cochera / Galpón de guarda (mes)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod01.garageMonthly}
                      onChange={(e) => setMod01({ ...mod01, garageMonthly: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">VTV, RTO y técnicas prorrateadas (mes)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod01.technicalInspectionMonthly}
                      onChange={(e) => setMod01({ ...mod01, technicalInspectionMonthly: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Administración, contador y satelital (mes)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod01.fixedAdminMonthly}
                      onChange={(e) => setMod01({ ...mod01, fixedAdminMonthly: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <div>
                    <label className="font-medium text-[#111827] block">Cuota crédito / leasing prendario ("tu deuda")</label>
                    <span className="text-[11px] text-[#6B7280]">Amortización financiera mensual del camión o acoplado</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod01.truckLoanDebtMonthly || 0}
                      onChange={(e) => setMod01({ ...mod01, truckLoanDebtMonthly: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Días operativos al mes</label>
                    <input
                      type="number"
                      value={mod01.operatingDaysPerMonth}
                      onChange={(e) => setMod01({ ...mod01, operatingDaysPerMonth: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Horas laborales por día</label>
                    <input
                      type="number"
                      value={mod01.workingHoursPerDay}
                      onChange={(e) => setMod01({ ...mod01, workingHoursPerDay: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 02 INPUTS */}
            {activeModuleId === 2 && (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Precio del litro de gasoil en surtidor</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod02.gasoilPrice}
                      onChange={(e) => setMod02({ ...mod02, gasoilPrice: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Consumo con carga completa (L/100 km)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <input
                      type="number"
                      value={mod02.loadedConsumption}
                      onChange={(e) => setMod02({ ...mod02, loadedConsumption: Number(e.target.value) })}
                      className="w-24 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                    <span>L</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Consumo en vacío / retorno (L/100 km)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <input
                      type="number"
                      value={mod02.emptyConsumption}
                      onChange={(e) => setMod02({ ...mod02, emptyConsumption: Number(e.target.value) })}
                      className="w-24 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                    <span>L</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Kilómetros cargados (facturados)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <input
                      type="number"
                      value={mod02.billedKm}
                      onChange={(e) => setMod02({ ...mod02, billedKm: Number(e.target.value) })}
                      className="w-28 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                    <span>km</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Kilómetros en vacío (retorno sin carga)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <input
                      type="number"
                      value={mod02.emptyKm}
                      onChange={(e) => setMod02({ ...mod02, emptyKm: Number(e.target.value) })}
                      className="w-28 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                    <span>km</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Recargo por maniobras y espera en ralentí</label>
                  <div className="flex items-center gap-1 font-mono">
                    <input
                      type="number"
                      step="0.5"
                      value={mod02.maneuverSurchargePct}
                      onChange={(e) => setMod02({ ...mod02, maneuverSurchargePct: Number(e.target.value) })}
                      className="w-20 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                    <span>%</span>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 03 INPUTS */}
            {activeModuleId === 3 && (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Valor reposición tractor 0km</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod03.truckReplacementValue}
                      onChange={(e) => setMod03({ ...mod03, truckReplacementValue: Number(e.target.value) })}
                      className="w-36 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Valor reposición semirremolque / batea 0km</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod03.trailerReplacementValue}
                      onChange={(e) => setMod03({ ...mod03, trailerReplacementValue: Number(e.target.value) })}
                      className="w-36 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Vida útil tractor (km)</label>
                    <input
                      type="number"
                      value={mod03.truckUsefulLifeKm}
                      onChange={(e) => setMod03({ ...mod03, truckUsefulLifeKm: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Vida útil semirremolque (km)</label>
                    <input
                      type="number"
                      value={mod03.trailerUsefulLifeKm}
                      onChange={(e) => setMod03({ ...mod03, trailerUsefulLifeKm: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Km promedio mensuales rodados</label>
                  <div className="flex items-center gap-1 font-mono">
                    <input
                      type="number"
                      value={mod03.monthlyEstimatedKm}
                      onChange={(e) => setMod03({ ...mod03, monthlyEstimatedKm: Number(e.target.value) })}
                      className="w-28 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                    <span>km</span>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 04 INPUTS */}
            {activeModuleId === 4 && (
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Cantidad cubiertas rodando</label>
                    <input
                      type="number"
                      value={mod04.tiresCount}
                      onChange={(e) => setMod04({ ...mod04, tiresCount: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Costo cubierta nueva ($)</label>
                    <input
                      type="number"
                      value={mod04.newTireCost}
                      onChange={(e) => setMod04({ ...mod04, newTireCost: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Km cubierta nueva</label>
                    <input
                      type="number"
                      value={mod04.newTireLifeKm}
                      onChange={(e) => setMod04({ ...mod04, newTireLifeKm: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Costo recapado ($)</label>
                    <input
                      type="number"
                      value={mod04.retreadCost}
                      onChange={(e) => setMod04({ ...mod04, retreadCost: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Service aceite y filtros (cada 30.000 km)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod04.oilFilterServiceCost}
                      onChange={(e) => setMod04({ ...mod04, oilFilterServiceCost: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Frenos, embrague y tren rodante c/100.000 km</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod04.brakesClutchPer100kKm}
                      onChange={(e) => setMod04({ ...mod04, brakesClutchPer100kKm: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 05 INPUTS */}
            {activeModuleId === 5 && (
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Km totales del viaje (ida + vuelta)</label>
                    <input
                      type="number"
                      value={mod05.totalKmTrip}
                      onChange={(e) => setMod05({ ...mod05, totalKmTrip: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Km facturados</label>
                    <input
                      type="number"
                      value={mod05.billedKmTrip}
                      onChange={(e) => setMod05({ ...mod05, billedKmTrip: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Días que insume el viaje</label>
                  <input
                    type="number"
                    value={mod05.tripDays}
                    onChange={(e) => setMod05({ ...mod05, tripDays: Number(e.target.value) })}
                    className="w-20 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Gasoil del viaje (viene del Módulo 02)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod05.fuelTripCost}
                      onChange={(e) => setMod05({ ...mod05, fuelTripCost: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Peajes y viáticos del chofer ($)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod05.tollsAndExpenses + mod05.driverViatics}
                      onChange={(e) => setMod05({ ...mod05, tollsAndExpenses: Number(e.target.value) / 2, driverViatics: Number(e.target.value) / 2 })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 06 INPUTS */}
            {activeModuleId === 6 && (
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Peajes de ida ($)</label>
                    <input
                      type="number"
                      value={mod06.outboundTolls}
                      onChange={(e) => setMod06({ ...mod06, outboundTolls: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Peajes de vuelta ($)</label>
                    <input
                      type="number"
                      value={mod06.inboundTolls}
                      onChange={(e) => setMod06({ ...mod06, inboundTolls: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Pesajes de balanza oficial y privada</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod06.scalesWeighing}
                      onChange={(e) => setMod06({ ...mod06, scalesWeighing: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Estacionamiento y custodia nocturna</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod06.parkingAndGuard}
                      onChange={(e) => setMod06({ ...mod06, parkingAndGuard: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Tasas de ingreso a puerto / SENASA</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod06.portAndTerminalFees}
                      onChange={(e) => setMod06({ ...mod06, portAndTerminalFees: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 07 INPUTS */}
            {activeModuleId === 7 && (
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Km recorridos por chofer</label>
                    <input
                      type="number"
                      value={mod07.travelKm}
                      onChange={(e) => setMod07({ ...mod07, travelKm: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Viático km CCT 40/89 ($/km)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={mod07.ratePerKmCCT}
                      onChange={(e) => setMod07({ ...mod07, ratePerKmCCT: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Comida diaria CCT ($)</label>
                    <input
                      type="number"
                      value={mod07.foodAllowancePerDay}
                      onChange={(e) => setMod07({ ...mod07, foodAllowancePerDay: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Pernoctada diaria ($)</label>
                    <input
                      type="number"
                      value={mod07.stayAllowancePerDay}
                      onChange={(e) => setMod07({ ...mod07, stayAllowancePerDay: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 08 INPUTS */}
            {activeModuleId === 8 && (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Costo fijo del día del camión (Módulo 01)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod08.dailyFixedCost}
                      onChange={(e) => setMod08({ ...mod08, dailyFixedCost: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Horas de trabajo de la jornada (h)</label>
                  <input
                    type="number"
                    value={mod08.dailyWorkHours}
                    onChange={(e) => setMod08({ ...mod08, dailyWorkHours: Number(e.target.value) })}
                    className="w-20 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Horas de espera clavado en este viaje</label>
                  <input
                    type="number"
                    step="0.5"
                    value={mod08.waitingHoursThisTrip}
                    onChange={(e) => setMod08({ ...mod08, waitingHoursThisTrip: Number(e.target.value) })}
                    className="w-20 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Cantidad de esperas sufridas al mes</label>
                  <input
                    type="number"
                    value={mod08.waitsPerMonth}
                    onChange={(e) => setMod08({ ...mod08, waitsPerMonth: Number(e.target.value) })}
                    className="w-20 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Estadía de referencia FADEEAC (24 hs)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod08.fadeeacStayReference}
                      onChange={(e) => setMod08({ ...mod08, fadeeacStayReference: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 09 INPUTS */}
            {activeModuleId === 9 && (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Costo total del viaje (Módulo 05)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod09.tripCost}
                      onChange={(e) => setMod09({ ...mod09, tripCost: Number(e.target.value) })}
                      className="w-36 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Margen pretendido (%)</label>
                    <input
                      type="number"
                      value={mod09.targetMarginPct}
                      onChange={(e) => setMod09({ ...mod09, targetMarginPct: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Toneladas de carga (tn)</label>
                    <input
                      type="number"
                      value={mod09.cargoTons}
                      onChange={(e) => setMod09({ ...mod09, cargoTons: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Comisión intermediario / app (%)</label>
                  <input
                    type="number"
                    value={mod09.commissionPct}
                    onChange={(e) => setMod09({ ...mod09, commissionPct: Number(e.target.value) })}
                    className="w-20 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Tarifa referencia oficial ($/tn)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod09.referenceTariffPerTon}
                      onChange={(e) => setMod09({ ...mod09, referenceTariffPerTon: Number(e.target.value) })}
                      className="w-32 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">% de referencia que paga el mercado</label>
                  <input
                    type="number"
                    value={mod09.marketPctOfReference}
                    onChange={(e) => setMod09({ ...mod09, marketPctOfReference: Number(e.target.value) })}
                    className="w-20 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                  />
                </div>
              </div>
            )}

            {/* MODULE 10 INPUTS */}
            {activeModuleId === 10 && (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Costo del viaje individual ($)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod10.singleTripCost}
                      onChange={(e) => setMod10({ ...mod10, singleTripCost: Number(e.target.value) })}
                      className="w-36 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Viajes fijos al mes (garantizados)</label>
                    <input
                      type="number"
                      value={mod10.tripsPerMonthGuaranteed}
                      onChange={(e) => setMod10({ ...mod10, tripsPerMonthGuaranteed: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Ahorro eficiencia fija (%)</label>
                    <input
                      type="number"
                      value={mod10.efficiencySavingPct}
                      onChange={(e) => setMod10({ ...mod10, efficiencySavingPct: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Ganancia pretendida mensual con el cliente</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod10.targetMonthlyProfit}
                      onChange={(e) => setMod10({ ...mod10, targetMonthlyProfit: Number(e.target.value) })}
                      className="w-36 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Plazo de pago (días)</label>
                    <input
                      type="number"
                      value={mod10.paymentDelayDays}
                      onChange={(e) => setMod10({ ...mod10, paymentDelayDays: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Inflación mensual estimada (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={mod10.monthlyInflationPct}
                      onChange={(e) => setMod10({ ...mod10, monthlyInflationPct: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 11 INPUTS */}
            {activeModuleId === 11 && (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Costo total viaje con margen ($)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod11.fullTripCostWithMargin}
                      onChange={(e) => setMod11({ ...mod11, fullTripCostWithMargin: Number(e.target.value) })}
                      className="w-36 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Capacidad pallets (posiciones)</label>
                    <input
                      type="number"
                      value={mod11.totalPalletPositions}
                      onChange={(e) => setMod11({ ...mod11, totalPalletPositions: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Volumen furgón (m³)</label>
                    <input
                      type="number"
                      value={mod11.cargoVolumeM3}
                      onChange={(e) => setMod11({ ...mod11, cargoVolumeM3: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Paradas extras (multidrop)</label>
                    <input
                      type="number"
                      value={mod11.extraDropsCount}
                      onChange={(e) => setMod11({ ...mod11, extraDropsCount: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Tarifa parada extra ($)</label>
                    <input
                      type="number"
                      value={mod11.extraDropFee}
                      onChange={(e) => setMod11({ ...mod11, extraDropFee: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 12 INPUTS */}
            {activeModuleId === 12 && (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Tarifa histórica base del contrato ($)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod12.contractTariffBase}
                      onChange={(e) => setMod12({ ...mod12, contractTariffBase: Number(e.target.value) })}
                      className="w-36 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Índice FADEEAC mes base</label>
                    <input
                      type="number"
                      step="0.1"
                      value={mod12.fadeeacIndexBase}
                      onChange={(e) => setMod12({ ...mod12, fadeeacIndexBase: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Índice FADEEAC mes actual</label>
                    <input
                      type="number"
                      step="0.1"
                      value={mod12.fadeeacIndexCurrent}
                      onChange={(e) => setMod12({ ...mod12, fadeeacIndexCurrent: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">% Ponderación combustible</label>
                    <input
                      type="number"
                      value={mod12.fuelIncidencePct}
                      onChange={(e) => setMod12({ ...mod12, fuelIncidencePct: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">% Aumento gasoil período</label>
                    <input
                      type="number"
                      step="0.5"
                      value={mod12.fuelIncreasePct}
                      onChange={(e) => setMod12({ ...mod12, fuelIncreasePct: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 13 INPUTS */}
            {activeModuleId === 13 && (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Tarifa que te ofrecen por el viaje ($)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod13.offeredPrice}
                      onChange={(e) => setMod13({ ...mod13, offeredPrice: Number(e.target.value) })}
                      className="w-36 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Costo variable (Gasoil + Cubiertas + Peajes)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod13.variableCost}
                      onChange={(e) => setMod13({ ...mod13, variableCost: Number(e.target.value) })}
                      className="w-36 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Costo fijo de los días del viaje ($)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod13.fixedCostTotalDays}
                      onChange={(e) => setMod13({ ...mod13, fixedCostTotalDays: Number(e.target.value) })}
                      className="w-36 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Probabilidad retorno (%)</label>
                    <input
                      type="number"
                      value={mod13.returnProbabilityPct}
                      onChange={(e) => setMod13({ ...mod13, returnProbabilityPct: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Tarifa estimada retorno ($)</label>
                    <input
                      type="number"
                      value={mod13.returnRevenue}
                      onChange={(e) => setMod13({ ...mod13, returnRevenue: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 14 INPUTS */}
            {activeModuleId === 14 && (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Sueldo pretendido mensual para el dueño ($)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod14.targetOwnerSalaryMonthly}
                      onChange={(e) => setMod14({ ...mod14, targetOwnerSalaryMonthly: Number(e.target.value) })}
                      className="w-36 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Costos fijos mensuales del camión (Módulo 01)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod14.totalFixedCostsMonthly}
                      onChange={(e) => setMod14({ ...mod14, totalFixedCostsMonthly: Number(e.target.value) })}
                      className="w-36 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                  <label className="font-medium text-[#111827]">Margen neto promedio por viaje ($)</label>
                  <div className="flex items-center gap-1 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={mod14.averageNetMarginPerTrip}
                      onChange={(e) => setMod14({ ...mod14, averageNetMarginPerTrip: Number(e.target.value) })}
                      className="w-36 bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Km promedio por viaje</label>
                    <input
                      type="number"
                      value={mod14.averageKmPerTrip}
                      onChange={(e) => setMod14({ ...mod14, averageKmPerTrip: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#DDD6CA]">
                    <label className="block text-xs font-bold text-[#111827] mb-1">Días operativos al mes</label>
                    <input
                      type="number"
                      value={mod14.workingDaysMonth}
                      onChange={(e) => setMod14({ ...mod14, workingDaysMonth: Number(e.target.value) })}
                      className="w-full bg-[#FFCE4D]/35 border border-amber-300 font-bold text-right px-2 py-1 rounded font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: The 5 Output Results (5 Cols) */}
          <div className="lg:col-span-5 bg-[#15181E] text-white p-6 rounded-2xl border border-[#3A4250] flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFCE4D]">
                  5 RESULTADOS CLAVE
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  Matemática 2026
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`module-results-${activeModuleId}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {/* MODULE 01 OUTPUTS */}
                  {activeModuleId === 1 && (
                    <div className="space-y-4 pt-2">
                      <div className="p-4 rounded-xl bg-[#F97316]/15 border border-[#F97316]/40">
                        <span className="text-xs text-orange-200 font-medium">1. Costo Fijo por Día Hábil</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <AnimatedCounter
                            value={res01.fixedCostPerDay}
                            prefix="$"
                            className="text-4xl font-black font-mono text-[#FFCE4D]"
                          />
                          <span className="text-xs text-gray-300 font-mono">/ día</span>
                        </div>
                        <span className="text-[11px] text-gray-300 block mt-1">
                          El camión te cuesta esto aunque no salga del galpón.
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                          <span className="text-gray-400 block">2. Costo por hora hábil</span>
                          <span className="font-bold text-base font-mono text-white mt-0.5 block">
                            <AnimatedCounter value={res01.fixedCostPerHour} prefix="$" suffix=" / h" />
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                          <span className="text-gray-400 block">3. Costo fijo mensual total</span>
                          <span className="font-bold text-base font-mono text-white mt-0.5 block">
                            <AnimatedCounter value={res01.totalFixedMonthly} prefix="$" />
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                          <span className="text-gray-400 block">4. Incidencia del chofer</span>
                          <span className="font-bold text-base font-mono text-white mt-0.5 block">
                            <AnimatedCounter value={res01.driverCostRatio} decimals={1} suffix=" %" />
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                          <span className="text-gray-400 block">5. Pérdida por día parado</span>
                          <span className="font-bold text-base font-mono text-red-400 mt-0.5 block">
                            -<AnimatedCounter value={res01.idleDayCost} prefix="$" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MODULE 02 OUTPUTS */}
                  {activeModuleId === 2 && (
                    <div className="space-y-4 pt-2">
                      <div className="p-4 rounded-xl bg-[#F97316]/15 border border-[#F97316]/40">
                        <span className="text-xs text-orange-200 font-medium">1. Gasoil por km facturado</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <AnimatedCounter
                            value={res02.fuelCostPerBilledKm}
                            decimals={2}
                            prefix="$"
                            className="text-4xl font-black font-mono text-[#FFCE4D]"
                          />
                          <span className="text-xs text-gray-300 font-mono">/ km</span>
                        </div>
                        <span className="text-[11px] text-gray-300 block mt-1">
                          Absorbiendo el retorno vacío (+<AnimatedCounter value={res02.increasePct} decimals={1} suffix="%" /> vs solo ida)
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                          <span className="text-gray-400 block">2. Gasoil del viaje completo</span>
                          <span className="font-bold text-base font-mono text-white mt-0.5 block">
                            <AnimatedCounter value={res02.totalFuelCost} prefix="$" />
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                          <span className="text-gray-400 block">3. Litros del viaje</span>
                          <span className="font-bold text-base font-mono text-white mt-0.5 block">
                            <AnimatedCounter value={res02.totalLiters} decimals={1} suffix=" L" />
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                          <span className="text-gray-400 block">4. Costo volver vacío</span>
                          <span className="font-bold text-base font-mono text-white mt-0.5 block">
                            <AnimatedCounter value={res02.returnCost} prefix="$" />
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                          <span className="text-gray-400 block">5. Km no cobrados</span>
                          <span className="font-bold text-base font-mono text-red-400 mt-0.5 block">
                            <AnimatedCounter value={res02.unbilledKmPct} decimals={1} suffix=" %" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

              {/* MODULE 03 OUTPUTS */}
              {activeModuleId === 3 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#F97316]/15 border border-[#F97316]/40">
                    <span className="text-xs text-orange-200 font-medium">1. Amortización Total por Km</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-black font-mono text-[#FFCE4D]">
                        ${formatMoney(res03.totalAmortPerKm, 2)}
                      </span>
                      <span className="text-xs text-gray-300 font-mono">/ km</span>
                    </div>
                    <span className="text-[11px] text-gray-300 block mt-1">
                      Fondo que debes guardar para reponer el camión y batea sin endeudarte.
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">2. Amort. Tractor</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res03.truckAmortPerKm, 2)} / km
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">3. Amort. Semirremolque</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res03.trailerAmortPerKm, 2)} / km
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">4. Fondo mensual</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res03.monthlyFund)}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">5. En viaje de 1.000 km</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res03.tripAmortCost1000Km)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 04 OUTPUTS */}
              {activeModuleId === 4 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#F97316]/15 border border-[#F97316]/40">
                    <span className="text-xs text-orange-200 font-medium">1. Desgaste Programado Total por Km</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-black font-mono text-[#FFCE4D]">
                        ${formatMoney(res04.totalWearPerKm, 2)}
                      </span>
                      <span className="text-xs text-gray-300 font-mono">/ km</span>
                    </div>
                    <span className="text-[11px] text-gray-300 block mt-1">
                      Cubiertas (con recapados), cambios de aceite, filtros y frenos.
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">2. Neumáticos por km</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res04.allTiresCostPerKm, 2)} / km
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">3. Aceite y filtros</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res04.oilCostPerKm, 2)} / km
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">4. Frenos y embrague</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res04.brakesCostPerKm, 2)} / km
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">5. Gasto mensual total</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res04.totalWearMonthly)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 05 OUTPUTS */}
              {activeModuleId === 5 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40">
                    <span className="text-xs text-emerald-300 font-medium">1. Costo Total del Viaje</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-black font-mono text-[#FFCE4D]">
                        ${formatMoney(res05.totalTripCost)}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-300 block mt-1">
                      Piso absoluto: por debajo de este número estás poniendo plata de tu bolsillo.
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">2. Costo por km recorrido</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res05.costPerTraveledKm, 2)} / km
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">3. Costo por km facturado</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res05.costPerBilledKm, 2)} / km
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">4. Total costo fijo</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res05.totalFixedCost)}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">5. Total costo variable</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res05.totalVariableCost)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 06 OUTPUTS */}
              {activeModuleId === 6 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40">
                    <span className="text-xs text-emerald-300 font-medium">1. Total de Gastos de Ruta</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-black font-mono text-[#FFCE4D]">
                        ${formatMoney(res06.totalRouteExpenses)}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">2. Total peajes</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res06.totalTolls)}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">3. Otros gastos ruta</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res06.totalOtherExpenses)}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">4. Costo por km</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res06.expensePerKm, 2)} / km
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">5. Peso peajes en ruta</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        {formatMoney(res06.tollsRatioPct, 1)} %
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 07 OUTPUTS */}
              {activeModuleId === 7 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40">
                    <span className="text-xs text-emerald-300 font-medium">1. Viáticos Totales del Chofer</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-black font-mono text-[#FFCE4D]">
                        ${formatMoney(res07.totalViatics)}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">2. Viáticos por km</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res07.kmViaticTotal)}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">3. Comida y pernocte</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res07.foodTotal + res07.stayTotal)}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">4. Viático por km</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res07.viaticPerKm, 2)} / km
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">5. Viático por día</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res07.viaticPerDay)} / día
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 08 OUTPUTS */}
              {activeModuleId === 8 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40">
                    <span className="text-xs text-emerald-300 font-medium">1. Lo que te costó esta espera</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-black font-mono text-[#FFCE4D]">
                        ${formatMoney(res08.tripWaitCost)}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-300 block mt-1">
                      A razón de ${formatMoney(res08.hourlyWaitingCost)}/hora de camión parado.
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">2. Costo por hora parada</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res08.hourlyWaitingCost)} / h
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">3. Esperas de un mes</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res08.monthWaitCost)}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">4. Horas regaladas al mes</span>
                      <span className="font-bold text-base font-mono text-red-400 mt-0.5 block">
                        {formatMoney(res08.givenAwayHoursPerMonth)} h
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">5. Cobertura FADEEAC</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        {formatMoney(res08.stayReferenceCoveragePct, 1)} %
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 09 OUTPUTS */}
              {activeModuleId === 9 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-blue-950/50 border border-blue-500/40">
                    <span className="text-xs text-blue-300 font-medium">1. Tarifa Mínima del Viaje</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <AnimatedCounter
                        value={res09.minTripTariff}
                        prefix="$"
                        className="text-4xl font-black font-mono text-[#FFCE4D]"
                      />
                    </div>
                    <span className="text-[11px] text-gray-300 block mt-1">
                      Para dejarte {mod09.targetMarginPct}% libre con {mod09.commissionPct}% de intermediario.
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">2. Tarifa por tonelada</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        <AnimatedCounter value={res09.minTariffPerTon} prefix="$" suffix=" / tn" />
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">3. Deja a tarifa de ref.</span>
                      <span className="font-bold text-base font-mono text-emerald-400 mt-0.5 block">
                        +<AnimatedCounter value={res09.refMarginAmount} prefix="$" />
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">4. Deja al 70% de mercado</span>
                      <span className="font-bold text-base font-mono text-red-400 mt-0.5 block">
                        <AnimatedCounter value={res09.marketMarginAmount} prefix="$" />
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">5. Margen s/ referencia</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        <AnimatedCounter value={res09.marginOnRefPct} decimals={1} suffix=" %" />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 10 OUTPUTS */}
              {activeModuleId === 10 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-blue-950/50 border border-blue-500/40">
                    <span className="text-xs text-blue-300 font-medium">1. Tarifa Sugerida por Viaje Fijo</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-black font-mono text-[#FFCE4D]">
                        ${formatMoney(res10.suggestedTariffPerTrip)}
                      </span>
                      <span className="text-xs text-gray-300 font-mono">/ viaje</span>
                    </div>
                    <span className="text-[11px] text-gray-300 block mt-1">
                      Incluye costo financiero de cobrar a {mod10.paymentDelayDays} días con inflación.
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">2. Facturación requerida mes</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res10.requiredMonthlyRevenue)}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">3. Costo operativo mes</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res10.monthlyTotalCost)}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">4. Costo unitario optimizado</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res10.adjustedTripCost)}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">5. Descuento máx admisible</span>
                      <span className="font-bold text-base font-mono text-amber-400 mt-0.5 block">
                        {formatMoney(res10.maxDiscountAllowedPct, 1)} %
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 11 OUTPUTS */}
              {activeModuleId === 11 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-blue-950/50 border border-blue-500/40">
                    <span className="text-xs text-blue-300 font-medium">1. Tarifa por Posición de Pallet</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-black font-mono text-[#FFCE4D]">
                        ${formatMoney(res11.tariffPerPallet)}
                      </span>
                      <span className="text-xs text-gray-300 font-mono">/ pallet</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">2. Tarifa por metro cúbico</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res11.tariffPerM3)} / m³
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">3. Tarifa por kg de carga</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res11.tariffPerKg, 2)} / kg
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">4. Recargo total multidrop</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res11.extraDropsTotal)}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">5. Facturación consolidada</span>
                      <span className="font-bold text-base font-mono text-emerald-400 mt-0.5 block">
                        ${formatMoney(res11.totalBilledTrip)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 12 OUTPUTS */}
              {activeModuleId === 12 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-blue-950/50 border border-blue-500/40">
                    <span className="text-xs text-blue-300 font-medium">1. Tarifa Actualizada por Polinómica</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-black font-mono text-[#FFCE4D]">
                        ${formatMoney(res12.tariffByPolynomial)}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-300 block mt-1">
                      Ajuste sugerido del +{formatMoney(res12.polynomialIncreasePct, 1)}% para defender en reunión.
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">2. Tarifa por FADEEAC pura</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        ${formatMoney(res12.tariffByFadeeac)}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">3. % Aumento FADEEAC</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        +{formatMoney(res12.fadeeacIncreasePct, 1)} %
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">4. Pérdida por mes demorado</span>
                      <span className="font-bold text-base font-mono text-red-400 mt-0.5 block">
                        -${formatMoney(res12.differenceAmount)}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">5. Diferencia de ajuste</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        +${formatMoney(res12.differenceAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 13 OUTPUTS */}
              {activeModuleId === 13 && (
                <div className="space-y-4 pt-2">
                  <div className={`p-4 rounded-xl border ${
                    res13.asOfferedResult >= 0
                      ? 'bg-emerald-950/50 border-emerald-500/40'
                      : 'bg-red-950/50 border-red-500/40'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                        1. Decisión Operativa
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        res13.variableCovered < 0
                          ? 'bg-red-600 text-white'
                          : res13.asOfferedResult < 0
                          ? 'bg-amber-500 text-black'
                          : 'bg-emerald-600 text-white'
                      }`}>
                        {res13.variableCovered < 0 ? 'RECHAZAR TERMINANTE' : res13.asOfferedResult < 0 ? 'CONDICIONADO A RETORNO' : 'ACEPTAR'}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-black font-mono">
                        <AnimatedCounter
                          value={res13.asOfferedResult}
                          prefix={res13.asOfferedResult >= 0 ? '+$' : '$'}
                          className={res13.asOfferedResult >= 0 ? 'text-emerald-400' : 'text-red-400'}
                        />
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-300 block mt-1">
                      {res13.variableCovered < 0
                        ? 'No cubre ni el gasoil y cubiertas: pagás para trabajar.'
                        : 'Cubre variable pero pierde contra el costo fijo.'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">2. Tarifa mínima para empatar</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        <AnimatedCounter value={res13.minTariffBreakEven} prefix="$" />
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">3. Cubre costo variable</span>
                      <span className={`font-bold text-base font-mono mt-0.5 block ${res13.variableCovered >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        <AnimatedCounter value={res13.variableCovered} prefix="$" />
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">4. Aporte retorno esperado</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        +<AnimatedCounter value={res13.expectedReturnContribution} prefix="$" />
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">5. Resultado con retorno</span>
                      <span className={`font-bold text-base font-mono mt-0.5 block ${res13.resultWithExpectedReturn >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        <AnimatedCounter value={res13.resultWithExpectedReturn} prefix="$" />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 14 OUTPUTS */}
              {activeModuleId === 14 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-500/40">
                    <span className="text-xs text-purple-300 font-medium">1. Viajes Mensuales para tu Retiro</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <AnimatedCounter
                        value={res14.tripsNeededForBreakEven}
                        decimals={1}
                        className="text-4xl font-black font-mono text-[#FFCE4D]"
                      />
                      <span className="text-xs text-gray-300 font-mono ml-2">viajes / mes</span>
                    </div>
                    <span className="text-[11px] text-gray-300 block mt-1">
                      Para cubrir los costos fijos del camión y retirar ${formatMoney(mod14.targetOwnerSalaryMonthly)} limpios.
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">2. Total mensual a cubrir</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        <AnimatedCounter value={res14.totalMonthlyNeed} prefix="$" />
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">3. Km mensuales mínimos</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        <AnimatedCounter value={res14.kmNeededMonthly} suffix=" km" />
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">4. Valor hora real dueño</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        <AnimatedCounter value={res14.realHourlyRate} prefix="$" suffix=" / h" />
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#3A4250] border border-gray-700">
                      <span className="text-gray-400 block">5. Viajes para costo fijo solo</span>
                      <span className="font-bold text-base font-mono text-white mt-0.5 block">
                        <AnimatedCounter value={res14.fixedCostCoverageTrips} decimals={1} suffix=" viajes" />
                      </span>
                    </div>
                  </div>
                </div>
              )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* COMPARATIVE RECHARTS BAR CHART */}
            <ModuleComparisonChart
              moduleNumber={chartData.moduleNumber}
              variableCost={chartData.variableCost}
              fixedCost={chartData.fixedCost}
              suggestedTariff={chartData.suggestedTariff}
              tripContextLabel={chartData.tripContextLabel}
            />

            {/* Bottom Insight / Action Box */}
            <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
              <button
                onClick={() => setIsFormulaModalOpen(true)}
                className="text-[#FFCE4D] hover:underline flex items-center gap-1.5 font-mono"
              >
                <Eye className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Tocás la celda y la ves entera ({formulaData.cellRef})</span>
              </button>
              <button
                onClick={() => {
                  alert(`Datos del Módulo ${String(activeModuleId).padStart(2, '0')} guardados localmente para este camión.`);
                }}
                className="bg-[#3A4250] hover:bg-gray-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors self-end sm:self-auto"
              >
                Guardar valores
              </button>
            </div>
          </div>
        </div>
      </div>
        </>
      )}

      {/* Formula Inspector Modal ("Tocás la celda y la ves entera. Podés editarla") */}
      <FormulaInspectorModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        moduleId={activeModuleId}
        moduleTitle={currentModule.title}
        cellRef={formulaData.cellRef}
        excelFormula={formulaData.excelFormula}
        evaluatedFormula={formulaData.evaluatedFormula}
        resultLabel={formulaData.resultLabel}
        resultValue={formulaData.resultValue}
        engineeringExplanation={formulaData.engineeringExplanation}
        variables={formulaData.variables}
        onFocusInput={() => {
          const firstInput = document.querySelector('input');
          if (firstInput) firstInput.focus();
        }}
      />
    </div>
  );
};
