import React, { useState } from 'react';
import {
  ExternalLink,
  Smartphone,
  Maximize2,
  UtensilsCrossed,
  Flame,
  Scissors,
  Star,
  CheckCircle,
  Eye,
  X,
  Battery,
  Wifi as WifiIcon,
} from 'lucide-react';

interface DemosShowcaseProps {
  onNavigate: (route: string) => void;
}

export const DemosShowcase: React.FC<DemosShowcaseProps> = ({ onNavigate }) => {
  const [activePreview, setActivePreview] = useState<'la-montana' | 'lukoton' | 'barberia' | null>(null);

  const demos = [
    {
      id: 'la-montana',
      route: '/la-montana',
      realUrl: 'https://valle-pro-test.vercel.app/?rest=la-montana-coffeebar&table=mesa-1',
      title: 'La Montaña Coffee Bar',
      category: 'Restobar / Cafetería',
      location: 'Esmeralda 537, Los Andes',
      rating: '4.9 ★ (420+)',
      description:
        'Experiencia real en Mesa 1 con NFC: café de especialidad ($3.400), tostón palta reina ($7.200), clave Wi-Fi integrada y comanda directa a cocina.',
      highlights: ['Mesa 1 NFC Activa', 'Promo Fogón Flash', 'Wi-Fi MontanaGuest2026', 'Comandas WhatsApp'],
      icon: UtensilsCrossed,
      accentColor: 'from-amber-500/20 to-amber-900/10 border-amber-500/30 text-amber-400',
      btnColor: 'bg-amber-500 hover:bg-amber-400 text-slate-950',
    },
    {
      id: 'barberia',
      route: '/barberia-aconcagua',
      realUrl: 'https://valle-pro-test.vercel.app/?rest=barberia-aconcagua&table=estacion-matias',
      title: 'Barbería Aconcagua',
      category: 'Barbería & Grooming',
      location: 'Prat 412, San Felipe Centro',
      rating: '4.95 ★ (510+)',
      description:
        'Agenda de turnos interactiva, Estación Matías con NFC en espejo, catálogo de cortes modernos con tiempos/precios y blindaje de reseñas 5 estrellas para Google Maps.',
      highlights: ['Estación Matías NFC', 'Catálogo Contactless', 'Filtro Reseñas 5★'],
      icon: Scissors,
      accentColor: 'from-cyan-500/20 to-cyan-900/10 border-cyan-500/30 text-cyan-400',
      btnColor: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950',
    },
    {
      id: 'lukoton',
      route: '/lukoton-los-andes',
      realUrl: 'https://valle-pro-test.vercel.app/?rest=lukoton-los-andes&table=mesa-1',
      title: 'Lukotón Los Andes',
      category: 'Comida Rápida / Bajón',
      location: 'Calle Esmeralda 842, Los Andes',
      rating: '4.8 ★ (850+)',
      description:
        'Menú de bajón tradicional chileno (completos gigantes, as luco, mechadas) con comanda en vivo a cocina o delivery para Los Andes/San Felipe.',
      highlights: ['Mesa 1 NFC', 'Completos & Mechadas', 'Delivery Los Andes / San Felipe'],
      icon: Flame,
      accentColor: 'from-orange-500/20 to-orange-900/10 border-orange-500/30 text-orange-400',
      btnColor: 'bg-orange-500 hover:bg-orange-400 text-slate-950',
    },
  ];

  const currentPreviewDemo = demos.find((d) => d.id === activePreview);

  return (
    <section id="demos" className="py-24 relative overflow-hidden bg-[#0c0c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            Experiencias Reales de Cliente en el Valle
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Showcase de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Demos en Producción</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Explora la interfaz idéntica que cargan los comensales y clientes de Los Andes y San Felipe al acercar su celular al soporte NFC o escanear el QR:
          </p>
        </div>

        {/* 3 Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {demos.map((demo) => {
            const Icon = demo.icon;
            return (
              <div
                key={demo.id}
               
                className="rounded-3xl bg-[#121217] border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition duration-300 group shadow-xl relative overflow-hidden"
              >
                {/* Top Badge */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {demo.rating}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    {demo.category}
                  </span>
                  <h3 className="text-xl font-bold text-white font-display mb-1">{demo.title}</h3>
                  <p className="text-xs text-amber-300/80 font-mono mb-3">{demo.location}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{demo.description}</p>

                  {/* Highlights tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {demo.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800"
                      >
                        <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-5 border-t border-slate-800/80 mt-6">
                  <button
                    onClick={() => setActivePreview(demo.id as any)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition active:scale-98 shadow-sm"
                  >
                    <Smartphone className="w-4 h-4 text-amber-400" />
                    <span>Simular en Celular</span>
                  </button>

                  <a
                    href={demo.realUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition active:scale-98 ${demo.btnColor}`}
                  >
                    <span>Abrir Landing Real</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* In-Page Interactive Phone Simulator Modal with Production iframe */}
        {activePreview && currentPreviewDemo && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
            {/* Phone Frame Mockup */}
            <div className="relative w-full max-w-sm sm:max-w-md h-[92vh] max-h-[860px] flex flex-col bg-[#050608] border-[6px] border-slate-700/80 rounded-[44px] shadow-2xl overflow-hidden ring-1 ring-white/10">
              {/* Dynamic Island / Speaker Notch Bar */}
              <div className="relative w-full bg-[#0d0e14] px-6 pt-3 pb-2 flex items-center justify-between text-[11px] font-semibold text-slate-300 border-b border-slate-800/60 select-none">
                <span>14:05</span>

                {/* Notch Pill */}
                <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center gap-2 border border-slate-800/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  <span className="w-2 h-2 rounded-full bg-cyan-500/40" />
                </div>

                <div className="flex items-center gap-1.5">
                  <WifiIcon className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-[10px] font-mono">5G</span>
                  <Battery className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

              {/* Sub-header navigation inside phone mockup */}
              <div className="flex items-center justify-between px-3 py-2 bg-[#12131b] border-b border-slate-800 text-xs">
                <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider truncate max-w-[200px]">
                  ⚡ {currentPreviewDemo.title}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={currentPreviewDemo.realUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Pestaña Nueva
                  </a>
                  <button
                    onClick={() => setActivePreview(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700"
                    title="Cerrar simulador"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Embedded Production iFrame */}
              <div className="flex-1 w-full h-full bg-[#0a0b10] overflow-hidden">
                <iframe
                  src={currentPreviewDemo.realUrl}
                  title={currentPreviewDemo.title}
                  className="w-full h-full border-0"
                  allow="clipboard-write"
                  loading="eager"
                />
              </div>

              {/* Phone Home Indicator Bar at Bottom */}
              <div className="w-full bg-[#0d0e14] py-1.5 flex justify-center border-t border-slate-800/40 select-none">
                <div className="w-32 h-1 bg-slate-600 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
