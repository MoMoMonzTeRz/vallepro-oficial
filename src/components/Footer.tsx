import React, { useState, useRef } from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  ExternalLink,
  Shield,
  Lock,
  X,
  Download,
  CheckCircle,
  Activity,
  FileSpreadsheet,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Calculator,
  Zap,
} from 'lucide-react';
import { ValleProLogo } from './ValleProLogo';

interface FooterProps {
  onOpenCotizador?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCotizador }) => {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [adminLogged, setAdminLogged] = useState(false);
  const [pinError, setPinError] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Hidden 3-Tap Security Mechanism
  const [tapCount, setTapCount] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const whatsappNumber = '56991825700';

  const handleLogoTap = () => {
    // Subtle visual feedback pulse on each tap
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 240);

    setTapCount((prev) => {
      const next = prev + 1;
      if (next === 1) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setTapCount(0);
        }, 1500);
      } else if (next >= 3) {
        if (timerRef.current) clearTimeout(timerRef.current);
        setShowAdminModal(true);
        setPinError('');
        setAdminPin('');
        return 0;
      }
      return next;
    });
  };

  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (adminPin.trim() === 'valle2026') {
      setAdminLogged(true);
      setPinError('');
    } else {
      setPinError('Clave de acceso incorrecta. Acceso restringido.');
    }
  };

  const downloadReviewsReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Fecha,Local,Mesa,Calificacion,Plataforma,Estado\n' +
      'REV-1042,2026-09-26,La Montana Coffee Bar,Mesa 1,5 Estrellas,Google Maps,Publicada\n' +
      'REV-1041,2026-09-26,Lukoton Los Andes,Mesa 3,5 Estrellas,Google Maps,Publicada\n' +
      'REV-1040,2026-09-25,Barberia Aconcagua,Estacion Matias,5 Estrellas,Google Maps,Publicada\n' +
      'REV-1039,2026-09-25,La Montana Coffee Bar,Mesa 4,5 Estrellas,Google Maps,Publicada\n' +
      'REV-1038,2026-09-24,Lukoton Los Andes,Mesa 2,5 Estrellas,Google Maps,Publicada\n';

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'vallepro_reporte_resenas_google.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('Reporte de Reseñas Google descargado con éxito.');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const downloadComplaintsReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Fecha,Local,Mesa,Estrellas,Motivo,Canal_Resolucion,Estado\n' +
      'QUE-088,2026-09-26,La Montana Coffee Bar,Mesa 4,2 Estrellas,Demora en comanda,WhatsApp Privado Administrador,Neutralizada en Mesa\n' +
      'QUE-087,2026-09-24,Lukoton Los Andes,Mesa 5,3 Estrellas,Temperatura bebida,WhatsApp Privado Administrador,Solucionada con Cortesia\n' +
      'QUE-086,2026-09-22,Barberia Aconcagua,Estacion 2,3 Estrellas,Tiempo espera turno,WhatsApp Privado Administrador,Reagendado sin costo\n';

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'vallepro_registro_quejas_retenidas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('Registro de Quejas Retenidas descargado con éxito.');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <footer id="contacto" className="bg-[#060709] border-t border-slate-800/80 text-slate-400 text-xs pt-16 pb-12 relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col with Hidden 3-Tap Security Trigger on the Logo */}
          <div className="space-y-4 md:col-span-1">
            <div
              onClick={handleLogoTap}
              className={`cursor-pointer inline-block transition-transform duration-200 active:scale-95 ${
                isPulsing ? 'scale-95 brightness-125' : ''
              }`}
              title="Valle Pro • Tecnología Física-Digital"
            >
              <ValleProLogo size="md" showSubtext={true} />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal pt-1">
              Estudio tecnológico y agencia digital del Valle del Aconcagua especialista en soportes NFC inteligentes, cartas web interactivas, blindaje de reputación y optimización de Google Maps.
            </p>
            <div className="text-[11px] font-mono text-amber-400">
              vallepro.cl • Los Andes & San Felipe, Chile
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="font-bold text-white font-display text-sm mb-3">Estudio & Hardware</div>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-amber-400 transition">Banco de Pruebas Físico</a></li>
              <li><a href="#live-mirror" className="hover:text-amber-400 transition">Live Mirror Hub (Producción)</a></li>
              <li><a href="#filtro-resenas" className="hover:text-amber-400 transition">Laboratorio del Blindaje (+4.8★)</a></li>
              <li><a href="#hardware" className="hover:text-amber-400 transition">Hardware Estándar 14x10 cm</a></li>
              <li><a href="#centro-control" className="hover:text-amber-400 transition">Centro de Control & Analíticas</a></li>
              <li><a href="#planes" className="hover:text-amber-400 transition">Planes e Inversión CLP</a></li>
              <li>
                <button
                  onClick={() => {
                    if (onOpenCotizador) {
                      onOpenCotizador();
                    } else {
                      window.dispatchEvent(new CustomEvent('open-cotizador'));
                    }
                  }}
                  className="text-amber-400 hover:text-amber-300 font-bold transition flex items-center gap-1"
                >
                  <Calculator className="w-3 h-3" />
                  <span>Cotizador en Línea ⚡</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Demos */}
          <div className="space-y-2">
            <div className="font-bold text-white font-display text-sm mb-3">Demos de Clientes</div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://valle-pro-test.vercel.app/?rest=la-montana-coffeebar&table=mesa-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition flex items-center gap-1.5"
                >
                  <span>La Montaña Coffee Bar (Prod)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://valle-pro-test.vercel.app/?rest=barberia-aconcagua&table=estacion-matias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition flex items-center gap-1.5"
                >
                  <span>Barbería Aconcagua (Prod)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://valle-pro-test.vercel.app/?rest=lukoton-los-andes&table=mesa-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition flex items-center gap-1.5"
                >
                  <span>Lukotón Los Andes (Prod)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <span className="text-[11px] text-slate-500 font-mono">
                  Soportes calibrados en Aconcagua
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <div className="font-bold text-white font-display text-sm mb-3">Soporte & Instalación</div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Valle del Aconcagua, Región de Valparaíso</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition underline font-mono font-bold text-emerald-300"
              >
                +56 9 9182 5700 (WhatsApp Oficial)
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>contacto@vallepro.cl</span>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  if (onOpenCotizador) {
                    onOpenCotizador();
                  } else {
                    window.dispatchEvent(new CustomEvent('open-cotizador'));
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition active:scale-95"
                title="Calcular cotización interactiva en CLP"
              >
                <Calculator className="w-3.5 h-3.5 fill-slate-950" />
                <span>Cotizar en Línea ⚡</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar - Clean, 100% discrete with NO obvious portal buttons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} Valle Pro • reseñas del valle (vallepro.cl) • Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <span>Hardware & software diseñado para Los Andes y San Felipe</span>
          </div>
        </div>
      </div>

      {/* Secret Admin Portal Modal Triggered Exclusively by 3 Taps on Logo */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl glass-obsidian border border-amber-500/40 p-6 sm:p-8 space-y-6 shadow-[0_20px_70px_rgba(0,0,0,0.95)] animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base font-display">
                    Acceso Administrativo Valle Pro
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Panel maestro de control de red y clientes
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowAdminModal(false);
                  setAdminLogged(false);
                  setPinError('');
                  setAdminPin('');
                  setDownloadSuccess(null);
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Authenticated Master Control Panel */}
            {adminLogged ? (
              <div className="space-y-6 text-xs">
                
                {/* Session Active Badge */}
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold font-mono">Sesión Maestra Activa • Administrador Global</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                    SLA 99.98%
                  </span>
                </div>

                {/* Network Overview Stats */}
                <div className="grid grid-cols-3 gap-3 font-mono text-center">
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">STANDS ACTIVOS</span>
                    <span className="font-bold text-white text-base">29 Unid.</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">PROMEDIO RED</span>
                    <span className="font-bold text-amber-400 text-base">4.92 ★</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">BLINDAJE</span>
                    <span className="font-bold text-emerald-400 text-base">94.8%</span>
                  </div>
                </div>

                {/* Landings de Clientes */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
                    Gestión de Landings Activas:
                  </span>
                  
                  <div className="space-y-2">
                    {[
                      {
                        name: 'La Montaña Coffee Bar',
                        table: 'Mesa 1',
                        url: 'https://valle-pro-test.vercel.app/?rest=la-montana-coffeebar&table=mesa-1',
                        status: 'Online',
                      },
                      {
                        name: 'Barbería Aconcagua',
                        table: 'Estación Matías',
                        url: 'https://valle-pro-test.vercel.app/?rest=barberia-aconcagua&table=estacion-matias',
                        status: 'Online',
                      },
                      {
                        name: 'Lukotón Los Andes',
                        table: 'Mesa 1',
                        url: 'https://valle-pro-test.vercel.app/?rest=lukoton-los-andes&table=mesa-1',
                        status: 'Online',
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-white text-xs block">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{item.table}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {item.status}
                          </span>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300"
                            title="Abrir landing de cliente"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Report Downloads Section */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
                    Descarga de Reportes & Métricas:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      onClick={downloadReviewsReport}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs flex items-center justify-center gap-2 transition active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Reporte Reseñas (CSV)</span>
                    </button>

                    <button
                      onClick={downloadComplaintsReport}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs flex items-center justify-center gap-2 transition active:scale-95"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Quejas Retenidas (CSV)</span>
                    </button>
                  </div>

                  {downloadSuccess && (
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>{downloadSuccess}</span>
                    </div>
                  )}
                </div>

                {/* Session Logout */}
                <div className="pt-2 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => {
                      setAdminLogged(false);
                      setAdminPin('');
                    }}
                    className="py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-400 border border-rose-500/30 font-bold text-xs transition"
                  >
                    Cerrar Sesión Maestra
                  </button>
                </div>

              </div>
            ) : (
              /* Password Prompt - Zero hints, purely secure */
              <form onSubmit={handleAdminLogin} className="space-y-4 py-2">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 block">
                    Clave Maestra de Seguridad:
                  </label>
                  <input
                    type="password"
                    value={adminPin}
                    onChange={(e) => {
                      setAdminPin(e.target.value);
                      setPinError('');
                    }}
                    placeholder="••••••••"
                    autoFocus
                    className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-700 text-white text-sm font-mono focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                {pinError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{pinError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition active:scale-95 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Verificar Acceso Maestro</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </footer>
  );
};
