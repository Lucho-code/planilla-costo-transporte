import React from 'react';
import { ShieldCheck, ArrowRight, Download, Zap, FileSpreadsheet, WifiOff, CheckCircle } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
  onExploreModulesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick, onExploreModulesClick }) => {
  return (
    <header className="relative pt-6 pb-16 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Top Brandbar */}
      <div className="flex items-center justify-between py-4 border-b border-[#DDD6CA] mb-12">
        <div className="flex items-center gap-3">
          {/* Logo SVG matching specification: steering wheel with orange and gold center */}
          <div className="w-10 h-10 rounded-xl bg-[#15181E] flex items-center justify-center p-1.5 shadow-md">
            <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
              <circle cx="16" cy="16" r="13" stroke="#F97316" strokeWidth="2.5" />
              <circle cx="16" cy="16" r="5" fill="#F5B301" stroke="#15181E" strokeWidth="1.5" />
              <path d="M5 16H11M21 16H27M16 21V27M16 5V11" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <span className="font-black text-lg tracking-wider text-[#111827] uppercase">
              CRITERIO LOGÍSTICO
            </span>
            <span className="block text-[10px] font-mono text-[#6B7280] tracking-widest uppercase">
              Transporte & Tarifas 2026
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExploreModulesClick}
            className="hidden md:inline-flex text-xs font-bold uppercase tracking-wider text-[#3A4250] hover:text-[#111827] px-3 py-1.5"
          >
            Ver 14 Módulos
          </button>
          <button
            onClick={onCtaClick}
            className="bg-[#15181E] text-white hover:bg-[#3A4250] text-xs font-bold px-4 py-2 rounded-xl transition-all"
          >
            Comprar ($22.990)
          </button>
        </div>
      </div>

      {/* Hero Headline & Pitch */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDE9E0] border border-[#DDD6CA] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
          <span className="text-xs sm:text-sm font-bold tracking-wide text-[#111827]">
            VERSIÓN 2026 · 14 MÓDULOS · +70 FUNCIONES
          </span>
        </div>

        {/* H1 Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#111827] tracking-tight leading-[1.1]">
          Cuánto te deja cada viaje, <br className="hidden sm:inline" />
          <span className="text-[#C2410C]">en un solo archivo.</span>
        </h1>

        {/* Lead Text */}
        <p className="text-base sm:text-xl text-[#3A4250] leading-relaxed max-w-3xl mx-auto font-normal">
          El costo real de tu kilómetro con el retorno en vacío adentro, la amortización y las cubiertas que no te factura nadie, lo que te cuesta la hora de espera, la tarifa mínima del viaje eventual, hasta dónde aguanta el descuento del viaje fijo y en qué punto conviene rechazar. Cargás los datos de tu camión y sale el número. Sin suscripción y sin internet.
        </p>

        {/* Big High-Conversion CTA Button */}
        <div className="pt-4 flex flex-col items-center gap-3">
          <button
            id="hero-main-cta"
            onClick={onCtaClick}
            className="group relative inline-flex flex-col items-center justify-center bg-gradient-to-r from-[#F97316] to-[#C2410C] text-white px-10 py-4 sm:py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 w-full sm:w-auto min-w-[320px]"
            style={{ outline: 'none' }}
          >
            <div className="flex items-center gap-3 text-xl sm:text-2xl font-black tracking-wide">
              <span>Quiero la planilla</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </div>
            <span className="text-xs sm:text-sm text-orange-100 font-medium tracking-normal mt-0.5">
              Acceso inmediato · Descarga al instante
            </span>
          </button>

          {/* Security Note */}
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Compra segura con Mercado Pago · Garantía incondicional de 7 días</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#DDD6CA] shadow-xs">
            <FileSpreadsheet className="w-5 h-5 text-[#F97316] shrink-0" />
            <span className="text-xs font-bold text-[#111827]">Excel y Google Sheets</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#DDD6CA] shadow-xs">
            <WifiOff className="w-5 h-5 text-[#F97316] shrink-0" />
            <span className="text-xs font-bold text-[#111827]">Funciona sin internet</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#DDD6CA] shadow-xs">
            <Zap className="w-5 h-5 text-[#F97316] shrink-0" />
            <span className="text-xs font-bold text-[#111827]">Pago único, no suscripción</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#DDD6CA] shadow-xs">
            <CheckCircle className="w-5 h-5 text-[#F97316] shrink-0" />
            <span className="text-xs font-bold text-[#111827]">Acceso de por vida</span>
          </div>
        </div>
      </div>
    </header>
  );
};
