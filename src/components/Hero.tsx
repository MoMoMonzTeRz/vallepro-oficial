import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Radio,
  Star,
  Sparkles,
  Eye,
  MessageCircle,
  Check,
  TrendingUp,
  Activity,
  Zap,
  Calculator,
} from 'lucide-react';
import { ValleProLogo } from './ValleProLogo';
import {
  obtenerMetricasAcumuladas,
  subscribeToMetrics,
  registrarToqueNFC,
  MetricasCentrales,
} from '../services/telemetry';

interface FloatingSatellite {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  glow: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

interface HeroProps {
  onOpenOnboarding?: () => void;
  onOpenCotizador?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOnboarding, onOpenCotizador }) => {
  const [isNfcActive, setIsNfcActive] = useState(false);
  const [metrics, setMetrics] = useState<MetricasCentrales>({
    toquesTotales: 142854,
    quejasEvitadas: 524,
    isLive: false,
  });

  useEffect(() => {
    // 3. Petición GET a la API central de Google Apps Script
    obtenerMetricasAcumuladas().then((data) => {
      setMetrics(data);
    });

    const unsubscribe = subscribeToMetrics((updated) => {
      setMetrics(updated);
    });

    const interval = setInterval(() => {
      obtenerMetricasAcumuladas(true);
    }, 25000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mousePosRef = useRef<{ x: number; y: number; isInside: boolean }>({
    x: -9999,
    y: -9999,
    isInside: false,
  });

  // Exactly 4 Clean Translucent Glass Satellites (Google 5★, NFC Pulse, WhatsApp Shield, Cero Apps)
  const [satellites, setSatellites] = useState<FloatingSatellite[]>([
    {
      id: 'google',
      label: 'Google 5★',
      sublabel: 'Acelerador de Reseñas',
      icon: '⭐',
      glow: 'rgba(245, 158, 11, 0.28)',
      x: 28,
      y: 16,
      vx: 0.08,
      vy: -0.06,
      baseX: 28,
      baseY: 16,
    },
    {
      id: 'nfc',
      label: 'NFC Pulse',
      sublabel: 'Lectura en 0.2 seg',
      icon: '📶',
      glow: 'rgba(6, 182, 212, 0.28)',
      x: 80,
      y: 24,
      vx: -0.07,
      vy: 0.08,
      baseX: 80,
      baseY: 24,
    },
    {
      id: 'shield',
      label: 'WhatsApp Shield',
      sublabel: 'Filtro Anti-Reclamos',
      icon: '🛡️',
      glow: 'rgba(16, 185, 129, 0.28)',
      x: 22,
      y: 80,
      vx: 0.07,
      vy: 0.09,
      baseX: 22,
      baseY: 80,
    },
    {
      id: 'native',
      label: '100% Sin Apps',
      sublabel: 'iOS & Android Nativo',
      icon: '📱',
      glow: 'rgba(255, 255, 255, 0.22)',
      x: 78,
      y: 84,
      vx: -0.08,
      vy: -0.07,
      baseX: 78,
      baseY: 84,
    },
  ]);

  const draggedSatelliteRef = useRef<string | null>(null);

  // Subtle Smooth Zero-G Harmonic Float + Fluid Proximity Repulsion Loop
  useEffect(() => {
    let animId: number;
    let tick = 0;

    const loop = () => {
      tick++;
      const t = tick * 0.018;
      const mouse = mousePosRef.current;

      setSatellites((prev) =>
        prev.map((sat, idx) => {
          if (draggedSatelliteRef.current === sat.id) return sat;

          const waveX = Math.sin(t + idx * 1.57) * 0.08;
          const waveY = Math.cos(t * 0.85 + idx * 1.25) * 0.08;

          let newX = sat.x + sat.vx + waveX;
          let newY = sat.y + sat.vy + waveY;

          // Proximity repulsion with cursor
          if (mouse.isInside && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const satPixelX = (sat.x / 100) * rect.width;
            const satPixelY = (sat.y / 100) * rect.height;

            const dx = satPixelX - mouse.x;
            const dy = satPixelY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 140;

            if (dist < repelRadius && dist > 2) {
              const force = (1 - dist / repelRadius) * 0.42;
              newX += (dx / dist) * force;
              newY += (dy / dist) * force;
            }
          }

          // Gentle elastic spring to anchor region
          newX += (sat.baseX - newX) * 0.009;
          newY += (sat.baseY - newY) * 0.009;

          // Soft bounds clamp
          if (newX < 6) newX = 6;
          if (newX > 94) newX = 94;
          if (newY < 8) newY = 8;
          if (newY > 92) newY = 92;

          return {
            ...sat,
            x: newX,
            y: newY,
          };
        })
      );

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handlePointerDown = (id: string) => {
    draggedSatelliteRef.current = id;
  };

  const handlePointerUp = () => {
    draggedSatelliteRef.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isInside: true,
    };

    if (draggedSatelliteRef.current) {
      const currentId = draggedSatelliteRef.current;
      const pctX = ((e.clientX - rect.left) / rect.width) * 100;
      const pctY = ((e.clientY - rect.top) / rect.height) * 100;

      setSatellites((prev) =>
        prev.map((s) => (s.id === currentId ? { ...s, x: pctX, y: pctY } : s))
      );
    }
  };

  const handleMouseLeave = () => {
    mousePosRef.current.isInside = false;
    draggedSatelliteRef.current = null;
  };

  const triggerNFCTap = () => {
    setIsNfcActive(true);
    registrarToqueNFC('soporte-acrilico-hero', 'mesa-1');
    setTimeout(() => setIsNfcActive(false), 3000);
  };

  return (
    <section id="hero" className="relative pt-36 pb-28 md:pt-44 md:pb-36 overflow-hidden">
      {/* Subtle Atmospheric Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[540px] bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Layout 60/40 on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: 60% Width */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Minimalist Studio Eyebrow Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-amber-500/25 text-amber-400 text-xs font-mono tracking-wider uppercase backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>VALLE PRO • HARDWARE & SPATIAL TECH</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] font-display">
                Hardware inteligente que digitaliza tu mesa en{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                  0.2 segundos.
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl font-normal">
                Soportes acrílicos de mesa estándar de <strong className="text-white">14 cm x 10 cm</strong> con gráfica fotográfica HD protegida y microchip NFC pasivo para gastronomía, cafeterías y salones de <strong className="text-white font-semibold">Los Andes y San Felipe</strong>. Sin cables ni baterías, y con blindaje de reseñas 5★ para Google Maps.
              </p>
            </div>

            {/* MAIN CTAS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              {/* 1. Activar mi Local ⚡ (Ficha Técnica Onboarding) */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenOnboarding) {
                    onOpenOnboarding();
                  } else {
                    window.dispatchEvent(new CustomEvent('open-onboarding'));
                  }
                }}
                className="flex items-center justify-center gap-2 px-7 py-4.5 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 hover:from-emerald-400 hover:to-amber-300 text-slate-950 shadow-xl shadow-emerald-500/30 active:scale-95 transition-all group"
              >
                <Zap className="w-4 h-4 fill-slate-950 group-hover:rotate-12 transition-transform" />
                <span>Activar mi Local ⚡</span>
              </button>

              {/* 2. Ver Demo en Vivo */}
              <a
                href="#live-mirror"
                className="flex items-center justify-center gap-2.5 px-6 py-4.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-xl shadow-amber-500/20 active:scale-95 transition-all"
              >
                <Eye className="w-4 h-4 text-slate-950" />
                <span>Ver Demos</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </a>

              {/* 3. Cotizar en Línea ⚡ */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenCotizador) {
                    onOpenCotizador();
                  } else {
                    window.dispatchEvent(new CustomEvent('open-cotizador'));
                  }
                }}
                className="flex items-center justify-center gap-2 px-6 py-4.5 rounded-2xl font-bold text-sm bg-[#111219]/90 hover:bg-[#181a24] text-amber-400 hover:text-amber-300 border border-amber-500/30 hover:border-amber-400 transition-all active:scale-95 shadow-md group"
                title="Calcular cotización interactiva en CLP"
              >
                <Calculator className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Cotizar en Línea ⚡</span>
              </button>
            </div>

            {/* Live Metrics Counter from Central Google Apps Script API */}
            <div className="p-4 rounded-2xl bg-[#0d0e14]/90 border border-amber-500/25 shadow-xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>Toques Totales (API)</span>
                  </div>
                  <div className="text-2xl font-extrabold text-white font-display mt-0.5">
                    {metrics.toquesTotales.toLocaleString('es-CL')}
                  </div>
                </div>

                <div className="h-8 w-px bg-slate-800" />

                <div>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Quejas Evitadas (API)</span>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-400 font-display mt-0.5">
                    {metrics.quejasEvitadas.toLocaleString('es-CL')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Google Apps Script Live Sync</span>
              </div>
            </div>

            {/* Micro-Specs Line */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 font-mono pt-4 border-t border-slate-800/80">
              <span className="flex items-center gap-2 text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Acrílico Estándar 14x10 cm
              </span>
              <span className="flex items-center gap-2 text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Papel Fotográfico HD
              </span>
              <span className="flex items-center gap-2 text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> NXP NTAG213 13.56 MHz
              </span>
              <span className="flex items-center gap-2 text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Instalación en 48 hrs
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: 40% Width - Acrylic Table Stand Pure Render + Glass Satellites */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onPointerUp={handlePointerUp}
              className="relative w-full max-w-[480px] h-[500px] sm:h-[540px] flex items-center justify-center select-none"
            >
              {/* Stand Floor Cast Shadow */}
              <div className="absolute bottom-10 w-72 h-10 bg-black/70 rounded-full blur-2xl pointer-events-none" />

              {/* 3D Realistic Acrylic Stand (14 cm x 10 cm Standard Format) */}
              <div
                onClick={triggerNFCTap}
                className="relative z-20 cursor-pointer w-64 sm:w-72 h-84 sm:h-96 rounded-3xl transition-transform duration-500 hover:scale-[1.02] flex flex-col justify-between p-7 group shadow-[0_30px_80px_rgba(0,0,0,0.85)] overflow-hidden"
                style={{
                  background:
                    'linear-gradient(150deg, rgba(255, 255, 255, 0.12) 0%, rgba(25, 27, 38, 0.8) 35%, rgba(10, 11, 16, 0.95) 100%)',
                  backdropFilter: 'blur(28px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow:
                    '0 25px 60px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 0 25px rgba(245,158,11,0.06)',
                  transform: 'perspective(1000px) rotateY(-6deg) rotateX(4deg)',
                }}
                title="Toca el soporte para simular el escaneo NFC"
              >
                {/* Chamfered Crystal Edge Reflections */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-white/25 via-transparent to-amber-500/10" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

                {/* Top Header Inside Acrylic with Official VP Monogram & Typography */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <ValleProLogo size="sm" showSubtext={true} />
                  <span className="text-[9px] text-amber-400/90 uppercase tracking-widest font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    14x10 CM
                  </span>
                </div>

                {/* Central Core: High-Res Photographic Graphic + NTAG213 */}
                <div className="my-auto flex flex-col items-center justify-center relative">
                  
                  {/* Subtle Expanding RF Waves on Tap */}
                  <div
                    className={`absolute w-36 h-36 rounded-full border border-amber-500/30 transition-all duration-1000 pointer-events-none ${
                      isNfcActive ? 'scale-150 opacity-0 border-emerald-400' : 'animate-ping'
                    }`}
                  />
                  <div className="absolute w-24 h-24 rounded-full border border-cyan-500/20 pointer-events-none" />

                  {/* Micro-antenna coil graphic under acrylic */}
                  <div className="w-20 h-20 rounded-full border border-amber-500/40 bg-gradient-to-tr from-black/80 to-slate-900/80 flex flex-col items-center justify-center shadow-inner relative group-hover:border-amber-400 transition-colors">
                    <Radio className={`w-8 h-8 ${isNfcActive ? 'text-emerald-400' : 'text-amber-400'} transition-colors`} />
                    <span className="text-[9px] font-mono text-amber-300 font-bold mt-0.5">NTAG213</span>
                  </div>

                  <p className="font-mono text-[11px] text-slate-300 mt-4 text-center font-medium">
                    {isNfcActive ? (
                      <span className="text-emerald-400 font-bold animate-pulse">
                        ✓ NFC Detectado (0.18s)
                      </span>
                    ) : (
                      'Acerca tu teléfono aquí'
                    )}
                  </p>
                </div>

                {/* Stand Footer Engraving */}
                <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>13.56 MHz PASIVO</span>
                  <span className="text-amber-400/90 font-semibold">+ QR DINÁMICO</span>
                </div>
              </div>

              {/* 4 Clean Translucent Glass Satellites Floating around the Stand */}
              {satellites.map((sat) => {
                const isDragged = draggedSatelliteRef.current === sat.id;
                return (
                  <div
                    key={sat.id}
                    onPointerDown={() => handlePointerDown(sat.id)}
                    style={{
                      left: `${sat.x}%`,
                      top: `${sat.y}%`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: `0 8px 30px ${sat.glow}, 0 0 1px 1px rgba(255,255,255,0.18)`,
                    }}
                    className={`absolute z-30 cursor-grab active:cursor-grabbing px-3.5 py-2 rounded-2xl transition-shadow ${
                      isDragged ? 'scale-105 ring-2 ring-amber-400/80 z-40' : ''
                    }`}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(18px)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                      }}
                    />

                    <div className="relative z-10 flex items-center gap-2.5 whitespace-nowrap">
                      <span className="text-base select-none">{sat.icon}</span>
                      <div>
                        <p className="font-bold text-[11px] text-white leading-tight">
                          {sat.label}
                        </p>
                        <p className="text-[9px] text-slate-300 font-mono leading-tight mt-0.5">
                          {sat.sublabel}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

        </div>

        {/* Live Metrics Ticker Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display tracking-tight">+140.000</div>
            <div className="text-[11px] font-mono text-slate-400 mt-1 uppercase">Toques NFC Registrados</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display tracking-tight">4.92 ★</div>
            <div className="text-[11px] font-mono text-slate-400 mt-1 uppercase">Promedio Google Maps</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display tracking-tight">94%</div>
            <div className="text-[11px] font-mono text-slate-400 mt-1 uppercase">Reclamos Públicos Evitados</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">0.2 Seg</div>
            <div className="text-[11px] font-mono text-slate-400 mt-1 uppercase">Sin Descargar Aplicaciones</div>
          </div>
        </div>

      </div>
    </section>
  );
};
