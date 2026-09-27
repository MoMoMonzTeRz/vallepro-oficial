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
import { MasterAdminModal } from './components/MasterAdminModal';
import { CustomerLanding } from './components/CustomerLanding';

/**
 * Normaliza y formatea identificadores de mesa / estación:
 * - "mesa-1", "Mesa-1", "mesa_1" -> "Mesa 1"
 * - "estacion-matias" -> "Estación Matías"
 */
function normalizeTableName(rawTable: string, fallback: string = 'Mesa 1'): string {
  if (!rawTable) return fallback;
  const clean = decodeURIComponent(rawTable).trim();

  const mesaMatch = clean.match(/^mesa[-_\s]*(\w+)$/i);
  if (mesaMatch) {
    return `Mesa ${mesaMatch[1].toUpperCase()}`;
  }

  const estacionMatch = clean.match(/^estacion[-_\s]*(.+)$/i);
  if (estacionMatch) {
    const name = estacionMatch[1].replace(/[-_]/g, ' ');
    return `Estación ${name.replace(/\b\w/g, (c) => c.toUpperCase())}`;
  }

  return clean
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Extrae el slug del local y la mesa desde la URL limpia o searchParams:
 * Soporta:
 *  - /la-montana/mesa-1
 *  - /barberia-aconcagua/estacion-matias
 *  - /lukoton-los-andes/mesa-1
 *  - /pizzeria-san-felipe/mesa-2
 *  - ?rest=la-montana-coffeebar&table=mesa-1
 */
function parseActiveRoute(pathname: string, search: string) {
  const searchParams = new URLSearchParams(search);
  const restQuery = searchParams.get('rest');
  const tableQuery = searchParams.get('table');

  const segments = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);

  let slug = '';
  let rawTable = '';

  if (segments.length > 0) {
    slug = segments[0].toLowerCase();
    if (segments.length > 1) {
      rawTable = segments[1];
    }
  }

  // Compatibilidad hacia atrás si recibe parámetros ?rest=...&table=...
  if (restQuery) {
    slug = restQuery.toLowerCase().trim();
  }
  if (tableQuery) {
    rawTable = tableQuery.trim();
  }

  const defaultTable = slug.includes('barberia') ? 'Estación Matías' : 'Mesa 1';
  const table = normalizeTableName(rawTable, defaultTable);

  return { slug, rawTable, table };
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [currentSearch, setCurrentSearch] = useState<string>(() => {
    return window.location.search || '';
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCotizadorOpen, setIsCotizadorOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === '/admin' || window.location.hash === '#admin';
    }
    return false;
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setCurrentSearch(window.location.search || '');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen to hash, /admin URL, and custom events
  useEffect(() => {
    const checkHashAndAdmin = () => {
      if (window.location.hash === '#onboarding') {
        setIsOnboardingOpen(true);
      } else if (window.location.hash === '#cotizador') {
        setIsCotizadorOpen(true);
      } else if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setIsAdminOpen(true);
      }
    };
    checkHashAndAdmin();
    window.addEventListener('hashchange', checkHashAndAdmin);

    const handleCustomOpenOnboarding = () => setIsOnboardingOpen(true);
    const handleCustomOpenCotizador = () => setIsCotizadorOpen(true);
    const handleCustomOpenAdmin = () => setIsAdminOpen(true);

    window.addEventListener('open-onboarding', handleCustomOpenOnboarding);
    window.addEventListener('open-cotizador', handleCustomOpenCotizador);
    window.addEventListener('open-admin', handleCustomOpenAdmin);

    return () => {
      window.removeEventListener('hashchange', checkHashAndAdmin);
      window.removeEventListener('open-onboarding', handleCustomOpenOnboarding);
      window.removeEventListener('open-cotizador', handleCustomOpenCotizador);
      window.removeEventListener('open-admin', handleCustomOpenAdmin);
    };
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(window.location.pathname || '/');
    setCurrentSearch(window.location.search || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { slug, table } = parseActiveRoute(currentPath, currentSearch);

  // 1. Direct Demo Views
  if (slug === 'la-montana' || slug === 'la-montana-coffeebar') {
    return <LaMontanaDemo table={table} onBackToHome={() => navigate('/')} />;
  }

  if (slug === 'lukoton-los-andes' || slug === 'lukoton') {
    return <LukotonDemo table={table} onBackToHome={() => navigate('/')} />;
  }

  if (slug === 'barberia-aconcagua' || slug === 'barberia') {
    return <BarberiaDemo table={table} onBackToHome={() => navigate('/')} />;
  }

  // 2. Dynamic Customer Landing for New Onboarded Clients
  if (slug && slug !== 'admin' && slug !== 'index.html') {
    return <CustomerLanding slug={slug} table={table} onBackToHome={() => navigate('/')} />;
  }

  // 3. Main Valle Pro Spatial Tech Studio Landing Page
  return (
    <div className="min-h-screen bg-[#08080a] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar
        onNavigateHome={() => navigate('/')}
        currentRoute={currentPath}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenCotizador={() => setIsCotizadorOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
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

      <Footer
        onOpenCotizador={() => setIsCotizadorOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

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

      {/* Modo Valle Pro Master Control Panel Modal */}
      <MasterAdminModal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (currentPath === '/admin' || window.location.hash === '#admin') {
            navigate('/');
          }
        }}
        onNavigateToVenue={(venuePath) => {
          setIsAdminOpen(false);
          navigate(venuePath);
        }}
      />
    </div>
  );
}
