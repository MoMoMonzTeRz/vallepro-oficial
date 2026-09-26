import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Activity,
  Smartphone,
  Star,
  ShieldCheck,
  Radio,
  Clock,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  CheckCircle,
  Sparkles,
  Users,
  Eye,
  RefreshCw,
  Link,
} from 'lucide-react';
import {
  obtenerMetricasAcumuladas,
  subscribeToMetrics,
  MetricasCentrales,
  APPS_SCRIPT_URL,
} from '../services/telemetry';

interface FeedEvent {
  id: string;
  type: 'nfc_tap' | 'google_review' | 'menu_view' | 'shield_intercept' | 'wifi_copy';
  title: string;
  venue: string;
  location: string;
  timeAgo: string;
  badge: string;
  badgeColor: string;
}

export const NetworkAnalyticsHub: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'la-montana' | 'lukoton' | 'barberia'>('all');
  const [pulse, setPulse] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
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
    }, 20000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    const updated = await obtenerMetricasAcumuladas(true);
    setMetrics(updated);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Live Activity Feed simulating real events in Valle del Aconcagua
  const [events, setEvents] = useState<FeedEvent[]>([
    {
      id: 'e-1',
      type: 'nfc_tap',
      title: 'Nuevo toque en Mesa 3 (Salón Principal)',
      venue: 'La Montaña Coffee Bar',
      location: 'Esmeralda 537, Los Andes',
      timeAgo: 'hace 4 seg',
      badge: 'NFC 0.18s',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    },
    {
      id: 'e-2',
      type: 'google_review',
      title: 'Calificación 5★ derivada con éxito a Google Maps',
      venue: 'Lukotón Los Andes',
      location: 'Esmeralda 842, Los Andes',
      timeAgo: 'hace 18 seg',
      badge: '+4.8★ Maps',
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'e-3',
      type: 'menu_view',
      title: 'Carta consultada en Puesto #2 (Espejo)',
      venue: 'Barbería Aconcagua',
      location: 'Prat 412, San Felipe',
      timeAgo: 'hace 35 seg',
      badge: 'Catálogo HD',
      badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 'e-4',
      type: 'shield_intercept',
      title: 'Reclamo privado retenido y derivado a WhatsApp de administración',
      venue: 'La Montaña Coffee Bar',
      location: 'Esmeralda 537, Los Andes',
      timeAgo: 'hace 1 min',
      badge: 'Escudo Blindaje',
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'e-5',
      type: 'wifi_copy',
      title: 'Acceso a clave Wi-Fi copiada en 1 clic',
      venue: 'Lukotón Los Andes',
      location: 'Esmeralda 842, Los Andes',
      timeAgo: 'hace 2 min',
      badge: 'Wi-Fi Guest',
      badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    },
    {
      id: 'e-6',
      type: 'nfc_tap',
      title: 'Nuevo toque en Mesa 1 (Terraza)',
      venue: 'La Montaña Coffee Bar',
      location: 'Esmeralda 537, Los Andes',
      timeAgo: 'hace 3 min',
      badge: 'NFC 0.18s',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    },
  ]);

  // Periodic heartbeat tick for live feed
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        toquesTotales: prev.toquesTotales + 1,
      }));
      setPulse(true);
      setTimeout(() => setPulse(false), 800);

      // Randomly rotate an event timestamp or insert fresh event
      const sampleEvents: FeedEvent[] = [
        {
          id: `e-${Date.now()}`,
          type: 'nfc_tap',
          title: 'Nuevo toque en Mesa 4 (Sector Bar)',
          venue: 'La Montaña Coffee Bar',
          location: 'Esmeralda 537, Los Andes',
          timeAgo: 'hace unos segundos',
          badge: 'NFC 0.18s',
          badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        },
        {
          id: `e-${Date.now()}`,
          type: 'google_review',
          title: 'Calificación 5★ derivada a Google (Lukotón)',
          venue: 'Lukotón Los Andes',
          location: 'Esmeralda 842, Los Andes',
          timeAgo: 'hace unos segundos',
          badge: '5.0★ Maps',
          badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        },
        {
          id: `e-${Date.now()}`,
          type: 'menu_view',
          title: 'Carta consultada (Barbería Aconcagua)',
          venue: 'Barbería Aconcagua',
          location: 'Prat 412, San Felipe',
          timeAgo: 'hace unos segundos',
          badge: 'Servicio Express',
          badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
        },
      ];

      const newEvt = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      setEvents((prev) => [newEvt, ...prev.slice(0, 6)]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const filteredEvents = events.filter((e) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'la-montana') return e.venue.includes('La Montaña');
    if (selectedFilter === 'lukoton') return e.venue.includes('Lukotón');
    if (selectedFilter === 'barberia') return e.venue.includes('Barbería');
    return true;
  });

  return (
    <section id="centro-control" className="py-24 relative overflow-hidden bg-[#07080b]">
      {/* Background Subtle Ambiance */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Activity className="w-4 h-4 text-cyan-400" />
              CENTRO DE CONTROL & ANALÍTICAS DE RED
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>API Google Apps Script En Vivo</span>
              <button
                onClick={handleManualRefresh}
                title="Sincronizar métricas acumuladas desde Google Apps Script"
                className="ml-1 text-slate-400 hover:text-white transition"
              >
                <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
              </button>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Monitoreo en tiempo real de la red{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              vallepro.cl
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Estadísticas consolidadas de todas las cartas digitales, soportes NFC activos y blindaje de reputación en Los Andes y San Felipe:
          </p>
        </div>

        {/* Global KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* KPI 1: Toques NFC Registrados */}
          <div
           
            className="glass-obsidian rounded-3xl p-6 border-amber-500/30 relative overflow-hidden group shadow-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Toques NFC Totales (API)
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Radio className={`w-4 h-4 ${pulse ? 'animate-ping' : ''}`} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
                {metrics.toquesTotales.toLocaleString('es-CL')}
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> En vivo
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Lecturas contactless instantáneas en mesas de Aconcagua
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>Tiempo de respuesta:</span>
              <span className="text-amber-400 font-bold">0.18 seg</span>
            </div>
          </div>

          {/* KPI 2: Visitas a Cartas Digitales */}
          <div
           
            className="glass-obsidian rounded-3xl p-6 border-cyan-500/30 relative overflow-hidden group shadow-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Visitas a Cartas Web
              </span>
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
                98.420
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold flex items-center">
                <Eye className="w-3.5 h-3.5 mr-0.5" /> 100% web
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Visualizaciones directas sin descargas de aplicaciones
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>Carga en red móvil:</span>
              <span className="text-cyan-400 font-bold">Ultrarrápida (&lt; 0.4s)</span>
            </div>
          </div>

          {/* KPI 3: Derivaciones a Google Maps (5 Estrellas) */}
          <div
           
            className="glass-obsidian rounded-3xl p-6 border-emerald-500/30 relative overflow-hidden group shadow-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Derivaciones Google Maps
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Star className="w-4 h-4 fill-emerald-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
                8.410+
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                4.9 ★ promedio
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Reseñas 5 estrellas impulsadas en comensales felices
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>Impacto en algoritmo:</span>
              <span className="text-emerald-400 font-bold">Top 1 local</span>
            </div>
          </div>

          {/* KPI 4: Quejas Retenidas en Privado */}
          <div
           
            className="glass-obsidian rounded-3xl p-6 border-purple-500/30 relative overflow-hidden group shadow-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Quejas Retenidas (API)
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
                {metrics.quejasEvitadas.toLocaleString('es-CL')}
              </div>
              <span className="text-xs font-mono text-purple-300 font-bold">
                94.2% blindaje
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Incidencias neutralizadas en privado con el dueño
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>Reseñas 1★ públicas:</span>
              <span className="text-emerald-400 font-bold">0 recibidas</span>
            </div>
          </div>

        </div>

        {/* Live Activity Feed Box */}
        <div
         
          className="glass-obsidian rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl"
        >
          {/* Feed Header with Filter Pills */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  Live Feed • Actividad Reciente de Locales Conectados
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Sincronización en tiempo real desde terminales de mesa en Aconcagua
                </p>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                { id: 'all', label: 'Todos los Locales' },
                { id: 'la-montana', label: 'La Montaña' },
                { id: 'lukoton', label: 'Lukotón' },
                { id: 'barberia', label: 'Barbería' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id as any)}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    selectedFilter === filter.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Feed Event Items List */}
          <div className="space-y-3">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition gap-3"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 text-amber-400">
                    {event.type === 'nfc_tap' && <Radio className="w-4 h-4" />}
                    {event.type === 'google_review' && <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />}
                    {event.type === 'menu_view' && <Smartphone className="w-4 h-4 text-cyan-400" />}
                    {event.type === 'shield_intercept' && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                    {event.type === 'wifi_copy' && <Sparkles className="w-4 h-4 text-purple-400" />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-white text-xs sm:text-sm">
                        {event.title}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${event.badgeColor}`}>
                        {event.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5">
                      <span className="text-amber-400 font-semibold">{event.venue}</span>
                      <span>•</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 shrink-0 self-end sm:self-center">
                  <Clock className="w-3 h-3 text-slate-600" />
                  <span>{event.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Network Health Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle className="w-4 h-4" />
              <span>Infraestructura Cloud Activa (99.98% SLA)</span>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <span>Soporte presencial: Los Andes & San Felipe</span>
              <span className="text-slate-700">|</span>
              <span className="text-amber-400 font-bold">vallepro.cl</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
