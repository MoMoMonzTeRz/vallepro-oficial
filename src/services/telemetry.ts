/**
 * Servicio Central de Telemetría y Eventos - Valle Pro
 * Conexión directa a Google Apps Script API
 */

export const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbydFn42S1bb1D9khweQ-Oj9_01m9yJwP3sE0oQ7JMab0v2HxBT6o-vM0tU6pHeeo9Ng1g/exec';

export type NetworkMode = 'demo' | 'produccion';

export function getNetworkMode(): NetworkMode {
  if (typeof window === 'undefined') return 'demo';
  const saved = localStorage.getItem('vallepro_network_mode');
  return saved === 'produccion' ? 'produccion' : 'demo';
}

export function setNetworkMode(mode: NetworkMode) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('vallepro_network_mode', mode);
    window.dispatchEvent(new CustomEvent('network-mode-change', { detail: mode }));
  }
}

export function isLocalDemo(slug: string): boolean {
  const s = (slug || '').toLowerCase().trim();
  const demoSlugs = [
    'la-montana',
    'la-montana-coffeebar',
    'lukoton-los-andes',
    'lukoton',
    'barberia-aconcagua',
    'barberia',
  ];
  if (demoSlugs.includes(s)) {
    return true;
  }
  return getNetworkMode() === 'demo';
}

export interface EventoToqueNFC {
  action: 'registrar_evento';
  slug: string;
  table: string;
  tipo: 'toque_nfc';
  isDemo?: boolean;
}

export interface QuejaPrivada {
  action: 'queja_privada';
  slug: string;
  table: string;
  stars: number;
  motivo: string;
  comentario: string;
  isDemo?: boolean;
}

export interface MetricasCentrales {
  toquesTotales: number;
  quejasEvitadas: number;
  promedioRed?: number;
  standsActivos?: number;
  timestamp?: string;
  isLive?: boolean;
}

export interface MenuItemOnboarding {
  nombre: string;
  descripcion: string;
  precio: string;
}

export interface OnboardingClienteData {
  nombreLocal: string;
  rubro: string;
  eslogan: string;
  direccion: string;
  comuna: string;
  googleMapsUrl: string;
  horarios: string;
  whatsapp: string;
  instagram: string;
  metodosPago: string[];
  standsContratados: number;
  tipoEstacion: string;
  detalleEstaciones: string[];
  reservaExternaUrl?: string;
  itemsMenu: MenuItemOnboarding[];
  textoMenuCompleto?: string;
  wifiSsid: string;
  wifiPassword: string;
  enlaceDriveFotos: string;
  resenasGoogle: string;
  autorizarExtraccionGoogle: boolean;
}

export interface CotizacionData {
  standsCount: number;
  packType: 'individual' | 'pack5' | 'pack10' | 'pack15' | 'custom';
  hardwarePrice: number;
  hardwareDiscount: number;
  includeLanding: boolean;
  landingPrice: number;
  landingMonthly: number;
  includeGoogleMaps: boolean;
  googleMapsPrice: number;
  totalInicial: number;
  totalMensual: number;
  ahorroTotal: number;
  nombreLocal: string;
  rubro: string;
  nombreContacto: string;
  telefono: string;
  comuna: string;
  notas?: string;
}

// Baseline persistent metrics in case of network latency or script initialization
const BASE_METRICS: MetricasCentrales = {
  toquesTotales: 142854,
  quejasEvitadas: 524,
  promedioRed: 4.92,
  standsActivos: 29,
  isLive: false,
};

let cachedMetrics: MetricasCentrales = { ...BASE_METRICS };
let lastFetchTime = 0;
const CACHE_DURATION_MS = 15000; // 15 seconds cache

type MetricsListener = (metrics: MetricasCentrales) => void;
const listeners = new Set<MetricsListener>();

export function subscribeToMetrics(listener: MetricsListener): () => void {
  listeners.add(listener);
  listener(cachedMetrics);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners(metrics: MetricasCentrales) {
  cachedMetrics = { ...metrics };
  listeners.forEach((fn) => {
    try {
      fn(cachedMetrics);
    } catch (e) {
      console.error('Error in metrics listener:', e);
    }
  });
}

/**
 * 1. Registra un toque NFC en la API central de Google Apps Script
 */
export async function registrarToqueNFC(slug: string, table: string, isDemoOverride?: boolean): Promise<boolean> {
  const isDemo = isDemoOverride !== undefined ? isDemoOverride : isLocalDemo(slug);
  const payload: EventoToqueNFC = {
    action: 'registrar_evento',
    slug: slug || 'general',
    table: table || 'mesa-principal',
    tipo: 'toque_nfc',
    isDemo,
  };

  // Optimistically increment local live count
  cachedMetrics = {
    ...cachedMetrics,
    toquesTotales: cachedMetrics.toquesTotales + 1,
  };
  notifyListeners(cachedMetrics);

  try {
    // We send Content-Type: text/plain to avoid CORS preflight (OPTIONS) in browser while delivering valid JSON
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return true;
    }
    // Also dispatch to local server proxy as backup
    await fetch('/api/telemetry/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});
    return true;
  } catch (err) {
    console.warn('Direct GAS POST failed, fallback to local proxy:', err);
    try {
      await fetch('/api/telemetry/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * 2. Registra una queja privada retenida en la API central de Google Apps Script
 */
export async function registrarQuejaPrivada(data: {
  slug: string;
  table: string;
  stars: number;
  motivo: string;
  comentario: string;
  isDemo?: boolean;
}): Promise<boolean> {
  const isDemo = data.isDemo !== undefined ? data.isDemo : isLocalDemo(data.slug);
  const payload: QuejaPrivada = {
    action: 'queja_privada',
    slug: data.slug || 'general',
    table: data.table || 'mesa-1',
    stars: data.stars,
    motivo: data.motivo || 'Atención en general',
    comentario: data.comentario || 'Sin comentarios adicionales',
    isDemo,
  };

  // Optimistically increment quejasEvitadas
  cachedMetrics = {
    ...cachedMetrics,
    quejasEvitadas: cachedMetrics.quejasEvitadas + 1,
  };
  notifyListeners(cachedMetrics);

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return true;
    }

    await fetch('/api/telemetry/complaint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});
    return true;
  } catch (err) {
    console.warn('Direct GAS complaint POST failed, fallback to proxy:', err);
    try {
      await fetch('/api/telemetry/complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * 2b. Envía la ficha técnica de onboarding a la API central de Google Apps Script
 * Payload: action "nuevo_onboarding_cliente"
 */
export async function registrarOnboardingCliente(data: OnboardingClienteData): Promise<{ ok: boolean; message?: string }> {
  const payload = {
    action: 'nuevo_onboarding_cliente',
    timestamp: new Date().toISOString(),
    ...data,
  };

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    // Also forward to server proxy as durable ledger
    fetch('/api/telemetry/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});

    return { ok: true };
  } catch (err) {
    console.warn('Direct GAS onboarding POST failed, fallback to proxy:', err);
    try {
      const res = await fetch('/api/telemetry/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return { ok: res.ok };
    } catch {
      return { ok: false, message: 'No se pudo conectar con el servidor central' };
    }
  }
}

/**
 * 2c. Envía la cotización interactiva a la API central de Google Apps Script
 * Payload: action "nueva_cotizacion"
 */
export async function registrarCotizacion(data: CotizacionData): Promise<{ ok: boolean; message?: string }> {
  const payload = {
    action: 'nueva_cotizacion',
    timestamp: new Date().toISOString(),
    ...data,
  };

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    // Also forward to server proxy
    fetch('/api/telemetry/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});

    return { ok: true };
  } catch (err) {
    console.warn('Direct GAS quote POST failed, fallback to proxy:', err);
    try {
      const res = await fetch('/api/telemetry/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return { ok: res.ok };
    } catch {
      return { ok: false, message: 'No se pudo conectar con el servidor central' };
    }
  }
}

/**
 * 3. Lee las métricas acumuladas desde la API central de Google Apps Script
 */
export async function obtenerMetricasAcumuladas(force = false): Promise<MetricasCentrales> {
  const now = Date.now();
  if (!force && now - lastFetchTime < CACHE_DURATION_MS) {
    return cachedMetrics;
  }

  try {
    const res = await fetch(APPS_SCRIPT_URL);
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    lastFetchTime = now;

    // Check for keys provided by GAS
    const toques =
      data.toquesTotales ??
      data.toques_totales ??
      data.totalToques ??
      data.total_toques ??
      data.toques;

    const quejas =
      data.quejasEvitadas ??
      data.quejas_evitadas ??
      data.totalQuejas ??
      data.quejasRetenidas ??
      data.quejas;

    if (typeof toques === 'number' || typeof quejas === 'number') {
      const updated: MetricasCentrales = {
        toquesTotales: typeof toques === 'number' ? toques : cachedMetrics.toquesTotales,
        quejasEvitadas: typeof quejas === 'number' ? quejas : cachedMetrics.quejasEvitadas,
        promedioRed: typeof data.promedioRed === 'number' ? data.promedioRed : cachedMetrics.promedioRed,
        standsActivos: typeof data.standsActivos === 'number' ? data.standsActivos : cachedMetrics.standsActivos,
        timestamp: new Date().toISOString(),
        isLive: true,
      };
      notifyListeners(updated);
      return updated;
    } else {
      // If GAS returned an error response (e.g. while sheet is binding), return current cached with isLive status
      return cachedMetrics;
    }
  } catch (err) {
    console.warn('Failed to fetch from GAS directly, trying proxy:', err);
    try {
      const res = await fetch('/api/telemetry/stats');
      if (res.ok) {
        const data = await res.json();
        lastFetchTime = now;
        if (data.toquesTotales || data.quejasEvitadas) {
          const updated: MetricasCentrales = {
            toquesTotales: data.toquesTotales ?? cachedMetrics.toquesTotales,
            quejasEvitadas: data.quejasEvitadas ?? cachedMetrics.quejasEvitadas,
            promedioRed: data.promedioRed ?? cachedMetrics.promedioRed,
            standsActivos: data.standsActivos ?? cachedMetrics.standsActivos,
            timestamp: new Date().toISOString(),
            isLive: data.isLive ?? false,
          };
          notifyListeners(updated);
          return updated;
        }
      }
    } catch {}

    return cachedMetrics;
  }
}

/**
 * 6. Reiniciar todas las métricas a cero (Protegido con clave valle2026)
 */
export async function resetMetricas(clave: string = 'valle2026'): Promise<{ ok: boolean; message: string }> {
  cachedMetrics = {
    toquesTotales: 0,
    quejasEvitadas: 0,
    promedioRed: 5.0,
    standsActivos: 0,
    isLive: true,
    timestamp: new Date().toISOString(),
  };
  notifyListeners(cachedMetrics);

  try {
    const res = await fetch('/api/telemetry/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clave }),
    });
    if (res.ok) {
      const data = await res.json();
      return { ok: true, message: data.message || 'Red reiniciada a cero. Telemetría lista para clientes reales.' };
    }
  } catch (err) {
    console.warn('Reset via proxy error:', err);
  }

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'reset_metricas', clave }),
    });
    return { ok: true, message: 'Red reiniciada a cero. Telemetría lista para clientes reales.' };
  } catch {
    return { ok: true, message: 'Red reiniciada a cero localmente.' };
  }
}

export interface LocalDataDynamic {
  nombreLocal: string;
  rubro?: string;
  eslogan?: string;
  direccion?: string;
  comuna?: string;
  googleMapsUrl?: string;
  horarios?: string;
  whatsapp?: string;
  instagram?: string;
  wifiSsid?: string;
  wifiPassword?: string;
  itemsMenu?: Array<{
    nombre: string;
    descripcion: string;
    precio: string | number;
    categoria?: string;
    badge?: string;
  }>;
}

/**
 * 7. Consulta dinámica de local registrado
 */
export async function obtenerDatosLocal(slug: string): Promise<LocalDataDynamic | null> {
  const cleanSlug = (slug || '').trim().toLowerCase();
  if (!cleanSlug) return null;

  // 1. Try local API proxy
  try {
    const res = await fetch(`/api/telemetry/local/${encodeURIComponent(cleanSlug)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && (data.nombreLocal || data.nombre || data.local)) {
        return {
          nombreLocal: data.nombreLocal || data.nombre || data.local,
          rubro: data.rubro || 'Local Comercial',
          eslogan: data.eslogan || '',
          direccion: data.direccion || 'Valle del Aconcagua',
          comuna: data.comuna || 'Los Andes / San Felipe',
          googleMapsUrl: data.googleMapsUrl || 'https://maps.google.com',
          horarios: data.horarios || 'Atención continuada',
          whatsapp: data.whatsapp || '56991825700',
          instagram: data.instagram || '',
          wifiSsid: data.wifiSsid || 'VallePro-Guest',
          wifiPassword: data.wifiPassword || 'Aconcagua2026',
          itemsMenu: Array.isArray(data.itemsMenu) ? data.itemsMenu : [],
        };
      }
    }
  } catch {}

  // 2. Direct GAS fetch
  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?action=obtener_local&slug=${encodeURIComponent(cleanSlug)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && (data.nombreLocal || data.nombre || data.local)) {
        return {
          nombreLocal: data.nombreLocal || data.nombre || data.local,
          rubro: data.rubro || 'Local Comercial',
          eslogan: data.eslogan || '',
          direccion: data.direccion || 'Valle del Aconcagua',
          comuna: data.comuna || 'Los Andes / San Felipe',
          googleMapsUrl: data.googleMapsUrl || 'https://maps.google.com',
          horarios: data.horarios || 'Atención continuada',
          whatsapp: data.whatsapp || '56991825700',
          instagram: data.instagram || '',
          wifiSsid: data.wifiSsid || 'VallePro-Guest',
          wifiPassword: data.wifiPassword || 'Aconcagua2026',
          itemsMenu: Array.isArray(data.itemsMenu) ? data.itemsMenu : [],
        };
      }
    }
  } catch {}

  // 3. Local storage fallback (for newly onboarded client)
  try {
    const localSaved = localStorage.getItem(`vallepro_local_${cleanSlug}`);
    if (localSaved) {
      const parsed = JSON.parse(localSaved);
      return parsed;
    }
  } catch {}

  return null;
}

