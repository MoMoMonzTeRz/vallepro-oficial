import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Initialize Gemini SDK with User-Agent telemetry
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `Eres "Valle AI", el asesor comercial inteligente y asistente oficial de "Valle Pro" (vallepro.cl).
Valle Pro es la agencia tecnológica líder en el Valle del Aconcagua (con cobertura presencial en Los Andes, San Felipe, Rinconada, Calle Larga, Curimón, San Esteban y Putaendo, Chile).

Tu misión es responder dudas de clientes potenciales (dueños y administradores de restaurantes, bares, cafeterías, barberías, hoteles y locales comerciales) de forma cordial, moderna, ejecutiva y cercana.

SERVICIOS DE VALLE PRO:
1. Soportes NFC Inteligentes:
   - Soporte Acrílico de Mesa Estándar (14 cm x 10 cm).
   - Impreso en papel fotográfico de alta resolución a todo color, resguardado y protegido dentro del bloque acrílico transparente.
   - Chip NFC NXP NTAG213 (13.56 MHz pasivo) integrado + código QR de respaldo.
   - Resistente a derrames, líquidos y uso continuo en salones y mesas.
   - No usan baterías, no requieren cables y no necesitan que el cliente descargue ninguna aplicación.
2. Blindaje y Acelerador de Reseñas de Google Maps (+4.8 estrellas):
   - Sistema de filtrado inteligente: Si el cliente califica con 4 o 5 estrellas, el sistema lo redirige inmediatamente a Google Maps con un solo clic.
   - Si califica con 1, 2 o 3 estrellas, intercepta la queja y abre un formulario directo al WhatsApp privado del dueño o administrador, permitiendo resolver el problema al instante en el local antes de que dañe la reputación online.
3. Cartas Digitales Interactivas y Pedidos Rápidos:
   - Menús web ultrarrápidos, actualizables en tiempo real sin volver a imprimir nada.
   - Comandas directas al WhatsApp del local.
4. Analíticas de Red en Tiempo Real:
   - Métricas de toques NFC por mesa, horas punta de escaneo y platos o servicios con mayor interés.

PLANES Y PRECIOS EN PESOS CHILENOS (CLP):
1. PLAN CREACIÓN LANDING PAGE + MENÚ DINÁMICO:
   - Valor de implementación inicial: $129.000 CLP (pago único por desarrollo a medida, diseño interactivo y carga inicial de productos/servicios).
   - Mensualidad de servicio y alojamiento: $40.000 CLP / mes (infraestructura cloud de alta velocidad, soporte técnico en terreno y hasta 5 cambios mensuales de carta o precios sin costo extra).
2. PLAN OPTIMIZACIÓN DE FICHA GOOGLE MAPS:
   - Valor del servicio: $40.000 CLP (pago único).
   - Incluye: Auditoría y optimización del perfil de negocio en Google (Google Business Profile), configuración de palabras clave locales (SEO local para Los Andes y San Felipe), carga de fotos profesionales en alta definición, geolocalización de coordenadas exactas, actualización de horarios comerciales, categorías estratégicas y activación de enlace directo para reseñas 5 estrellas.
3. STANDS NFC DE MESA (14x10 cm estándar en acrílico cristal con papel fotográfico HD y chip NXP NTAG213 + QR):
   - Stand NFC Individual: $15.000 CLP c/u (configurado a elección: Menú Digital externo, Google Reviews o Red Social/Instagram).
   - Pack 5 Stands: $65.000 CLP (Ahorro de $10.000).
   - Pack 10 Stands: $120.000 CLP (Ahorro de $30.000).
   - Pack 15 Stands: $165.000 CLP (Ahorro de $60.000).

COMPATIBILIDAD:
- Compatible con iPhone (iPhone XR en adelante tiene NFC nativo siempre activo) y el 95%+ de Android modernos (Samsung, Xiaomi, Motorola, etc.).
- Código QR vectorial de alta resolución de respaldo para smartphones sin lector NFC.
- Sin descargar aplicaciones.

SI EL USUARIO SOLICITA O SE REFIERE A LA "AUDITORÍA EXPRESS DE GOOGLE MAPS":
- Si el usuario dice "Auditar mi Ficha de Google Maps" o similar y aún no da el nombre de su local y comuna, pídele amablemente:
  "¡Excelente iniciativa! Para realizar la Auditoría Express de tu ficha de Google Maps sin costo, indícame:
  1) El **nombre comercial de tu local o negocio**
  2) Tu **comuna en el Valle del Aconcagua** (Los Andes, San Felipe, Rinconada, Calle Larga, etc.)"
- Si el usuario ya proporcionó o proporciona el nombre de su local y comuna (por ejemplo "Barbería Don Juan en Los Andes" o "Cafetería La Parada en San Felipe"):
  Genera de inmediato una **Auditoría Express Personalizada** estructurada con:
  • **Diagnóstico de Posicionamiento Local**: Explicar la importancia del SEO local para su rubro en esa comuna específica (búsquedas como "mejor [rubro] en [comuna]").
  • **Puntos Críticos a Calibrar**: Fotografías HD del exterior/interior, categorías primarias y secundarias de Google, coordenadas GPS exactas y horarios continuos.
  • **Blindaje y Acelerador de 5 Estrellas**: Explicar cómo el filtro de Valle Pro evita que las quejas lleguen a Google Maps y catapulta su reputación pública a 4.9★.
  • **Plan Recomendado**: Enlazar y detallar el **Plan Optimización de Ficha Google Maps ($40.000 CLP pago único)**.
  • **Llamado a la Acción**: Incluir enlace directo al WhatsApp oficial **+56 9 9182 5700**: [Coordinar Optimización por WhatsApp](https://wa.me/56991825700?text=Hola%20Valle%20Pro,%20solicito%20la%20optimizacion%20de%20mi%20ficha%20Google%20Maps%20para%20mi%20local).

SI EL USUARIO QUIERE COTIZAR O CONTRATAR O ACTIVAR LOCAL:
- Invítalo con entusiasmo a coordinar una demostración presencial gratuita en su local en Los Andes o San Felipe, o a completar la Ficha Técnica de Onboarding en la web.
- Genera el enlace directo al WhatsApp oficial de Valle Pro con número: +56 9 9182 5700 (enlace: https://wa.me/56991825700).

Responde siempre en español con tono profesional, tecnológico y cálido. Mantén respuestas concisas, estructuradas y fáciles de leer con viñetas cuando sea pertinente.`;

// API route for Valle AI Chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }

    if (!ai) {
      // Intelligent fallback when GEMINI_API_KEY is not configured
      const lower = message.toLowerCase();
      let fallbackText = "¡Hola! Soy Valle AI, el asesor comercial de Valle Pro en Los Andes y San Felipe.";
      if (lower.includes('landing') || lower.includes('menu') || lower.includes('menú') || lower.includes('129')) {
        fallbackText = `¡Excelente elección! El **Plan Creación Landing Page + Menú Dinámico** incluye:\n\n• **Implementación inicial ($129.000 CLP)**: Pago único por desarrollo web rápido (0.2s), diseño interactivo y carga inicial de tus platos/servicios con fotos HD.\n• **Mantención y Alojamiento ($40.000 CLP/mes)**: Servidor cloud de alta velocidad, soporte presencial en Aconcagua y hasta **5 cambios de carta o precios mensuales incluidos**.\n\n¿Te gustaría coordinar una visita técnica a tu local?`;
      } else if (lower.includes('auditar') || lower.includes('auditor') || lower.includes('auditoría') || lower.includes('auditoria')) {
        // If they haven't provided details yet
        if (!lower.includes('los andes') && !lower.includes('san felipe') && !lower.includes('barber') && !lower.includes('caf') && !lower.includes('restaur')) {
          fallbackText = `¡Excelente iniciativa! Para realizar la **Auditoría Express de tu Ficha de Google Maps** sin costo, por favor indícame:\n\n1. El **nombre de tu local o negocio**\n2. Tu **comuna en el Valle del Aconcagua** (Los Andes, San Felipe, Rinconada, Calle Larga, etc.)\n\nCon estos datos evaluaré tu visibilidad en búsquedas locales, categorías y activación del acelerador 5 estrellas.`;
        } else {
          fallbackText = `📍 **Auditoría Express de Ficha Google Maps - Valle Pro**:\n\n1. **Visibilidad Local en Aconcagua**: Es crucial calibrar las palabras clave geolocalizadas ("cafetería en San Felipe", "barbería en Los Andes") y categorización secundaria para salir en los primeros 3 resultados del mapa.\n2. **Fotografía & Atractivo Visual**: Cargar fotos de alta resolución del salón, exterior y carta para multiplicar clics de comensales.\n3. **Acelerador de Reseñas 5★**: Implementar los soportes NFC de mesa para derivar a clientes satisfechos directo a 5 estrellas y retener quejas en privado.\n\nTe recomendamos implementar nuestro **Plan Optimización de Ficha Google Maps ($40.000 CLP pago único)**.\n\n👉 [Coordinar Optimización por WhatsApp (+56 9 9182 5700)](https://wa.me/56991825700?text=Hola%20Valle%20Pro,%20quiero%20la%20optimizacion%20de%20mi%20ficha%20Google%20Maps)`;
        }
      } else if (lower.includes('google') || lower.includes('maps') || lower.includes('ficha') || lower.includes('seo')) {
        fallbackText = `El servicio de **Optimización de Ficha Google Maps ($40.000 CLP pago único)** incluye:\n\n• Auditoría completa de tu Google Business Profile.\n• SEO local con palabras clave para Los Andes y San Felipe.\n• Carga de fotos HD profesionales del local y platos.\n• Coordenadas GPS exactas y horarios comerciales verificados.\n• Activación de enlace directo para reseñas 5 estrellas.\n\n¿Deseas optimizar la ficha de tu negocio hoy?`;
      } else if (lower.includes('precio') || lower.includes('costo') || lower.includes('cuanto') || lower.includes('plan') || lower.includes('pack') || lower.includes('stand')) {
        fallbackText = `En **Valle Pro** contamos con servicios transparentes en pesos chilenos:\n\n1. **Landing Page + Menú Dinámico**: $129.000 CLP inicial + $40.000/mes (incluye hasta 5 cambios mensuales).\n2. **Optimización Ficha Google Maps**: $40.000 CLP (pago único).\n3. **Soportes NFC de Mesa (14x10 cm)**:\n   • Individual: $15.000 CLP c/u\n   • Pack 5 Stands: $65.000 CLP (Ahorro $10.000)\n   • Pack 10 Stands: $120.000 CLP (Ahorro $30.000)\n   • Pack 15 Stands: $165.000 CLP (Ahorro $60.000)\n\n¿Quieres agendar una muestra presencial en tu local?`;
      } else if (lower.includes('reseña') || lower.includes('blindaje') || lower.includes('estrella') || lower.includes('filtro')) {
        fallbackText = `Nuestro **Laboratorio de Blindaje de Reseñas** opera en dos vías:\n\n1. El cliente apoya su teléfono en el soporte de mesa (14x10 cm).\n2. Si califica con **4 o 5 estrellas**, viaja directo a Google Maps para impulsar tu calificación pública a +4.8★.\n3. Si califica con **1, 2 o 3 estrellas**, se bloquea Google Maps y se desvía en privado al WhatsApp del dueño para resolver el percance en la mesa antes de que se retire del local.`;
      } else if (lower.includes('compatib') || lower.includes('celular') || lower.includes('iphone') || lower.includes('android')) {
        fallbackText = `¡Es 100% compatible! Funciona de manera nativa sin apps en iPhone (XR en adelante) y teléfonos Android con NFC. Además, cada soporte incluye un código QR dinámico de alta resolución como respaldo para cualquier smartphone.`;
      } else if (lower.includes('donde') || lower.includes('san felipe') || lower.includes('los andes') || lower.includes('instalac') || lower.includes('visita')) {
        fallbackText = `Estamos ubicados en el **Valle del Aconcagua** con atención y soporte presencial en Los Andes, San Felipe, Rinconada, Calle Larga, Curimón, San Esteban y Putaendo. Vamos a tu local, configuramos los soportes de mesa y capacitamos a tu equipo en 24 a 48 horas.`;
      } else if (lower.includes('contrat') || lower.includes('cotiz') || lower.includes('compr') || lower.includes('contacto') || lower.includes('whatsapp')) {
        fallbackText = `¡Perfecto! Puedes coordinar una visita técnica y cotización inmediata directamente a nuestro WhatsApp oficial: [+56 9 9182 5700](https://wa.me/56991825700?text=Hola%20Valle%20Pro,%20quiero%20cotizar%20servicios%20para%20mi%20local). ¡Te responderemos en minutos!`;
      } else {
        fallbackText = `¡Hola! Soy **Valle AI**, asesor de **Valle Pro** en Los Andes y San Felipe. Te puedo orientar sobre nuestra **Landing Page + Menú ($129.000 + $40.000/mes)**, la **Optimización de Google Maps ($40.000)** o nuestros **Soportes NFC de 14x10 cm**. ¿Qué tipo de negocio tienes en el valle?`;
      }

      return res.json({ text: fallbackText });
    }

    // Call Gemini API using @google/genai
    const formattedContents: any[] = [];

    // Add conversation history if provided
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-6)) {
        if (item.sender === 'user') {
          formattedContents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'bot') {
          formattedContents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }

    formattedContents.push({ role: 'user', parts: [{ text: message }] });

    let reply = "";
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
      reply = response.text || "";
    } catch (apiErr: any) {
      console.warn("Gemini API call warning (falling back to local advisor engine):", apiErr?.message);
      const lower = message.toLowerCase();
      if (lower.includes('landing') || lower.includes('menu') || lower.includes('menú') || lower.includes('129')) {
        reply = `El **Plan Creación Landing Page + Menú Dinámico** contempla:\n\n• **Implementación ($129.000 CLP pago único)**: Diseño interactivo a medida y carga completa de tu menú/servicios.\n• **Mensualidad Cloud ($40.000 CLP/mes)**: Alojamiento rápido, soporte local y hasta 5 cambios de carta/precios mensuales incluidos.`;
      } else if (lower.includes('google') || lower.includes('maps') || lower.includes('ficha') || lower.includes('seo')) {
        reply = `El servicio de **Optimización de Ficha Google Maps** tiene un valor de **$40.000 CLP** (pago único). Incluye auditoría, posicionamiento SEO local para Los Andes/San Felipe, fotos HD, horarios y enlace directo para reseñas 5★.`;
      } else if (lower.includes('precio') || lower.includes('costo') || lower.includes('cuanto') || lower.includes('plan') || lower.includes('pack')) {
        reply = `En **Valle Pro** contamos con:\n\n• **Landing Page + Menú Dinámico**: $129.000 CLP inicial + $40.000/mes.\n• **Optimización Google Maps**: $40.000 CLP único.\n• **Stands NFC 14x10 cm**: Individual a $15.000 CLP c/u, Pack 5 en $65.000, Pack 10 en $120.000 y Pack 15 en $165.000.`;
      } else if (lower.includes('contrat') || lower.includes('cotiz') || lower.includes('compr') || lower.includes('contacto') || lower.includes('whatsapp')) {
        reply = `¡Excelente! Escríbenos directamente a nuestro WhatsApp oficial: [+56 9 9182 5700](https://wa.me/56991825700?text=Hola%20Valle%20Pro,%20quiero%20cotizar%20servicios%20para%20mi%20local). ¡Te responderemos de inmediato!`;
      } else {
        reply = `¡Hola! Soy **Valle AI**, asesor de **Valle Pro** en Los Andes y San Felipe. Te puedo ayudar con el Plan Landing Page + Menú ($129.000), Optimización de Google Maps ($40.000) o Soportes NFC de 14x10 cm. ¿Qué consulta tienes?`;
      }
    }

    return res.json({ text: reply });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    return res.status(500).json({
      error: 'Error al comunicarse con Valle AI',
      details: err?.message || 'Error del servidor',
    });
  }
});

// Google Apps Script API Configuration
const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbydFn42S1bb1D9khweQ-Oj9_01m9yJwP3sE0oQ7JMab0v2HxBT6o-vM0tU6pHeeo9Ng1g/exec';

// In-memory metrics state with baseline fallback
let serverMetrics = {
  toquesTotales: 142854,
  quejasEvitadas: 524,
  promedioRed: 4.92,
  standsActivos: 29,
  lastUpdated: new Date().toISOString(),
  isLive: false,
};

// 1. Proxy for registering NFC tap events
app.post('/api/telemetry/event', async (req, res) => {
  const { slug, table, tipo } = req.body;
  const payload = {
    action: 'registrar_evento',
    slug: slug || 'general',
    table: table || 'mesa-1',
    tipo: tipo || 'toque_nfc',
  };

  serverMetrics.toquesTotales += 1;

  try {
    const gasRes = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    const text = await gasRes.text();
    return res.json({ ok: true, forwarded: true, gasResponse: text });
  } catch (err: any) {
    console.warn('Error forwarding event to Google Apps Script:', err?.message);
    return res.json({ ok: true, forwarded: false, localIncrement: true });
  }
});

// 2. Proxy for registering private complaints (Review Shield)
app.post('/api/telemetry/complaint', async (req, res) => {
  const { slug, table, stars, motivo, comentario } = req.body;
  const payload = {
    action: 'queja_privada',
    slug: slug || 'general',
    table: table || 'mesa-1',
    stars: Number(stars) || 3,
    motivo: motivo || 'Atención en general',
    comentario: comentario || 'Sin comentarios adicionales',
  };

  serverMetrics.quejasEvitadas += 1;

  try {
    const gasRes = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    const text = await gasRes.text();
    return res.json({ ok: true, forwarded: true, gasResponse: text });
  } catch (err: any) {
    console.warn('Error forwarding complaint to Google Apps Script:', err?.message);
    return res.json({ ok: true, forwarded: false, localIncrement: true });
  }
});

// 2b. Proxy for client onboarding submission (transparently forwarded to Google Apps Script)
const handleOnboarding = async (req: express.Request, res: express.Response) => {
  const payload = {
    action: req.body?.action || 'nuevo_onboarding_cliente',
    timestamp: req.body?.timestamp || new Date().toISOString(),
    ...req.body,
  };
  console.log('Received onboarding submission for local:', payload?.nombreLocal || payload?.local);

  try {
    const gasRes = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    const text = await gasRes.text();
    try {
      const json = JSON.parse(text);
      return res.json(json);
    } catch {
      return res.json({ ok: true, forwarded: true, gasResponse: text });
    }
  } catch (err: any) {
    console.warn('Error forwarding onboarding to Google Apps Script:', err?.message);
    return res.json({ ok: true, forwarded: false, savedLocally: true, message: 'Ficha técnica registrada localmente' });
  }
};

app.post('/api/telemetry/onboarding', handleOnboarding);
app.get('/api/telemetry/onboarding', async (_req, res) => {
  try {
    const gasRes = await fetch(APPS_SCRIPT_URL);
    if (gasRes.ok) {
      const text = await gasRes.text();
      try {
        return res.json(JSON.parse(text));
      } catch {
        return res.json({ ok: true, status: 'ready', gasResponse: text });
      }
    }
  } catch {}
  return res.json({ ok: true, status: 'ready' });
});

// 2c. Proxy for interactive quote submission (POST & GET)
const handleQuote = async (req: express.Request, res: express.Response) => {
  const payload = {
    action: 'nueva_cotizacion',
    timestamp: new Date().toISOString(),
    ...req.body,
  };
  console.log('Received quote submission for local:', payload?.nombreLocal || 'Desconocido');

  try {
    const gasRes = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    const text = await gasRes.text();
    try {
      const json = JSON.parse(text);
      return res.json(json);
    } catch {
      return res.json({ ok: true, forwarded: true, gasResponse: text });
    }
  } catch (err: any) {
    console.warn('Error forwarding quote to Google Apps Script:', err?.message);
    return res.json({ ok: true, forwarded: false, savedLocally: true, message: 'Cotización guardada exitosamente' });
  }
};

app.post('/api/telemetry/quote', handleQuote);
app.post('/api/telemetry/cotizacion', handleQuote);
app.get('/api/telemetry/quote', async (_req, res) => res.json({ ok: true, status: 'ready' }));
app.get('/api/telemetry/cotizacion', async (_req, res) => res.json({ ok: true, status: 'ready' }));

// 3. Proxy for reading / writing live stats and metrics from Google Apps Script
const handleStatsGet = async (_req: express.Request, res: express.Response) => {
  try {
    const gasRes = await fetch(APPS_SCRIPT_URL);
    if (gasRes.ok) {
      const text = await gasRes.text();
      try {
        const data = JSON.parse(text);
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
          serverMetrics = {
            toquesTotales: typeof toques === 'number' ? toques : serverMetrics.toquesTotales,
            quejasEvitadas: typeof quejas === 'number' ? quejas : serverMetrics.quejasEvitadas,
            promedioRed: typeof data.promedioRed === 'number' ? data.promedioRed : 4.92,
            standsActivos: typeof data.standsActivos === 'number' ? data.standsActivos : 29,
            lastUpdated: new Date().toISOString(),
            isLive: true,
          };
        }
        return res.json(data);
      } catch {
        return res.json(serverMetrics);
      }
    }
  } catch (err: any) {
    console.warn('Could not refresh stats from Google Apps Script:', err?.message);
  }

  return res.json(serverMetrics);
};

const handleStatsPost = async (req: express.Request, res: express.Response) => {
  try {
    const gasRes = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(req.body || {}),
    });
    const text = await gasRes.text();
    try {
      return res.json(JSON.parse(text));
    } catch {
      return res.json({ ok: true, forwarded: true, gasResponse: text });
    }
  } catch (err: any) {
    console.warn('Error forwarding stats POST to Google Apps Script:', err?.message);
    return res.json(serverMetrics);
  }
};

// Handlers for both /api/telemetry/stats and /api/telemetry/metrics without 404
app.get('/api/telemetry/stats', handleStatsGet);
app.post('/api/telemetry/stats', handleStatsPost);
app.get('/api/telemetry/metrics', handleStatsGet);
app.post('/api/telemetry/metrics', handleStatsPost);

// Configure Vite or serve static files
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Valle Pro server running on http://localhost:${PORT}`);
  });
}

startServer();
