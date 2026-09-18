import React from 'react';
import { MessageSquare, Quote, Star } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const whatsappMessages = [
    {
      sender: 'Mariano B. — Mercedes Benz 1634 (Rosario)',
      time: '14:22',
      text: 'Hernán, no te puedo creer. Metí el viaje a Bahía Blanca con el retorno vacío que siempre me comía. Estaba pasando $820 el km pensando que ganaba un 20%. Con la planilla me saltó que mi km real era $1.280. Le pasé el número al dador convencido y me lo aceptó igual. Salvé el mes.',
      highlight: 'Salvé el mes',
    },
    {
      sender: 'Claudio G. — Scania R410 (Zárate)',
      time: '18:45',
      text: 'El módulo de horas de espera es oro en polvo. Me tuvieron 9 horas clavado en la playa de descarga en Campana. Le saqué la cuenta del costo fijo horario directo de la planilla y se lo pasé al operador de tráfico. Me reconocieron la estadía sin chistar.',
      highlight: 'Me reconocieron la estadía',
    },
    {
      sender: 'Esteban R. — Iveco Stralis (Córdoba)',
      time: '09:12',
      text: 'La semana pasada me ofrecían un viaje de cereal que según el grupo era un caño. Metí los números en el módulo 13 de punto de indiferencia: no cubría ni el gasoil de ida. Dejé el camión parado y a las 48 hs agarré uno que me dejó $420.000 limpios.',
      highlight: 'No cubría ni el gasoil',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#EDE9E0]/40">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Origin Story */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DDD6CA] shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-[#15181E] text-white flex flex-col items-center justify-center shrink-0 border-2 border-[#F97316]">
            <span className="text-3xl sm:text-4xl font-black text-[#FFCE4D]">HS</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mt-1">Zárate</span>
          </div>

          <div className="space-y-3 text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C2410C]">
              HISTORIA DE ORIGEN
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#111827]">
              «La armé para mí porque me cansé de descubrir a fin de mes que había hecho un montón de viajes y quedado en cero.»
            </h3>
            <p className="text-sm sm:text-base text-[#3A4250] leading-relaxed">
              Soy Hernán Sosa, transportista en el corredor de Ruta 9. Durante años vi cómo los aumentos de gasoil se comían el cheque antes de cobrarlo. FADEEAC me decía que los costos subían 4%, pero en la estación de servicio el gasoil subía 12% y en la gomería las cubiertas estaban en dólares. Necesitaba una herramienta matemática blindada para sentarme a negociar con números propios.
            </p>
          </div>
        </div>

        {/* Real WhatsApp Messages Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C2410C]">
              EXPERIENCIAS EN RUTA
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#111827]">
              Colegas que ya cotizan con número en mano
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whatsappMessages.map((msg, idx) => (
              <div
                key={idx}
                className="bg-[#E7FFDB] p-5 rounded-2xl border border-[#C1E8A8] shadow-xs flex flex-col justify-between text-left space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#C1E8A8]/80 pb-2 mb-3">
                    <span className="font-bold text-xs text-[#111827]">{msg.sender}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{msg.time}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#111827] leading-relaxed">
                    «{msg.text}»
                  </p>
                </div>

                <div className="inline-block bg-white/70 border border-[#A2DB83] px-2.5 py-1 rounded-md text-[11px] font-bold text-[#1F6E1D] self-start">
                  ✓ {msg.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
