import React, { useState, useEffect } from 'react';
import { Shield, KeyRound, X, AlertTriangle } from 'lucide-react';
import { RestaurantSettings } from './RestaurantSettings';

interface MasterAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToVenue?: (path: string) => void;
}

export const MasterAdminModal: React.FC<MasterAdminModalProps> = ({
  isOpen,
  onClose,
  onNavigateToVenue,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('vallepro_master_session') === 'true';
    }
    return false;
  });

  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');

  // Check stored session when opened
  useEffect(() => {
    if (isOpen) {
      const active = localStorage.getItem('vallepro_master_session') === 'true';
      setIsAuthenticated(active);
      setPin('');
      setPinError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin.trim() === 'valle2026') {
      localStorage.setItem('vallepro_master_session', 'true');
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Clave de acceso incorrecta. Acceso restringido.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      {!isAuthenticated ? (
        /* VIEW 1: AUTHENTICATION FORM (PIN REQUEST) */
        <div className="bg-[#0b0c10] border border-slate-700/80 rounded-3xl max-w-md w-full p-6 sm:p-8 text-slate-100 shadow-2xl relative overflow-hidden">
          {/* Subtle Decorative Aura */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full bg-slate-900 border border-slate-800 transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="py-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-900/30 border border-amber-500/40 flex items-center justify-center">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">Acceso Modo Valle Pro</h3>
                <p className="text-xs text-slate-400">Autenticación de administración técnica central</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Clave Maestra de Seguridad
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    autoFocus
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                      if (pinError) setPinError('');
                    }}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-[#11131a] border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-amber-400 transition"
                  />
                </div>
                {pinError && (
                  <p className="text-xs text-rose-400 font-semibold mt-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{pinError}</span>
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-lg transition active:scale-95"
                >
                  Ingresar al Panel ⚡
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* VIEW 2: THE HOOD / RESTAURANTSETTINGS CONSOLE */
        <div className="max-w-4xl w-full h-[90vh] flex flex-col">
          <RestaurantSettings onClose={onClose} onNavigateToVenue={onNavigateToVenue} />
        </div>
      )}
    </div>
  );
};
