import React from 'react';
import { ShieldAlert, HelpCircle } from 'lucide-react';

export const FaqAndGuarantee: React.FC = () => {
  const faqs = [
    {
      q: '¿Necesito saber usar Excel avanzado para usarla?',
      a: 'No. La planilla está diseñada bajo la regla de celdas amarillas: sólo completás los casilleros en amarillo (precio del gasoil, km de ida y vuelta, costo de tus cubiertas) y todos los cálculos, resúmenes, porcentajes y semáforos de rechazo se calculan automáticamente sin tocar ninguna fórmula.',
    },
    {
      q: '¿Sirve para un utilitario o furgón, o es sólo para camión con acoplado?',
      a: 'Sirve para cualquier vehículo de transporte terrestre: desde utilitarios livianos (Kangoo, Berlingo, Sprinter) hasta camiones chasis, balancines, semirremolques y bateas. Incluye el módulo 11 especializado en paquetería, volumen en metros cúbicos y peso aforado.',
    },
    {
      q: '¿Reemplaza al índice de FADEEAC?',
      a: 'No, se complementan perfectamente. El índice FADEEAC es una referencia macroeconómica del sector auditada por la FCE-UBA. La planilla toma esa referencia y te dice cuánto representa en tu camión puntual, absorbiendo tus kilómetros reales en vacío y tus horas de espera.',
    },
    {
      q: '¿De dónde salen los valores y metodologías de cálculo?',
      a: 'De la metodología oficial de costos de transporte de cargas de Argentina (CCT 40/89 Camioneros para viáticos y comidas, fórmulas polinómicas de desgaste y amortizaciones según valor de reposición de unidad y batea 2026).',
    },
    {
      q: '¿La tarifa de referencia es obligatoria o legalmente exigible?',
      a: 'No es una tarifa impuesta por ley; es orientativa de mercado. La utilidad clave de tenerla calculada adentro de la planilla es saber con exactitud cuánto descuento o bonificación te está pidiendo el dador de carga o la app antes de aceptar el flete.',
    },
    {
      q: '¿Cómo y cuándo recibo la planilla?',
      a: 'La entrega es inmediata y automatizada. Ni bien Mercado Pago confirma la acreditación del pago, recibís un correo electrónico con el enlace de descarga del archivo .xlsx para Excel y el acceso directo para abrirlo y guardarlo en Google Sheets.',
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-16">
      {/* 7-Day Guarantee Card */}
      <div className="bg-[#15181E] text-white p-8 sm:p-10 rounded-3xl border border-[#3A4250] shadow-xl text-center space-y-4">
        <div className="w-16 h-16 bg-[#F97316]/20 border border-[#F97316] rounded-2xl flex items-center justify-center mx-auto text-[#F97316]">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white">
          Garantía Incondicional de 7 Días
        </h3>

        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Descargá la planilla, abrila en tu computadora o celular, cargá los datos de tu camión y ponela a prueba en tus próximos tres viajes. Si sentís que no refleja tu operación o que no te ayuda a cobrar mejor, nos mandás un mensaje y te devolvemos el 100% de tu dinero en el acto. Sin vueltas ni explicaciones.
        </p>
      </div>

      {/* Accessible HTML <details> FAQ Accordion */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C2410C]">
            RESOLVEMOS TUS DUDAS
          </span>
          <h3 className="text-3xl sm:text-4xl font-black text-[#111827]">
            Preguntas Frecuentes
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-white rounded-2xl border border-[#DDD6CA] p-5 [&_summary::-webkit-details-marker]:hidden transition-all duration-200 open:border-[#F97316]/60 open:shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#111827]">
                <span>{faq.q}</span>
                <span className="shrink-0 text-xl font-mono text-[#F97316] group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-[#3A4250] leading-relaxed border-t border-[#DDD6CA]/60 pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
