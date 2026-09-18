import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { RealProblemSection } from './components/RealProblemSection';
import { ModulesGrid } from './components/ModulesGrid';
import { InteractiveSpreadsheetShowcase } from './components/SpreadsheetShowcase';
import { ComparisonTable } from './components/ComparisonTable';
import { PricingBox } from './components/PricingBox';
import { SocialProof } from './components/SocialProof';
import { FaqAndGuarantee } from './components/FaqAndGuarantee';
import { FooterCta } from './components/FooterCta';
import { CheckoutModal } from './components/CheckoutModal';
import { Full14ModulesApp } from './components/Full14ModulesApp';
import { fullProductionPrompt } from './promptText';
import { Copy, Check, Calculator, Layout, FileCode2, Layers, Mountain } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'app-14-modulos' | 'movimiento-suelo' | 'landing' | 'prompt'>('app-14-modulos');
  const [selectedModuleId, setSelectedModuleId] = useState<number>(2);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(22990);
  const [selectedBumps, setSelectedBumps] = useState<string[]>([]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [utms, setUtms] = useState<Record<string, string>>({});

  // Capture UTM parameters on landing as mandated by specification
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
      const captured: Record<string, string> = {};

      utmKeys.forEach((key) => {
        const val = urlParams.get(key);
        if (val) {
          captured[key] = val;
          sessionStorage.setItem(key, val);
        } else {
          const stored = sessionStorage.getItem(key);
          if (stored) captured[key] = stored;
        }
      });

      setUtms(captured);
    }
  }, []);

  const handleOpenCheckout = (total = 22990, bumps: string[] = []) => {
    setCheckoutTotal(total);
    setSelectedBumps(bumps);
    setIsCheckoutOpen(true);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(fullProductionPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const scrollToSection = (id: string) => {
    setActiveView('landing');
    setTimeout(() => {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#111827] flex flex-col selection:bg-[#F97316] selection:text-white">
      {/* Top Floating Control Bar */}
      <nav className="sticky top-0 z-40 bg-[#15181E]/95 backdrop-blur-md text-white border-b border-[#3A4250] px-4 py-2.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="font-bold text-xs sm:text-sm tracking-wide">
              Criterio Logístico 2026
            </span>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-[#3A4250]/70 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveView('app-14-modulos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'app-14-modulos'
                  ? 'bg-[#F97316] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Carga General</span>
            </button>

            <button
              onClick={() => setActiveView('movimiento-suelo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'movimiento-suelo'
                  ? 'bg-[#FFCE4D] text-black shadow-sm font-extrabold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Mountain className="w-3.5 h-3.5" />
              <span>Movimiento de Suelo</span>
            </button>

            <button
              onClick={() => setActiveView('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'landing'
                  ? 'bg-[#F97316] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Portada & Oferta</span>
            </button>

            <button
              onClick={() => setActiveView('prompt')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'prompt'
                  ? 'bg-[#F97316] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prompt Maestro</span>
            </button>
          </div>

          <button
            onClick={() => handleOpenCheckout(22990, [])}
            className="hidden sm:inline-flex bg-gradient-to-r from-[#F97316] to-[#C2410C] hover:opacity-95 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm"
          >
            Comprar ($22.990)
          </button>
        </div>
      </nav>

      {/* VIEW: 14 Modules Interactive App (Carga General) */}
      {activeView === 'app-14-modulos' && (
        <main className="flex-1">
          <Full14ModulesApp
            initialModuleId={selectedModuleId}
            initialIndustry="carga-general"
            onGoToLanding={() => setActiveView('landing')}
          />
        </main>
      )}

      {/* VIEW: 14 Modules Interactive App (Movimiento de Suelo) */}
      {activeView === 'movimiento-suelo' && (
        <main className="flex-1">
          <Full14ModulesApp
            initialModuleId={selectedModuleId}
            initialIndustry="movimiento-suelo"
            onGoToLanding={() => setActiveView('landing')}
          />
        </main>
      )}

      {/* VIEW: Prompt Master Specs */}
      {activeView === 'prompt' && (
        <main className="flex-1 py-10 px-4 sm:px-6 max-w-5xl mx-auto w-full">
          <div className="bg-white rounded-3xl border border-[#DDD6CA] shadow-xl overflow-hidden">
            <div className="bg-[#15181E] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#FFCE4D] tracking-widest font-bold">
                  DOCUMENTO TÉCNICO & INGENIERÍA INVERSA
                </span>
                <h2 className="text-xl sm:text-2xl font-black mt-1">Prompt de Producción Completo</h2>
              </div>
              <button
                onClick={handleCopyPrompt}
                className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#C2410C] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all self-start sm:self-auto"
              >
                {copiedPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPrompt ? '¡Copiado al Portapapeles!' : 'Copiar Prompt Completo'}</span>
              </button>
            </div>

            <div className="p-6">
              <pre className="p-6 bg-[#15181E] text-gray-200 text-xs rounded-2xl overflow-x-auto font-mono leading-relaxed border border-[#3A4250] max-h-[750px] whitespace-pre-wrap">
                {fullProductionPrompt}
              </pre>
            </div>
          </div>
        </main>
      )}

      {/* VIEW: Landing Page & Commercial Showcase */}
      {activeView === 'landing' && (
        <main className="flex-1">
          {/* Section 1: Hero */}
          <Hero
            onCtaClick={() => handleOpenCheckout(22990, [])}
            onExploreModulesClick={() => scrollToSection('modulos')}
          />

          {/* Section 2: Real Problem Agitation */}
          <RealProblemSection />

          {/* Section 3: The 14 Modules Grid */}
          <ModulesGrid
            selectedModuleId={selectedModuleId}
            onSelectModule={(id) => {
              setSelectedModuleId(id);
              setActiveView('app-14-modulos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Section 4: Deep Showcase with Live Formula Calculations */}
          <InteractiveSpreadsheetShowcase />

          {/* Section 5: Comparison Table */}
          <ComparisonTable
            onSelectModule={(id) => {
              setSelectedModuleId(id);
              setActiveView('app-14-modulos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Section 6 & 7: Price Box with Order Bumps */}
          <PricingBox
            onCheckout={(total, bumps) => handleOpenCheckout(total, bumps)}
          />

          {/* Section 8: Social Proof */}
          <SocialProof />

          {/* Section 9: FAQ & Guarantee */}
          <FaqAndGuarantee />

          {/* Section 10: Closing CTA & Footer */}
          <FooterCta onCtaClick={() => handleOpenCheckout(22990, [])} />
        </main>
      )}

      {/* Safe Checkout Modal with UTM propagation */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalAmount={checkoutTotal}
        selectedBumps={selectedBumps}
        utms={utms}
      />
    </div>
  );
}
