import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  ChevronDown,
  RotateCcw,
  ShieldCheck,
  Zap,
  MapPin,
} from 'lucide-react';
import { ChatMessage } from '../types';

export const ValleAIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: '¡Hola! Soy **Valle AI**, asesor comercial de **Valle Pro** en el Valle del Aconcagua (Los Andes y San Felipe). ¿En qué puedo ayudarte hoy?',
      timestamp: 'Ahora',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickQuestions = [
    'Auditar mi Ficha de Google Maps',
    'Plan Landing + Menú ($129.000)',
    'Optimización Google Maps ($40.000)',
    'Precios Packs Stands NFC (14x10)',
    'Quiero contratar para mi local',
  ];

  const handleTriggerAudit = () => {
    setIsOpen(true);
    const auditMsg: ChatMessage = {
      id: `u-audit-${Date.now()}`,
      sender: 'user',
      text: 'Auditar mi Ficha de Google Maps',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const botPromptMsg: ChatMessage = {
      id: `b-audit-${Date.now()}`,
      sender: 'bot',
      text: '¡Excelente iniciativa! 🚀 Para realizar la **Auditoría Express de tu Ficha de Google Maps** sin costo, por favor indícame:\n\n1. El **nombre comercial de tu local o negocio** (ej. Cafetería Los Andes, Barbería Don Juan).\n2. Tu **comuna en el Valle del Aconcagua** (Los Andes, San Felipe, Rinconada, Calle Larga, San Esteban, etc.).\n\nCon estos datos evaluaré tu visibilidad en búsquedas locales de clientes y la activación de reseñas 5★.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, auditMsg, botPromptMsg]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      if (!res.ok) {
        throw new Error('Error en la comunicación con el servidor');
      }

      const data = await res.json();
      const botText = data.text || 'Disculpa, no pude procesar la consulta en este momento.';

      // Check if user is asking to contract/buy or if text mentions WhatsApp
      const isHiring =
        query.toLowerCase().includes('contrat') ||
        query.toLowerCase().includes('cotiz') ||
        query.toLowerCase().includes('compr') ||
        query.toLowerCase().includes('visita');

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        whatsappLink: isHiring
          ? `https://wa.me/56991825700?text=${encodeURIComponent(
              `Hola Valle Pro! Conversé con Valle AI y quiero cotizar servicios digitales / soportes NFC para mi local en el Valle del Aconcagua.`
            )}`
          : undefined,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `b-err-${Date.now()}`,
          sender: 'bot',
          text: 'Hubo un inconveniente al conectar con el servidor. Puedes escribirnos directamente al WhatsApp oficial **+56 9 9182 5700** para atenderte en minutos.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          whatsappLink: 'https://wa.me/56991825700?text=Hola%20Valle%20Pro,%20quiero%20informacion',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'init-reset',
        sender: 'bot',
        text: '¡Conversación reiniciada! ¿Qué te gustaría saber sobre nuestros soportes NFC, cartas digitales o el blindaje de reseñas Google?',
        timestamp: 'Ahora',
      },
    ]);
  };

  return (
    <>
      {/* Floating Action Button (Launcher) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 sm:gap-3">
          {/* Quick Action Button: Auditar mi Ficha de Google Maps */}
          <button
            onClick={handleTriggerAudit}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-[#0e1017]/95 border border-cyan-500/40 text-cyan-300 hover:text-cyan-200 text-xs font-bold shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:border-cyan-400 hover:scale-[1.03] active:scale-95 transition-all group backdrop-blur-xl animate-in fade-in slide-in-from-right-4"
            title="Realizar Auditoría Express de Ficha Google Maps sin costo"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <MapPin className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Auditar mi Ficha de Google Maps</span>
            <span className="sm:hidden">Auditar Ficha Maps</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 bg-[#121218]/90 border border-amber-500/30 text-amber-300 text-xs px-3.5 py-1.5 rounded-full shadow-2xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>¿Dudas? Habla con <strong>Valle AI</strong></span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all group"
            title="Abrir Asesor Inteligente Valle AI"
          >
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0a0a0c] rounded-full" />
            <Bot className="w-7 h-7 group-hover:rotate-6 transition-transform" />
          </button>
        </div>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[85vh] flex flex-col bg-[#0f0f15] border border-slate-700/80 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden animate-in zoom-in-95 backdrop-blur-2xl">
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-[#171722] via-[#1b1c2b] to-[#141420] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Bot className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#121218] rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-white font-display">Valle AI</span>
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                    Gemini 3.8
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  Asesor Comercial • Los Andes y San Felipe
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Reiniciar chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Cerrar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className="max-w-[82%]">
                  <div
                    className={`p-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-[#181824] text-slate-200 border border-slate-800 rounded-tl-none'
                    }`}
                  >
                    {/* Render basic bold formatting */}
                    <div className="whitespace-pre-wrap">
                      {m.text.split('\n').map((line, lIdx) => (
                        <p key={lIdx} className={lIdx > 0 ? 'mt-1.5' : ''}>
                          {line.split('**').map((part, pIdx) =>
                            pIdx % 2 === 1 ? (
                              <strong key={pIdx} className={m.sender === 'user' ? 'text-black' : 'text-amber-300 font-semibold'}>
                                {part}
                              </strong>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      ))}
                    </div>

                    {/* WhatsApp CTA when hiring */}
                    {m.whatsappLink && (
                      <div className="mt-3 pt-2.5 border-t border-slate-700/60">
                        <a
                          href={m.whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-md"
                        >
                          <span>Contactar por WhatsApp (+56 9 9182 5700)</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>

                  <div
                    className={`text-[10px] text-slate-500 mt-1 px-1 ${
                      m.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-[#181824] border border-slate-800 p-3 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px]">Valle AI está respondiendo...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div className="px-3 py-2 bg-[#12121a] border-t border-slate-800/80 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(q)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-300 transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3 bg-[#0d0d14] border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunta sobre precios, NFC o instalación..."
              className="flex-1 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold transition flex items-center justify-center shrink-0"
              title="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
