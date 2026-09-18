import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ComparisonTableProps {
  onSelectModule?: (moduleId: number) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ onSelectModule }) => {
  const rows = [
    {
      feature: 'Qué te da',
      fadeeac: 'Cuánto subieron los costos del sector, en porcentaje',
      planilla: 'Cuánto sale tu viaje, en pesos, con tu consumo y tu equipo',
      moduleId: 5,
      moduleLabel: 'Módulo 05: Costo Total',
    },
    {
      feature: 'De quién es el camión',
      fadeeac: 'De un equipo promedio del país',
      planilla: 'Del tuyo: tu consumo, tus cubiertas, tus km, tu deuda',
      moduleId: 1,
      moduleLabel: 'Módulo 01: Costos Fijos',
    },
    {
      feature: 'La vuelta en vacío',
      fadeeac: 'No la ve: la tarifa es por tonelada de ida',
      planilla: 'Módulo propio, con el consumo sin carga y los km de retorno',
      moduleId: 2,
      moduleLabel: 'Módulo 02: Gasoil con/sin carga',
    },
    {
      feature: 'La hora de espera',
      fadeeac: 'Tiene un valor de estadía, pero recién a las 24 horas',
      planilla: 'Te dice qué te costó cada espera y cuántas horas regalás por mes',
      moduleId: 8,
      moduleLabel: 'Módulo 08: Hora de Espera',
    },
    {
      feature: 'Aceptar o rechazar',
      fadeeac: 'No opina: no sabe tu costo variable',
      planilla: 'Punto de indiferencia, con la probabilidad de retorno adentro',
      moduleId: 13,
      moduleLabel: 'Módulo 13: Indiferencia',
    },
    {
      feature: 'Ver la fórmula',
      fadeeac: 'Metodología publicada, planilla no',
      planilla: 'Tocás la celda y la ves entera. Podés editarla',
      moduleId: 2,
      moduleLabel: 'Barra de fórmulas fx activa',
    },
    {
      feature: 'Cómo se usa',
      fadeeac: 'Leés la noticia y estimás a ojo cuánto ajustar',
      planilla: 'Cargás el índice del mes y sale el precio actualizado',
      moduleId: 12,
      moduleLabel: 'Módulo 12: Actualización FADEEAC',
    },
  ];

  return (
    <section id="comparacion" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header matching exact copy and layout from image */}
      <div className="text-center space-y-4 mb-12">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#C2410C] block">
          LA COMPARACIÓN HONESTA
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight max-w-3xl mx-auto leading-tight">
          Sí, el índice de FADEEAC es gratis. Este es el punto.
        </h2>
        <p className="text-base sm:text-lg text-[#3A4250] max-w-2xl mx-auto leading-relaxed">
          Nadie discute que el índice sirva: es la mejor referencia que tiene el sector y sale todos los meses. El problema es que mide variaciones porcentuales de once rubros, y vos tenés que pasarle un precio a un cliente que te pregunta cuánto sale ese viaje.
        </p>
      </div>

      {/* Faithful Replication Table */}
      <div className="overflow-hidden rounded-2xl border border-[#DDD6CA] shadow-lg bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-[#15181E] text-white">
                <th className="py-4 px-6 w-1/4 text-xs font-mono font-bold tracking-wider uppercase text-transparent select-none">
                  CRITERIO
                </th>
                <th className="py-4 px-6 w-[37%] text-xs font-mono font-bold tracking-wider uppercase text-gray-200 border-l border-gray-800 text-center">
                  EL ÍNDICE Y LA TARIFA DE REFERENCIA
                </th>
                <th className="py-4 px-6 w-[38%] text-xs font-mono font-bold tracking-wider uppercase text-[#F97316] border-l border-gray-800 text-center">
                  PLANILLA DE TARIFA &amp; COSTO
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] text-sm">
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  onClick={() => onSelectModule && onSelectModule(row.moduleId)}
                  className={`group transition-colors ${
                    onSelectModule ? 'cursor-pointer hover:bg-amber-50/60' : ''
                  }`}
                  title={onSelectModule ? `Ver ${row.moduleLabel} en la app interactiva` : undefined}
                >
                  {/* Left Column: Feature name */}
                  <td className="py-5 px-6 font-bold text-[#111827] text-[15px] align-middle">
                    {row.feature}
                  </td>

                  {/* Middle Column: FADEEAC Index limitation */}
                  <td className="py-5 px-6 text-[#6B7280] text-[14px] leading-relaxed border-l border-[#E5E0D8] text-center align-middle">
                    {row.fadeeac}
                  </td>

                  {/* Right Column: Spreadsheet solution */}
                  <td className="py-5 px-6 bg-[#F0F7FF] text-[#0F172A] font-bold text-[14px] leading-relaxed border-l border-[#D6E6F9] text-center align-middle group-hover:bg-[#E4F0FD] transition-colors relative">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span>{row.planilla}</span>
                      {onSelectModule && (
                        <span className="text-[11px] font-mono text-[#F97316] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                          Probar en la app <ArrowRight className="w-3 h-3 inline" />
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Interactive Banner */}
        {onSelectModule && (
          <div className="bg-[#FAF8F5] p-4 border-t border-[#DDD6CA] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#3A4250]">
              <Sparkles className="w-4 h-4 text-[#F97316]" />
              <span className="font-medium">
                Cada fila de esta tabla está conectada a un módulo real de la app que podés probar ahora mismo.
              </span>
            </div>
            <button
              onClick={() => onSelectModule(2)}
              className="bg-[#15181E] hover:bg-[#3A4250] text-white font-bold px-4 py-2 rounded-xl transition-all shadow-sm shrink-0"
            >
              Abrir Simulador con los 14 Módulos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
