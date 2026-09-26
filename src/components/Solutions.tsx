import React from 'react';
import {
  Smartphone,
  Star,
  Zap,
  BarChart3,
  XCircle,
  CheckCircle,
  Layers,
  Sparkles,
  Coffee,
  UtensilsCrossed,
  Scissors,
} from 'lucide-react';

export const Solutions: React.FC = () => {
  const pillars = [
    {
      icon: Zap,
      title: 'Soportes NFC Inteligentes',
      description:
        'Soportes acrílicos de mesa estándar de 14x10 cm con chip NTAG213 pasivo y QR. Con solo apoyar el celular se abre la carta al instante en 0.2 segundos, sin instalar aplicaciones.',
      badge: 'Hardware de Mesa',
      color: 'from-amber-500/20 border-amber-500/30 text-amber-400',
    },
    {
      icon: Smartphone,
      title: 'Cartas Digitales Interactivas',
      description:
        'Dile adiós a los PDFs pesados y menús borrosos. Desarrollamos cartas web ultra veloces con fotos en alta resolución, filtros y comandas directas.',
      badge: '0% Tiempo de Espera',
      color: 'from-cyan-500/20 border-cyan-500/30 text-cyan-400',
    },
    {
      icon: Star,
      title: 'Blindaje de Google Reviews',
      description:
        'Filtro de dos vías: las valoraciones de 4 y 5 estrellas viajan directamente a Google Maps. Las de 1 a 3 estrellas se desvían al WhatsApp privado para resolverlas en el acto.',
      badge: '+4.8★ Garantizado',
      color: 'from-emerald-500/20 border-emerald-500/30 text-emerald-400',
    },
    {
      icon: BarChart3,
      title: 'Analíticas de Red en Vivo',
      description:
        'Conoce exactamente qué mesas tienen más rotación, horas peak de concurrencia y qué platos despiertan mayor interés en tu clientela del valle.',
      badge: 'Decisiones con Datos',
      color: 'from-purple-500/20 border-purple-500/30 text-purple-400',
    },
  ];

  const gallerySectors = [
    {
      title: 'Cafeterías de Especialidad',
      subtitle: 'La Montaña Coffee Bar & Cafés Boutique',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop&q=80',
      description: 'Primer plano de barista preparando café de especialidad y mesa de madera con soporte acrílico de 14x10 cm para lectura táctil de la carta de orígenes, clave Wi-Fi en 1 toque y propina digital.',
      icon: Coffee,
      tag: 'Café & Brunch',
    },
    {
      title: 'Restobares & Gastronomía',
      subtitle: 'Comensales & Terrazas Modernas',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=80',
      description: 'Comensales compartiendo en salón y terraza con celular sobre la mesa, agilizando comandas, rotación de mesas y derivación de reseñas 5 estrellas a Google Maps.',
      icon: UtensilsCrossed,
      tag: 'Restobar & Cocina',
    },
    {
      title: 'Barberías & Cuidado Personal',
      subtitle: 'Estaciones de Corte & Grooming',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&auto=format&fit=crop&q=80',
      description: 'Estación de barbero profesional con espejo, sillón vintage y herramientas de corte, integrando el soporte acrílico para visualización de catálogo de cortes, turnos express y Google Reviews.',
      icon: Scissors,
      tag: 'Salones & Barbería',
    },
  ];

  const comparison = [
    {
      feature: 'Forma de apertura por el cliente',
      traditional: 'Abrir cámara, enfocar QR borroso, esperar link',
      vallepro: '1 toque con el celular (NFC nativo en 0.2 seg) + QR de respaldo',
    },
    {
      feature: 'Experiencia visual del menú',
      traditional: 'PDF pesado que hay que agrandar con los dedos',
      vallepro: 'Web app moderna, animada, fotos HD y filtros de categorías',
    },
    {
      feature: 'Reclamos y malas calificaciones',
      traditional: 'El cliente enojado deja 1 estrella pública en Google Maps',
      vallepro: 'Filtro automático retiene quejas al WhatsApp privado del dueño',
    },
    {
      feature: 'Modificaciones de precios o platos',
      traditional: 'Reimprimir cartas plastificadas gastando miles de pesos',
      vallepro: 'Hasta 5 actualizaciones mensuales incluidas sin reimpresión',
    },
    {
      feature: 'Llamado a garzón y cuenta',
      traditional: 'Girar la cabeza o levantar la mano esperando ser visto',
      vallepro: 'Botón táctil en el celular que notifica al garzón o WhatsApp',
    },
  ];

  return (
    <section id="soluciones" className="py-24 relative overflow-hidden bg-[#08080a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Layers className="w-4 h-4 text-amber-400" />
            LOS 4 PILARES FÍSICO-DIGITALES
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Tecnología diseñada para la gastronomía y el comercio del{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              Aconcagua.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Elimina la fricción entre la mesa física de tu local y las herramientas digitales más poderosas del mercado:
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
               
                className="p-6 rounded-3xl glass-card glass-card-hover flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-105 transition-transform text-amber-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-display">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-amber-400 font-mono font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Instalación presencial
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Real Sectors Showcase (Cafetería, Restobar, Barbería) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
              ESCENARIOS REALES DE APLICACIÓN
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
              Imágenes de Salones & Mesas Conectadas
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Soportes NFC de 14x10 cm integrados armónicamente en cafeterías de especialidad, restobares y barberías del valle:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gallerySectors.map((sector, sIdx) => {
              const Icon = sector.icon;
              return (
                <div
                  key={sIdx}
                 
                  className="rounded-3xl glass-obsidian border border-slate-800 overflow-hidden shadow-2xl flex flex-col group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={sector.image}
                      alt={sector.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-amber-300">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{sector.tag}</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white font-display">
                        {sector.title}
                      </h4>
                      <p className="text-xs text-amber-400 font-mono mt-0.5">
                        {sector.subtitle}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed mt-3">
                        {sector.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Soporte 14x10 cm</span>
                      <span className="text-emerald-400 font-bold">✓ Activo en Terreno</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison Table: Traditional vs Valle Pro */}
        <div className="rounded-3xl glass-obsidian border border-slate-700/80 p-6 sm:p-10 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-white font-display">
              ¿Por qué cambiar a los Soportes NFC de Valle Pro?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Comparativa frente a las tradicionales cartas impresas o el clásico código QR a un PDF:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
                  <th className="pb-4 font-semibold">Característica</th>
                  <th className="pb-4 font-semibold text-rose-400">Cartas de Papel / PDF Escaneado</th>
                  <th className="pb-4 font-semibold text-amber-400">Soportes NFC Valle Pro ⚡</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {comparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition">
                    <td className="py-4 font-bold text-white font-display">{row.feature}</td>
                    <td className="py-4 text-slate-400 pr-4">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 text-slate-200">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-semibold text-white">{row.vallepro}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
