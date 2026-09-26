import React from 'react';
import {
  Check,
  MessageCircle,
  Sparkles,
  MapPin,
  Smartphone,
  Zap,
  Server,
  Layers,
  Star,
  Globe,
  ArrowRight,
  ShieldCheck,
  Calculator,
} from 'lucide-react';

interface PricingProps {
  onOpenOnboarding?: () => void;
  onOpenCotizador?: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenOnboarding, onOpenCotizador }) => {
  const whatsappNumber = '56991825700';

  const nfcPacks = [
    {
      units: 'Individual',
      name: 'Stand NFC 14x10 cm',
      price: '$15.000',
      priceDetail: 'CLP c/u',
      saving: 'Configuración a elección',
      subtitle: 'Ideal para añadir puntos estratégicos a barra, recepción o mesas adicionales.',
      features: [
        'Soporte acrílico estándar 14 cm × 10 cm',
        'Impresión en papel fotográfico HD a color',
        'Chip NFC NXP NTAG213 pasivo integrado',
        'Código QR de respaldo de alta definición',
        'Destino: Menú Digital, Google Maps o Instagram',
      ],
      whatsappMsg: 'Hola Valle Pro, me interesa encargar Stand(s) NFC Individual(es) ($15.000 CLP c/u) para mi local.',
      popular: false,
    },
    {
      units: 'Pack 5 Unidades',
      name: 'Pack 5 Stands NFC',
      price: '$65.000',
      priceDetail: 'CLP total',
      regularPrice: '$75.000 CLP',
      saving: 'Ahorro de $10.000 CLP',
      subtitle: 'Para cafeterías de especialidad, fuentes de soda y locales boutique.',
      features: [
        '5 Soportes acrílicos estándar 14 cm × 10 cm',
        'Impresión fotográfica HD protegida dentro del acrílico',
        'Chip NFC NTAG213 pasivo en cada soporte',
        'Código QR dinámico de alta velocidad',
        'Instalación presencial y calibración en terreno',
      ],
      whatsappMsg: 'Hola Valle Pro, quiero encargar el Pack 5 Stands NFC ($65.000 CLP) para mi local.',
      popular: false,
    },
    {
      units: 'Pack 10 Unidades',
      name: 'Pack 10 Stands NFC',
      price: '$120.000',
      priceDetail: 'CLP total',
      regularPrice: '$150.000 CLP',
      saving: 'Ahorro de $30.000 CLP',
      subtitle: 'El formato estándar más pedido por restaurantes, restobares y salones.',
      features: [
        '10 Soportes acrílicos estándar 14 cm × 10 cm',
        'Impresión fotográfica HD a todo color protegida',
        'Chip NFC NTAG213 en cada soporte',
        'Código QR vectorial de respaldo por mesa',
        'Instalación presencial y capacitación a garzones',
      ],
      whatsappMsg: 'Hola Valle Pro, me interesa el Pack 10 Stands NFC ($120.000 CLP) para mi restaurante.',
      popular: true,
      badge: 'Más Pedido',
    },
    {
      units: 'Pack 15 Unidades',
      name: 'Pack 15 Stands NFC',
      price: '$165.000',
      priceDetail: 'CLP total',
      regularPrice: '$225.000 CLP',
      saving: 'Ahorro de $60.000 CLP',
      subtitle: 'Para salones amplios, terrazas completas, cervecerías y alta rotación.',
      features: [
        '15 Soportes acrílicos estándar 14 cm × 10 cm',
        'Impresión fotográfica HD protegida dentro del acrílico',
        'Chip NFC NTAG213 en cada soporte',
        'Código QR dinámico multizona (Salón / Terraza / Barra)',
        'Garantía de reposición express en Aconcagua',
      ],
      whatsappMsg: 'Hola Valle Pro, quiero encargar el Pack 15 Stands NFC ($165.000 CLP) para mi salón.',
      popular: false,
    },
  ];

  return (
    <section id="planes" className="py-24 relative overflow-hidden bg-[#08080a]">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            SERVICIOS DIGITALES & HARDWARE EN CLP
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Planes y hardware transparente{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              para el comercio de Aconcagua.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Soluciones integrales de presencia digital, menús interactivos, optimización de Google Maps y soportes NFC de mesa:
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (onOpenCotizador) {
                  onOpenCotizador();
                } else {
                  window.dispatchEvent(new CustomEvent('open-cotizador'));
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 transition active:scale-95"
              title="Calcular cotización personalizada"
            >
              <Calculator className="w-4 h-4 fill-slate-950" />
              <span>Abrir Cotizador Interactivo en Pantalla ⚡</span>
            </button>
          </div>
        </div>

        {/* 1. PRIMARY DIGITAL SERVICES (2 Featured Plans) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch max-w-6xl mx-auto">
          
          {/* Plan 1: Creación Landing Page + Menú Dinámico (Spans 7 cols on lg) */}
          <div
           
            className="lg:col-span-7 glass-obsidian rounded-3xl p-8 sm:p-10 border-2 border-amber-500/70 shadow-[0_0_50px_rgba(245,158,11,0.2)] flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold uppercase">
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  PLAN ESTRELLA • EXPERIENCIA DIGITAL COMPLETA
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
                  AUTOGESTIONABLE
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-2">
                Creación Landing Page + Menú Dinámico
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Desarrollo web a medida con arquitectura ultrarrápida (0.2 seg), fotos HD, categorías interactivas, comandas a WhatsApp y clave Wi-Fi en 1 clic.
              </p>

              {/* Pricing breakdown block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Implementación Inicial</span>
                  <div className="text-3xl font-extrabold text-amber-400 font-display mt-0.5">
                    $129.000 <span className="text-xs font-normal text-slate-400 font-sans">CLP</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1 font-mono">
                    Pago único: desarrollo, diseño y carga inicial de carta.
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block font-bold">Mantención y Cloud</span>
                  <div className="text-3xl font-extrabold text-white font-display mt-0.5">
                    $40.000 <span className="text-xs font-normal text-slate-400 font-sans">CLP / mes</span>
                  </div>
                  <span className="text-[11px] text-emerald-300 block mt-1 font-mono">
                    Alojamiento cloud + hasta 5 cambios mensuales de carta/precios.
                  </span>
                </div>
              </div>

              {/* What is included */}
              <div className="space-y-3 mb-8">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider block">
                  Qué incluye este servicio:
                </span>
                {[
                  'Desarrollo de landing interactiva rápida adaptada a móviles (iOS & Android)',
                  'Carga inicial de productos, platos, tragos o servicios con fotografía HD',
                  'Filtros por categoría, selector de mesa y comanda directa al WhatsApp del local',
                  'Botón de conexión Wi-Fi en 1 toque con copiado automático de contraseña',
                  'Integración con el Laboratorio de Blindaje de Reseñas de Google Maps (+4.8★)',
                  'Alojamiento cloud ultrarrápido con 99.98% SLA y soporte técnico presencial en Aconcagua',
                  'Hasta 5 actualizaciones o cambios de carta y precios al mes incluidos',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 relative z-10 space-y-3">
              <button
                type="button"
                onClick={() => {
                  if (onOpenOnboarding) {
                    onOpenOnboarding();
                  } else {
                    window.dispatchEvent(new CustomEvent('open-onboarding'));
                  }
                }}
                className="w-full py-4 px-6 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500 hover:from-emerald-400 hover:to-amber-300 text-slate-950 shadow-xl shadow-amber-500/25 transition active:scale-95 flex items-center justify-center gap-2.5 group"
              >
                <Zap className="w-4 h-4 fill-slate-950 group-hover:rotate-12 transition-transform" />
                <span>Activar mi Local ⚡ (Completar Ficha Técnica)</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  'Hola Valle Pro, me interesa contratar el Plan Creación Landing Page + Menú Dinámico ($129.000 CLP inicial + $40.000/mes) para mi local.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-950/80 hover:bg-slate-900 border border-slate-800 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>O consultar dudas previas por WhatsApp (+56 9 9182 5700)</span>
              </a>
            </div>
          </div>

          {/* Plan 2: Optimización de Ficha Google Maps (Spans 5 cols on lg) */}
          <div
           
            className="lg:col-span-5 glass-obsidian rounded-3xl p-8 sm:p-10 border border-slate-700/80 shadow-2xl flex flex-col justify-between relative group"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold uppercase mb-4">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                POSICIONAMIENTO LOCAL • SEO ACONCAGUA
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-2">
                Optimización de Ficha Google Maps
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Auditoría completa y calibración profesional de tu perfil de negocio en Google para dominar las búsquedas en Los Andes, San Felipe y el valle.
              </p>

              {/* Price card */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Valor del Servicio</span>
                <div className="text-3xl font-extrabold text-cyan-400 font-display mt-0.5">
                  $40.000 <span className="text-xs font-normal text-slate-400 font-sans">CLP</span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-1 font-mono">
                  Pago único • Entrega y verificación en 48 horas
                </span>
              </div>

              {/* Detailed Explanation Checklist */}
              <div className="space-y-3 mb-8">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider block">
                  Explicación detallada del servicio:
                </span>
                {[
                  'Auditoría y optimización integral de tu perfil Google Business Profile',
                  'Configuración de palabras clave locales (SEO local para Los Andes y San Felipe)',
                  'Carga y optimización de fotos profesionales en alta definición del local',
                  'Geolocalización exacta de coordenadas en Google Maps y accesos viales',
                  'Actualización de horarios comerciales, feriados y canales de contacto',
                  'Categorías estratégicas primarias y secundarias de tu rubro',
                  'Activación del enlace directo corto para recolectar reseñas de 5 estrellas',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  'Hola Valle Pro, quiero contratar el servicio de Optimización de Ficha Google Maps ($40.000 CLP) para mi negocio.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/40 shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-cyan-400" />
                <span>Solicitar Optimización Google Maps ($40.000)</span>
              </a>
            </div>
          </div>

        </div>

        {/* 2. HARDWARE DE MESA: STANDS NFC (Individual & Salon Packs) */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
              HARDWARE FÍSICO DE MESA
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
              Soportes NFC de Mesa (14 cm × 10 cm)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Acrílico cristal con gráfica fotográfica HD a todo color protegida al interior, chip NFC NXP NTAG213 y código QR de respaldo:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {nfcPacks.map((pack, pIdx) => {
              const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(pack.whatsappMsg)}`;
              return (
                <div
                  key={pIdx}
                 
                  className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                    pack.popular
                      ? 'glass-obsidian border-2 border-amber-500/70 shadow-[0_0_40px_rgba(245,158,11,0.2)] lg:-translate-y-2'
                      : 'glass-card border-slate-800 hover:border-slate-700 shadow-xl'
                  }`}
                >
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md font-mono">
                      {pack.badge}
                    </div>
                  )}

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
                      {pack.units}
                    </span>
                    <h4 className="text-lg font-bold text-white font-display mt-0.5">
                      {pack.name}
                    </h4>

                    {/* Price */}
                    <div className="my-4 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                      {pack.regularPrice && (
                        <span className="text-[10px] font-mono text-slate-500 line-through block">
                          {pack.regularPrice}
                        </span>
                      )}
                      <div className="text-2xl font-extrabold text-white font-display">
                        {pack.price}{' '}
                        <span className="text-xs font-normal text-slate-400 font-sans">{pack.priceDetail}</span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 font-bold block mt-0.5">
                        ✓ {pack.saving}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4 min-h-[36px]">
                      {pack.subtitle}
                    </p>

                    <div className="space-y-2 mb-6">
                      {pack.features.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-[11px] text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md ${
                        pack.popular
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Pedir {pack.units}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
