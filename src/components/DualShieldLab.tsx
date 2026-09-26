import React, { useState } from 'react';
import {
  ShieldCheck,
  Star,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  Lock,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Zap,
  RotateCcw,
  Smartphone,
  Send,
} from 'lucide-react';
import { registrarQuejaPrivada, registrarToqueNFC } from '../services/telemetry';

export const DualShieldLab: React.FC = () => {
  const [stars, setStars] = useState<number>(5);
  const [feedbackCategory, setFeedbackCategory] = useState<string>('Tiempo de espera');
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [isSubmittingComplaint, setIsSubmittingComplaint] = useState<boolean>(false);
  const [complaintRegistered, setComplaintRegistered] = useState<boolean>(false);

  const isPositive = stars >= 4;

  const categories = [
    'Tiempo de preparación',
    'Temperatura del plato/café',
    'Atención del personal',
    'Otro detalle',
  ];

  const handleSelectStars = (s: number) => {
    setStars(s);
    setComplaintRegistered(false);
    registrarToqueNFC('la-montana-coffeebar', 'mesa-1');
  };

  const handleSubmitComplaint = async () => {
    setIsSubmittingComplaint(true);
    await registrarQuejaPrivada({
      slug: 'la-montana-coffeebar',
      table: 'mesa-1',
      stars,
      motivo: feedbackCategory,
      comentario: feedbackText || 'Atención a revisar en el local',
    });
    setIsSubmittingComplaint(false);
    setComplaintRegistered(true);
  };

  return (
    <section id="filtro-resenas" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-gradient-to-r from-amber-500/8 via-emerald-500/5 to-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            EL LABORATORIO DEL BLINDAJE • DUAL-SHIELD FLOW
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Circuito cerrado de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              protección de reputación.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Nunca más una reseña destructiva de 1 estrella en Google Maps por un descuido puntual. Descubre cómo el chip NFC bifurca la opinión del cliente en tiempo real:
          </p>
        </div>

        {/* Closed-Circuit Schematic Container */}
        <div className="glass-obsidian rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl max-w-5xl mx-auto relative overflow-hidden">
          
          {/* Top Circuit Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                ⚡
              </div>
              <div>
                <h3 className="font-bold text-white text-base font-display">
                  Simulador de Enrutamiento NFC
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Prueba tocando las estrellas para activar los dos túneles:
                </p>
              </div>
            </div>

            {/* Interactive Stars Controller */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 p-2 rounded-2xl">
              {[1, 2, 3, 4, 5].map((s) => {
                const isSelected = s <= stars;
                return (
                  <button
                    key={s}
                    onClick={() => handleSelectStars(s)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
                      isSelected
                        ? s >= 4
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800/60 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${isSelected ? 'fill-slate-950' : ''}`} />
                  </button>
                );
              })}
              <span className="font-mono text-xs font-bold text-white ml-2 mr-1">
                {stars}.0★
              </span>
            </div>
          </div>

          {/* Circuit Visual Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            
            {/* PATH A: THE GOLDEN GOOGLE MAPS CORRIDOR (4 - 5 Stars) */}
            <div
              className={`rounded-3xl p-6 border transition-all duration-500 flex flex-col justify-between relative ${
                isPositive
                  ? 'bg-gradient-to-b from-amber-500/15 via-[#14131c] to-[#0c0d12] border-amber-500/70 shadow-[0_0_50px_rgba(245,158,11,0.2)] scale-[1.02]'
                  : 'bg-slate-950/40 border-slate-800/60 opacity-40'
              }`}
            >
              {/* Route Indicator Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${isPositive ? 'bg-amber-400 animate-pulse' : 'bg-slate-700'}`} />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
                    TÚNEL DORADO: GOOGLE REVIEWS
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Activado con 4 o 5★
                </span>
              </div>

              {/* Node Content */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl border border-amber-500/40">
                    ⭐
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg font-display">Acelerador de Reputación</h4>
                    <p className="text-xs text-amber-200/80 font-mono">Google Maps Valle del Aconcagua (+4.8★)</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  El cliente queda fascinado con su atención y el sistema abre inmediatamente la ficha oficial en Google Maps con 5 estrellas precargadas.
                </p>

                {/* Real Comensal Review Preview */}
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Matías Valenzuela (Guía Local)</span>
                    <span className="text-amber-400 text-xs">★★★★★</span>
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    "¡Excelente lugar en Los Andes! El Flat White de especialidad y los tostones estaban 10/10. Apoyé el celular en la mesa y pagué sin esperar. Volveremos siempre."
                  </p>
                  <span className="text-[10px] font-mono text-slate-500 block">
                    Publicado hace 2 días • Ficha Verificada Valle Pro
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-amber-500/20">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                    isPositive
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-500 pointer-events-none'
                  }`}
                >
                  <span>Ver Ficha en Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* PATH B: THE TACTICAL GREEN TUNNEL (1 - 3 Stars) */}
            <div
              className={`rounded-3xl p-6 border transition-all duration-500 flex flex-col justify-between relative ${
                !isPositive
                  ? 'bg-gradient-to-b from-emerald-500/15 via-[#111915] to-[#0a100d] border-emerald-500/70 shadow-[0_0_50px_rgba(16,185,129,0.2)] scale-[1.02]'
                  : 'bg-slate-950/40 border-slate-800/60 opacity-40'
              }`}
            >
              {/* Route Indicator Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${!isPositive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`} />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-300">
                    TÚNEL BLINDADO: WHATSAPP PRIVADO
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Activado con 1 a 3★
                </span>
              </div>

              {/* Node Content */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl border border-emerald-500/40">
                    🛡️
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg font-display">Bloqueo de Google Maps</h4>
                    <p className="text-xs text-emerald-300 font-mono">Canal Confidencial con el Dueño</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Si el comensal no quedó 100% satisfecho, el sistema <strong>bloquea el acceso público a Google</strong> y abre un canal confidencial directo al WhatsApp del dueño para resolver el incidente antes de que se retire del local.
                </p>

                {/* Formulario de Reclamo Privado */}
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/20 space-y-2.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                    ¿Qué podemos compensar de inmediato?
                  </span>
                  
                  {/* Category Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFeedbackCategory(cat)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition ${
                          feedbackCategory === cat
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                            : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Detalle confidencial (ej: la comida demoró 20 min)"
                    className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-emerald-500/20 space-y-2">
                <a
                  href={`https://wa.me/56991825700?text=${encodeURIComponent(
                    `*RECLAMO CONFIDENCIAL RETENIDO EN MESA (SIMULADOR)*\nCalificación: ${stars} estrellas.\nMotivo: ${feedbackCategory}\nDetalle: ${feedbackText || 'Atención a revisar en el local'}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleSubmitComplaint}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                    !isPositive
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 active:scale-95'
                      : 'bg-slate-800 text-slate-500 pointer-events-none'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                  <span>
                    {isSubmittingComplaint
                      ? 'Registrando en API Central...'
                      : 'Resolver por WhatsApp Privado (+56 9 9182 5700)'}
                  </span>
                </a>

                {complaintRegistered && (
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono flex items-center justify-center gap-1.5 animate-in fade-in">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>✓ Queja privada registrada en Google Apps Script</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Security Guarantee */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              Cifrado punto a punto en el chip NTAG213
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
              Retención del 94% de quejas públicas
            </span>
            <span className="text-amber-400 font-bold">
              Garantía de +4.5★ en Google Maps
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
