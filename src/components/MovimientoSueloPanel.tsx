import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Truck,
  Mountain,
  Clock,
  Fuel,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Sliders,
  DollarSign,
  Layers,
  HelpCircle,
} from 'lucide-react';
import {
  MATERIAL_PRESETS,
  EQUIPMENT_PRESETS,
  EarthmovingTripInputs,
  calcEarthmovingMetrics,
} from '../movimientoSueloLogic';
import { AnimatedCounter } from './AnimatedCounter';

interface MovimientoSueloPanelProps {
  fixedCostPerDayDefault?: number;
  onApplyToFullApp?: (params: {
    oneWayKm: number;
    fuelCostPerKm: number;
    cargoTons: number;
    fixedCostDaily: number;
    suggestedTripTariff: number;
  }) => void;
}

export const MovimientoSueloPanel: React.FC<MovimientoSueloPanelProps> = ({
  fixedCostPerDayDefault = 145000,
  onApplyToFullApp,
}) => {
  // Inputs de movimiento de suelo
  const [materialId, setMaterialId] = useState<string>('tosca');
  const [equipmentId, setEquipmentId] = useState<string>('batea_25');
  const [oneWayKm, setOneWayKm] = useState<number>(22);
  const [dirtRoadPct, setDirtRoadPct] = useState<number>(35); // 35% en tierra / obra
  const [pavingSpeedKmh, setPavingSpeedKmh] = useState<number>(55);
  const [dirtRoadSpeedKmh, setDirtRoadSpeedKmh] = useState<number>(22);
  const [loadingWaitMinutes, setLoadingWaitMinutes] = useState<number>(18);
  const [dumpAndSpreadMinutes, setDumpAndSpreadMinutes] = useState<number>(12);
  const [workHoursPerDay, setWorkHoursPerDay] = useState<number>(9);
  const [rainyIdleDaysPerMonth, setRainyIdleDaysPerMonth] = useState<number>(4);
  const [gasoilPrice, setGasoilPrice] = useState<number>(1280);
  const [baseLoadedConsumptionRoad, setBaseLoadedConsumptionRoad] = useState<number>(44);
  const [baseEmptyConsumptionRoad, setBaseEmptyConsumptionRoad] = useState<number>(29);
  const [dirtRoadConsumptionMultiplier, setDirtRoadConsumptionMultiplier] = useState<number>(1.45);
  const [targetMarginPct, setTargetMarginPct] = useState<number>(25);
  const [contractorCommissionPct, setContractorCommissionPct] = useState<number>(5);
  const [tireCostEach, setTireCostEach] = useState<number>(540000);
  const [fixedCostPerDay, setFixedCostPerDay] = useState<number>(fixedCostPerDayDefault);
  const [maintenancePerHourInSite, setMaintenancePerHourInSite] = useState<number>(4200);

  const inputs: EarthmovingTripInputs = {
    materialId,
    equipmentId,
    oneWayKm,
    dirtRoadPct,
    pavingSpeedKmh,
    dirtRoadSpeedKmh,
    loadingWaitMinutes,
    dumpAndSpreadMinutes,
    workHoursPerDay,
    rainyIdleDaysPerMonth,
    gasoilPrice,
    baseLoadedConsumptionRoad,
    baseEmptyConsumptionRoad,
    dirtRoadConsumptionMultiplier,
    targetMarginPct,
    contractorCommissionPct,
    tireCostEach,
    fixedCostPerDay,
    maintenancePerHourInSite,
  };

  const res = calcEarthmovingMetrics(inputs);

  const formatMoney = (val: number, dec = 0) =>
    new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    }).format(val);

  return (
    <div className="space-y-6">
      {/* BANNER IDENTIFICADOR DEL RUBRO MOVIMIENTO DE SUELO */}
      <div className="bg-gradient-to-r from-[#1C1F26] via-[#2A1F16] to-[#1C1F26] border border-[#F97316]/50 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
          <Mountain className="w-64 h-64 text-[#F97316]" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F97316] text-black font-extrabold text-[11px] tracking-wide uppercase">
                Rubro Específico
              </span>
              <span className="text-gray-400 text-xs font-mono">
                Bateas · Volcadores 6x4 · Canteras · Obras Viales
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Calculadora de Movimiento de Suelo & Áridos</span>
            </h2>
            <p className="text-sm text-gray-300 max-w-3xl mt-1">
              Adaptación técnica completa para cotizar por <strong className="text-[#FFCE4D]">m³</strong>,{' '}
              <strong className="text-[#FFCE4D]">viaje</strong>, <strong className="text-[#FFCE4D]">tonelada</strong> y{' '}
              <strong className="text-[#FFCE4D]">hora en obra</strong>, contemplando el 100% de retorno vacío,
              toma de fuerza (PTO), desgaste de huella en barro y días de lluvia no laborables.
            </p>
          </div>

          {/* Quick Apply Button */}
          {onApplyToFullApp && (
            <button
              onClick={() => {
                onApplyToFullApp({
                  oneWayKm,
                  fuelCostPerKm: res.totalTripFuelLiters * gasoilPrice / (oneWayKm || 1),
                  cargoTons: res.actualCargoTons,
                  fixedCostDaily: res.adjustedDailyFixedCost,
                  suggestedTripTariff: res.suggestedTariffPerTrip,
                });
              }}
              className="px-4 py-2.5 bg-[#F97316] hover:bg-[#ea6407] text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sincronizar con los 14 Módulos</span>
            </button>
          )}
        </div>
      </div>

      {/* TARIFF SUMMARY CARDS (THE 4 KEY QUOTATION UNITS IN EARTHMOVING) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Unit 1: Price per m3 */}
        <div className="bg-[#15181E] p-4 rounded-xl border-2 border-[#10B981]/50 shadow-md">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="font-semibold text-emerald-300 uppercase tracking-wider">Tarifa Sugerida / m³</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono">El Rey del Rubro</span>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <AnimatedCounter
              value={res.suggestedTariffPerM3}
              prefix="$"
              className="text-3xl font-black font-mono text-emerald-400"
            />
            <span className="text-xs text-gray-400 font-mono">/ m³</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-2 flex justify-between border-t border-gray-800 pt-1.5">
            <span>Costo costo piso:</span>
            <span className="font-mono text-gray-200">${formatMoney(res.costPerM3)} / m³</span>
          </div>
        </div>

        {/* Unit 2: Price per Trip */}
        <div className="bg-[#15181E] p-4 rounded-xl border-2 border-[#FFCE4D]/50 shadow-md">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="font-semibold text-amber-300 uppercase tracking-wider">Tarifa Sugerida / Viaje</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 text-[10px] font-mono">Por Vuelta</span>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <AnimatedCounter
              value={res.suggestedTariffPerTrip}
              prefix="$"
              className="text-3xl font-black font-mono text-[#FFCE4D]"
            />
            <span className="text-xs text-gray-400 font-mono">/ viaje</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-2 flex justify-between border-t border-gray-800 pt-1.5">
            <span>Costo total viaje:</span>
            <span className="font-mono text-gray-200">${formatMoney(res.totalCostPerTrip)}</span>
          </div>
        </div>

        {/* Unit 3: Price per Ton */}
        <div className="bg-[#15181E] p-4 rounded-xl border border-[#3A4250] shadow-md">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="font-semibold text-blue-300 uppercase tracking-wider">Tarifa / Tonelada</span>
            <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 text-[10px] font-mono">Báscula Cantera</span>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <AnimatedCounter
              value={res.suggestedTariffPerTon}
              prefix="$"
              className="text-2xl font-black font-mono text-blue-400"
            />
            <span className="text-xs text-gray-400 font-mono">/ tn</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-2 flex justify-between border-t border-gray-800 pt-1.5">
            <span>Carga neta:</span>
            <span className="font-mono text-gray-200">{res.actualCargoTons.toFixed(1)} tn ({res.actualCargoM3.toFixed(1)} m³)</span>
          </div>
        </div>

        {/* Unit 4: Hourly Rate in Site */}
        <div className="bg-[#15181E] p-4 rounded-xl border border-[#3A4250] shadow-md">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="font-semibold text-purple-300 uppercase tracking-wider">Hora de Camión en Obra</span>
            <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 text-[10px] font-mono">Alquiler c/ Chofer</span>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <AnimatedCounter
              value={res.hourlyRateSuggested}
              prefix="$"
              className="text-2xl font-black font-mono text-purple-400"
            />
            <span className="text-xs text-gray-400 font-mono">/ hora</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-2 flex justify-between border-t border-gray-800 pt-1.5">
            <span>Ciclo total viaje:</span>
            <span className="font-mono text-gray-200">{Math.round(res.totalCycleMinutes)} min</span>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN CONFIGURATION & BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: INPUT CONTROLS (7 COLS) */}
        <div className="lg:col-span-7 space-y-5 bg-[#15181E] p-5 rounded-2xl border border-[#3A4250]">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#F97316]" />
              <span>1. Configuración de Equipo & Material de Obra</span>
            </h3>
            <span className="text-xs text-[#FFCE4D] bg-[#FFCE4D]/10 px-2 py-0.5 rounded font-mono">
              Inputs Amarillos Editables
            </span>
          </div>

          {/* EQUIPO & MATERIAL SELECTORS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Equipment Selection */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Tipo de Camión / Volcador
              </label>
              <select
                value={equipmentId}
                onChange={(e) => setEquipmentId(e.target.value)}
                className="w-full bg-[#202530] text-white border border-[#F97316] rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              >
                {EQUIPMENT_PRESETS.map((eq) => (
                  <option key={eq.id} value={eq.id}>
                    {eq.name} ({eq.volumeM3} m³)
                  </option>
                ))}
              </select>
              <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
                <span>Tara: {res.eq.tareWeightTons} tn</span>
                <span>Límite Bruto: {res.eq.grossWeightLimitTons} tn</span>
                <span>{res.eq.tireCount} ruedas</span>
              </div>
            </div>

            {/* Material Selection */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Material Transportado
              </label>
              <select
                value={materialId}
                onChange={(e) => setMaterialId(e.target.value)}
                className="w-full bg-[#202530] text-white border border-[#F97316] rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              >
                {MATERIAL_PRESETS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.density} tn/m³)
                  </option>
                ))}
              </select>
              <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
                <span>Densidad: {res.mat.density} tn/m³</span>
                <span>Esponjamiento: x{res.mat.swellFactor}</span>
                <span className={`capitalize ${res.mat.wearLevel === 'severo' ? 'text-red-400' : 'text-amber-300'}`}>
                  Desgaste {res.mat.wearLevel}
                </span>
              </div>
            </div>
          </div>

          {/* BALANZA & LEGAL WEIGHT ALERT */}
          <div
            className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
              res.isLimitedByWeight
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
            }`}
          >
            {res.isLimitedByWeight ? (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold block">
                {res.isLimitedByWeight
                  ? 'Atención Balanza Vialidad: Carga limitada por peso legal'
                  : 'Carga completa por volumen de caja'}
              </span>
              <p className="mt-0.5 text-[11px] opacity-90">
                {res.isLimitedByWeight
                  ? `La caja de ${res.eq.volumeM3} m³ llena de ${res.mat.name.toLowerCase()} pesaría ${(
                      res.eq.volumeM3 * res.mat.density
                    ).toFixed(1)} tn (excediendo el límite legal). Para evitar multas, se cargan ${res.actualCargoTons.toFixed(
                      1
                    )} tn netas (${res.actualCargoM3.toFixed(1)} m³ efectivos).`
                  : `Se cargan los ${res.actualCargoM3.toFixed(1)} m³ de la caja (${res.actualCargoTons.toFixed(
                      1
                    )} tn), viajando holgado dentro del peso bruto legal.`}
              </p>
            </div>
          </div>

          {/* DISTANCE, SPEEDS & ROAD CONDITIONS */}
          <div className="pt-2 border-t border-gray-800 space-y-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              2. Trayecto, Tipo de Terreno y Velocidad
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Distancia Ida (km)</label>
                <div className="flex items-center bg-[#202530] border border-[#FFCE4D] rounded-lg px-2.5 py-1.5">
                  <input
                    type="number"
                    value={oneWayKm}
                    onChange={(e) => setOneWayKm(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-transparent text-[#FFCE4D] font-mono font-bold focus:outline-none"
                  />
                  <span className="text-gray-400 text-[10px] font-mono">km</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 block">Vuelta = {oneWayKm * 2} km tot.</span>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">% Camino Tierra/Obra</label>
                <div className="flex items-center bg-[#202530] border border-[#FFCE4D] rounded-lg px-2.5 py-1.5">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={dirtRoadPct}
                    onChange={(e) => setDirtRoadPct(Number(e.target.value))}
                    className="w-full bg-transparent text-[#FFCE4D] font-mono font-bold focus:outline-none"
                  />
                  <span className="text-gray-400 text-[10px] font-mono">%</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 block">
                  {((oneWayKm * dirtRoadPct) / 100).toFixed(1)} km en tierra
                </span>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Velocidad en Tierra</label>
                <div className="flex items-center bg-[#202530] border border-[#FFCE4D] rounded-lg px-2.5 py-1.5">
                  <input
                    type="number"
                    value={dirtRoadSpeedKmh}
                    onChange={(e) => setDirtRoadSpeedKmh(Math.max(5, Number(e.target.value)))}
                    className="w-full bg-transparent text-[#FFCE4D] font-mono font-bold focus:outline-none"
                  />
                  <span className="text-gray-400 text-[10px] font-mono">km/h</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 block">Asfalto: {pavingSpeedKmh} km/h</span>
              </div>
            </div>
          </div>

          {/* CYCLE TIMES & DEMORAS */}
          <div className="pt-2 border-t border-gray-800 space-y-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center justify-between">
              <span>3. Tiempos de Maniobra y Jornada Laboral</span>
              <span className="text-[11px] font-mono text-emerald-400 font-normal">
                Ciclo Total: {Math.round(res.totalCycleMinutes)} min / viaje
              </span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Carga c/ Pala (min)</label>
                <input
                  type="number"
                  value={loadingWaitMinutes}
                  onChange={(e) => setLoadingWaitMinutes(Number(e.target.value))}
                  className="w-full bg-[#202530] border border-[#FFCE4D] rounded-lg px-2.5 py-1.5 text-[#FFCE4D] font-mono font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Volteo Hidráulico (min)</label>
                <input
                  type="number"
                  value={dumpAndSpreadMinutes}
                  onChange={(e) => setDumpAndSpreadMinutes(Number(e.target.value))}
                  className="w-full bg-[#202530] border border-[#FFCE4D] rounded-lg px-2.5 py-1.5 text-[#FFCE4D] font-mono font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Jornada Obra (horas)</label>
                <input
                  type="number"
                  value={workHoursPerDay}
                  onChange={(e) => setWorkHoursPerDay(Number(e.target.value))}
                  className="w-full bg-[#202530] border border-[#FFCE4D] rounded-lg px-2.5 py-1.5 text-[#FFCE4D] font-mono font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Viajes posibles/día</label>
                <div className="bg-[#202530] border border-gray-700 rounded-lg px-2.5 py-1.5 text-white font-mono font-bold">
                  {res.realisticTripsPerDay} viajes
                </div>
              </div>
            </div>
          </div>

          {/* RAIN IMPACT & OFF-ROAD OVERHEADS */}
          <div className="pt-2 border-t border-gray-800 space-y-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              <span>4. Clima y Días de Lluvia (Obra Inoperable)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#202530] rounded-xl border border-gray-700">
                <label className="text-gray-300 block mb-1 font-medium">
                  Días promedio de lluvia/barro al mes
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="15"
                    value={rainyIdleDaysPerMonth}
                    onChange={(e) => setRainyIdleDaysPerMonth(Number(e.target.value))}
                    className="w-20 bg-[#15181E] border border-[#FFCE4D] rounded-lg px-2.5 py-1 text-[#FFCE4D] font-mono font-bold focus:outline-none"
                  />
                  <span className="text-[11px] text-gray-400">
                    días parados (quedan {22 - rainyIdleDaysPerMonth} hábiles)
                  </span>
                </div>
                <p className="text-[11px] text-orange-300/90 mt-1.5">
                  Al no poder ingresar al terreno, el costo fijo diario salta de ${formatMoney(fixedCostPerDay)} a{' '}
                  <strong className="text-white">${formatMoney(res.adjustedDailyFixedCost)}</strong> (+${formatMoney(
                    res.rainImpactExtraCostPerDay
                  )}/día).
                </p>
              </div>

              <div className="p-3 bg-[#202530] rounded-xl border border-gray-700">
                <label className="text-gray-300 block mb-1 font-medium">
                  Costo Fijo Base Diario ($/día)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={fixedCostPerDay}
                    onChange={(e) => setFixedCostPerDay(Number(e.target.value))}
                    className="w-full bg-[#15181E] border border-[#FFCE4D] rounded-lg px-2.5 py-1 text-[#FFCE4D] font-mono font-bold focus:outline-none"
                  />
                </div>
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Chofer CCT 40/89, seguro de obra, cuota de batea y amortización.
                </span>
              </div>
            </div>
          </div>

          {/* MARGIN & CONTRACTOR COMMISSION */}
          <div className="pt-2 border-t border-gray-800 grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-gray-400 block mb-1">Margen Ganancia Limpia (%)</label>
              <div className="flex items-center bg-[#202530] border border-[#FFCE4D] rounded-lg px-2.5 py-1.5">
                <input
                  type="number"
                  value={targetMarginPct}
                  onChange={(e) => setTargetMarginPct(Number(e.target.value))}
                  className="w-full bg-transparent text-[#FFCE4D] font-mono font-bold focus:outline-none"
                />
                <span className="text-gray-400 text-[10px] font-mono">%</span>
              </div>
            </div>

            <div>
              <label className="text-gray-400 block mb-1">Comisión Constructora/Intermediario</label>
              <div className="flex items-center bg-[#202530] border border-[#FFCE4D] rounded-lg px-2.5 py-1.5">
                <input
                  type="number"
                  value={contractorCommissionPct}
                  onChange={(e) => setContractorCommissionPct(Number(e.target.value))}
                  className="w-full bg-transparent text-[#FFCE4D] font-mono font-bold focus:outline-none"
                />
                <span className="text-gray-400 text-[10px] font-mono">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILED OPERATIONAL METRICS & FINANCIAL BREAKDOWN (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          {/* COST STRUCTURE PER TRIP */}
          <div className="bg-[#15181E] p-5 rounded-2xl border border-[#3A4250] space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between border-b border-gray-800 pb-2.5">
              <span>Desglose de Costos por Viaje</span>
              <span className="text-xs font-mono text-[#FFCE4D] font-bold">
                ${formatMoney(res.totalCostPerTrip)} / viaje
              </span>
            </h3>

            {/* Variable Items Breakdown */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center p-2 rounded-lg bg-[#202530]">
                <div className="flex items-center gap-2 text-gray-300">
                  <Fuel className="w-3.5 h-3.5 text-[#F5B301]" />
                  <span>Gasoil (incl. huella + PTO levante):</span>
                </div>
                <span className="font-bold text-white">
                  ${formatMoney(res.tripFuelCost)} ({res.totalTripFuelLiters.toFixed(1)} L)
                </span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-lg bg-[#202530]">
                <div className="flex items-center gap-2 text-gray-300">
                  <Truck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Desgaste Cubiertas Cantera:</span>
                </div>
                <span className="font-bold text-white">${formatMoney(res.tripTireCost)}</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-lg bg-[#202530]">
                <div className="flex items-center gap-2 text-gray-300">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span>Engrase, Filtros Polvo & Hidráulico:</span>
                </div>
                <span className="font-bold text-white">${formatMoney(res.tripMaintenanceCost)}</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-lg bg-[#202530]">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  <span>Costo Fijo Prorrateado (absorbe lluvia):</span>
                </div>
                <span className="font-bold text-orange-400">${formatMoney(res.fixedCostPerTrip)}</span>
              </div>
            </div>

            {/* Visual Balance Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                <span>Costo Variable ({Math.round((res.totalVariableCostPerTrip / res.totalCostPerTrip) * 100)}%)</span>
                <span>Costo Fijo ({Math.round((res.fixedCostPerTrip / res.totalCostPerTrip) * 100)}%)</span>
              </div>
              <div className="h-2.5 w-full bg-gray-800 rounded-full overflow-hidden flex">
                <div
                  className="bg-[#F5B301] h-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (res.totalVariableCostPerTrip / res.totalCostPerTrip) * 100
                    )}%`,
                  }}
                />
                <div
                  className="bg-[#F97316] h-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (res.fixedCostPerTrip / res.totalCostPerTrip) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* DAILY PROJECTION AT CURRENT CAPACITY */}
          <div className="bg-gradient-to-br from-[#1C2028] to-[#15181E] p-5 rounded-2xl border border-emerald-500/40 space-y-3.5">
            <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center justify-between border-b border-emerald-900/50 pb-2">
              <span>Rendimiento Diario Estimado</span>
              <span className="text-xs font-mono text-emerald-400">
                {res.realisticTripsPerDay} viajes / día
              </span>
            </h3>

            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="bg-[#202530]/80 p-2.5 rounded-xl border border-gray-700/60">
                <span className="text-gray-400 text-[10px] block uppercase">Volumen Volcado</span>
                <span className="text-base font-black text-white mt-0.5 block">
                  {res.dailyTotalM3.toFixed(1)} m³
                </span>
                <span className="text-[10px] text-gray-400">({res.dailyTotalTons.toFixed(1)} toneladas)</span>
              </div>

              <div className="bg-[#202530]/80 p-2.5 rounded-xl border border-gray-700/60">
                <span className="text-gray-400 text-[10px] block uppercase">Facturación Diaria</span>
                <span className="text-base font-black text-[#FFCE4D] mt-0.5 block">
                  ${formatMoney(res.dailyRevenue)}
                </span>
                <span className="text-[10px] text-gray-400">bruto de flete</span>
              </div>

              <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/40 col-span-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-emerald-300 text-[11px] font-bold block uppercase">
                    Ganancia Limpia del Camión / Día
                  </span>
                  <span className="text-lg font-black text-emerald-400">
                    +${formatMoney(res.dailyProfit)}
                  </span>
                </div>
                <span className="text-[10px] text-gray-300 mt-0.5 block">
                  Ya cubierto el chofer, combustible, cubiertas, mantenimiento de batea y amortización de equipo.
                </span>
              </div>
            </div>
          </div>

          {/* TIPS EXPERTOS MOVIMIENTO DE SUELO */}
          <div className="p-4 bg-[#202530]/60 rounded-2xl border border-gray-800 text-xs space-y-2 text-gray-300">
            <div className="flex items-center gap-1.5 font-bold text-white text-xs">
              <HelpCircle className="w-4 h-4 text-[#F97316]" />
              <span>Reglas de Oro del Movimiento de Suelo</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-[11px] text-gray-400">
              <li>
                <strong className="text-gray-200">El retorno siempre es vacío (100%):</strong> Jamás cotices solo la ida. Cada km cargado exige un km de vuelta para volver a cargar en la tosquera o pozo.
              </li>
              <li>
                <strong className="text-gray-200">Pesaje vs Volumen:</strong> Los suelos densos (tosca, arcilla mojada) superan el peso legal antes de llenar la caja. Cotizar por m³ sin verificar toneladas provoca sobrepeso y rotura de chasis.
              </li>
              <li>
                <strong className="text-gray-200">Fondo de Lluvia:</strong> El camión de movimiento de suelo promedia entre 16 y 18 días laborables por mes. Si calculás con 22 días, perdés dinero en cada quincena húmeda.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
