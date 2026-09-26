import React, { useState, useEffect } from 'react';
import {
  UtensilsCrossed,
  Coffee,
  Wine,
  Sparkles,
  Wifi,
  Copy,
  Check,
  Clock,
  MapPin,
  Flame,
  Star,
  BellRing,
  CreditCard,
  ShoppingBag,
  Plus,
  Minus,
  MessageCircle,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Instagram,
  PhoneCall,
  CheckCircle,
} from 'lucide-react';
import { registrarToqueNFC, registrarQuejaPrivada } from '../services/telemetry';

interface MenuItem {
  id: string;
  name: string;
  category: 'cafeteria' | 'tostones' | 'fondos' | 'cocteleria';
  price: number;
  description: string;
  badge?: string;
  image?: string;
}

export const LaMontanaDemo: React.FC<{ onBackToHome?: () => void; isEmbedded?: boolean }> = ({
  onBackToHome,
  isEmbedded = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<'cafeteria' | 'tostones' | 'fondos' | 'cocteleria'>('cafeteria');
  const [cart, setCart] = useState<{ [id: string]: number }>({ 'c1': 1, 't1': 1 });
  const [wifiCopied, setWifiCopied] = useState(false);
  const [waiterCalled, setWaiterCalled] = useState(false);
  const [billRequested, setBillRequested] = useState<'efectivo' | 'tarjeta' | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  // Review Shield Simulator inside venue
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [reviewSent, setReviewSent] = useState(false);
  const [privateFeedback, setPrivateFeedback] = useState('');

  // Flash promo countdown timer (e.g. 14 mins 32 secs)
  const [timeLeft, setTimeLeft] = useState(872); // seconds

  useEffect(() => {
    // 1. Registra toque NFC en API Central
    registrarToqueNFC('la-montana-coffeebar', 'mesa-1');

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 1800));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const copyWifi = () => {
    navigator.clipboard?.writeText('MontanaGuest2026');
    setWifiCopied(true);
    setTimeout(() => setWifiCopied(false), 2500);
  };

  const menuItems: MenuItem[] = [
    // Cafetería
    {
      id: 'c1',
      name: 'Flat White Doble Shot',
      category: 'cafeteria',
      price: 3400,
      description: 'Doble shot de espresso de grano tostado artesanal, leche vaporizada microtexturizada y arte latte.',
      badge: 'Especialidad',
    },
    {
      id: 'c2',
      name: 'Capuccino Cordillerano',
      category: 'cafeteria',
      price: 3600,
      description: 'Espresso con espuma densa de leche, cacao orgánico espolvoreado y toque de canela del valle.',
    },
    {
      id: 'c3',
      name: 'Cold Brew Valle 18 Horas',
      category: 'cafeteria',
      price: 3800,
      description: 'Café de extracción en frío durante 18 horas, servido con hielo transparente y rodaja de naranja sutil.',
      badge: 'Refrescante',
    },
    // Tostones & Brunch
    {
      id: 't1',
      name: 'Tostón Palta Reina & Huevo Poché',
      category: 'tostones',
      price: 7200,
      description: 'Pan de masa madre de campo tostado al fogón, palta hass en láminas abundantes, huevo poché de campo y semillas de zapallo.',
      badge: 'Favorito',
    },
    {
      id: 't2',
      name: 'Tostón Queso de Cabra & Miel de Ulmo',
      category: 'tostones',
      price: 6900,
      description: 'Queso de cabra artesanal de Catemu tibio, nueces tostadas, rúcula fresca y reducción de miel natural.',
    },
    {
      id: 't3',
      name: 'Huevos Benedictinos Aconcagua',
      category: 'tostones',
      price: 8500,
      description: 'Dos huevos pochados sobre lomo de cerdo ahumado artesanal, pan brioche tostado y salsa holandesa tibia casera.',
    },
    // Fondos & Tablas
    {
      id: 'f1',
      name: 'Hamburguesa Cordillerana',
      category: 'fondos',
      price: 9800,
      description: '200g de asado de tira molido al día, queso chanco fundido, cebolla caramelizada al vino tinto y papas rústicas.',
      badge: 'Chef Choice',
    },
    {
      id: 'f2',
      name: 'Tabla Cordillera Los Andes (2-3 pers)',
      category: 'fondos',
      price: 18900,
      description: 'Carne mechada al caldero, empanaditas de queso camarón, choricillos parrilleros y pebre andino fresco.',
    },
    {
      id: 'f3',
      name: 'Costillar Ahumado a la Chilena',
      category: 'fondos',
      price: 13900,
      description: 'Costillar tierno glaseado al ají color y miel, acompañado de puré rústico con cebolla frita crocante.',
    },
    // Coctelería
    {
      id: 'b1',
      name: 'Pisco Sour Cordillera (35°)',
      category: 'cocteleria',
      price: 6500,
      description: 'Pisco artesanal doble destilado de Jahuel, limón sutil exprimido al momento y amargo de angostura.',
      badge: 'Clásico',
    },
    {
      id: 'b2',
      name: 'Gin Tonic Arándanos de San Felipe',
      category: 'cocteleria',
      price: 6900,
      description: 'Gin nacional infusionado con arándanos frescos cosechados en el valle, romero fresco y tónica premium.',
    },
    {
      id: 'b3',
      name: 'Terremoto Aconcagüino',
      category: 'cocteleria',
      price: 5900,
      description: 'Vino pipeño campesino, helado de piña artesanal, toque de fernet y granadina.',
    },
  ];

  const updateCart = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuItems.find((i) => i.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const sendOrderToWhatsApp = () => {
    const itemsList = Object.entries(cart)
      .map(([id, qty]) => {
        const item = menuItems.find((i) => i.id === id);
        return item ? `• ${qty}x ${item.name} ($${(item.price * qty).toLocaleString('es-CL')})` : '';
      })
      .filter(Boolean)
      .join('\n');

    const msg = `🏔️ *NUEVA COMANDA - LA MONTAÑA RESTOBAR / COFFEE BAR*\n📍 *Mesa 1 (Salón Principal)*\n📍 *Ubicación:* Esmeralda 537, Los Andes\n\n*Detalle del pedido:*\n${itemsList}\n\n*Total a Pagar:* $${subtotal.toLocaleString('es-CL')} CLP\n\n_Pedido emitido vía Soporte NFC Valle Pro ⚡_`;

    const url = `https://wa.me/56991825700?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setOrderSent(true);
    setTimeout(() => {
      setOrderSent(false);
      setShowOrderModal(false);
    }, 2000);
  };

  return (
    <div className={`min-h-screen bg-[#0c0d12] text-slate-100 font-sans pb-28 ${isEmbedded ? 'text-xs' : ''}`}>
      {/* Top Header Bar with NFC Tag verification */}
      <header className="sticky top-0 z-30 bg-[#12141c]/95 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
                title="Volver a Valle Pro"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-white font-display tracking-tight">
                  La Montaña <span className="text-amber-400 font-light">Restobar</span>
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                  NFC Activo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                Esmeralda 537, Los Andes
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Mesa 1 (Salón)
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Venue Status & Horario */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-[#141724] border border-slate-800 p-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <p className="font-semibold text-white">Abierto Ahora • Cocina y Bar activos</p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                Lunes a Sábado: 12:00 a 23:30 hrs (Domingos cerrado)
              </p>
            </div>
          </div>
          <span className="text-amber-400 font-mono text-[11px] font-bold">4.9 ★ (420+)</span>
        </div>

        {/* Flash Offer Countdown Promo */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-600/30 via-orange-600/20 to-slate-900 border border-amber-500/40 p-4 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
              <Flame className="w-3 h-3 text-amber-400" />
              Oferta Flash de Mesa
            </span>
            <div className="flex items-center gap-1 font-mono text-amber-300 bg-black/40 px-2.5 py-1 rounded-lg border border-amber-500/30 text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Termina en: {formatTimer(timeLeft)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">
                ⚡ Promo Fogón: Tostón + Flat White
              </h3>
              <p className="text-xs text-slate-300">
                Tostón Palta Reina + Flat White Doble Shot con <strong>25% OFF</strong> exclusivo por pedir vía NFC.
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-base font-extrabold text-amber-400">$7.950 CLP</span>
                <span className="text-xs text-slate-500 line-through">$10.600 CLP</span>
              </div>
            </div>

            <button
              onClick={() => {
                updateCart('c1', 1);
                updateCart('t1', 1);
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg active:scale-95 transition whitespace-nowrap ml-3"
            >
              Pedir Promo
            </button>
          </div>
        </div>

        {/* Quick Action Badges: Wi-Fi, Llamar Garzón, Pedir Cuenta */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Wi-Fi Copy */}
          <button
            onClick={copyWifi}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#141722] border border-slate-800 hover:border-amber-500/40 transition active:scale-95 text-center group"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center mb-1 text-amber-400 group-hover:scale-110 transition">
              {wifiCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Wifi className="w-4 h-4" />}
            </div>
            <span className="text-[11px] font-bold text-white">
              {wifiCopied ? '¡Copiado!' : 'Wi-Fi Clientes'}
            </span>
            <span className="text-[9px] text-slate-400 font-mono">MontanaGuest2026</span>
          </button>

          {/* Llamar Garzón */}
          <button
            onClick={() => {
              setWaiterCalled(true);
              setTimeout(() => setWaiterCalled(false), 5000);
            }}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition active:scale-95 text-center ${
              waiterCalled
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-[#141722] border-slate-800 hover:border-amber-500/40 text-slate-200'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-1 text-cyan-400">
              <BellRing className={`w-4 h-4 ${waiterCalled ? 'animate-bounce text-emerald-400' : ''}`} />
            </div>
            <span className="text-[11px] font-bold">
              {waiterCalled ? 'Garzón en camino' : 'Llamar Garzón'}
            </span>
            <span className="text-[9px] text-slate-400">Aviso directo al reloj</span>
          </button>

          {/* Pedir Cuenta */}
          <button
            onClick={() => {
              setBillRequested(billRequested ? null : 'tarjeta');
            }}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#141722] border border-slate-800 hover:border-amber-500/40 transition active:scale-95 text-center"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center mb-1 text-purple-400">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-white">Pedir Cuenta</span>
            <span className="text-[9px] text-slate-400">Boleta / Factura</span>
          </button>
        </div>

        {/* Bill Request Alert */}
        {billRequested && (
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-3 flex items-center justify-between text-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>
                Solicitaste la cuenta para <strong>Mesa 1</strong> (POS Tarjeta). El personal se acerca a tu mesa.
              </span>
            </div>
            <button
              onClick={() => setBillRequested(null)}
              className="text-xs text-amber-400 underline font-semibold ml-2"
            >
              Listo
            </button>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'cafeteria', label: '☕ Café Especialidad', icon: Coffee },
            { id: 'tostones', label: '🥑 Tostones & Brunch', icon: UtensilsCrossed },
            { id: 'fondos', label: '🍔 Fondos & Tablas', icon: Flame },
            { id: 'cocteleria', label: '🍸 Coctelería de Autor', icon: Wine },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Items List */}
        <div className="space-y-3">
          {menuItems
            .filter((i) => i.category === activeCategory)
            .map((item) => {
              const qty = cart[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#13151f] border border-slate-800/80 p-3.5 flex items-center justify-between gap-3 hover:border-slate-700 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-extrabold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <p className="mt-1.5 text-sm font-extrabold text-amber-400 font-mono">
                      ${item.price.toLocaleString('es-CL')} CLP
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl p-1">
                    {qty > 0 ? (
                      <>
                        <button
                          onClick={() => updateCart(item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 active:scale-95"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs text-white">{qty}</span>
                        <button
                          onClick={() => updateCart(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-amber-500 hover:bg-amber-400 flex items-center justify-center text-slate-950 font-bold active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => updateCart(item.id, 1)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-xs transition active:scale-95 flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Agregar</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Review Shield Section inside Table Stand Experience */}
        <div className="mt-8 rounded-2xl bg-gradient-to-b from-[#141624] to-[#0f111a] border border-slate-800 p-4">
          <div className="text-center max-w-sm mx-auto">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
              Tu opinión importa en La Montaña
            </span>
            <h4 className="mt-2 text-sm font-bold text-white">
              ¿Cómo va tu experiencia en Mesa 1?
            </h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Califícanos con un toque antes de pedir la cuenta:
            </p>

            {/* Stars Selector */}
            <div className="flex justify-center gap-2 my-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    setSelectedStars(star);
                    setReviewSent(false);
                  }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition active:scale-95 ${
                    (selectedStars || 0) >= star
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-600 hover:text-slate-400'
                  }`}
                >
                  <Star className={`w-5 h-5 ${(selectedStars || 0) >= star ? 'fill-slate-950' : ''}`} />
                </button>
              ))}
            </div>

            {/* Action branch based on stars */}
            {selectedStars && selectedStars >= 4 && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs animate-in fade-in space-y-2">
                <p className="font-semibold">
                  ¡Muchas gracias! Ayúdanos publicando tu reseña de 5★ en Google Maps.
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
                >
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  Publicar en Google Maps (+4.9★)
                </a>
              </div>
            )}

            {selectedStars && selectedStars <= 3 && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs animate-in fade-in space-y-2 text-left">
                <p className="font-semibold text-center">
                  Lamentamos no haber alcanzado la excelencia. ¿Qué podemos mejorar de inmediato?
                </p>
                <textarea
                  value={privateFeedback}
                  onChange={(e) => setPrivateFeedback(e.target.value)}
                  placeholder="Escribe tu observación confidencial al administrador..."
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs resize-none"
                  rows={2}
                />
                <a
                  href={`https://wa.me/56991825700?text=${encodeURIComponent(
                    `*RECLAMO / FEEDBACK PRIVADO MESA 1 - LA MONTAÑA*\nCalificación: ${selectedStars} estrellas.\nComentario: ${privateFeedback || 'Atención a mejorar'}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    registrarQuejaPrivada({
                      slug: 'la-montana-coffeebar',
                      table: 'mesa-1',
                      stars: selectedStars || 3,
                      motivo: 'Demora o atención',
                      comentario: privateFeedback || 'Atención a mejorar',
                    });
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs transition border border-amber-500/30 active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Enviar al WhatsApp del Dueño
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Community & Photos Section */}
        <div className="rounded-2xl bg-[#12141d] border border-slate-800/80 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">Comunidad La Montaña</h4>
              <p className="text-[11px] text-slate-400">Síguenos y etiqueta tus historias</p>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[11px] font-bold text-pink-400 hover:text-pink-300"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@lamontanarestobar</span>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl overflow-hidden aspect-square bg-slate-800 relative group">
              <img
                src="https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=400&auto=format&fit=crop&q=80"
                alt="Café de especialidad"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[8px] text-white">
                Espresso Bar
              </span>
            </div>
            <div className="rounded-xl overflow-hidden aspect-square bg-slate-800 relative group">
              <img
                src="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&auto=format&fit=crop&q=80"
                alt="Tostón Palta Reina"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[8px] text-white">
                Brunch
              </span>
            </div>
            <div className="rounded-xl overflow-hidden aspect-square bg-slate-800 relative group">
              <img
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&auto=format&fit=crop&q=80"
                alt="Cóctel de autor"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[8px] text-white">
                Coctelería
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Bar: Order Cart & WhatsApp Sender */}
      {totalItems > 0 && (
        <div
          className={
            isEmbedded
              ? 'sticky bottom-0 left-0 right-0 z-20 bg-[#0f1118]/95 backdrop-blur-md border-t border-slate-800 p-2.5 mt-4'
              : 'fixed bottom-0 left-0 right-0 z-40 bg-[#0f1118]/95 backdrop-blur-lg border-t border-slate-800 p-3'
          }
        >
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs">
                  {totalItems} items
                </span>
                <span className="text-sm font-extrabold text-white">
                  ${subtotal.toLocaleString('es-CL')} CLP
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Comanda directa a cocina para Mesa 1</p>
            </div>

            <button
              onClick={() => setShowOrderModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Confirmar por WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#11131c] border border-slate-700 p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Comanda Mesa 1</h3>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {Object.entries(cart).map(([id, qty]) => {
                const item = menuItems.find((i) => i.id === id);
                if (!item) return null;
                return (
                  <div key={id} className="flex justify-between items-center text-xs py-1">
                    <span className="text-slate-300">
                      <strong>{qty}x</strong> {item.name}
                    </span>
                    <span className="font-mono text-amber-400 font-bold">
                      ${(item.price * qty).toLocaleString('es-CL')}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 text-xs">Total Comanda:</span>
              <span className="text-lg font-extrabold text-white font-mono">
                ${subtotal.toLocaleString('es-CL')} CLP
              </span>
            </div>

            {orderSent ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-center font-bold text-xs flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>¡Comanda enviada a WhatsApp con éxito!</span>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={sendOrderToWhatsApp}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Enviar Comanda a WhatsApp (+56 9 9182 5700)</span>
                </button>
                <p className="text-[10px] text-center text-slate-500">
                  La cocina imprimirá tu comanda automáticamente con número de mesa.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
