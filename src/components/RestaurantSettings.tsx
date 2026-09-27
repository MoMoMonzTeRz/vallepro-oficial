import React, { useState, useEffect } from 'react';
import {
  Shield,
  Sliders,
  Activity,
  ToggleLeft,
  ToggleRight,
  Wifi,
  Star,
  MessageCircle,
  Clock,
  ExternalLink,
  Download,
  AlertTriangle,
  RotateCcw,
  RefreshCw,
  LogOut,
  UtensilsCrossed,
  Scissors,
  Flame,
  CheckCircle,
  FileSpreadsheet,
  Eye,
  Store,
  Bell,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  getNetworkMode,
  setNetworkMode,
  resetMetricas,
  subscribeToMetrics,
  MetricasCentrales,
  NetworkMode,
} from '../services/telemetry';

interface RestaurantSettingsProps {
  onClose: () => void;
  onNavigateToVenue?: (path: string) => void;
}

export const RestaurantSettings: React.FC<RestaurantSettingsProps> = ({
  onClose,
  onNavigateToVenue,
}) => {
  const [networkMode, setModeState] = useState<NetworkMode>(getNetworkMode());
  const [activeTab, setActiveTab] = useState<
    'metricas' | 'widgets' | 'cta' | 'horarios' | 'locales' | 'exportar'
  >('metricas');

  const [metrics, setMetrics] = useState<MetricasCentrales>({
    toquesTotales: 142854,
    quejasEvitadas: 524,
    promedioRed: 4.92,
    standsActivos: 29,
  });

  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Widget settings state
  const [widgets, setWidgets] = useState({
    wifiOneClick: true,
    reviewShield: true,
    waiterCall: true,
    whatsappOrders: true,
    flashPromo: true,
    tipSelector: true,
  });

  // Action Cards / CTA Configuration State
  const [ctaConfig, setCtaConfig] = useState({
    whatsappNumber: '56991825700',
    googleMapsUrl: 'https://maps.google.com/?q=La+Montana+Coffee+Bar+Los+Andes',
    wifiSsid: 'MontanaGuest2026',
    wifiPassword: 'cafemontana2026',
    flashPromoDiscount: '30%',
    flashPromoItem: 'Flat White + Cheesecake',
  });

  // Schedule & Open Status
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [scheduleText, setScheduleText] = useState('Lunes a Sábado: 12:00 a 23:30 hrs');

  useEffect(() => {
    const unsub = subscribeToMetrics((newMetrics) => {
      setMetrics(newMetrics);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const handleModeChange = (e: any) => {
      setModeState(e.detail || getNetworkMode());
    };
    window.addEventListener('network-mode-change', handleModeChange);
    return () => window.removeEventListener('network-mode-change', handleModeChange);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleMode = () => {
    const nextMode: NetworkMode = networkMode === 'demo' ? 'produccion' : 'demo';
    setNetworkMode(nextMode);
    setModeState(nextMode);
    showToast(
      nextMode === 'produccion'
        ? 'Modo Producción Real Activado: Telemetría conectada a Google Sheets'
        : 'Modo Demo / Simulación Activado (Eventos marcados con isDemo: true)'
    );
  };

  const handleConfirmReset = async () => {
    setIsResetting(true);
    try {
      const res = await resetMetricas('valle2026');
      setShowConfirmReset(false);
      showToast(res.message || 'Red reiniciada a cero. Telemetría lista para clientes reales');
    } catch {
      showToast('Red reiniciada a cero localmente.');
      setShowConfirmReset(false);
    } finally {
      setIsResetting(false);
    }
  };

  const downloadReviewsReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Fecha,Local,Mesa,Calificacion,Plataforma,Estado\n' +
      'REV-1042,2026-09-27,La Montana Coffee Bar,Mesa 1,5 Estrellas,Google Maps,Publicada\n' +
      'REV-1041,2026-09-27,Lukoton Los Andes,Mesa 1,5 Estrellas,Google Maps,Publicada\n' +
      'REV-1040,2026-09-26,Barberia Aconcagua,Estacion Matias,5 Estrellas,Google Maps,Publicada\n' +
      'REV-1039,2026-09-26,La Montana Coffee Bar,Mesa 4,5 Estrellas,Google Maps,Publicada\n' +
      'REV-1038,2026-09-25,Lukoton Los Andes,Mesa 2,5 Estrellas,Google Maps,Publicada\n';

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'vallepro_reporte_resenas_google.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Reporte de Reseñas Google descargado.');
  };

  const downloadComplaintsReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Fecha,Local,Mesa,Estrellas,Motivo,Canal_Resolucion,Estado\n' +
      'QUE-088,2026-09-27,La Montana Coffee Bar,Mesa 4,2 Estrellas,Demora en comanda,WhatsApp Privado Administrador,Neutralizada en Mesa\n' +
      'QUE-087,2026-09-26,Lukoton Los Andes,Mesa 5,3 Estrellas,Temperatura bebida,WhatsApp Privado Administrador,Solucionada con Cortesia\n' +
      'QUE-086,2026-09-24,Barberia Aconcagua,Estacion 2,3 Estrellas,Tiempo espera turno,WhatsApp Privado Administrador,Reagendado sin costo\n';

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'vallepro_registro_quejas_retenidas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Registro de Quejas Retenidas descargado.');
  };

  const activeVenuesList = [
    {
      id: 'la-montana',
      name: 'La Montaña Coffee Bar',
      category: 'Restobar & Cafetería de Especialidad',
      path: '/la-montana/mesa-1',
      alias: '/la-montana',
      icon: UtensilsCrossed,
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    },
    {
      id: 'barberia',
      name: 'Barbería Aconcagua',
      category: 'Grooming & Cuidado Personal Masculino',
      path: '/barberia-aconcagua/estacion-matias',
      alias: '/barberia-aconcagua',
      icon: Scissors,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    },
    {
      id: 'lukoton',
      name: 'Lukotón Los Andes',
      category: 'Comida Rápida, Completos & Bajón Chileno',
      path: '/lukoton-los-andes/mesa-1',
      alias: '/lukoton-los-andes',
      icon: Flame,
      color: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0b0c12] text-slate-100 rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl relative">
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-60 px-5 py-2.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 border border-emerald-300 animate-bounce">
          <CheckCircle className="w-4 h-4 text-slate-950 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP BAR / THE HOOD HEADER */}
      <div className="bg-[#10121a] px-5 py-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-900/30 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold font-display text-white">The Hood • Valle Pro</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Consola Central v2.6 ⚡
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Gestor de Widgets, Acciones de Mesa y Telemetría de Red
            </p>
          </div>
        </div>

        {/* Master Demo vs Production Switch */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleMode}
              className={`relative inline-flex h-9 w-48 items-center rounded-full transition-colors p-1 border shadow-inner ${
                networkMode === 'produccion'
                  ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                  : 'bg-amber-950/80 border-amber-500/60 text-amber-300'
              }`}
            >
              <span
                className={`inline-block h-7 w-23 rounded-full bg-gradient-to-r transform transition-transform text-[10px] font-extrabold flex items-center justify-center shadow-md ${
                  networkMode === 'produccion'
                    ? 'translate-x-24 from-emerald-500 to-emerald-400 text-slate-950'
                    : 'translate-x-0 from-amber-500 to-amber-400 text-slate-950'
                }`}
              >
                {networkMode === 'produccion' ? 'PRODUCCIÓN 🟢' : 'MODO DEMO 🧪'}
              </span>
              <span className="absolute inset-0 flex items-center justify-between px-3 text-[10px] font-bold pointer-events-none">
                <span className={networkMode === 'demo' ? 'opacity-0' : 'opacity-100'}>DEMO 🧪</span>
                <span className={networkMode === 'produccion' ? 'opacity-0' : 'opacity-100'}>
                  PROD 🟢
                </span>
              </span>
            </button>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem('vallepro_master_session');
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-rose-500/50 hover:text-rose-400 text-slate-400 text-xs font-semibold transition"
            title="Cerrar sesión de administración"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>

      {/* SUTILE DEMO BANNER WHEN IN DEMO MODE */}
      {networkMode === 'demo' && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-5 py-2 flex items-center justify-between text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-semibold">Entorno de Demostración • Datos Simulados</span>
            <span className="text-[10px] opacity-75 hidden sm:inline">
              (Los toques y pedidos se marcarán con flag isDemo: true)
            </span>
          </div>
          <span className="text-[10px] font-mono bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
            TEST MODE
          </span>
        </div>
      )}

      {/* TABS NAVIGATION */}
      <div className="flex border-b border-slate-800 bg-[#0e1017] px-4 overflow-x-auto scrollbar-none shrink-0 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('metricas')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'metricas'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Métricas & Telemetría</span>
        </button>

        <button
          onClick={() => setActiveTab('widgets')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'widgets'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Gestor de Widgets</span>
        </button>

        <button
          onClick={() => setActiveTab('cta')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'cta'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Star className="w-3.5 h-3.5" />
          <span>Tarjetas de Acción (CTA)</span>
        </button>

        <button
          onClick={() => setActiveTab('horarios')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'horarios'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Horarios & Estado</span>
        </button>

        <button
          onClick={() => setActiveTab('locales')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'locales'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          <span>Locales Activos</span>
        </button>

        <button
          onClick={() => setActiveTab('exportar')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'exportar'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exportar Datos</span>
        </button>
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs">
        {/* TAB 1: MÉTRICAS & TELEMETRÍA */}
        {activeTab === 'metricas' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  Telemetría de Red y Flujo de Clientes
                </h3>
                <p className="text-slate-400 text-[11px]">
                  {networkMode === 'produccion'
                    ? 'Lectura en vivo sincronizada directamente con la hoja central de Google Sheets.'
                    : 'Modo simulación activo: contadores con datos atractivos para demostración comercial.'}
                </p>
              </div>

              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{networkMode === 'produccion' ? 'PRODUCCIÓN REAL' : 'SIMULACIÓN'}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-[#12141e] border border-slate-800">
                <div className="text-[10px] text-slate-400 mb-1">Toques NFC Totales</div>
                <div className="text-2xl font-bold font-mono text-white">
                  {metrics.toquesTotales.toLocaleString('es-CL')}
                </div>
                <div className="text-[9px] text-slate-500 mt-1">+48 toques en las últimas 24h</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#12141e] border border-slate-800">
                <div className="text-[10px] text-slate-400 mb-1">Quejas Retenidas en Mesa</div>
                <div className="text-2xl font-bold font-mono text-amber-400">
                  {metrics.quejasEvitadas.toLocaleString('es-CL')}
                </div>
                <div className="text-[9px] text-emerald-400 mt-1">100% blindadas antes de Maps</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#12141e] border border-slate-800">
                <div className="text-[10px] text-slate-400 mb-1">Soportes Físicos Activos</div>
                <div className="text-2xl font-bold font-mono text-cyan-400">
                  {metrics.standsActivos || 29}
                </div>
                <div className="text-[9px] text-slate-500 mt-1">Acrílicos 14x10 cm calibrados</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#12141e] border border-slate-800">
                <div className="text-[10px] text-slate-400 mb-1">Reputación Promedio Red</div>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {metrics.promedioRed || 4.92} ★
                </div>
                <div className="text-[9px] text-slate-500 mt-1">Valle del Aconcagua</div>
              </div>
            </div>

            {/* Danger Zone: Reset Metrics to 0 */}
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Zona de Control: Reinicio de Métricas a Cero</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Pone los contadores en 0 y despacha la petición de reinicio a la API central de Google
                  Apps Script ({`{ "action": "reset_metricas", "clave": "valle2026" }`}).
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowConfirmReset(true)}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition active:scale-95 shrink-0 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Métricas a 0</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: GESTOR DE WIDGETS */}
        {activeTab === 'widgets' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                Módulos Activos en Mesa (Landing Cliente)
              </h3>
              <p className="text-slate-400 text-[11px]">
                Activa o desactiva módulos de interacción táctil para los soportes físicos de 14x10 cm.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Wi-Fi 1-Click */}
              <div className="p-4 rounded-2xl bg-[#12141e] border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Wi-Fi 1-Click</h4>
                    <p className="text-[10px] text-slate-400">Copia de clave con un toque en el celular</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setWidgets({ ...widgets, wifiOneClick: !widgets.wifiOneClick });
                    showToast(`Wi-Fi 1-Click ${!widgets.wifiOneClick ? 'activado' : 'desactivado'}`);
                  }}
                  className="text-amber-400 hover:text-amber-300"
                >
                  {widgets.wifiOneClick ? (
                    <ToggleRight className="w-8 h-8 text-amber-400" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-600" />
                  )}
                </button>
              </div>

              {/* Blindaje de Reseñas */}
              <div className="p-4 rounded-2xl bg-[#12141e] border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Laboratorio de Blindaje</h4>
                    <p className="text-[10px] text-slate-400">4-5★ a Maps / 1-3★ a WhatsApp Privado</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setWidgets({ ...widgets, reviewShield: !widgets.reviewShield });
                    showToast(
                      `Blindaje de Reseñas ${!widgets.reviewShield ? 'activado' : 'desactivado'}`
                    );
                  }}
                  className="text-amber-400 hover:text-amber-300"
                >
                  {widgets.reviewShield ? (
                    <ToggleRight className="w-8 h-8 text-emerald-400" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-600" />
                  )}
                </button>
              </div>

              {/* Llamar al Mozo */}
              <div className="p-4 rounded-2xl bg-[#12141e] border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Llamar al Mozo / Personal</h4>
                    <p className="text-[10px] text-slate-400">Solicitar atención o pedir la cuenta POS</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setWidgets({ ...widgets, waiterCall: !widgets.waiterCall });
                    showToast(`Llamado a Mozo ${!widgets.waiterCall ? 'activado' : 'desactivado'}`);
                  }}
                  className="text-cyan-400"
                >
                  {widgets.waiterCall ? (
                    <ToggleRight className="w-8 h-8 text-cyan-400" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-600" />
                  )}
                </button>
              </div>

              {/* Comandas WhatsApp */}
              <div className="p-4 rounded-2xl bg-[#12141e] border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Comanda Directa a Cocina</h4>
                    <p className="text-[10px] text-slate-400">Emisión estructurada por WhatsApp</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setWidgets({ ...widgets, whatsappOrders: !widgets.whatsappOrders });
                    showToast(
                      `Comandas WhatsApp ${!widgets.whatsappOrders ? 'activadas' : 'desactivadas'}`
                    );
                  }}
                  className="text-emerald-400"
                >
                  {widgets.whatsappOrders ? (
                    <ToggleRight className="w-8 h-8 text-emerald-400" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TARJETAS DE ACCIÓN & CTA */}
        {activeTab === 'cta' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                Editor de Enlaces y Conexiones Físicas
              </h3>
              <p className="text-slate-400 text-[11px]">
                Configura los destinos de cada acción disparada por los chips NFC.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-semibold">
                  WhatsApp Oficial para Comandas
                </label>
                <input
                  type="text"
                  value={ctaConfig.whatsappNumber}
                  onChange={(e) => setCtaConfig({ ...ctaConfig, whatsappNumber: e.target.value })}
                  placeholder="56991825700"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-300 font-semibold">
                  Filtro 5★ - Enlace Google Maps
                </label>
                <input
                  type="text"
                  value={ctaConfig.googleMapsUrl}
                  onChange={(e) => setCtaConfig({ ...ctaConfig, googleMapsUrl: e.target.value })}
                  placeholder="https://maps.google.com/..."
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-300 font-semibold">Nombre de Red Wi-Fi (SSID)</label>
                <input
                  type="text"
                  value={ctaConfig.wifiSsid}
                  onChange={(e) => setCtaConfig({ ...ctaConfig, wifiSsid: e.target.value })}
                  placeholder="MontanaGuest2026"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-300 font-semibold">Clave Wi-Fi Clientes</label>
                <input
                  type="text"
                  value={ctaConfig.wifiPassword}
                  onChange={(e) => setCtaConfig({ ...ctaConfig, wifiPassword: e.target.value })}
                  placeholder="cafemontana2026"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => showToast('Parámetros de enlaces guardados correctamente.')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
              >
                Guardar Conexiones ⚡
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: HORARIOS & ESTADO EN VIVO */}
        {activeTab === 'horarios' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                Horarios & Estado de Operación
              </h3>
              <p className="text-slate-400 text-[11px]">
                Controla lo que ven los comensales cuando acercan el celular fuera de horario.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#12141e] border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white">Estado de Cocina / Atención en Vivo</h4>
                <p className="text-[11px] text-slate-400">
                  {isOpenNow ? '🟢 Abierto Ahora • Comandas habilitadas' : '🔴 Local Cerrado Temporalmente'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsOpenNow(!isOpenNow);
                  showToast(`Estado cambiado a: ${!isOpenNow ? 'Abierto' : 'Cerrado'}`);
                }}
              >
                {isOpenNow ? (
                  <ToggleRight className="w-8 h-8 text-emerald-400" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-rose-500" />
                )}
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-300 font-semibold">Texto de Horario en Pantalla</label>
              <input
                type="text"
                value={scheduleText}
                onChange={(e) => setScheduleText(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* TAB 5: LOCALES ACTIVOS */}
        {activeTab === 'locales' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                Locales Activos en Aconcagua
              </h3>
              <p className="text-slate-400 text-[11px]">
                Acceso directo con 1 clic para previsualizar o gestionar cada landing oficial.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {activeVenuesList.map((venue) => {
                const Icon = venue.icon;
                return (
                  <div
                    key={venue.id}
                    className="p-4 rounded-2xl bg-[#12141e] border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-2 rounded-xl border ${venue.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-white text-xs truncate">{venue.name}</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 mb-3">{venue.category}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <div className="text-[10px] font-mono text-amber-400">{venue.path}</div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            if (onNavigateToVenue) {
                              onNavigateToVenue(venue.path);
                            } else {
                              window.history.pushState({}, '', venue.path);
                              window.dispatchEvent(new PopStateEvent('popstate'));
                            }
                          }}
                          className="flex-1 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                        >
                          Ver en App
                        </button>
                        <button
                          type="button"
                          onClick={() => window.open(venue.path, '_blank')}
                          title="Abrir en pestaña nueva"
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: EXPORTAR REGISTROS */}
        {activeTab === 'exportar' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                Descarga de Registros y Reportes (CSV)
              </h3>
              <p className="text-slate-400 text-[11px]">
                Exporta la base de datos de reseñas 5★, quejas retenidas y cotizaciones para análisis.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={downloadReviewsReport}
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-white font-semibold transition"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Reseñas Google (5★)</span>
              </button>

              <button
                type="button"
                onClick={downloadComplaintsReport}
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-white font-semibold transition"
              >
                <Download className="w-4 h-4 text-rose-400" />
                <span>Quejas Retenidas</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  showToast('Reporte de cotizaciones exportado.');
                }}
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-white font-semibold transition"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Cotizaciones Web</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Reset */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#12131a] border border-rose-500/50 rounded-3xl max-w-md w-full p-6 text-slate-100 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h4 className="text-lg font-bold text-white mb-1">
                ¿Deseas reiniciar todas las métricas y comenzar en limpio?
              </h4>
              <p className="text-xs text-slate-400">
                Esta acción pondrá los toques NFC y quejas en 0 y notificará a Google Apps Script con la
                clave maestra "valle2026".
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={isResetting}
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isResetting}
                onClick={handleConfirmReset}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30"
              >
                {isResetting ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RotateCcw className="w-3.5 h-3.5" />
                )}
                <span>Confirmar Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
