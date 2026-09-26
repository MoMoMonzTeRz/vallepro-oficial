import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Scissors,
  Star,
  User,
  CheckCircle,
  Sparkles,
  MapPin,
  MessageCircle,
  Wifi,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { registrarToqueNFC, registrarQuejaPrivada } from '../services/telemetry';

interface Barber {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  avatar: string;
}

interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
}

export const BarberiaDemo: React.FC<{ onBackToHome?: () => void; isEmbedded?: boolean }> = ({
  onBackToHome,
  isEmbedded = false,
}) => {
  const [selectedBarber, setSelectedBarber] = useState('b1');
  const [selectedService, setSelectedService] = useState('s1');
  const [selectedDate, setSelectedDate] = useState('Hoy, Viernes');
  const [selectedTime, setSelectedTime] = useState('16:30');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [complaintSent, setComplaintSent] = useState(false);
  const [wifiCopied, setWifiCopied] = useState(false);

  React.useEffect(() => {
    registrarToqueNFC('barberia-aconcagua', 'estacion-matias');
  }, []);

  const handleStarClick = (star: number) => {
    setSelectedStars(star);
    if (star <= 3) {
      registrarQuejaPrivada({
        slug: 'barberia-aconcagua',
        table: 'estacion-matias',
        stars: star,
        motivo: 'Detalle en servicio de barbería',
        comentario: 'Queja retenida en sillón de Barbería Aconcagua',
      });
      setComplaintSent(true);
    }
  };

  const barbers: Barber[] = [
    {
      id: 'b1',
      name: 'Eliseo Fade',
      specialty: 'Skin Fade, Degradados & Freestyle',
      experience: '7 años exp.',
      rating: 4.95,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'b2',
      name: 'Don Claudio Barbas',
      specialty: 'Perfilado a navaja y toalla caliente',
      experience: '12 años exp.',
      rating: 5.0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'b3',
      name: 'Matías Classic',
      specialty: 'Cortes ejecutivos y tijera clásica',
      experience: '5 años exp.',
      rating: 4.88,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    },
  ];

  const services: Service[] = [
    {
      id: 's1',
      name: 'Corte Degradado + Lavado & Peinado',
      duration: '40 min',
      price: 12000,
      description: 'Fade milimétrico con terminación a navaja, lavado capilar y pomada mate premium.',
    },
    {
      id: 's2',
      name: 'Combo Completo: Corte + Barba Ritual',
      duration: '60 min',
      price: 18000,
      description: 'Corte a elección, vapor de ozono, toalla caliente y aceites esenciales para barba.',
    },
    {
      id: 's3',
      name: 'Perfilado de Barba Ritual',
      duration: '30 min',
      price: 9000,
      description: 'Delineado preciso con navaja japonesa, toalla caliente y bálsamo humectante.',
    },
    {
      id: 's4',
      name: 'Limpieza Facial Express + Black Mask',
      duration: '25 min',
      price: 8000,
      description: 'Exfoliación suave, máscara de carbón activo para puntos negros y tónico refrescante.',
    },
  ];

  const times = ['11:00', '12:30', '15:00', '16:30', '18:00', '19:15'];
  const dates = ['Hoy, Viernes', 'Mañana, Sábado', 'Lunes Próximo'];

  const currentBarber = barbers.find((b) => b.id === selectedBarber) || barbers[0];
  const currentService = services.find((s) => s.id === selectedService) || services[0];

  const handleConfirmBooking = () => {
    const msg = `✂️ *NUEVA RESERVA - BARBERÍA ACONCAGUA*\n👤 *Cliente:* ${clientName || 'Cliente Salon'}\n📞 *Teléfono:* ${clientPhone || 'No indicado'}\n\n💈 *Barbero:* ${currentBarber.name}\n✂️ *Servicio:* ${currentService.name} ($${currentService.price.toLocaleString('es-CL')} CLP)\n📅 *Fecha:* ${selectedDate}\n⏰ *Hora:* ${selectedTime} hrs\n\n_Agendado vía soporte NFC Valle Pro ⚡_`;

    window.open(`https://wa.me/56991825700?text=${encodeURIComponent(msg)}`, '_blank');
    setBookingConfirmed(true);
  };

  return (
    <div className={`min-h-screen bg-[#0b0c10] text-slate-100 font-sans pb-28 ${isEmbedded ? 'text-xs' : ''}`}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#12141a]/95 backdrop-blur-md border-b border-cyan-500/20 px-4 py-3">
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
                  Barbería <span className="text-cyan-400">Aconcagua</span> 💈
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase border border-cyan-500/30">
                  NFC Activo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                Prat 412, San Felipe Centro
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-amber-400 font-mono text-xs font-bold">4.95 ★ (510+)</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Active NFC Post Badge */}
        <div className="rounded-2xl bg-[#131520] border border-cyan-500/30 p-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <div>
              <p className="font-bold text-white">Puesto #2 - Espejo NFC Activo</p>
              <p className="text-[11px] text-slate-400">Lunes a Sábado: 10:00 a 20:00 hrs</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">
            Sin Apps
          </span>
        </div>

        {/* Wi-Fi Clientes */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#12141e] border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-cyan-400" />
            <div>
              <p className="font-bold text-white text-[11px]">Wi-Fi Salón VIP</p>
              <p className="text-[10px] text-slate-400 font-mono">fade2026</p>
            </div>
          </div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText('fade2026');
              setWifiCopied(true);
              setTimeout(() => setWifiCopied(false), 2000);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold"
          >
            {wifiCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{wifiCopied ? 'Copiado' : 'Copiar Clave'}</span>
          </button>
        </div>

        {/* 1. Barbers Selection */}
        <div>
          <h3 className="font-bold text-white text-xs sm:text-sm mb-2.5 flex items-center gap-1.5">
            <User className="w-4 h-4 text-cyan-400" />
            1. Elige a tu Barbero de Confianza:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {barbers.map((b) => {
              const isSelected = selectedBarber === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBarber(b.id)}
                  className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 ${
                    isSelected
                      ? 'bg-cyan-950/30 border-cyan-400 ring-1 ring-cyan-400/50'
                      : 'bg-[#141520] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <img
                    src={b.avatar}
                    alt={b.name}
                    className="w-11 h-11 rounded-xl object-cover border border-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-xs truncate">{b.name}</h4>
                      <span className="text-amber-400 text-[10px] font-bold">★ {b.rating}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">{b.specialty}</p>
                    <p className="text-[9px] text-cyan-400 mt-0.5">{b.experience}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Service Selection */}
        <div>
          <h3 className="font-bold text-white text-xs sm:text-sm mb-2.5 flex items-center gap-1.5">
            <Scissors className="w-4 h-4 text-cyan-400" />
            2. Selecciona el Servicio:
          </h3>
          <div className="space-y-2">
            {services.map((s) => {
              const isSelected = selectedService === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s.id)}
                  className={`w-full p-3 rounded-2xl border text-left transition flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/10'
                      : 'bg-[#141520] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">{s.name}</h4>
                    <p className="text-[11px] text-slate-400 leading-snug">{s.description}</p>
                    <span className="inline-block mt-1 text-[10px] text-cyan-300 font-mono">
                      ⏱️ Duración: {s.duration}
                    </span>
                  </div>
                  <div className="text-right whitespace-nowrap">
                    <span className="font-mono text-cyan-400 font-extrabold text-sm">
                      ${s.price.toLocaleString('es-CL')} CLP
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Date & Time Selection */}
        <div className="rounded-2xl bg-[#141520] border border-slate-800 p-4 space-y-3">
          <h3 className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-cyan-400" />
            3. Fecha y Hora del Turno:
          </h3>

          <div className="flex gap-2">
            {dates.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDate(d)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition ${
                  selectedDate === d
                    ? 'bg-cyan-500 text-slate-950 font-extrabold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
            {times.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`py-2 rounded-xl text-xs font-mono font-bold transition ${
                  selectedTime === t
                    ? 'bg-cyan-500 text-slate-950 font-extrabold'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Customer Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Tu nombre completo"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-cyan-500"
            />
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="WhatsApp (+56 9 ...)"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-cyan-500"
            />
          </div>
        </div>

        {/* 4. Review Shield Filter */}
        <div className="rounded-2xl bg-[#121420] border border-slate-800 p-4 text-center">
          <p className="text-xs text-slate-400 mb-2">¿Cómo quedó tu corte hoy en el sillón #2?</p>
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
              <span>Publicar 5★ en Google Maps</span>
            </a>
          )}
          {selectedStars && selectedStars <= 3 && (
            <div className="space-y-1 mt-1">
              <p className="text-[11px] text-amber-400">
                Tu mensaje fue derivado de forma privada para hacer los ajustes sin costo.
              </p>
              {complaintSent && (
                <span className="text-[10px] text-emerald-400 font-mono block">
                  ✓ Registrado en API Central de Auditoría
                </span>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Bar: Agendar Turno */}
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
              <span className="text-xs text-slate-400">{selectedDate} • {selectedTime} hrs</span>
            </div>
            <p className="text-sm font-extrabold text-white">
              {currentBarber.name} • ${currentService.price.toLocaleString('es-CL')} CLP
            </p>
          </div>

          <button
            onClick={handleConfirmBooking}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Agendar por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
