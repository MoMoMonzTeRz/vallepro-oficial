import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Solutions } from './components/Solutions';
import { LiveMirrorHub } from './components/LiveMirrorHub';
import { DualShieldLab } from './components/DualShieldLab';
import { HardwareBento } from './components/HardwareBento';
import { NetworkAnalyticsHub } from './components/NetworkAnalyticsHub';
import { Pricing } from './components/Pricing';
import { AconcaguaCoverage } from './components/AconcaguaCoverage';
import { Footer } from './components/Footer';
import { ValleAIChatbot } from './components/ValleAIChatbot';
import { LaMontanaDemo } from './demos/LaMontanaDemo';
import { LukotonDemo } from './demos/LukotonDemo';
import { BarberiaDemo } from './demos/BarberiaDemo';
import { OnboardingModal } from './components/OnboardingModal';
import { CotizadorModal } from './components/CotizadorModal';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCotizadorOpen, setIsCotizadorOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen to hash and custom events for onboarding & cotizador
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#onboarding') {
        setIsOnboardingOpen(true);
      } else if (window.location.hash === '#cotizador') {
        setIsCotizadorOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    const handleCustomOpenOnboarding = () => setIsOnboardingOpen(true);
    const handleCustomOpenCotizador = () => setIsCotizadorOpen(true);

    window.addEventListener('open-onboarding', handleCustomOpenOnboarding);
    window.addEventListener('open-cotizador', handleCustomOpenCotizador);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('open-onboarding', handleCustomOpenOnboarding);
      window.removeEventListener('open-cotizador', handleCustomOpenCotizador);
    };
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Subroute Views
  if (currentRoute === '/la-montana') {
    return <LaMontanaDemo onBackToHome={() => navigate('/')} />;
  }

  if (currentRoute === '/lukoton-los-andes') {
    return <LukotonDemo onBackToHome={() => navigate('/')} />;
  }

  if (currentRoute === '/barberia-aconcagua') {
    return <BarberiaDemo onBackToHome={() => navigate('/')} />;
  }

  // Main Valle Pro Spatial Tech Studio Landing Page
  return (
    <div className="min-h-screen bg-[#08080a] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar
        onNavigateHome={() => navigate('/')}
        currentRoute={currentRoute}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenCotizador={() => setIsCotizadorOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero: The NFC Interactive Workshop */}
        <Hero
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          onOpenCotizador={() => setIsCotizadorOpen(true)}
        />

        {/* 2. The Four Pillars & Real Visual Sectors */}
        <Solutions />

        {/* 3. Live Mirror Hub: Client Landing Integration (Production iFrame) */}
        <LiveMirrorHub onNavigate={navigate} />

        {/* 4. Closed-Circuit Dual-Shield Reputation Lab */}
        <DualShieldLab />

        {/* 5. Tactical Hardware Bento Box (14x10 cm Standard Acrylic Stand) */}
        <HardwareBento />

        {/* 6. Centralized Monitoring & Real-time Network Analytics */}
        <NetworkAnalyticsHub />

        {/* 7. Transparent Pricing in CLP (Packs & Monthly Service) */}
        <Pricing
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          onOpenCotizador={() => setIsCotizadorOpen(true)}
        />

        {/* 8. Local Physical Presence in Aconcagua */}
        <AconcaguaCoverage />
      </main>

      <Footer onOpenCotizador={() => setIsCotizadorOpen(true)} />

      {/* Valle AI Floating Commercial Advisor */}
      <ValleAIChatbot />

      {/* Client Onboarding Modal (6 Steps to AI Landing Generator) */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      {/* Interactive Quotation Calculator Modal */}
      <CotizadorModal
        isOpen={isCotizadorOpen}
        onClose={() => setIsCotizadorOpen(false)}
        onOpenOnboarding={() => {
          setIsCotizadorOpen(false);
          setIsOnboardingOpen(true);
        }}
      />
    </div>
  );
}
