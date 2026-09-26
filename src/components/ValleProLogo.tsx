import React from 'react';

interface ValleProLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtext?: boolean;
  monogramOnly?: boolean;
  className?: string;
}

export const ValleProLogo: React.FC<ValleProLogoProps> = ({
  size = 'md',
  showSubtext = true,
  monogramOnly = false,
  className = '',
}) => {
  // Sizing dimensions for the monogram badge
  const dimensions = {
    sm: { badge: 'w-8 h-8 rounded-xl', iconSize: 22, title: 'text-base', subtext: 'text-[9px]' },
    md: { badge: 'w-10 h-10 rounded-2xl', iconSize: 28, title: 'text-lg sm:text-xl', subtext: 'text-[10px]' },
    lg: { badge: 'w-12 h-12 rounded-2xl', iconSize: 34, title: 'text-xl sm:text-2xl', subtext: 'text-xs' },
    hero: { badge: 'w-14 h-14 rounded-2xl', iconSize: 40, title: 'text-2xl sm:text-3xl', subtext: 'text-xs' },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Intertwined "VP" Monogram Isotype */}
      <div
        className={`relative ${dimensions.badge} bg-[#040406] border border-amber-500/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.25)] overflow-hidden group-hover:border-amber-400/60 transition-all duration-300`}
        style={{
          boxShadow: '0 4px 20px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.15)',
        }}
      >
        {/* Subtle radial inner glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-slate-400/10 pointer-events-none" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Platinum / Silver Gradient for "V" */}
            <linearGradient id="vpPlatinumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#f1f5f9" />
              <stop offset="65%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            {/* Champagne / Rich Gold Gradient for "P" */}
            <linearGradient id="vpGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#fbbf24" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Subtle drop shadow filter for 3D interlocking depth */}
            <filter id="vpShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Intertwined Monogram "VP" */}
          {/* Back stem of P passing behind V */}
          <path
            d="M 44 24 L 54 24 L 54 76 L 44 76 Z"
            fill="url(#vpGoldGrad)"
            opacity="0.95"
          />

          {/* "V" Left Wing (Platinum / Silver) */}
          <path
            d="M 18 24 L 28 24 L 46 68 L 38 68 Z"
            fill="url(#vpPlatinumGrad)"
            filter="url(#vpShadow)"
          />

          {/* "V" Right Wing (Platinum / Silver) crossing over */}
          <path
            d="M 38 68 L 46 68 L 64 24 L 54 24 Z"
            fill="url(#vpPlatinumGrad)"
            filter="url(#vpShadow)"
          />

          {/* "P" Loop (Champagne / Gold) intertwining and wrapping across */}
          <path
            d="M 50 24 C 74 24 78 48 50 50 L 50 42 C 64 41 64 32 50 32 Z"
            fill="url(#vpGoldGrad)"
            filter="url(#vpShadow)"
          />

          {/* Intersection optical accent dot */}
          <circle cx="50" cy="24" r="2.5" fill="#fef08a" />
        </svg>
      </div>

      {/* Typography: Golden Serif "Valle Pro" + White Refined "reseñas del valle" */}
      {!monogramOnly && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span
              className={`font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 ${dimensions.title}`}
              style={{
                fontFamily: '"Playfair Display", "Cinzel", "Georgia", serif',
                letterSpacing: '-0.02em',
                textShadow: '0 2px 10px rgba(245,158,11,0.2)',
              }}
            >
              Valle Pro
            </span>
            <span className="text-amber-400 font-bold text-[9px] bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30 font-mono tracking-widest uppercase">
              ACONCAGUA
            </span>
          </div>

          {showSubtext && (
            <span
              className={`font-sans tracking-[0.22em] text-slate-100/90 font-medium lowercase ${dimensions.subtext}`}
              style={{ letterSpacing: '0.18em' }}
            >
              reseñas del valle
            </span>
          )}
        </div>
      )}
    </div>
  );
};
