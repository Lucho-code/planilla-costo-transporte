import React from 'react';
import { AlertTriangle, TrendingUp, HelpCircle, PhoneCall } from 'lucide-react';

export const RealProblemSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#EDE9E0]/70 border-y border-[#DDD6CA]">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Eyebrow & Title */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C2410C]">
            EL PROBLEMA REAL
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight max-w-3xl mx-auto leading-tight">
            No es que no sepas cobrar. <br className="hidden sm:inline" />
            Es que el precio salió del grupo de WhatsApp.
          </h2>
        </div>

        {/* 3 Core Agitation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#DDD6CA] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316]">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#111827]">El camión del colega no es el tuyo</h3>
            <p className="text-sm text-[#3A4250] leading-relaxed">
              El colega del grupo tiene otro año de modelo, otro consumo por tonelada, cubiertas que compró en otra fecha o cuotas que vos no tenés. Copiar la tarifa ajena es asumir los costos del otro con tu bolsillo.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#DDD6CA] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#F5B301]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#111827]">FADEEAC no sabe cuánto gastás vos</h3>
            <p className="text-sm text-[#3A4250] leading-relaxed">
              El índice FADEEAC mide 11 rubros y publica porcentajes de aumento promedio para todo el país. Pero jamás te dice cuántos pesos exactos te cuesta salir de tu galpón y volver con la batea vacía.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#DDD6CA] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#111827]">El retorno en vacío se come la ganancia</h3>
            <p className="text-sm text-[#3A4250] leading-relaxed">
              En casi el 47,5 % de los viajes de ida y vuelta, los kilómetros de regreso no se le facturan a nadie. Pero las 18 o 22 cubiertas ruedan y el tanque de gasoil se vacía al 100 %.
            </p>
          </div>
        </div>

        {/* Real Example Callout */}
        <div className="bg-[#15181E] text-white p-6 sm:p-8 rounded-2xl border border-[#3A4250] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-[#F97316] font-bold">
              CASO DE ESTUDIO TÍPICO
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              Km cargado: $778,24 vs. Km real con vuelta vacía: $1.329,68
            </h4>
            <p className="text-sm text-gray-300 max-w-2xl">
              Si cotizás pensando que tu kilómetro vale $778, estás regalando un <strong>+70,9 % de costo de combustible</strong> en cada viaje. Con la planilla cargás tu consumo y el número sale exacto antes de decir que sí.
            </p>
          </div>
          <div className="shrink-0 bg-[#3A4250] px-6 py-4 rounded-xl text-center border border-gray-600">
            <span className="block text-3xl font-mono font-black text-[#FFCE4D]">+70,9%</span>
            <span className="text-xs text-gray-300">Costo real oculto</span>
          </div>
        </div>
      </div>
    </section>
  );
};
