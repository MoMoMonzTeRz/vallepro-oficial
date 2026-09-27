import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  ExternalLink,
  UtensilsCrossed,
  Flame,
  Scissors,
  RotateCcw,
  Sparkles,
  Wifi,
  MapPin,
  Clock,
} from 'lucide-react';
import { registrarToqueNFC } from '../services/telemetry';

interface LiveMirrorHubProps {
  onNavigate?: (route: string) => void;
}

export const LiveMirrorHub: React.FC<LiveMirrorHubProps> = () => {
  const [activeVenue, setActiveVenue] = useState<'la-montana' | 'barberia' | 'lukoton'>('la-montana');
  const [iframeKey, setIframeKey] = useState<number>(0);

  const venues = [
    {
      id: 'la-montana',
      name: 'La Montaña Coffee Bar',
      category: 'Restobar / Cafetería',
      badge: 'Gastronomía & Specialty Coffee',
      location: 'Esmeralda 537, Los Andes',
      table: 'Mesa 1 (Salón Principal) • NFC Activo',
      hours: 'Lunes a Sábado: 12:00 a 23:30 hrs',
      rating: '4.9 ★ (420+)',
      icon: UtensilsCrossed,
      url: '/?rest=la-montana-coffeebar&table=mesa-1&embed=true',
      highlights: ['Flat White $3.400', 'Tostón Palta Reina $7.200', 'Hamburguesa Fogón $11.900'],
      color: 'border-amber-500/50 text-amber-400 bg-amber-500/10',
    },
    {
      id: 'barberia',
      name: 'Barbería Aconcagua',
      category: 'Barbería & Grooming',
      badge: 'Servicios & Cuidado Personal',
      location: 'Prat 412, San Felipe Centro',
      table: 'Estación Matías (Espejo NFC)',
      hours: 'Lunes a Sábado: 10:00 a 20:00 hrs',
      rating: '4.95 ★ (510+)',
      icon: Scissors,
      url: '/?rest=barberia-aconcagua&table=estacion-matias&embed=true',
      highlights: ['Degradado Clásico $12.000', 'Barba Ritual $9.000', 'Corte + Barba $18.000'],
      color: 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10',
    },
    {
      id: 'lukoton',
      name: 'Lukotón Los Andes',
      category: 'Comida Rápida / Bajón',
      badge: 'Comida Rápida & Delivery',
      location: 'Calle Esmeralda 842, Los Andes',
      table: 'Mesa 1 (Salón / Punto NFC)',
      hours: 'Lunes a Domingo: 18:00 a 03:00 hrs',
      rating: '4.8 ★ (850+)',
      icon: Flame,
      url: '/?rest=lukoton-los-andes&table=mesa-1&embed=true',
      highlights: ['Completo Italiano $3.600', 'As Luco Marraqueta $4.900', 'Mechada Chacarera $6.500'],
      color: 'border-orange-500/50 text-orange-400 bg-orange-500/10',
    },
  ];

  const currentVenue = venues.find((v) => v.id === activeVenue) || venues[0];

  // Listen to external selection events (e.g. from DemosShowcase)
  useEffect(() => {
    const handleSelectMirror = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && ['la-montana', 'barberia', 'lukoton'].includes(customEvent.detail)) {
        setActiveVenue(customEvent.detail as 'la-montana' | 'barberia' | 'lukoton');
        setIframeKey((k) => k + 1);
      }
    };
    window.addEventListener('select-mirror-venue', handleSelectMirror);
    return () => window.removeEventListener('select-mirror-venue', handleSelectMirror);
  }, []);

  const handleSelectVenue = (id: 'la-montana' | 'barberia' | 'lukoton') => {
    setActiveVenue(id);
    setIframeKey((prev) => prev + 1);

    const slugMap: Record<string, { slug: string; table: string }> = {
      'la-montana': { slug: 'la-montana-coffeebar', table: 'mesa-1' },
      'barberia': { slug: 'barberia-aconcagua', table: 'estacion-matias' },
      'lukoton': { slug: 'lukoton-los-andes', table: 'mesa-1' },
    };

    const target = slugMap[id] || { slug: id, table: 'mesa-1' };
    registrarToqueNFC(target.slug, target.table);
  };

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
    const slugMap: Record<string, { slug: string; table: string }> = {
      'la-montana': { slug: 'la-montana-coffeebar', table: 'mesa-1' },
      'barberia': { slug: 'barberia-aconcagua', table: 'estacion-matias' },
      'lukoton': { slug: 'lukoton-los-andes', table: 'mesa-1' },
    };
    const target = slugMap[activeVenue] || { slug: activeVenue, table: 'mesa-1' };
    registrarToqueNFC(target.slug, target.table);
  };

  return (
    <section id="live-mirror" className="py-28 lg:py-36 relative overflow-hidden bg-[#07080b]">
      {/* Background Subtle Ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Generous Whitespace */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Smartphone className="w-4 h-4 text-amber-400" />
            LIVE MIRROR HUB • VISOR REAL DE PRODUCCIÓN
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            La misma pantalla que ve tu cliente{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              al apoyar su teléfono.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Interactúa en vivo con las landings oficiales de producción alojadas en la red Valle Pro. Cambia entre locales para probar la experiencia en vivo:
          </p>
        </div>

        {/* Minimalist Venue Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-2xl mx-auto">
          {venues.map((venue) => {
            const Icon = venue.icon;
            const isSelected = activeVenue === venue.id;
            return (
              <button
                key={venue.id}
                onClick={() => handleSelectVenue(venue.id as any)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-xl shadow-amber-500/25 scale-102 border border-amber-400'
                    : 'bg-[#11131b] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{venue.name}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-slate-950/20 text-slate-950 font-extrabold' : 'bg-slate-800 text-emerald-400'
                  }`}
                >
                  PROD LIVE
                </span>
              </button>
            );
          })}
        </div>

        {/* Centerpiece: Phone Chassis & Action Controls */}
        <div className="flex flex-col items-center">
          
          {/* Action Bar Above Phone */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
            <button
              onClick={() => window.open(currentVenue.url, '_blank')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-lg shadow-amber-500/25 transition active:scale-95"
            >
              <span>Abrir Landing en Pestaña Nueva</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
            </button>

            <button
              onClick={handleRefresh}
              title="Recargar marco de producción"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-mono font-semibold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Recargar</span>
            </button>
          </div>

          {/* iPhone 15 Chassis Mockup */}
          <div
            className="relative w-full max-w-[390px] h-[780px] flex flex-col bg-[#07080c] border-[8px] border-slate-700/80 rounded-[52px] shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden ring-1 ring-white/10"
          >
            {/* Dynamic Island & Speaker Bar */}
            <div className="relative w-full bg-[#0c0e14] px-7 pt-3 pb-2 flex items-center justify-between text-[11px] font-semibold text-slate-300 border-b border-slate-800/60 select-none z-30">
              <span className="font-mono text-[10px]">14:05</span>

              {/* Dynamic Island Pill */}
              <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center gap-2 border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                <span>5G</span>
                <span className="text-emerald-400 font-semibold">100%</span>
              </div>
            </div>

            {/* Embedded Live Venue Viewport: Adjusted Perfectly with rounded-[38px] */}
            <div className="flex-1 w-full h-full bg-[#0c0d12] relative overflow-hidden flex flex-col p-1">
              <iframe
                key={`${currentVenue.id}-${iframeKey}`}
                src={currentVenue.url}
                title={`Landing Real ${currentVenue.name}`}
                className="w-full h-full border-0 rounded-[38px] overflow-y-auto"
                allow="clipboard-write; payment; geolocation"
                loading="eager"
              />
            </div>

            {/* iPhone Home Indicator */}
            <div className="w-full bg-[#0c0e14] py-2 flex justify-center border-t border-slate-800/60 select-none z-30">
              <div className="w-32 h-1 bg-slate-600 rounded-full" />
            </div>
          </div>

          {/* Under-Phone Summary Details Badge */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs max-w-xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{currentVenue.table}</span>
              <span className="text-slate-600">|</span>
              <span className="text-amber-400 font-bold">{currentVenue.location}</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">{currentVenue.hours}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
