import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Radio,
} from 'lucide-react';

interface CommuneNode {
  id: string;
  name: string;
  type: 'base' | 'subsede' | 'diaria' | 'semanal';
  typeLabel: string;
  detail: string;
  responseTime: string;
  coords: { x: number; y: number }; // relative SVG percentages
  highlight?: boolean;
}

export const AconcaguaCoverage: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('los-andes');

  const nodes: CommuneNode[] = [
    {
      id: 'los-andes',
      name: 'Los Andes',
      type: 'base',
      typeLabel: 'Base Principal • Taller Hardware',
      detail: 'Centro, Esmeralda, Santa Teresa, Tocornal y Av. Argentina',
      responseTime: '< 45 minutos',
      coords: { x: 68, y: 64 },
      highlight: true,
    },
    {
      id: 'san-felipe',
      name: 'San Felipe',
      type: 'subsede',
      typeLabel: 'Subsede Operativa • Centro',
      detail: 'Plaza de Armas, Merced, Chacabuco, El Almendral',
      responseTime: '< 45 minutos',
      coords: { x: 38, y: 42 },
      highlight: true,
    },
    {
      id: 'rinconada',
      name: 'Rinconada',
      type: 'diaria',
      typeLabel: 'Cobertura Diaria',
      detail: 'Carretera San Martín, Casco Histórico y Polo Gastronómico',
      responseTime: '< 1 hora',
      coords: { x: 55, y: 78 },
    },
    {
      id: 'calle-larga',
      name: 'Calle Larga',
      type: 'diaria',
      typeLabel: 'Cobertura Diaria',
      detail: 'Pocuro, Autopista Los Libertadores y Paraderos Principales',
      responseTime: '< 1 hora',
      coords: { x: 74, y: 82 },
    },
    {
      id: 'san-esteban',
      name: 'San Esteban',
      type: 'diaria',
      typeLabel: 'Cobertura Diaria',
      detail: 'Lo Calvo, San Regis, Plaza y Cariño Botado',
      responseTime: '< 1.5 horas',
      coords: { x: 80, y: 48 },
    },
    {
      id: 'curimon',
      name: 'Curimón',
      type: 'diaria',
      typeLabel: 'Cobertura Diaria',
      detail: 'Corredor Ruta 60 CH, Casco Colonial y Alrededores',
      responseTime: '< 1 hora',
      coords: { x: 52, y: 54 },
    },
    {
      id: 'santa-maria',
      name: 'Santa María',
      type: 'semanal',
      typeLabel: 'Atención Continua',
      detail: 'Locales comerciales, centros turísticos y Jahuel',
      responseTime: '< 2 horas',
      coords: { x: 48, y: 28 },
    },
    {
      id: 'putaendo',
      name: 'Putaendo',
      type: 'semanal',
      typeLabel: 'Atención Frecuente',
      detail: 'Plaza de Armas, Rinconada de Silva y Ruta Patrimonial',
      responseTime: '< 2.5 horas',
      coords: { x: 30, y: 18 },
    },
  ];

  const currentNode = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <section id="cobertura" className="py-24 relative overflow-hidden bg-[#07080b]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Official 4-Hour Support Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-emerald-400" />
              PRESENCIA FÍSICA EN TERRENO • VALLE DEL ACONCAGUA
            </div>

            {/* High-Impact Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/15 to-emerald-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-extrabold uppercase shadow-[0_0_25px_rgba(245,158,11,0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Soporte Presencial en menos de 4 horas</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            No somos una encomienda de Santiago.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              Operamos y respondemos en tu mesa.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Con base central en <strong className="text-white font-semibold">Los Andes</strong> y subsede operativa en <strong className="text-white font-semibold">San Felipe</strong>, nuestro equipo técnico visita tu local, calibra cada chip NFC mesa por mesa y te entrega reemplazo en mano en menos de 4 horas si ocurre cualquier percance.
          </p>
        </div>

        {/* 2-Column Grid: Map Visor & Technical Guarantees */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Stylized Dark Visor of Aconcagua Valley */}
          <div
           
            className="lg:col-span-7 glass-obsidian rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl relative overflow-hidden flex flex-col justify-between"
          >
            {/* Visor Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono uppercase text-white font-bold tracking-wider">
                  VISOR TELEMETRÍA EN TIEMPO REAL
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
                  Ruta 60 CH Conectada
                </span>
              </div>
            </div>

            {/* Stylized Vector Radar Map */}
            <div className="relative w-full h-[320px] sm:h-[360px] bg-[#06070a]/90 rounded-2xl border border-slate-800/90 overflow-hidden flex items-center justify-center p-4">
              {/* Radar Grid Lines */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-slate-800/70 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-slate-800/50 pointer-events-none" />

              {/* Connecting Corridors SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {/* Los Andes to San Felipe Corridor */}
                <line x1="68%" y1="64%" x2="38%" y2="42%" stroke="url(#lineGrad)" strokeWidth="2.5" strokeDasharray="4 3" />
                {/* Los Andes to Rinconada */}
                <line x1="68%" y1="64%" x2="55%" y2="78%" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" />
                {/* Los Andes to Calle Larga */}
                <line x1="68%" y1="64%" x2="74%" y2="82%" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" />
                {/* Los Andes to San Esteban */}
                <line x1="68%" y1="64%" x2="80%" y2="48%" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" />
                {/* San Felipe to Curimón */}
                <line x1="38%" y1="42%" x2="52%" y2="54%" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" />
                {/* San Felipe to Santa María */}
                <line x1="38%" y1="42%" x2="48%" y2="28%" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" />
                {/* San Felipe to Putaendo */}
                <line x1="38%" y1="42%" x2="30%" y2="18%" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" strokeDasharray="2 2" />
              </svg>

              {/* Interactive Nodes */}
              {nodes.map((n) => {
                const isSelected = n.id === selectedNode;
                const isBase = n.type === 'base';
                const isSubsede = n.type === 'subsede';

                return (
                  <div
                    key={n.id}
                    onClick={() => setSelectedNode(n.id)}
                    style={{ left: `${n.coords.x}%`, top: `${n.coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Pulse Ring for Base and Subsede */}
                      {(isBase || isSubsede || isSelected) && (
                        <div
                          className={`absolute w-8 h-8 rounded-full animate-ping opacity-60 ${
                            isBase ? 'bg-amber-400' : isSubsede ? 'bg-cyan-400' : 'bg-emerald-400'
                          }`}
                        />
                      )}

                      {/* Main Node Point */}
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all transform group-hover:scale-125 ${
                          isBase
                            ? 'bg-amber-400 border-white shadow-[0_0_15px_rgba(245,158,11,0.9)] text-slate-950'
                            : isSubsede
                            ? 'bg-cyan-400 border-white shadow-[0_0_15px_rgba(6,182,212,0.9)] text-slate-950'
                            : isSelected
                            ? 'bg-emerald-400 border-white shadow-[0_0_15px_rgba(16,185,129,0.9)] text-slate-950'
                            : 'bg-slate-900 border-slate-600 hover:border-amber-400 text-white'
                        }`}
                      >
                        <Radio className="w-2.5 h-2.5" />
                      </div>

                      {/* Node Label Tooltip */}
                      <div
                        className={`absolute top-6 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono font-bold transition ${
                          isSelected
                            ? 'bg-white text-slate-950 shadow-md scale-105'
                            : isBase
                            ? 'bg-amber-400/90 text-slate-950 shadow-sm'
                            : isSubsede
                            ? 'bg-cyan-400/90 text-slate-950 shadow-sm'
                            : 'bg-slate-900/90 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {n.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Node Status Bar */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-sm font-display">
                    {currentNode.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {currentNode.typeLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{currentNode.detail}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-4">
                <div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">Respuesta In-Situ</span>
                  <span className="text-xs font-bold font-mono text-emerald-400">
                    {currentNode.responseTime}
                  </span>
                </div>
                <a
                  href={`https://wa.me/56991825700?text=${encodeURIComponent(
                    `Hola Valle Pro, tengo mi local en ${currentNode.name} y quiero solicitar visita técnica.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 hover:border-amber-500/40 transition"
                  title="Coordinar en esta comuna"
                >
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: High-Impact Guarantees & Real Presence */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Highlight 1: Base Los Andes & Subsede San Felipe */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#12131b] via-[#0d0e14] to-[#12131b] border border-amber-500/40 shadow-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">
                        Base Los Andes + Subsede San Felipe
                      </h4>
                      <span className="text-[10px] font-mono text-amber-400">
                        Cobertura simultánea en las dos provincias
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Activo
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  No dependes de encomiendas ni envíos por pagar. Nuestro equipo reside y trabaja en Aconcagua, lo que permite calibrar stands en terreno y resolver dudas cara a cara con dueños y administradores.
                </p>
              </div>

              {/* Highlight 2: Compromiso 4 Horas */}
              <div className="p-5 rounded-2xl bg-[#0d0e15] border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">
                      Soporte Presencial &lt; 4 Horas
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-300">
                      Garantía de continuidad operativa
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Si un soporte de acrílico sufre daño físico o necesitas reconfigurar una URL de mesa para un evento de fin de semana, un técnico de Valle Pro acude a tu salón el mismo día hábil.
                </p>
              </div>

              {/* Highlight 3: Capacitación a Garzones */}
              <div className="p-5 rounded-2xl bg-[#0d0e15] border border-slate-800 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">
                      Inducción y Protocolo de Salón
                    </h4>
                    <span className="text-[10px] font-mono text-cyan-300">
                      Cero fricción con los comensales
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Capacitamos a tu equipo de meseros en cómo invitar sutilmente al comensal a tocar el soporte con su teléfono para ver la carta, conectarse al Wi-Fi o calificar su experiencia.
                </p>
              </div>

            </div>

            {/* Quick Action Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/56991825700?text=Hola%20Valle%20Pro,%20quiero%20agendar%20una%20visita%20tecnica%20presencial%20a%20mi%20local"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-amber-500/40 transition active:scale-95 flex items-center justify-center gap-2 shadow-lg"
              >
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Solicitar Visita Técnica en Mi Comuna</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
