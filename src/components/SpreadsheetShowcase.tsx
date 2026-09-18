import React, { useState } from 'react';
import {
  Module02Inputs,
  Module09Inputs,
  Module13Inputs,
  Module08Inputs,
  calcModule02,
  calcModule09,
  calcModule13,
  calcModule08,
} from '../spreadsheetFormulas';
import { ModuleIcon } from './ModuleIcons';

export const InteractiveSpreadsheetShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'01' | '02' | '03' | '04'>('01');

  // Interactive states initialized with exact reference values from images
  const [mod02, setMod02] = useState<Module02Inputs>({
    gasoilPrice: 2048,
    loadedConsumption: 38,
    emptyConsumption: 27,
    billedKm: 420,
    emptyKm: 380,
    maneuverSurchargePct: 4,
  });

  const [mod09, setMod09] = useState<Module09Inputs>({
    tripCost: 1562492,
    targetMarginPct: 18,
    cargoTons: 30,
    commissionPct: 6,
    referenceTariffPerTon: 67680,
    marketPctOfReference: 70,
  });

  const [mod13, setMod13] = useState<Module13Inputs>({
    offeredPrice: 1350000,
    variableCost: 1363704,
    fixedCostTotalDays: 198788,
    returnProbabilityPct: 35,
    returnRevenue: 780000,
    returnVariableCost: 465000,
  });

  const [mod08, setMod08] = useState<Module08Inputs>({
    dailyFixedCost: 198788,
    dailyWorkHours: 8,
    waitingHoursThisTrip: 6.5,
    waitsPerMonth: 14,
    fadeeacStayReference: 223180,
    freeHoursBeforeStay: 24,
  });

  // Calculate live outputs
  const res02 = calcModule02(mod02);
  const res09 = calcModule09(mod09);
  const res13 = calcModule13(mod13);
  const res08 = calcModule08(mod08);

  const formatNumber = (val: number, decimals = 0) => {
    return val.toLocaleString('es-AR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <section id="showcase-planilla" className="py-16 px-4 sm:px-6 bg-[#15181E] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Tabs (01, 02, 03, 04) with high contrast */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 border-b border-[#3A4250] pb-4">
          <button
            id="tab-showcase-01"
            onClick={() => setActiveTab('01')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === '01'
                ? 'bg-[#F97316] text-white shadow-lg'
                : 'bg-[#3A4250]/40 text-gray-300 hover:bg-[#3A4250]'
            }`}
          >
            <span className="w-6 h-6 rounded-full bg-black/25 flex items-center justify-center text-xs font-mono">01</span>
            <span>Gasoil & Vuelta Vacía</span>
          </button>

          <button
            id="tab-showcase-02"
            onClick={() => setActiveTab('02')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === '02'
                ? 'bg-[#F97316] text-white shadow-lg'
                : 'bg-[#3A4250]/40 text-gray-300 hover:bg-[#3A4250]'
            }`}
          >
            <span className="w-6 h-6 rounded-full bg-black/25 flex items-center justify-center text-xs font-mono">02</span>
            <span>Tarifa Eventual & Tonelada</span>
          </button>

          <button
            id="tab-showcase-03"
            onClick={() => setActiveTab('03')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === '03'
                ? 'bg-[#F97316] text-white shadow-lg'
                : 'bg-[#3A4250]/40 text-gray-300 hover:bg-[#3A4250]'
            }`}
          >
            <span className="w-6 h-6 rounded-full bg-black/25 flex items-center justify-center text-xs font-mono">03</span>
            <span>Cuándo Rechazar el Viaje</span>
          </button>

          <button
            id="tab-showcase-04"
            onClick={() => setActiveTab('04')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === '04'
                ? 'bg-[#F97316] text-white shadow-lg'
                : 'bg-[#3A4250]/40 text-gray-300 hover:bg-[#3A4250]'
            }`}
          >
            <span className="w-6 h-6 rounded-full bg-black/25 flex items-center justify-center text-xs font-mono">04</span>
            <span>Costo de la Hora de Espera</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* CASE 01: EL KILÓMETRO DE VUELTA TAMBIÉN LO PAGÁS VOS (MÓDULO 02) */}
        {/* ============================================================== */}
        {activeTab === '01' && (
          <div className="space-y-6">
            {/* Header copy matching image 2 */}
            <div className="flex items-start gap-3">
              <span className="bg-[#F5B301] text-[#111827] font-black text-lg px-3 py-1 rounded-lg">01</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  El kilómetro de vuelta también lo pagás vos
                </h3>
                <p className="text-gray-300 text-sm sm:text-base mt-1 max-w-4xl">
                  Cargás el precio del gasoil, el consumo cargado y en vacío, los kilómetros que facturás y los que hacés de retorno o posicionamiento. Te devuelve el gasoil por kilómetro facturado, el del viaje completo, los litros y cuánto te sale volver sin carga.
                </p>
              </div>
            </div>

            {/* Mocked Spreadsheet Window */}
            <div className="bg-[#F7F5F0] rounded-2xl border border-[#DDD6CA] overflow-hidden text-[#111827] shadow-2xl">
              {/* Window Bar */}
              <div className="bg-[#3A4250] text-gray-200 px-4 py-2 flex items-center justify-between text-xs border-b border-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444] inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#F5B301] inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#10B981] inline-block"></span>
                  <span className="ml-2 font-mono text-gray-300">Planilla de Tarifa & Costo de Transporte 2026 — Criterio Logístico.xlsx</span>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-gray-300 text-xs">
                  <span>Archivo</span>
                  <span className="text-white font-bold border-b-2 border-[#F97316]">Inicio</span>
                  <span>Insertar</span>
                  <span>Fórmulas</span>
                  <span>Datos</span>
                  <span>Revisar</span>
                  <span>Vista</span>
                </div>
              </div>

              {/* Excel Formula Bar */}
              <div className="bg-white border-b border-[#DDD6CA] px-4 py-1.5 flex items-center gap-2 text-xs font-mono">
                <span className="bg-gray-100 border border-gray-300 px-2 py-0.5 rounded font-bold text-gray-700">H8</span>
                <span className="text-gray-400 font-serif italic">fx</span>
                <span className="text-gray-800 bg-gray-50 flex-1 px-2 py-0.5 rounded truncate">
                  =($D$11*$D$9/100+$D$12*$D$10/100)*$D$8*(1+$D$13/100)/$D$11
                </span>
              </div>

              {/* Spreadsheet Header inside sheet */}
              <div className="bg-[#15181E] text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#3A4250] flex items-center justify-center">
                    <ModuleIcon name="gasoil" className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[#F97316] text-[10px] font-mono tracking-wider uppercase font-bold block">
                      MÓDULO 02 · ESTRUCTURA
                    </span>
                    <h4 className="text-lg font-bold">El kilómetro de vuelta también lo pagás vos</h4>
                  </div>
                </div>
                <span className="text-xs bg-[#3A4250] hover:bg-gray-600 px-3 py-1 rounded text-gray-200 cursor-pointer">
                  ◀ Volver al menú
                </span>
              </div>

              {/* Two Column Spreadsheet Layout */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Datos que cargás vos */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="text-[11px] font-mono font-bold tracking-wider text-[#6B7280] uppercase mb-2">
                    DATOS QUE CARGÁS VOS
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <span className="text-[#3A4250] font-medium">Viaje</span>
                    <span className="bg-[#FFCE4D]/25 border border-[#F5B301] px-3 py-0.5 rounded text-xs font-mono font-semibold text-[#111827]">
                      Ida cargado · vuelta en vacío
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="gasoilPrice" className="text-[#3A4250] font-medium">Precio del gasoil</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="gasoilPrice"
                        type="number"
                        value={mod02.gasoilPrice}
                        onChange={(e) => setMod02({ ...mod02, gasoilPrice: Number(e.target.value) })}
                        className="w-20 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">$/L</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="loadedConsumption" className="text-[#3A4250] font-medium">Consumo cargado</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="loadedConsumption"
                        type="number"
                        value={mod02.loadedConsumption}
                        onChange={(e) => setMod02({ ...mod02, loadedConsumption: Number(e.target.value) })}
                        className="w-16 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">L/100 km</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="emptyConsumption" className="text-[#3A4250] font-medium">Consumo en vacío</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="emptyConsumption"
                        type="number"
                        value={mod02.emptyConsumption}
                        onChange={(e) => setMod02({ ...mod02, emptyConsumption: Number(e.target.value) })}
                        className="w-16 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">L/100 km</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="billedKm" className="text-[#3A4250] font-medium">Kilómetros cargados (los que facturás)</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="billedKm"
                        type="number"
                        value={mod02.billedKm}
                        onChange={(e) => setMod02({ ...mod02, billedKm: Number(e.target.value) })}
                        className="w-16 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">km</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="emptyKm" className="text-[#3A4250] font-medium">Kilómetros en vacío (posicionamiento y retorno)</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="emptyKm"
                        type="number"
                        value={mod02.emptyKm}
                        onChange={(e) => setMod02({ ...mod02, emptyKm: Number(e.target.value) })}
                        className="w-16 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">km</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="maneuverSurchargePct" className="text-[#3A4250] font-medium">Recargo por maniobras y espera con motor encendido</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="maneuverSurchargePct"
                        type="number"
                        value={mod02.maneuverSurchargePct}
                        onChange={(e) => setMod02({ ...mod02, maneuverSurchargePct: Number(e.target.value) })}
                        className="w-12 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">%</span>
                    </div>
                  </div>

                  {/* Legend matching image */}
                  <div className="flex items-center gap-4 text-xs text-[#6B7280] pt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#FFCE4D]/40 border border-[#F5B301] rounded-sm"></span>
                      <span>Celda editable (la cargás vos)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#15181E] rounded-sm"></span>
                      <span>Resultado calculado</span>
                    </div>
                  </div>
                </div>

                {/* Right: Resultado exacto matching image 2 */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-[11px] font-mono font-bold tracking-wider text-[#6B7280] uppercase mb-2">
                    RESULTADO
                  </div>

                  {/* Hero Metric Box */}
                  <div className="bg-[#15181E] text-white p-6 rounded-2xl">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#F97316] font-bold block mb-1">
                      GASOIL POR KILÓMETRO FACTURADO
                    </span>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-white">
                        {formatNumber(res02.fuelCostPerBilledKm, 2)}
                      </span>
                      <span className="text-gray-300 font-mono text-lg">$/km</span>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-gray-700/60 pt-3">
                      Mirando sólo el consumo cargado el kilómetro te da {formatNumber(res02.loadedOnlyCostPerKm, 2)} pesos. Pero los {mod02.emptyKm} km de vuelta los pagás igual: el kilómetro que realmente facturás cuesta {formatNumber(res02.fuelCostPerBilledKm, 2)}, un {formatNumber(res02.increasePct, 1)} % más. Volver vacío te sale {formatNumber(res02.returnCost, 0)} pesos que no le cobrás a nadie.
                    </p>
                  </div>

                  {/* 4 Secondary Output Cards */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        GASOIL DEL VIAJE COMPLETO
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-[#111827]">
                          {formatNumber(res02.totalFuelCost, 0)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">$</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        LITROS DEL VIAJE
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-[#111827]">
                          {formatNumber(res02.totalLiters, 1)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">L</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        LO QUE CUESTA VOLVER VACÍO
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-[#111827]">
                          {formatNumber(res02.returnCost, 0)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">$</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        KILÓMETROS QUE NO LE COBRÁS A NADIE
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-[#111827]">
                          {formatNumber(res02.unbilledKmPct, 1)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">%</span>
                      </div>
                    </div>
                  </div>

                  {/* FADEEAC Warning Banner */}
                  <div className="bg-[#FFFBEB] border-l-4 border-[#F5B301] p-3.5 rounded-r-xl text-xs text-[#111827] leading-relaxed">
                    Según FADEEAC el combustible pesa cerca del 35 % de la estructura de costos del transporte, y el gasoil acumula un 31 % de aumento en lo que va de 2026. Es el rubro que más se mueve: una tarifa cerrada hace seis meses ya perdió contra este solo número.
                  </div>
                </div>
              </div>

              {/* Bottom Sheet Navigation Bar */}
              <div className="bg-white border-t border-[#DDD6CA] px-6 py-2 flex items-center gap-6 text-xs font-medium text-gray-600">
                <span className="hover:text-black cursor-pointer">MENÚ</span>
                <span className="text-[#F97316] font-bold border-b-2 border-[#F97316] pb-1">Estructura</span>
                <span className="hover:text-black cursor-pointer">Operación</span>
                <span className="hover:text-black cursor-pointer">Tarifa</span>
                <span className="hover:text-black cursor-pointer">Decisión</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* CASE 02: ABAJO DE QUÉ NÚMERO EL VIAJE EVENTUAL NO SE TOMA (MÓDULO 09) */}
        {/* ============================================================== */}
        {activeTab === '02' && (
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <span className="bg-[#F5B301] text-[#111827] font-black text-lg px-3 py-1 rounded-lg">02</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Abajo de qué número el viaje eventual no se toma
                </h3>
                <p className="text-gray-300 text-sm sm:text-base mt-1 max-w-4xl">
                  Costo total del viaje, el margen que querés dejar, las toneladas, la comisión del dador de carga y la tarifa de referencia de esa distancia. Sale la tarifa mínima, la tarifa por tonelada, lo que deja la referencia y lo que deja el precio que realmente paga el mercado.
                </p>
              </div>
            </div>

            {/* Mocked Spreadsheet Window */}
            <div className="bg-[#F7F5F0] rounded-2xl border border-[#DDD6CA] overflow-hidden text-[#111827] shadow-2xl">
              <div className="bg-[#3A4250] text-gray-200 px-4 py-2 flex items-center justify-between text-xs border-b border-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#F5B301]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
                  <span className="ml-2 font-mono text-gray-300">Planilla de Tarifa & Costo de Transporte 2026 — Criterio Logístico.xlsx</span>
                </div>
              </div>

              <div className="bg-white border-b border-[#DDD6CA] px-4 py-1.5 flex items-center gap-2 text-xs font-mono">
                <span className="bg-gray-100 border border-gray-300 px-2 py-0.5 rounded font-bold text-gray-700">H8</span>
                <span className="text-gray-400 font-serif italic">fx</span>
                <span className="text-gray-800 bg-gray-50 flex-1 px-2 py-0.5 rounded truncate">
                  =$D$8/(1-$D$9/100)/(1-$D$11/100)
                </span>
              </div>

              <div className="bg-[#15181E] text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#3A4250] flex items-center justify-center">
                    <ModuleIcon name="tarifa-eventual" className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[#F97316] text-[10px] font-mono tracking-wider uppercase font-bold block">
                      MÓDULO 09 · TARIFA
                    </span>
                    <h4 className="text-lg font-bold">Abajo de qué número el viaje eventual no se toma</h4>
                  </div>
                </div>
                <span className="text-xs bg-[#3A4250] px-3 py-1 rounded text-gray-200">◀ Volver al menú</span>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="text-[11px] font-mono font-bold tracking-wider text-[#6B7280] uppercase mb-2">
                    DATOS QUE CARGÁS VOS
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <span className="text-[#3A4250] font-medium">Viaje</span>
                    <span className="bg-[#FFCE4D]/25 border border-[#F5B301] px-3 py-0.5 rounded text-xs font-mono font-semibold text-[#111827]">
                      420 km · 30 toneladas · granel
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="tripCost" className="text-[#3A4250] font-medium">Costo total del viaje (módulo 05)</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="tripCost"
                        type="number"
                        value={mod09.tripCost}
                        onChange={(e) => setMod09({ ...mod09, tripCost: Number(e.target.value) })}
                        className="w-24 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">$</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="targetMarginPct" className="text-[#3A4250] font-medium">Margen que querés dejar</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="targetMarginPct"
                        type="number"
                        value={mod09.targetMarginPct}
                        onChange={(e) => setMod09({ ...mod09, targetMarginPct: Number(e.target.value) })}
                        className="w-14 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="cargoTons" className="text-[#3A4250] font-medium">Toneladas de la carga</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="cargoTons"
                        type="number"
                        value={mod09.cargoTons}
                        onChange={(e) => setMod09({ ...mod09, cargoTons: Number(e.target.value) })}
                        className="w-14 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">tn</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="commissionPct" className="text-[#3A4250] font-medium">Comisión del dador de carga o la app</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="commissionPct"
                        type="number"
                        value={mod09.commissionPct}
                        onChange={(e) => setMod09({ ...mod09, commissionPct: Number(e.target.value) })}
                        className="w-12 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="referenceTariffPerTon" className="text-[#3A4250] font-medium">Tarifa de referencia para esa distancia</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="referenceTariffPerTon"
                        type="number"
                        value={mod09.referenceTariffPerTon}
                        onChange={(e) => setMod09({ ...mod09, referenceTariffPerTon: Number(e.target.value) })}
                        className="w-20 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">$/tn</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="marketPctOfReference" className="text-[#3A4250] font-medium">Porcentaje de la referencia que paga el mercado</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="marketPctOfReference"
                        type="number"
                        value={mod09.marketPctOfReference}
                        onChange={(e) => setMod09({ ...mod09, marketPctOfReference: Number(e.target.value) })}
                        className="w-12 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">%</span>
                    </div>
                  </div>
                </div>

                {/* Outputs */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-[11px] font-mono font-bold tracking-wider text-[#6B7280] uppercase mb-2">
                    RESULTADO
                  </div>

                  <div className="bg-[#15181E] text-white p-6 rounded-2xl">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#F97316] font-bold block mb-1">
                      TARIFA MÍNIMA DEL VIAJE
                    </span>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-white">
                        {formatNumber(res09.minTripTariff, 0)}
                      </span>
                      <span className="text-gray-300 font-mono text-lg">$</span>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-gray-700/60 pt-3">
                      Para que te queden {mod09.targetMarginPct} % después de la comisión, ese viaje no puede salir menos de {formatNumber(res09.minTripTariff, 0)} pesos: {formatNumber(res09.minTariffPerTon, 0)} por tonelada. La tarifa de referencia para esa distancia es {formatNumber(mod09.referenceTariffPerTon, 0)} y te dejaría {formatNumber(res09.refMarginAmount, 0)}. Pero el mercado paga cerca del {mod09.marketPctOfReference} % de la referencia: a ese precio, el mismo viaje te deja {formatNumber(res09.marketMarginAmount, 0)}.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        TARIFA MÍNIMA POR TONELADA
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-[#111827]">
                          {formatNumber(res09.minTariffPerTon, 0)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">$/tn</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        LO QUE DEJA LA TARIFA DE REFERENCIA
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-600">
                          {formatNumber(res09.refMarginAmount, 0)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">$</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        LO QUE DEJA EL PRECIO REAL DEL MERCADO
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-red-600">
                          {formatNumber(res09.marketMarginAmount, 0)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">$</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        MARGEN SOBRE LA TARIFA DE REFERENCIA
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-[#111827]">
                          {formatNumber(res09.marginOnRefPct, 1)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFFBEB] border-l-4 border-[#F5B301] p-3.5 rounded-r-xl text-xs text-[#111827] leading-relaxed">
                    En marzo de 2026 FADEEAC publicó una matriz de 50 estructuras de costo con tarifas orientativas para granos: $25.389 por tonelada a 100 km, $77.700 a 500 km y $148.417 a 1.500 km, con metodología auditada por la Facultad de Ciencias Económicas de la UBA. No es obligatoria y el mercado suele pagar alrededor del 70 %. La tabla no te sirve para imponer un precio: te sirve para saber cuánto estás bonificando.
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Callout matching image 3 */}
            <div className="bg-[#15181E] border border-[#3A4250] p-4 rounded-xl text-sm">
              <strong className="text-[#FFCE4D]">Lo que te muestra:</strong> con la tarifa de referencia el viaje deja <span className="text-[#FFCE4D] font-mono font-bold">$346.084</span>. Al 70 % que paga el mercado, el mismo viaje deja <span className="text-red-400 font-mono font-bold">menos $226.489</span>. No es que ganás poco: perdés.
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* CASE 03: CUÁNDO CONVIENE RECHAZAR EL VIAJE (MÓDULO 13) */}
        {/* ============================================================== */}
        {activeTab === '03' && (
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <span className="bg-[#F5B301] text-[#111827] font-black text-lg px-3 py-1 rounded-lg">03</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Cuándo conviene rechazar el viaje
                </h3>
                <p className="text-gray-300 text-sm sm:text-base mt-1 max-w-4xl">
                  Lo que te ofrecen, el costo variable del viaje, el costo fijo de los días que te lleva, y qué probabilidad real tenés de conseguir carga de retorno. Devuelve el resultado como te lo ofrecen, la tarifa mínima para no perder y qué pasa con el retorno adentro.
                </p>
              </div>
            </div>

            <div className="bg-[#F7F5F0] rounded-2xl border border-[#DDD6CA] overflow-hidden text-[#111827] shadow-2xl">
              <div className="bg-[#3A4250] text-gray-200 px-4 py-2 flex items-center justify-between text-xs border-b border-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#F5B301]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
                  <span className="ml-2 font-mono text-gray-300">Planilla de Tarifa & Costo de Transporte 2026 — Criterio Logístico.xlsx</span>
                </div>
              </div>

              <div className="bg-white border-b border-[#DDD6CA] px-4 py-1.5 flex items-center gap-2 text-xs font-mono">
                <span className="bg-gray-100 border border-gray-300 px-2 py-0.5 rounded font-bold text-gray-700">H8</span>
                <span className="text-gray-400 font-serif italic">fx</span>
                <span className="text-gray-800 bg-gray-50 flex-1 px-2 py-0.5 rounded truncate">
                  =$D$8-$D$9-$D$10
                </span>
              </div>

              <div className="bg-[#15181E] text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#3A4250] flex items-center justify-center">
                    <ModuleIcon name="punto-indiferencia" className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[#F97316] text-[10px] font-mono tracking-wider uppercase font-bold block">
                      MÓDULO 13 · DECISIÓN
                    </span>
                    <h4 className="text-lg font-bold">Cuándo conviene rechazar el viaje</h4>
                  </div>
                </div>
                <span className="text-xs bg-[#3A4250] px-3 py-1 rounded text-gray-200">◀ Volver al menú</span>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 space-y-3">
                  <div className="text-[11px] font-mono font-bold tracking-wider text-[#6B7280] uppercase mb-2">
                    DATOS QUE CARGÁS VOS
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <span className="text-[#3A4250] font-medium">Decisión</span>
                    <span className="bg-[#FFCE4D]/25 border border-[#F5B301] px-3 py-0.5 rounded text-xs font-mono font-semibold text-[#111827]">
                      Viaje ofrecido por el grupo · retorno no asegurado
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="offeredPrice" className="text-[#3A4250] font-medium">Lo que te ofrecen por el viaje</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="offeredPrice"
                        type="number"
                        value={mod13.offeredPrice}
                        onChange={(e) => setMod13({ ...mod13, offeredPrice: Number(e.target.value) })}
                        className="w-24 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">$</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="variableCost" className="text-[#3A4250] font-medium">Costo variable del viaje (gasoil, ruta, etc.)</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="variableCost"
                        type="number"
                        value={mod13.variableCost}
                        onChange={(e) => setMod13({ ...mod13, variableCost: Number(e.target.value) })}
                        className="w-24 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">$</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="fixedCostTotalDays" className="text-[#3A4250] font-medium">Costo fijo del día x días del viaje</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="fixedCostTotalDays"
                        type="number"
                        value={mod13.fixedCostTotalDays}
                        onChange={(e) => setMod13({ ...mod13, fixedCostTotalDays: Number(e.target.value) })}
                        className="w-20 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">$</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="returnProbabilityPct" className="text-[#3A4250] font-medium">Probabilidad de conseguir carga de retorno</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="returnProbabilityPct"
                        type="number"
                        value={mod13.returnProbabilityPct}
                        onChange={(e) => setMod13({ ...mod13, returnProbabilityPct: Number(e.target.value) })}
                        className="w-12 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="returnRevenue" className="text-[#3A4250] font-medium">Lo que pagaría ese retorno</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="returnRevenue"
                        type="number"
                        value={mod13.returnRevenue}
                        onChange={(e) => setMod13({ ...mod13, returnRevenue: Number(e.target.value) })}
                        className="w-20 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">$</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="returnVariableCost" className="text-[#3A4250] font-medium">Costo variable extra del retorno</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="returnVariableCost"
                        type="number"
                        value={mod13.returnVariableCost}
                        onChange={(e) => setMod13({ ...mod13, returnVariableCost: Number(e.target.value) })}
                        className="w-20 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">$</span>
                    </div>
                  </div>
                </div>

                {/* Outputs */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-[11px] font-mono font-bold tracking-wider text-[#6B7280] uppercase mb-2">
                    RESULTADO
                  </div>

                  <div className="bg-[#15181E] text-white p-6 rounded-2xl">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#F97316] font-bold block mb-1">
                      RESULTADO DEL VIAJE COMO TE LO OFRECEN
                    </span>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-red-400">
                        {formatNumber(res13.asOfferedResult, 0)}
                      </span>
                      <span className="text-gray-300 font-mono text-lg">$</span>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-gray-700/60 pt-3">
                      Te ofrecen {formatNumber(mod13.offeredPrice, 0)} y el viaje cuesta {formatNumber(res13.minTariffBreakEven, 0)}: perdés {formatNumber(Math.abs(res13.asOfferedResult), 0)} pesos por hacerlo. Ni siquiera cubre el costo variable, que es {formatNumber(mod13.variableCost, 0)}: le estás poniendo plata al gasoil. Con el retorno esperado el viaje suma {formatNumber(res13.expectedReturnContribution, 0)} y aún así queda en {formatNumber(res13.resultWithExpectedReturn, 0)}. La tarifa mínima para no perder es {formatNumber(res13.minTariffBreakEven, 0)}.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        TARIFA MÍNIMA PARA NO PERDER
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-[#111827]">
                          {formatNumber(res13.minTariffBreakEven, 0)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">$</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        CUÁNTO CUBRE DEL COSTO VARIABLE
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-red-600">
                          {formatNumber(res13.variableCovered, 0)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">$</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        LO QUE APORTA EL RETORNO ESPERADO
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-600">
                          {formatNumber(res13.expectedReturnContribution, 0)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">$</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        RESULTADO CON EL RETORNO ESPERADO
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-red-500">
                          {formatNumber(res13.resultWithExpectedReturn, 0)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">$</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFFBEB] border-l-4 border-[#F5B301] p-3.5 rounded-r-xl text-xs text-[#111827] leading-relaxed">
                    El punto de indiferencia no es el costo total: es el costo VARIABLE. Si el camión se iba a quedar parado igual, un viaje que cubre el variable y deja algo arriba te ayuda a pagar el fijo aunque no llegue a la tarifa plena. Lo que nunca se hace es tomar uno que no cubre el variable: ahí no ganás poco, ponés plata para trabajar. Y ojo con volverlo costumbre: si todos tus viajes son «para cubrir el variable», el fijo no lo paga nadie.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#15181E] border border-[#3A4250] p-4 rounded-xl text-sm">
              <strong className="text-[#FFCE4D]">Lo que te muestra:</strong> te ofrecen <span className="text-[#FFCE4D] font-mono font-bold">$1.350.000</span> y el viaje cuesta <span className="text-white font-mono font-bold">$1.562.492</span>. Ni siquiera cubre el costo variable. Ni con el retorno esperado alcanza: el viaje sigue a pérdida.
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* CASE 04: LO QUE TE CUESTA ESPERAR QUE TE CARGUEN (MÓDULO 08) */}
        {/* ============================================================== */}
        {activeTab === '04' && (
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <span className="bg-[#F5B301] text-[#111827] font-black text-lg px-3 py-1 rounded-lg">04</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Lo que te cuesta esperar que te carguen
                </h3>
                <p className="text-gray-300 text-sm sm:text-base mt-1 max-w-4xl">
                  El costo fijo de tu día, las horas de trabajo, las horas que esperaste y cuántas esperas tenés por mes. Sale lo que te costó esa espera, la hora parada, el total del mes y cuánto de tu día cubre la estadía de referencia.
                </p>
              </div>
            </div>

            <div className="bg-[#F7F5F0] rounded-2xl border border-[#DDD6CA] overflow-hidden text-[#111827] shadow-2xl">
              <div className="bg-[#3A4250] text-gray-200 px-4 py-2 flex items-center justify-between text-xs border-b border-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#F5B301]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
                  <span className="ml-2 font-mono text-gray-300">Planilla de Tarifa & Costo de Transporte 2026 — Criterio Logístico.xlsx</span>
                </div>
              </div>

              <div className="bg-white border-b border-[#DDD6CA] px-4 py-1.5 flex items-center gap-2 text-xs font-mono">
                <span className="bg-gray-100 border border-gray-300 px-2 py-0.5 rounded font-bold text-gray-700">H8</span>
                <span className="text-gray-400 font-serif italic">fx</span>
                <span className="text-gray-800 bg-gray-50 flex-1 px-2 py-0.5 rounded truncate">
                  =$D$8/$D$9*$D$10
                </span>
              </div>

              <div className="bg-[#15181E] text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#3A4250] flex items-center justify-center">
                    <ModuleIcon name="espera" className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[#F97316] text-[10px] font-mono tracking-wider uppercase font-bold block">
                      MÓDULO 08 · OPERACIÓN
                    </span>
                    <h4 className="text-lg font-bold">Lo que te cuesta esperar que te carguen</h4>
                  </div>
                </div>
                <span className="text-xs bg-[#3A4250] px-3 py-1 rounded text-gray-200">◀ Volver al menú</span>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 space-y-3">
                  <div className="text-[11px] font-mono font-bold tracking-wider text-[#6B7280] uppercase mb-2">
                    DATOS QUE CARGÁS VOS
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <span className="text-[#3A4250] font-medium">Situación</span>
                    <span className="bg-[#FFCE4D]/25 border border-[#F5B301] px-3 py-0.5 rounded text-xs font-mono font-semibold text-[#111827]">
                      Espera en playa de carga · motor apagado
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="dailyFixedCost" className="text-[#3A4250] font-medium">Costo fijo del día de camión (módulo 01)</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="dailyFixedCost"
                        type="number"
                        value={mod08.dailyFixedCost}
                        onChange={(e) => setMod08({ ...mod08, dailyFixedCost: Number(e.target.value) })}
                        className="w-20 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">$/día</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="dailyWorkHours" className="text-[#3A4250] font-medium">Horas de trabajo del día</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="dailyWorkHours"
                        type="number"
                        value={mod08.dailyWorkHours}
                        onChange={(e) => setMod08({ ...mod08, dailyWorkHours: Number(e.target.value) })}
                        className="w-12 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">h</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="waitingHoursThisTrip" className="text-[#3A4250] font-medium">Horas de espera de este viaje</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="waitingHoursThisTrip"
                        type="number"
                        step="0.5"
                        value={mod08.waitingHoursThisTrip}
                        onChange={(e) => setMod08({ ...mod08, waitingHoursThisTrip: Number(e.target.value) })}
                        className="w-14 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">h</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="waitsPerMonth" className="text-[#3A4250] font-medium">Esperas por mes</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="waitsPerMonth"
                        type="number"
                        value={mod08.waitsPerMonth}
                        onChange={(e) => setMod08({ ...mod08, waitsPerMonth: Number(e.target.value) })}
                        className="w-12 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">esperas</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="fadeeacStayReference" className="text-[#3A4250] font-medium">Estadía de referencia FADEEAC</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="fadeeacStayReference"
                        type="number"
                        value={mod08.fadeeacStayReference}
                        onChange={(e) => setMod08({ ...mod08, fadeeacStayReference: Number(e.target.value) })}
                        className="w-20 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">$/día</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#DDD6CA]/60 text-sm">
                    <label htmlFor="freeHoursBeforeStay" className="text-[#3A4250] font-medium">Horas libres antes de que corra la estadía</label>
                    <div className="flex items-center gap-1 bg-[#FFCE4D]/30 border border-[#F5B301] px-2 py-0.5 rounded">
                      <input
                        id="freeHoursBeforeStay"
                        type="number"
                        value={mod08.freeHoursBeforeStay}
                        onChange={(e) => setMod08({ ...mod08, freeHoursBeforeStay: Number(e.target.value) })}
                        className="w-12 text-right font-mono font-bold text-sm bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-mono text-gray-600">h</span>
                    </div>
                  </div>
                </div>

                {/* Outputs */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-[11px] font-mono font-bold tracking-wider text-[#6B7280] uppercase mb-2">
                    RESULTADO
                  </div>

                  <div className="bg-[#15181E] text-white p-6 rounded-2xl">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#F97316] font-bold block mb-1">
                      LO QUE TE COSTÓ LA ESPERA
                    </span>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-white">
                        {formatNumber(res08.tripWaitCost, 0)}
                      </span>
                      <span className="text-gray-300 font-mono text-lg">$</span>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-gray-700/60 pt-3">
                      {mod08.waitingHoursThisTrip} horas esperando que te carguen no son horas perdidas: son {formatNumber(res08.tripWaitCost, 0)} pesos de costo fijo que corrieron igual, a {formatNumber(res08.hourlyWaitingCost, 0)} la hora. Por mes son {formatNumber(res08.monthWaitCost, 0)}. La estadía de referencia de FADEEAC es {formatNumber(mod08.fadeeacStayReference, 0)} pesos por día, un {formatNumber(res08.stayReferenceCoveragePct, 1)} % de lo que te cuesta el día: el precio alcanza. El problema es que arranca recién a las 24 horas y que casi nadie la factura.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        COSTO DE LA HORA PARADA
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-[#111827]">
                          {formatNumber(res08.hourlyWaitingCost, 0)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">$/h</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        ESPERAS DE UN MES
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-[#111827]">
                          {formatNumber(res08.monthWaitCost, 0)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">$/mes</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        LA ESTADÍA DE REFERENCIA CUBRE
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-600">
                          {formatNumber(res08.stayReferenceCoveragePct, 1)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">%</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#DDD6CA]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block mb-1">
                        HORAS QUE REGALÁS POR MES
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-mono font-bold text-[#111827]">
                          {formatNumber(res08.givenAwayHoursPerMonth, 1)}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">h</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFFBEB] border-l-4 border-[#F5B301] p-3.5 rounded-r-xl text-xs text-[#111827] leading-relaxed">
                    La estadía está en la tarifa de referencia oficial desde hace años: la tabla de la Secretaría de Transporte la fija por hora después de 24 hs del primer turno hábil, y FADEEAC la actualizó a $223.180 por día en marzo de 2026. Que no la cobres no significa que no exista: significa que la estás bonificando.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
