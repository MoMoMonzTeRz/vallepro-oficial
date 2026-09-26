import React, { useState } from 'react';
import { Cpu, Layers, Droplets, Radio, QrCode, Shield, Zap, Sparkles } from 'lucide-react';

export const HardwareSpecs: React.FC = () => {
  return (
    <section id="hardware-specs" className="py-24 relative overflow-hidden bg-[#0a0a0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Ingeniería de Hardware Valle Pro
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Soportes Acrílicos con Chip <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">NTAG213</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Formato estándar de 14x10 cm fabricado para resistir el uso rudo gastronómico en el Valle del Aconcagua: sin baterías, inmune a derrames y con papel fotográfico de alta resolución protegido.
          </p>
        </div>

        {/* Technical Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-[#121217] border border-slate-800/80 hover:border-amber-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Chip NXP NTAG213</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Frecuencia estándar de 13.56 MHz con 144 bytes de memoria. Lectura pasiva sin cables ni baterías.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121217] border border-slate-800/80 hover:border-emerald-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Sellado Estanco</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              El acrílico transparente aísla el circuito ante derrames de alcohol, cerveza y sanitizantes de mesa.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121217] border border-slate-800/80 hover:border-cyan-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Respaldo QR Dinámico</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Impresión fotográfica vectorial con código QR para dispositivos que no cuenten con NFC.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121217] border border-slate-800/80 hover:border-purple-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Garantía en Aconcagua</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Reposición y soporte directo en 24 a 48 horas en Los Andes, San Felipe y comunas aledañas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
