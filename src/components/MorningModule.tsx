import React, { useState, useEffect } from "react";
import { Sun, Clock, Bell, BellCheck, Play, Volume2, CheckCircle2 } from "lucide-react";
import { useMorningAlarm } from "../hooks/useMorningAlarm";

interface MorningModuleProps {
  soundEnabled: boolean;
  onStartSessionTimer: () => void;
  isTodayDone: boolean;
}

export const MorningModule: React.FC<MorningModuleProps> = ({
  soundEnabled,
  onStartSessionTimer,
  isTodayDone,
}) => {
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("");
  const {
    targetTimeString,
    timeUntilTarget,
    isTargetNow,
    hasNotificationPermission,
    requestNotifications,
    triggerTestAlarm
  } = useMorningAlarm("06:00", soundEnabled);

  // Reloj digital en vivo
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-brand-950/30 p-4 sm:p-6 shadow-xl backdrop-blur-xl">
      {/* Decorative Sunrise Ambient Glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Column: 6:00 AM Visualizer */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sun className="w-5 h-5 animate-spin-slow" />
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400/90">
              Módulo Matutino de Activación
            </span>
            {isTodayDone && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Sesión de Hoy Lista
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2 font-display">
              Objetivo: {targetTimeString}
            </h2>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Hora actual: <strong className="text-white font-mono">{currentTimeStr}</strong></span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {isTargetNow ? (
              <span className="text-brand-300 font-semibold animate-pulse">
                🌅 ¡Es la hora! Inicia tus 15 minutos para despertar articulaciones y acelerar el metabolismo antes de la oficina.
              </span>
            ) : (
              <span>
                Próxima activación programada <strong className="text-amber-300">{timeUntilTarget}</strong>. Entrenar a las 6:00 AM reduce la fatiga postural y el estrés de la jornada en un 40%.
              </span>
            )}
          </p>
        </div>

        {/* Right Column: Actions & Notifications */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 md:pt-0">
          {/* Botón de suscripción a notificaciones web */}
          <button
            onClick={requestNotifications}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200 ${
              hasNotificationPermission
                ? "bg-brand-500/10 border-brand-500/40 text-brand-300 hover:bg-brand-500/20"
                : "bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20 animate-pulse-glow"
            }`}
          >
            {hasNotificationPermission ? (
              <>
                <BellCheck className="w-4 h-4 text-brand-400" />
                <span>Alarma 6:00 AM Activa</span>
              </>
            ) : (
              <>
                <Bell className="w-4 h-4 text-amber-400" />
                <span>Activar Alarma 6:00 AM</span>
              </>
            )}
          </button>

          {/* Botón de probar alarma / campanada */}
          <button
            onClick={triggerTestAlarm}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
            title="Probar sonido y notificación de campana 6:00 AM"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Probar Alarma</span>
          </button>

          {/* Botón de Iniciar Temporizador de 15 Minutos */}
          <button
            onClick={onStartSessionTimer}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-brand-500 to-emerald-600 hover:from-brand-400 hover:to-emerald-500 text-dark-bg shadow-lg shadow-brand-500/25 transition-all transform active:scale-95"
          >
            <Play className="w-4 h-4 fill-dark-bg" />
            <span>Temporizador 15 Min</span>
          </button>
        </div>
      </div>
    </div>
  );
};
