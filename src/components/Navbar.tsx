import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MessageCircle, Zap, Calculator } from 'lucide-react';
import { ValleProLogo } from './ValleProLogo';

interface NavbarProps {
  onNavigateHome: () => void;
  currentRoute: string;
  onOpenOnboarding?: () => void;
  onOpenCotizador?: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  currentRoute,
  onOpenOnboarding,
  onOpenCotizador,
  onOpenAdmin,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Triple-tap secret mechanism
  const [isVibrating, setIsVibrating] = useState(false);
  const tapCountRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const whatsappNumber = '56991825700';

  const handleLogoClick = (e: React.MouseEvent) => {
    // Micro-vibration visual feedback
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 240);

    tapCountRef.current += 1;
    if (tapCountRef.current === 1) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, 1500);
    } else if (tapCountRef.current >= 3) {
      if (timerRef.current) clearTimeout(timerRef.current);
      tapCountRef.current = 0;
      if (onOpenAdmin) {
        onOpenAdmin();
      } else {
        window.dispatchEvent(new CustomEvent('open-admin'));
      }
    }

    if (currentRoute !== '/') {
      e.preventDefault();
      onNavigateHome();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Taller Hardware', href: '#hero' },
    { label: 'Soluciones', href: '#soluciones' },
    { label: 'Live Mirror Hub', href: '#live-mirror' },
    { label: 'Laboratorio Blindaje', href: '#filtro-resenas' },
    { label: 'Hardware 14x10', href: '#hardware' },
    { label: 'Centro de Control', href: '#centro-control' },
    { label: 'Planes', href: '#planes' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (currentRoute !== '/') {
      e.preventDefault();
      onNavigateHome();
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08080a]/92 backdrop-blur-xl border-b border-amber-500/15 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo: VP Monogram + Golden Serif Valle Pro • reseñas del valle */}
          <div
            onClick={handleLogoClick}
            className={`group cursor-pointer inline-block transition-transform duration-200 select-none ${
              isVibrating ? 'scale-95 brightness-125' : 'active:scale-95'
            }`}
            title="Valle Pro • Modo Valle Pro"
          >
            <ValleProLogo size="md" showSubtext={true} />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs font-semibold text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-amber-400 transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </div>

          {/* Action CTAs: Activar mi Local + WhatsApp */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Activar mi Local ⚡ / Completar Ficha Técnica CTA */}
            <button
              onClick={() => {
                if (onOpenOnboarding) {
                  onOpenOnboarding();
                } else {
                  window.dispatchEvent(new CustomEvent('open-onboarding'));
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-extrabold text-xs bg-gradient-to-r from-emerald-500/20 via-emerald-400/25 to-amber-500/20 text-emerald-300 hover:text-emerald-200 border border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all active:scale-95 group"
              title="Completar Ficha Técnica de Onboarding"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span>Activar mi Local ⚡</span>
            </button>

            {/* Cotizar en Línea ⚡ CTA Button */}
            <button
              onClick={() => {
                if (onOpenCotizador) {
                  onOpenCotizador();
                } else {
                  window.dispatchEvent(new CustomEvent('open-cotizador'));
                }
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 transition-all transform active:scale-95"
              title="Calcular cotización interactiva en CLP"
            >
              <Calculator className="w-4 h-4 fill-slate-950" />
              <span>Cotizar en Línea ⚡</span>
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={() => {
                if (onOpenOnboarding) {
                  onOpenOnboarding();
                } else {
                  window.dispatchEvent(new CustomEvent('open-onboarding'));
                }
              }}
              className="px-2.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-amber-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold transition flex items-center gap-1"
              title="Activar mi Local"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px]">Activar</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              title="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0d12]/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-amber-400 transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenOnboarding) {
                  onOpenOnboarding();
                } else {
                  window.dispatchEvent(new CustomEvent('open-onboarding'));
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500/25 via-emerald-400/20 to-amber-500/25 text-emerald-300 border border-emerald-500/50 shadow-md"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Activar mi Local ⚡ (Ficha Técnica)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCotizador) {
                  onOpenCotizador();
                } else {
                  window.dispatchEvent(new CustomEvent('open-cotizador'));
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 shadow-md"
            >
              <Calculator className="w-4 h-4 fill-slate-950" />
              <span>Cotizar en Línea ⚡ (Calcular Presupuesto)</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
