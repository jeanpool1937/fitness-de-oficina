import React from "react";
import { Flame, Bell, Settings, Volume2, VolumeX, Cloud, CloudOff } from "lucide-react";
import { getSupabaseConfig } from "../services/supabaseClient";

interface NavbarProps {
  currentStreak: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  hasNotificationPermission: boolean;
  onRequestNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStreak,
  soundEnabled,
  onToggleSound,
  onOpenSettings,
  hasNotificationPermission,
  onRequestNotifications,
}) => {
  const supabaseConfig = getSupabaseConfig();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 text-dark-bg font-extrabold shadow-lg shadow-brand-500/20">
            <span className="text-xl">🏃</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-75" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                Fitness de Oficina
              </h1>
              <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                06:00 AM
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              15 min diarios de activación postural y energía laboral
            </p>
          </div>
        </div>

        {/* Action Controls & Streak Badge */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Racha / Streak Badge */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              currentStreak > 0
                ? "bg-amber-950/40 border-amber-500/40 text-amber-300 shadow-sm shadow-amber-500/10"
                : "bg-slate-800/60 border-slate-700/60 text-slate-400"
            }`}
            title={`Racha actual: ${currentStreak} días consecutivos`}
          >
            <Flame
              className={`w-4 h-4 ${
                currentStreak > 0
                  ? "text-amber-400 fill-amber-400 animate-pulse"
                  : "text-slate-500"
              }`}
            />
            <span className="text-xs font-bold font-mono">
              {currentStreak} {currentStreak === 1 ? "día" : "días"}
            </span>
          </div>

          {/* Estado de Notificaciones */}
          <button
            onClick={onRequestNotifications}
            className={`p-2 rounded-xl border transition-all ${
              hasNotificationPermission
                ? "bg-brand-950/40 border-brand-500/40 text-brand-400 hover:bg-brand-900/40"
                : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-amber-300 hover:border-amber-500/40"
            }`}
            title={
              hasNotificationPermission
                ? "Notificaciones 6:00 AM activas"
                : "Activar notificaciones matutinas"
            }
          >
            <Bell className="w-4 h-4" />
          </button>

          {/* Sonido Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
            title={soundEnabled ? "Silenciar audio" : "Activar sonido"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Supabase Status Indicator & Settings Button */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
            title="Configuración de cuenta y sincronización en la nube"
          >
            {supabaseConfig.isConfigured ? (
              <Cloud className="w-4 h-4 text-blue-400" />
            ) : (
              <CloudOff className="w-4 h-4 text-slate-500" />
            )}
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
