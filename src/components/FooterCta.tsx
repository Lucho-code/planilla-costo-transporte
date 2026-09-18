import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface FooterCtaProps {
  onCtaClick: () => void;
}

export const FooterCta: React.FC<FooterCtaProps> = ({ onCtaClick }) => {
  return (
    <footer className="bg-[#15181E] text-white border-t border-[#3A4250] pt-16 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Strong closing punchline */}
        <div className="space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-[#FFCE4D] uppercase">
            DECISIÓN OPERATIVA FINAL
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Los viajes van a seguir apareciendo. <br />
            El precio lo vas a poner igual.
          </h2>
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            La única decisión es si lo ponés adivinando o con el número real en la mano.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-2 flex flex-col items-center gap-3">
          <button
            onClick={onCtaClick}
            className="group inline-flex flex-col items-center justify-center bg-gradient-to-r from-[#F97316] to-[#C2410C] text-white px-10 py-5 rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-[0.99] transition-all min-w-[320px]"
          >
            <div className="flex items-center gap-3 text-xl sm:text-2xl font-black tracking-wide">
              <span>Quiero la planilla 2026</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </div>
            <span className="text-xs text-orange-100 mt-0.5">
              Acceso de por vida · $22.990 ARS
            </span>
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Descarga inmediata asegurada vía Mercado Pago</span>
          </div>
        </div>

        {/* Brand and Copyright Footer */}
        <div className="border-t border-gray-800 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2026 Criterio Logístico. Todos los derechos reservados.
          </div>
          <div className="text-center sm:text-right">
            Planilla de Tarifa & Costo de Transporte 2026. Diseñada en Argentina.
          </div>
        </div>
      </div>
    </footer>
  );
};
