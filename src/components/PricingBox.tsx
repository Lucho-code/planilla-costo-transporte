import React, { useState } from 'react';
import { Check, Shield, ArrowRight, Download, Plus, CheckSquare, Square, Zap } from 'lucide-react';
import { OrderBumpItem } from '../types';

interface PricingBoxProps {
  onCheckout: (total: number, selectedBumps: string[]) => void;
}

export const PricingBox: React.FC<PricingBoxProps> = ({ onCheckout }) => {
  const [selectedBumps, setSelectedBumps] = useState<string[]>([]);

  const orderBumps: OrderBumpItem[] = [
    {
      id: 'bump-cuadros-ruta',
      title: 'Cuadros de Ruta — Tablas del Transportista',
      subtitle: 'Láminas imprimibles plastificadas para cotizar fletes en mano sin tocar la computadora.',
      originalPrice: 25990,
      promoPrice: 15990,
      badge: 'AHORRÁ $10.000',
      icon: '🗺️',
    },
    {
      id: 'bump-500-preguntas',
      title: '500 Preguntas y Respuestas del Transporte de Cargas',
      subtitle: 'Manual práctico de 10 capítulos: normativa CNRT, RUTA, seguros, CCT 40/89, pesos y dimensiones.',
      originalPrice: 29990,
      promoPrice: 19990,
      badge: 'AHORRÁ $10.000',
      icon: '📖',
    },
    {
      id: 'bump-volante-empresa',
      title: 'Del Volante a la Empresa',
      subtitle: 'Guía paso a paso para pasar de chofer/dueño a flota: monotributo vs SRL, contratos y segundo camión.',
      originalPrice: 19990,
      promoPrice: 9990,
      badge: 'AHORRÁ $10.000',
      icon: '🚀',
    },
  ];

  const basePrice = 22990;
  const bumpsTotal = selectedBumps.reduce((acc, id) => {
    const bump = orderBumps.find((b) => b.id === id);
    return acc + (bump ? bump.promoPrice : 0);
  }, 0);
  const totalPrice = basePrice + bumpsTotal;

  const toggleBump = (id: string) => {
    if (selectedBumps.includes(id)) {
      setSelectedBumps(selectedBumps.filter((b) => b !== id));
    } else {
      setSelectedBumps([...selectedBumps, id]);
    }
  };

  const formatMoney = (amount: number) => {
    return amount.toLocaleString('es-AR');
  };

  return (
    <section id="oferta" className="py-20 px-4 sm:px-6 bg-[#F7F5F0]">
      <div className="max-w-4xl mx-auto">
        {/* Main Offer Card */}
        <div className="bg-white rounded-3xl border-2 border-[#DDD6CA] shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#15181E] text-white p-6 sm:p-8 text-center space-y-2">
            <span className="inline-block text-xs font-mono font-bold tracking-widest text-[#FFCE4D] uppercase bg-[#3A4250] px-3 py-1 rounded-full">
              ACCESO COMPLETO & INMEDIATO · PAGO ÚNICO
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Planilla de Tarifa & Costo de Transporte 2026
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
              Todo resuelto en un solo archivo: 14 módulos, más de 70 funciones, fórmulas abiertas y compatibilidad total.
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            {/* Features Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {[
                'Los 14 módulos completos sin versiones recortadas ni bloqueos',
                'Navegación interna con botones directos al menú principal',
                'Fórmulas 100% abiertas y auditables (sin macros ocultas)',
                'Módulo 02 específico: absorción de km en vacío y retorno',
                'Módulo 08: costo exacto de la hora parada de espera',
                'Módulo 13: semáforo de rechazo vs. costo variable',
                'Guía rápida en PDF de 1 página para cargar datos en 5 minutos',
                'Compatible con Microsoft Excel (.xlsx) y Google Sheets',
                'Funciona en PC, Mac, tablets y celulares (Android e iOS)',
                'Uso sin conexión a internet permanente en ruta o galpón',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-[#111827]">
                  <Check className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Price Presentation */}
            <div className="bg-[#EDE9E0]/60 p-6 rounded-2xl border border-[#DDD6CA] text-center space-y-3">
              <div className="flex items-center justify-center gap-3">
                <span className="text-base sm:text-lg text-[#6B7280] line-through font-mono">
                  $49.990 ARS
                </span>
                <span className="text-xs font-bold uppercase tracking-wider bg-[#C2410C] text-white px-2.5 py-0.5 rounded-full">
                  54% OFF LANZAMIENTO
                </span>
              </div>

              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl sm:text-6xl font-black text-[#111827] font-mono tracking-tight">
                  ${formatMoney(basePrice)}
                </span>
                <span className="text-sm sm:text-base font-bold text-[#6B7280]">ARS</span>
              </div>

              <p className="text-xs sm:text-sm text-[#3A4250] font-medium max-w-md mx-auto">
                Lo pagás una sola vez. Menos que un cambio de aceite, menos que media cubierta. Te queda para siempre.
              </p>
            </div>

            {/* Order Bumps / Complementos en Checkout */}
            <div className="space-y-4 pt-4 border-t border-[#DDD6CA]">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#F97316]" />
                <h3 className="font-bold text-base sm:text-lg text-[#111827]">
                  Completá tu pedido con estos activos para transportistas (opcional):
                </h3>
              </div>

              <div className="space-y-3">
                {orderBumps.map((bump) => {
                  const isChecked = selectedBumps.includes(bump.id);
                  return (
                    <div
                      key={bump.id}
                      onClick={() => toggleBump(bump.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isChecked
                          ? 'border-[#F97316] bg-[#F97316]/5 ring-1 ring-[#F97316]'
                          : 'border-[#DDD6CA] bg-white hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 shrink-0 text-[#F97316]">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-[#F97316]" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{bump.icon}</span>
                            <span className="font-bold text-sm sm:text-base text-[#111827]">
                              {bump.title}
                            </span>
                            <span className="text-[10px] font-mono font-bold bg-[#FFCE4D]/30 border border-[#F5B301] text-[#111827] px-2 py-0.5 rounded">
                              {bump.badge}
                            </span>
                          </div>
                          <p className="text-xs text-[#6B7280]">{bump.subtitle}</p>
                        </div>
                      </div>

                      <div className="text-right sm:shrink-0 pl-8 sm:pl-0">
                        <span className="text-xs text-gray-400 line-through mr-2 font-mono">
                          ${formatMoney(bump.originalPrice)}
                        </span>
                        <span className="text-base font-black text-[#111827] font-mono">
                          +${formatMoney(bump.promoPrice)} ARS
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total and Checkout CTA */}
            <div className="pt-4 flex flex-col items-center gap-4">
              <button
                id="pricing-checkout-cta"
                onClick={() => onCheckout(totalPrice, selectedBumps)}
                className="w-full bg-gradient-to-r from-[#F97316] to-[#C2410C] text-white p-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex flex-col items-center justify-center gap-1 group"
              >
                <div className="flex items-center gap-3 text-xl sm:text-2xl font-black">
                  <span>Descargar la planilla ahora</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                </div>
                <span className="text-xs sm:text-sm text-orange-100 font-mono">
                  Total a pagar: ${formatMoney(totalPrice)} ARS (Pago único)
                </span>
              </button>

              <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Garantía de reembolso de 7 días · Pasarela oficial Mercado Pago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
