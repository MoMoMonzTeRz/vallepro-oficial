import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  MessageCircle,
  Truck,
  MapPin,
  Check,
  Flame,
  Clock,
  Wifi,
  Star,
  Copy,
  CheckCircle,
  Utensils,
  Share2,
} from 'lucide-react';
import { registrarToqueNFC, registrarQuejaPrivada } from '../services/telemetry';

interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: 'completos' | 'churrascos' | 'mechadas' | 'chorrillanas' | 'bebidas';
  description: string;
  popular?: boolean;
}

export const LukotonDemo: React.FC<{ onBackToHome?: () => void; isEmbedded?: boolean }> = ({
  onBackToHome,
  isEmbedded = false,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'local'>('delivery');
  const [cart, setCart] = useState<{ [id: string]: number }>({ 'c1': 2, 'm1': 1 });
  const [deliveryZone, setDeliveryZone] = useState('Los Andes Centro');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [activeCategory, setActiveCategory] = useState<'completos' | 'churrascos' | 'mechadas' | 'chorrillanas' | 'bebidas'>('completos');
  const [wifiCopied, setWifiCopied] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [complaintSent, setComplaintSent] = useState(false);

  React.useEffect(() => {
    registrarToqueNFC('lukoton-los-andes', 'mesa-1');
  }, []);

  const handleStarClick = (star: number) => {
    setSelectedStars(star);
    if (star <= 3) {
      registrarQuejaPrivada({
        slug: 'lukoton-los-andes',
        table: 'mesa-1',
        stars: star,
        motivo: 'Calidad o demora de comida',
        comentario: 'Queja retenida en mesa en Lukotón',
      });
      setComplaintSent(true);
    }
  };

  const menu: FoodItem[] = [
    // Completos
    {
      id: 'c1',
      name: 'Completo Italiano Gigante (Pan Casero)',
      price: 3600,
      category: 'completos',
      description: 'Salchicha parrillera artesanal, palta hass recién molida, tomate en cubos frescos y abundante mayo casera.',
      popular: true,
    },
    {
      id: 'c2',
      name: 'Dinámico Tradicional XL',
      price: 3800,
      category: 'completos',
      description: 'Salchicha, chucrut tibio, salsa americana especial, tomate, palta y mayonesa batida.',
    },
    {
      id: 'c3',
      name: 'Completo Luco Especial',
      price: 4200,
      category: 'completos',
      description: 'Salchicha parrillera envuelta en queso mantecoso fundido a la plancha.',
    },
    // Churrascos y As
    {
      id: 'a1',
      name: 'As Luco en Marraqueta Crujiente',
      price: 4900,
      category: 'churrascos',
      description: 'Finas láminas de posta cocinadas en su jugo con abundante queso mantecoso fundido al vapor.',
      popular: true,
    },
    {
      id: 'a2',
      name: 'Churrasco Italiano XL',
      price: 5800,
      category: 'churrascos',
      description: 'Generosa porción de vacuno tierna, palta hass de exportación, tomate jugoso y mayo receta secreta.',
    },
    {
      id: 'a3',
      name: 'Churrasco Chacarero Andino',
      price: 5900,
      category: 'churrascos',
      description: 'Carne de vacuno a la plancha, porotos verdes crujientes cocidos al día, tomate y ají verde en rodajas.',
    },
    // Mechadas
    {
      id: 'm1',
      name: 'Sándwich Mechada Chacarera XL',
      price: 6500,
      category: 'mechadas',
      description: 'Carne mechada deshilachada a fuego lento de 6 horas en caldo criollo, porotos verdes frescos, tomate y ají verde.',
      popular: true,
    },
    {
      id: 'm2',
      name: 'Mechada Luco en Frica Artesanal',
      price: 6900,
      category: 'mechadas',
      description: '250g de carne mechada jugosa cubierta por triple queso mantecoso fundido.',
    },
    // Chorrillanas
    {
      id: 'ch1',
      name: 'Chorrillana Valle Tradicional (2 personas)',
      price: 11900,
      category: 'chorrillanas',
      description: 'Cama de papas fritas caseras doradas, carne picada sazonada, cebolla caramelizada y 2 huevos fritos de campo.',
      popular: true,
    },
    {
      id: 'ch2',
      name: 'Chorrillana Mechada XXL (3-4 personas)',
      price: 19500,
      category: 'chorrillanas',
      description: 'Kilo y medio de papas fritas, carne mechada jugosa, longanizas de San Felipe, cebolla caramelizada y 4 huevos fritos.',
    },
    // Bebidas
    {
      id: 'b1',
      name: 'Bebida 1.5 Litros (Coca-Cola / Sprite)',
      price: 2600,
      category: 'bebidas',
      description: 'Helada, formato familiar ideal para acompañar tus combos.',
    },
    {
      id: 'b2',
      name: 'Bebida Lata 350cc',
      price: 1500,
      category: 'bebidas',
      description: 'Coca-Cola Zero, Normal o Sprite.',
    },
  ];

  const deliveryZones = [
    { name: 'Los Andes Centro', fee: 1500 },
    { name: 'San Felipe Centro', fee: 2500 },
    { name: 'Rinconada / Tocornal', fee: 2800 },
    { name: 'Calle Larga', fee: 2000 },
    { name: 'Santa María', fee: 3000 },
    { name: 'Retiro en Local (Calle Esmeralda 842)', fee: 0 },
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

  const currentZone = deliveryZones.find((z) => z.name === deliveryZone) || deliveryZones[0];
  const deliveryFee = orderType === 'delivery' ? currentZone.fee : 0;

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const foodSubtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menu.find((i) => i.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const grandTotal = foodSubtotal + deliveryFee;

  const handleSendWhatsAppOrder = () => {
    const itemsList = Object.entries(cart)
      .map(([id, qty]) => {
        const item = menu.find((i) => i.id === id);
        return item ? `• ${qty}x ${item.name} ($${(item.price * qty).toLocaleString('es-CL')})` : '';
      })
      .filter(Boolean)
      .join('\n');

    const orderHeader =
      orderType === 'delivery'
        ? `🛵 *PEDIDO DELIVERY LUKOTÓN LOS ANDES*\n👤 *Cliente:* ${customerName || 'Cliente Valle'}\n📍 *Dirección:* ${customerAddress || 'No especificada'} (${deliveryZone})\n🚚 *Costo Envío:* $${deliveryFee.toLocaleString('es-CL')} CLP`
        : `🏪 *PEDIDO RETIRO EN LOCAL LUKOTÓN*\n👤 *Cliente:* ${customerName || 'Cliente Local'}\n📍 *Retiro en:* Esmeralda 842, Los Andes (Mesa / Mostrador NFC)`;

    const msg = `${orderHeader}\n\n*Detalle de Comanda:*\n${itemsList}\n${notes ? `\n📝 *Notas:* ${notes}\n` : ''}\n*TOTAL A PAGAR:* $${grandTotal.toLocaleString('es-CL')} CLP\n\n_Generado automáticamente vía Valle Pro ⚡_`;

    window.open(`https://wa.me/56991825700?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className={`min-h-screen bg-[#0c0d12] text-slate-100 font-sans pb-28 ${isEmbedded ? 'text-xs' : ''}`}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#14121a]/95 backdrop-blur-md border-b border-orange-500/20 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-white font-display">
                  Lukotón <span className="text-orange-400">Los Andes</span> 🌭
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-bold uppercase border border-orange-500/30">
                  NFC Activo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-orange-400" />
                Calle Esmeralda 842, Los Andes (Plaza de Armas)
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-amber-400 font-mono text-xs font-bold">4.8 ★ (850+)</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Status banner */}
        <div className="rounded-2xl bg-gradient-to-r from-orange-950/40 to-slate-900 border border-orange-500/30 p-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <p className="font-semibold text-white">🟢 ABIERTO • Bajón Nocturno Activo</p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                Lunes a Domingo: 18:00 a 03:00 hrs continuo
              </p>
            </div>
          </div>
          <span className="px-2 py-1 rounded-lg bg-orange-500/20 text-orange-300 font-mono font-bold text-[10px]">
            Delivery Rápido
          </span>
        </div>

        {/* Order Type Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[#141520] border border-slate-800">
          <button
            onClick={() => setOrderType('delivery')}
            className={`py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              orderType === 'delivery'
                ? 'bg-orange-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Delivery a Domicilio</span>
          </button>
          <button
            onClick={() => setOrderType('local')}
            className={`py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              orderType === 'local'
                ? 'bg-orange-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>En Mesa / Retiro Local</span>
          </button>
        </div>

        {/* Delivery Zone Selector if delivery is selected */}
        {orderType === 'delivery' ? (
          <div className="rounded-2xl bg-[#141724] border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-orange-400" />
                Selecciona tu Zona del Valle:
              </span>
              <span className="font-mono text-orange-400 font-bold">
                Envío: ${currentZone.fee.toLocaleString('es-CL')} CLP
              </span>
            </div>
            <select
              value={deliveryZone}
              onChange={(e) => setDeliveryZone(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:outline-hidden focus:border-orange-500"
            >
              {deliveryZones.map((z) => (
                <option key={z.name} value={z.name}>
                  {z.name} - ${z.fee.toLocaleString('es-CL')} CLP
                </option>
              ))}
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Tu nombre completo"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-orange-500"
              />
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Dirección exacta (ej: Calle Larga 450)"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-orange-500"
              />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-[#141724] border border-slate-800 p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
              <span>
                Punto NFC activo: <strong>Mesa 3 (Lukotón Esmeralda)</strong>
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              Sin costo de envío
            </span>
          </div>
        )}

        {/* Wi-Fi & Quick Info */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#12141e] border border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-orange-400" />
            <div>
              <p className="font-bold text-white text-[11px]">Wi-Fi Clientes Lukotón</p>
              <p className="text-[10px] text-slate-400 font-mono">bajonaconcagua2026</p>
            </div>
          </div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText('bajonaconcagua2026');
              setWifiCopied(true);
              setTimeout(() => setWifiCopied(false), 2000);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-orange-400 text-xs font-semibold"
          >
            {wifiCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{wifiCopied ? 'Copiado' : 'Copiar'}</span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'completos', label: '🌭 Completos Gigantes' },
            { id: 'churrascos', label: '🥩 Churrascos & As' },
            { id: 'mechadas', label: '🍲 Mechadas al Caldero' },
            { id: 'chorrillanas', label: '🍟 Chorrillanas XL' },
            { id: 'bebidas', label: '🥤 Bebidas Heladas' },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Items Grid */}
        <div className="space-y-3">
          {menu
            .filter((i) => i.category === activeCategory)
            .map((item) => {
              const qty = cart[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#141522] border border-slate-800 p-3.5 flex items-center justify-between gap-3 hover:border-slate-700 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      {item.popular && (
                        <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-[9px] font-extrabold border border-orange-500/30">
                          🔥 Más Vendido
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <p className="mt-1.5 text-sm font-extrabold text-orange-400 font-mono">
                      ${item.price.toLocaleString('es-CL')} CLP
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl p-1">
                    {qty > 0 ? (
                      <>
                        <button
                          onClick={() => updateCart(item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs text-white">{qty}</span>
                        <button
                          onClick={() => updateCart(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-orange-500 hover:bg-orange-400 flex items-center justify-center text-slate-950 font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => updateCart(item.id, 1)}
                        className="px-3 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500 text-orange-300 hover:text-slate-950 font-bold text-xs transition flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Sumar</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Review Shield for Lukotón */}
        <div className="rounded-2xl bg-[#121420] border border-slate-800 p-4 text-center">
          <p className="text-xs text-slate-400 mb-2">¿Cómo estuvo tu bajón en Lukotón?</p>
          <div className="flex justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition active:scale-95 ${
                  (selectedStars || 0) >= star
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-900 border border-slate-800 text-slate-500'
                }`}
              >
                <Star className={`w-4 h-4 ${(selectedStars || 0) >= star ? 'fill-slate-950' : ''}`} />
              </button>
            ))}
          </div>
          {selectedStars && selectedStars >= 4 && (
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs mt-1"
            >
              <Star className="w-3.5 h-3.5 fill-slate-950" />
              <span>Dejar 5★ en Google Maps</span>
            </a>
          )}
          {selectedStars && selectedStars <= 3 && (
            <div className="space-y-1 mt-1">
              <p className="text-[11px] text-amber-400">
                Tu queja fue retenida de forma privada para solucionarlo de inmediato.
              </p>
              {complaintSent && (
                <span className="text-[10px] text-emerald-400 font-mono block">
                  ✓ Registrado en API de Auditoría Central
                </span>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Cart Bar */}
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
                <span className="px-2 py-0.5 rounded-full bg-orange-500 text-slate-950 font-bold text-xs">
                  {totalItems} items
                </span>
                <span className="text-sm font-extrabold text-white">
                  ${grandTotal.toLocaleString('es-CL')} CLP
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                {orderType === 'delivery' ? `Incluye envío (${deliveryZone})` : 'En local / Retiro'}
              </p>
            </div>

            <button
              onClick={handleSendWhatsAppOrder}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Pedir por WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
