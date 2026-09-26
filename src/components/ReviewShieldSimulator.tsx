import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  MessageCircle,
  AlertTriangle,
  RotateCcw,
  Zap,
  MapPin,
  TrendingUp,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { registrarQuejaPrivada, registrarToqueNFC } from '../services/telemetry';

export const ReviewShieldSimulator: React.FC = () => {
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [hoverStars, setHoverStars] = useState<number | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<string>('Demora en la atención');
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [hasTappedNFC, setHasTappedNFC] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedToApi, setSubmittedToApi] = useState<boolean>(false);

  const issuesList = [
    'Demora en la atención',
    'Temperatura del plato/trago',
    'Detalle con la cuenta',
    'Atención del personal',
    'Ruido o ambiente',
  ];

  const handleReset = () => {
    setSelectedStars(null);
    setFeedbackText('');
    setSelectedIssue('Demora en la atención');
  };

  const getWhatsappUrl = () => {
    const text = encodeURIComponent(
      `[Valle Pro - Reclamo Privado Retenido]\n\nCalificación recibida: ${selectedStars} estrellas.\nMotivo: ${selectedIssue}\nComentarios: ${feedbackText || 'Sin comentarios adicionales'}\n\n*Este reclamo fue interceptado por el soporte NFC antes de llegar a Google Maps.*`
    );
    return `https://wa.me/56991825700?text=${text}`;
  };

  return (
    <section id="filtro-resenas" className="py-24 relative overflow-hidden bg-[#0c0c10]">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Tecnología Exclusiva de Blindaje Aconcagua
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            El Filtro Inteligente de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Google Reviews</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Los soportes inteligentes de <strong className="text-slate-200">Valle Pro</strong> aceleran las opiniones positivas y retienen las quejas en privado. Experimenta la simulación en vivo a continuación:
          </p>
        </div>

        {/* Interactive Dual-Panel Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Physical Stand Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
             
              className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[4/5] bg-gradient-to-b from-slate-900 to-[#121218] rounded-3xl p-6 border-2 border-slate-700/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between text-center group"
            >
              {/* Stand Top Laser Engraving */}
              <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold text-sm tracking-wide">VALLE PRO</span>
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                </div>
                <span className="text-[10px] font-mono uppercase text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded">
                  Acrílico 4mm
                </span>
              </div>

              {/* NFC Sensor Zone */}
              <div className="my-auto flex flex-col items-center">
                <div className="relative w-28 h-28 rounded-full flex items-center justify-center bg-slate-950 border border-slate-700 shadow-inner">
                  {/* Glowing pulses */}
                  <div className="absolute inset-0 rounded-full bg-amber-500/10 animate-ping" />
                  <div className="absolute -inset-2 rounded-full border border-amber-500/20" />
                  
                  <Smartphone className="w-10 h-10 text-amber-400" />
                </div>

                <div className="mt-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Chip NTAG213 Activo
                  </div>
                  <p className="text-xs text-slate-400">
                    Acerca el celular al soporte de mesa
                  </p>
                </div>
              </div>

              {/* Bottom QR backup & table info */}
              <div className="w-full pt-3 border-t border-slate-800/80 flex items-center justify-between text-left">
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold">Mesa 04 • La Montaña</div>
                  <div className="text-[10px] text-slate-500">San Felipe / Los Andes</div>
                </div>
                <div className="w-8 h-8 rounded bg-white p-0.5 flex items-center justify-center">
                  {/* Miniature QR representation */}
                  <div className="w-full h-full bg-slate-900 grid grid-cols-3 gap-0.5 p-0.5">
                    <div className="bg-white rounded-[1px]" />
                    <div className="bg-transparent" />
                    <div className="bg-white rounded-[1px]" />
                    <div className="bg-transparent" />
                    <div className="bg-white rounded-[1px]" />
                    <div className="bg-transparent" />
                    <div className="bg-white rounded-[1px]" />
                    <div className="bg-transparent" />
                    <div className="bg-white rounded-[1px]" />
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500 text-center font-mono">
              Fiel reproducción del soporte físico instalado en tu mesa
            </p>
          </div>

          {/* Right Column: Interactive Phone Screen / Logic */}
          <div className="lg:col-span-7">
            <div className="bg-[#121218] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Simulación de Pantalla del Cliente
                  </span>
                </div>
                {selectedStars !== null && (
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Probar otra calificación
                  </button>
                )}
              </div>

              {/* Star selector question */}
              <div className="text-center mb-8">
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Paso 1 de 1</span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  ¿Cómo estuvo tu experiencia hoy?
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Selecciona una calificación tocando las estrellas
                </p>

                {/* Stars Interactive Row */}
                <div className="flex justify-center items-center gap-2 sm:gap-4 mt-6">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverStars !== null ? hoverStars : (selectedStars || 0)) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setSelectedStars(star)}
                        onMouseEnter={() => setHoverStars(star)}
                        onMouseLeave={() => setHoverStars(null)}
                        className={`p-2 sm:p-3 rounded-2xl transition-all duration-200 transform ${
                          isFilled
                            ? 'scale-110 text-amber-400 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                            : 'text-slate-600 hover:text-slate-400 bg-slate-900/60'
                        }`}
                        title={`${star} estrellas`}
                      >
                        <Star className={`w-8 h-8 sm:w-10 sm:h-10 ${isFilled ? 'fill-amber-400' : ''}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Branching Content */}
              {selectedStars === null && (
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 text-center">
                  <p className="text-sm text-slate-400">
                    👈 <span className="text-amber-300 font-medium">Haz clic arriba en 1, 2 o 3 estrellas</span> para ver cómo se retiene una queja, o en <span className="text-amber-300 font-medium">4 o 5 estrellas</span> para ver la redirección instantánea a Google Maps.
                  </p>
                </div>
              )}

              {/* HIGH RATING: 4 or 5 STARS */}
              {selectedStars !== null && selectedStars >= 4 && (
                <div className="animate-in fade-in zoom-in-95 duration-300 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-emerald-400 uppercase font-semibold">
                        Acelerador de Reseñas Activado (+4.5 Estrellas)
                      </div>
                      <h4 className="text-lg font-bold text-white">
                        ¡Cliente Feliz Detectado ({selectedStars} Estrellas)!
                      </h4>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 mb-6">
                    El sistema detecta una experiencia excelente y envía al usuario directamente a la ficha verificada de tu negocio en Google Maps, con las 5 estrellas precargadas.
                  </p>

                  {/* Simulated Google Maps Action Button */}
                  <div className="space-y-3">
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 transition-all transform active:scale-98"
                    >
                      <MapPin className="w-4 h-4" />
                      Publicar Reseña de 5 Estrellas en Google Maps
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        Tu local sube automáticamente en el algoritmo local del Aconcagua
                      </span>
                      <span className="font-bold text-amber-300">4.9 ★ Promedio</span>
                    </div>
                  </div>
                </div>
              )}

              {/* LOW RATING: 1, 2, or 3 STARS */}
              {selectedStars !== null && selectedStars < 4 && (
                <div className="animate-in fade-in zoom-in-95 duration-300 rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-amber-400 uppercase font-semibold">
                        🛡️ Escudo de Reputación Activado
                      </div>
                      <h4 className="text-lg font-bold text-white">
                        ¡Queja Desviada con Éxito ({selectedStars} Estrellas)!
                      </h4>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 mb-4">
                    <strong className="text-white">Google Maps ha sido bloqueado para esta sesión.</strong> En su lugar, se abre este canal de atención VIP directamente al WhatsApp personal del dueño o administrador, permitiendo enmendar el error en la mesa antes de que el cliente se retire insatisfecho.
                  </p>

                  {/* Category Chips */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-slate-400 mb-2">
                      ¿Qué aspecto podemos solucionar de inmediato?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {issuesList.map((issue) => (
                        <button
                          key={issue}
                          type="button"
                          onClick={() => setSelectedIssue(issue)}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                            selectedIssue === issue
                              ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-semibold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {issue}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Text Input */}
                  <div className="mb-5">
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Detalle rápido (ej: La comida llegó fría a la mesa 4)..."
                      rows={2}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 resize-none"
                    />
                  </div>

                  {/* Direct WhatsApp Action Button */}
                  <a
                    href={getWhatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={async () => {
                      setIsSubmitting(true);
                      await registrarQuejaPrivada({
                        slug: 'la-montana-coffeebar',
                        table: 'mesa-1',
                        stars: selectedStars || 3,
                        motivo: selectedIssue,
                        comentario: feedbackText || 'Reclamo privado en local',
                      });
                      setIsSubmitting(false);
                      setSubmittedToApi(true);
                    }}
                    className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/20 transition-all transform active:scale-98"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>
                      {isSubmitting
                        ? 'Registrando en Google Apps Script...'
                        : 'Enviar Reclamo Directo al WhatsApp del Administrador'}
                    </span>
                  </a>

                  {submittedToApi && (
                    <div className="mt-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-center gap-1.5 animate-in fade-in">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>✓ Queja privada registrada en Google Apps Script</span>
                    </div>
                  )}

                  <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-[11px] text-emerald-300 flex items-center justify-between">
                    <span>✅ Tu puntaje público en Google Maps se mantuvo 100% intacto.</span>
                    <span className="font-mono text-slate-400">+56 9 9182 5700</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
