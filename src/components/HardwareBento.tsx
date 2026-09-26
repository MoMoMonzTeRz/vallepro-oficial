import React from 'react';
import {
  Radio,
  QrCode,
  Droplets,
  Layers,
  Check,
  Sparkles,
  Shield,
  Zap,
  Clock,
  Maximize2,
  FileCheck,
} from 'lucide-react';

export const HardwareBento: React.FC = () => {
  return (
    <section id="hardware" className="py-24 relative overflow-hidden bg-[#08080a]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Radio className="w-4 h-4 text-cyan-400" />
            INGENIERÍA & HARDWARE TÁCTICO VALLE PRO
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Desglose de ingeniería del{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              Soporte NFC Estándar.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Fabricación robusta y calibrada para el ritmo de trabajo continuo en restaurantes, cafeterías y salones del Valle del Aconcagua:
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Bento Item 1: Hardware Standard 14x10 cm Hero Card (Spans 2 columns on lg) */}
          <div
           
            className="lg:col-span-2 glass-obsidian rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-amber-500/30 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                  <Maximize2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full font-bold">
                  ÚNICO FORMATO ESTÁNDAR
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display mb-2">
                Soporte Acrílico de Mesa (14 cm x 10 cm)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Diseñado ergonómicamente para visibilidad óptima sobre la mesa sin entorpecer los platos, copas o cubiertos. Fabricado en acrílico transparente de alta resistencia que resguarda la gráfica fotográfica contra el desgaste físico.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-800/80 font-mono text-xs">
              <div>
                <span className="text-slate-500 text-[10px] block">ALTO X ANCHO</span>
                <span className="text-white font-bold">14 cm x 10 cm</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">MATERIAL</span>
                <span className="text-amber-400 font-bold">Acrílico Cristal</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">ESTABILIDAD</span>
                <span className="text-emerald-400 font-bold">Base Inclinada</span>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Impresión Fotográfica HD Protegida */}
          <div
           
            className="glass-obsidian rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-cyan-500/30 relative overflow-hidden group shadow-xl"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
            
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-2">
                Papel Fotográfico HD
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Se imprime en papel fotográfico de alta resolución a todo color, resguardado y protegido dentro del bloque acrílico transparente, evitando decoloración y desgaste con el paso de los meses.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
              <Check className="w-3.5 h-3.5" />
              Impresión a todo color protegida
            </div>
          </div>

          {/* Bento Item 3: Chip NFC NXP NTAG213 Pasivo */}
          <div
           
            className="glass-obsidian rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-emerald-500/30 relative overflow-hidden group shadow-xl"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
            
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-2">
                NXP NTAG213 Pasivo
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Circuito integrado NFC que opera a 13.56 MHz. Lectura inmediata en 0.2 segundos por inducción electromagnética. Sin cables, sin baterías y con vida útil superior a 10 años.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
              <Check className="w-3.5 h-3.5" />
              0% Mantenimiento eléctrico
            </div>
          </div>

          {/* Bento Item 4: Full-width Hardware Photography & QR Backup Showcase */}
          <div
           
            className="md:col-span-3 lg:col-span-4 glass-obsidian rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: High-Res Real Reference Photography */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video relative border border-slate-700 shadow-2xl group">
                  <img
                    src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=900&auto=format&fit=crop&q=80"
                    alt="Soporte Acrílico Transparente de Mesa 14x10 cm Valle Pro"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                    <span className="text-xs font-mono text-amber-300 font-bold bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-amber-500/30 w-fit mb-2">
                      Fotografía Referencial de Soporte en Mesa
                    </span>
                    <p className="text-xs text-slate-200">
                      Soporte acrílico transparente de 14x10 cm instalado sobre mesa de restaurante con gráfica fotográfica de alta resolución y código QR nítido.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Engineering Highlights & QR Backup */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase mb-1">
                    <QrCode className="w-4 h-4 text-amber-400" />
                    DUALIDAD FÍSICA: NFC + CÓDIGO QR
                  </div>
                  <h4 className="text-2xl font-bold text-white font-display">
                    Compatibilidad Universal para el 100% de Clientes
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                    Cada soporte integra en su cara frontal la antena NFC invisible y un código QR nítido de respaldo. Si el comensal tiene un dispositivo sin NFC o prefiere usar la app de cámara clásica, la carta y las funciones cargan con la misma rapidez.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">SELLADO PROTEGIDO</span>
                    <span className="text-emerald-400 font-bold">Inmune a Derrames</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">RESPALDO QR</span>
                    <span className="text-cyan-400 font-bold">Vectorial de Alta Nitidez</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">LIMPIEZA DE MESA</span>
                    <span className="text-amber-400 font-bold">Resiste Alcohol & Sanitizante</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">GARANTÍA LOCAL</span>
                    <span className="text-white font-bold">Reposición Rápida</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
