import React, { useState, useEffect } from 'react';
import {
  UtensilsCrossed,
  Wifi,
  Copy,
  Check,
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  PhoneCall,
  MessageCircle,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  RotateCcw,
  CheckCircle,
} from 'lucide-react';
import {
  obtenerDatosLocal,
  LocalDataDynamic,
  registrarToqueNFC,
  registrarQuejaPrivada,
} from '../services/telemetry';

interface CustomerLandingProps {
  slug: string;
  table: string;
  onBackToHome?: () => void;
}

export const CustomerLanding: React.FC<CustomerLandingProps> = ({
  slug,
  table,
  onBackToHome,
}) => {
  const [localData, setLocalData] = useState<LocalDataDynamic | null>(null);
  const [loading, setLoading] = useState(true);
  const [wifiCopied, setWifiCopied] = useState(false);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [complaintSent, setComplaintSent] = useState(false);
  const [complaintText, setComplaintText] = useState('');
  const [complaintMotive, setComplaintMotive] = useState('Demora o atención');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    // Register NFC tap for this client
    registrarToqueNFC(slug, table, false);

    obtenerDatosLocal(slug)
      .then((data) => {
        if (isMounted) {
          setLocalData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLocalData(null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug, table]);

  const copyWifi = (password: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(password);
      setWifiCopied(true);
      setTimeout(() => setWifiCopied(false), 2500);
    }
  };

  const handleStarRating = (stars: number) => {
    setSelectedStars(stars);
    if (stars >= 4) {
      // Direct positive review to Google Maps
      const mapsUrl = localData?.googleMapsUrl || 'https://maps.google.com';
      window.open(mapsUrl, '_blank');
    } else {
      // Retain privately in Review Shield
      registrarQuejaPrivada({
        slug,
        table,
        stars,
        motivo: complaintMotive,
        comentario: complaintText || 'Queja privada capturada en mesa',
        isDemo: false,
      });
      setComplaintSent(true);
    }
  };

  const submitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    registrarQuejaPrivada({
      slug,
      table,
      stars: selectedStars || 3,
      motivo: complaintMotive,
      comentario: complaintText,
      isDemo: false,
    });
    setComplaintSent(true);
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#08080c] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center animate-pulse mb-6">
          <Sparkles className="w-8 h-8 text-amber-400" />
        </div>
        <h2 className="text-xl font-bold font-display text-white mb-2">Conectando Soporte NFC ⚡</h2>
        <p className="text-xs text-slate-400 max-w-sm font-mono">
          Identificando punto {table} para {slug}...
        </p>
      </div>
    );
  }

  // 2. Not Found or Activation Pending State
  if (!localData) {
    return (
      <div className="min-h-screen bg-[#07080b] text-slate-100 flex flex-col justify-between p-6 sm:p-12 font-sans selection:bg-amber-500/30">
        <div className="max-w-md mx-auto w-full pt-10 text-center flex-1 flex flex-col justify-center items-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500/20 to-amber-900/30 border border-amber-500/40 flex items-center justify-center mb-6 shadow-2xl shadow-amber-500/20">
            <ShieldCheck className="w-10 h-10 text-amber-400" />
          </div>

          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            Valle Pro • Soporte Físico 14x10 cm
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">
            Local en proceso de activación técnica
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            El soporte acrílico inteligente NFC de 14x10 cm para{' '}
            <strong className="text-white">"{slug}"</strong> en{' '}
            <strong className="text-amber-400">{table}</strong> se encuentra actualmente en etapa de
            calibración de chip NTAG213 y asignación de cartas interactivas por el equipo de Valle Pro.
          </p>

          <div className="p-4 rounded-2xl bg-[#0f1118] border border-slate-800 text-left w-full space-y-2 mb-8 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-400">
              <span>Identificador Punto:</span>
              <span className="text-amber-400 font-bold">{table}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Slug Solicitado:</span>
              <span className="text-white">{slug}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Estado en Servidor:</span>
              <span className="text-emerald-400">En Despliegue Técnico</span>
            </div>
          </div>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-200 text-xs font-bold transition active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Valle Pro</span>
            </button>
          )}
        </div>

        <footer className="text-center text-[11px] font-mono text-slate-600 pt-8 border-t border-slate-800/80">
          Tecnología NFC NTAG213 • vallepro.cl • Los Andes & San Felipe
        </footer>
      </div>
    );
  }

  // 3. Fully Active Dynamic Customer Landing
  const {
    nombreLocal,
    rubro,
    eslogan,
    direccion,
    comuna,
    horarios,
    whatsapp,
    wifiSsid,
    wifiPassword,
    itemsMenu = [],
  } = localData;

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 pb-20">
      {/* Top Bar with Venue Info */}
      <header className="sticky top-0 z-30 bg-[#090a0f]/95 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h1 className="font-bold text-white text-base leading-tight font-display">
                {nombreLocal}
              </h1>
              <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{table} (NFC Activo ⚡)</span>
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-mono px-2 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {rubro || 'Local Activo'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-2xl mx-auto w-full px-4 pt-6 space-y-6 flex-1">
        {/* Venue Hero Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#12141d] to-[#0c0d14] border border-slate-800 relative overflow-hidden shadow-xl">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
              <MapPin className="w-3.5 h-3.5" />
              <span>{direccion || comuna}</span>
            </div>
            {eslogan && <p className="text-xs text-slate-300 italic">"{eslogan}"</p>}
            {horarios && (
              <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{horarios}</span>
              </div>
            )}
          </div>
        </div>

        {/* 1-Click Wi-Fi Box */}
        {wifiPassword && (
          <div className="p-4 rounded-2xl bg-[#11131c] border border-amber-500/30 flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Wi-Fi Clientes (1-Click)</div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Red: <span className="text-amber-300 font-bold">{wifiSsid || 'VallePro-Guest'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => copyWifi(wifiPassword)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition active:scale-95"
            >
              {wifiCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{wifiCopied ? '¡Copiada!' : 'Copiar Clave'}</span>
            </button>
          </div>
        )}

        {/* Digital Menu Catalog */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-display flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-amber-400" />
              <span>Carta y Menú Digital</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">Precios CLP</span>
          </div>

          {itemsMenu.length > 0 ? (
            <div className="space-y-2.5">
              {itemsMenu.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#10121a] border border-slate-800/80 hover:border-slate-700 transition flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{item.nombre}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.descripcion && (
                      <p className="text-xs text-slate-400 leading-relaxed">{item.descripcion}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold font-mono text-amber-400">
                      {typeof item.precio === 'number'
                        ? `$${item.precio.toLocaleString('es-CL')}`
                        : item.precio.toString().startsWith('$')
                        ? item.precio
                        : `$${item.precio}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-[#10121a] border border-slate-800 text-center text-slate-400 text-xs">
              Carta digital en proceso de sincronización técnica con el local.
            </div>
          )}
        </div>

        {/* WhatsApp Comanda / Mozo CTA */}
        {whatsapp && (
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>¿Deseas pedir o llamar al personal?</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Atención directa para <strong className="text-white">{table}</strong> vía WhatsApp.
              </p>
            </div>

            <a
              href={`https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                `Hola ${nombreLocal}, estoy en ${table} y quisiera hacer un pedido o consulta.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition active:scale-95 shrink-0"
            >
              Contactar ⚡
            </a>
          </div>
        )}

        {/* Dual Shield Review Section */}
        <div className="p-6 rounded-3xl bg-[#0f1118] border border-slate-800 text-center space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto">
            <Star className="w-5 h-5 fill-amber-400" />
          </div>

          <div>
            <h4 className="text-base font-bold text-white font-display">
              ¿Cómo fue tu experiencia en {table}?
            </h4>
            <p className="text-xs text-slate-400">Tu opinión nos ayuda a mantener la máxima calidad</p>
          </div>

          {/* Star selector */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarRating(star)}
                className={`p-2 rounded-xl transition ${
                  (selectedStars || 0) >= star
                    ? 'text-amber-400 scale-110'
                    : 'text-slate-600 hover:text-amber-300'
                }`}
              >
                <Star
                  className={`w-7 h-7 ${
                    (selectedStars || 0) >= star ? 'fill-amber-400' : 'fill-transparent'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* If 1-3 stars selected, show private resolution box */}
          {selectedStars && selectedStars <= 3 && !complaintSent && (
            <form onSubmit={submitComplaint} className="text-left space-y-3 pt-3 border-t border-slate-800">
              <span className="text-xs text-amber-300 font-semibold block">
                Queremos solucionarlo de inmediato con la administración:
              </span>
              <textarea
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
                placeholder="Cuéntanos qué ocurrió para asistirte en tu mesa..."
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
              >
                Enviar a Administrador en Privado
              </button>
            </form>
          )}

          {complaintSent && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Tu mensaje fue derivado directamente al administrador en privado.</span>
            </div>
          )}
        </div>
      </main>

      {/* Powered by Valle Pro footer */}
      <footer className="max-w-2xl mx-auto w-full px-4 pt-8 text-center text-[11px] font-mono text-slate-500 space-y-1">
        <p>Soporte NFC Inteligente Valle Pro 14x10 cm • Calibración Aconcagua</p>
        <p>vallepro.cl • Tecnología Física-Digital</p>
      </footer>
    </div>
  );
};
