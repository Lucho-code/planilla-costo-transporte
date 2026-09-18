import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Copy, Check, Lock, ExternalLink, X } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  selectedBumps: string[];
  utms: Record<string, string>;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  totalAmount,
  selectedBumps,
  utms,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate safe webhook checkout dispatch
    setTimeout(() => {
      setIsProcessing(false);
      setCompleted(true);
    }, 1200);
  };

  const utmQueryString = new URLSearchParams(utms).toString();
  const checkoutUrl = `https://pay.hvpage.com/c/criteriotransporte?${utmQueryString}&amount=${totalAmount}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#DDD6CA]">
        {/* Modal Top Bar */}
        <div className="bg-[#15181E] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <div>
              <h3 className="font-bold text-lg">Checkout Seguro Mercado Pago</h3>
              <span className="text-xs text-gray-400">Entrega digital inmediata</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completed ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-[#111827]">¡Orden Confirmada con Éxito!</h4>
            <p className="text-sm text-[#3A4250] leading-relaxed">
              Hemos enviado a <strong className="text-[#111827]">{email}</strong> el enlace temporal firmado para descargar el archivo Excel (.xlsx) y el acceso a Google Sheets.
            </p>
            <div className="p-4 bg-[#F7F5F0] rounded-2xl border border-[#DDD6CA] text-xs font-mono text-left space-y-1">
              <div><strong>ID Transacción:</strong> MP-2026-948192</div>
              <div><strong>Monto Abonado:</strong> ${totalAmount.toLocaleString('es-AR')} ARS</div>
              <div><strong>Garantía:</strong> 7 días incondicional</div>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-[#15181E] text-white py-3 rounded-xl font-bold hover:bg-[#3A4250] transition-colors"
            >
              Cerrar y volver a la plataforma
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-[#F7F5F0] p-4 rounded-2xl border border-[#DDD6CA] space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#3A4250] font-medium">Planilla de Tarifa & Costo 2026</span>
                <span className="font-bold font-mono">$22.990 ARS</span>
              </div>
              {selectedBumps.length > 0 && (
                <div className="flex justify-between text-xs text-[#6B7280]">
                  <span>{selectedBumps.length} complementos agregados</span>
                  <span className="font-mono">+${(totalAmount - 22990).toLocaleString('es-AR')} ARS</span>
                </div>
              )}
              <div className="border-t border-[#DDD6CA] pt-2 flex justify-between font-bold text-base text-[#111827]">
                <span>Total Final</span>
                <span className="font-mono text-[#C2410C]">${totalAmount.toLocaleString('es-AR')} ARS</span>
              </div>
            </div>

            <div className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Hernán Sosa"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD6CA] text-sm focus:border-[#F97316] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">
                  Correo Electrónico (donde recibís la planilla)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tuemail@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD6CA] text-sm focus:border-[#F97316] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">
                  WhatsApp (para soporte técnico)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej. +54 9 11 4000-0000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD6CA] text-sm focus:border-[#F97316] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-[#F97316] to-[#C2410C] text-white py-4 rounded-xl font-black text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{isProcessing ? 'Procesando con Mercado Pago...' : 'Pagar con Mercado Pago'}</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Pago 100% cifrado y protegido por Mercado Pago</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
