import React, { useState } from 'react';
import { X, Copy, Check, Calculator, FileSpreadsheet, Sparkles, Edit3 } from 'lucide-react';

interface FormulaInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleId: number;
  moduleTitle: string;
  cellRef: string;
  excelFormula: string;
  evaluatedFormula: string;
  resultLabel: string;
  resultValue: string;
  engineeringExplanation: string;
  variables: { name: string; ref: string; value: string; unit: string }[];
  onFocusInput?: () => void;
}

export const FormulaInspectorModal: React.FC<FormulaInspectorModalProps> = ({
  isOpen,
  onClose,
  moduleId,
  moduleTitle,
  cellRef,
  excelFormula,
  evaluatedFormula,
  resultLabel,
  resultValue,
  engineeringExplanation,
  variables,
  onFocusInput,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(excelFormula);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#15181E] border border-[#3A4250] text-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0E1015] px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#F97316] flex items-center justify-center text-white font-mono font-bold text-xs">
              fx
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFCE4D] font-bold">
                  MÓDULO {String(moduleId).padStart(2, '0')} · {cellRef}
                </span>
                <span className="text-[10px] bg-[#3A4250] text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                  100% AUDITABLE
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                {resultLabel}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto font-sans text-sm">
          {/* Exact Comparison quote from the image */}
          <div className="p-3.5 rounded-xl bg-[#F97316]/10 border border-[#F97316]/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
            <div className="text-xs text-orange-200">
              <span className="font-bold text-white block mb-0.5">
                La regla de la planilla: "Tocás la celda y la ves entera. Podés editarla"
              </span>
              A diferencia del índice que solo publica la metodología general, aquí tenés la fórmula matemática exacta que corre en la celda viva.
            </div>
          </div>

          {/* Excel Formula Raw Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <span className="font-bold text-gray-200">FÓRMULA EXACTA DE EXCEL / SHEETS</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[#FFCE4D] hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiada' : 'Copiar fórmula'}</span>
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0E1015] border border-gray-700 font-mono text-sm text-[#FFCE4D] break-all select-all">
              {excelFormula}
            </div>
          </div>

          {/* Evaluated Formula with Real Numbers */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-gray-400">
              VALORES DE TU CAMIÓN SUSTITUIDOS EN TIEMPO REAL
            </span>
            <div className="p-3.5 rounded-xl bg-[#1C2028] border border-gray-700 font-mono text-xs text-gray-300 break-all leading-relaxed">
              = {evaluatedFormula}
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-gray-400">Resultado calculado en esta celda:</span>
              <span className="text-lg font-mono font-black text-emerald-400">
                {resultValue}
              </span>
            </div>
          </div>

          {/* Dynamic Variables Breakdown */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-gray-400 uppercase">
              Celdas y Variables que alimentan este resultado
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {variables.map((v, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-[#0E1015] border border-gray-800 flex items-center justify-between">
                  <div className="truncate pr-2">
                    <span className="text-[#FFCE4D] font-bold mr-1.5">{v.ref}:</span>
                    <span className="text-gray-300">{v.name}</span>
                  </div>
                  <span className="text-white font-bold shrink-0">
                    {v.value} {v.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Engineering Rationale */}
          <div className="p-4 rounded-xl bg-[#0E1015] border border-gray-800 text-xs text-gray-300 space-y-1.5">
            <span className="font-bold text-[#FFCE4D] font-mono uppercase block">
              Fundamento de Costos y Transporte
            </span>
            <p className="leading-relaxed text-gray-300">
              {engineeringExplanation}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#0E1015] border-t border-gray-800 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-mono">
            Sin macros ocultas ni celdas protegidas con contraseña
          </span>
          <div className="flex items-center gap-2">
            {onFocusInput && (
              <button
                onClick={() => {
                  onClose();
                  onFocusInput();
                }}
                className="flex items-center gap-1.5 bg-[#F97316] hover:bg-[#C2410C] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Modificar valores</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-[#3A4250] hover:bg-gray-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
