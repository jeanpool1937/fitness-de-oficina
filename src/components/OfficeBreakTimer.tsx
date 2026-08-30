import React, { useState, useEffect } from "react";
import { Coffee, Play, Pause, RotateCcw, Sparkles } from "lucide-react";
import { soundService } from "../services/soundService";
import { notificationService } from "../services/notificationService";

interface OfficeBreakTimerProps {
  soundEnabled: boolean;
  onLaunchQuickStretch: () => void;
}

export const OfficeBreakTimer: React.FC<OfficeBreakTimerProps> = ({
  soundEnabled,
  onLaunchQuickStretch,
}) => {
  const WORK_SECONDS = 50 * 60; // 50 min
  const BREAK_SECONDS = 5 * 60; // 5 min

  const [mode, setMode] = useState<"work" | "break">("work");
  const [timeLeft, setTimeLeft] = useState<number>(WORK_SECONDS);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: number | null = null;
    if (isRunning) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (soundEnabled) {
              soundService.playMorningAlarm();
            }

            if (mode === "work") {
              notificationService.sendNotification(
                "🔔 ¡Hora de Pausa Activa!",
                "Has trabajado 50 minutos seguidos. Levántate del escritorio y estira 5 minutos."
              );
              setMode("break");
              return BREAK_SECONDS;
            } else {
              notificationService.sendNotification(
                "💼 Fin de Pausa Activa",
                "Cuerpo recargado. Vuelve a tu bloque de enfoque con postura erguida."
              );
              setMode("work");
              return WORK_SECONDS;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, mode, soundEnabled]);

  const toggleRunning = () => {
    setIsRunning(!isRunning);
    if (!isRunning && soundEnabled) {
      soundService.playStart();
    }
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(mode === "work" ? WORK_SECONDS : BREAK_SECONDS);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const total = mode === "work" ? WORK_SECONDS : BREAK_SECONDS;
  const progressPercent = ((total - timeLeft) / total) * 100;

  return (
    <div className="glass-panel-glow rounded-3xl p-5 sm:p-7 space-y-5 border border-brand-500/30 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Temporizador de Pausas Activas (50/5 Oficina)
            </h3>
            <p className="text-xs text-slate-300">
              Alterna 50 min de trabajo profundo con 5 min de descompresión física.
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
            mode === "work"
              ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
              : "bg-brand-500/20 text-brand-300 border-brand-500/30"
          }`}
        >
          {mode === "work" ? "Modo Trabajo (50m)" : "Pausa Activa (5m)"}
        </span>
      </div>

      {/* Center Digital Clock */}
      <div className="flex flex-col items-center justify-center my-3">
        <div className="text-6xl sm:text-7xl font-mono font-black tracking-tight text-white">
          {formattedTime}
        </div>
        <div className="w-full max-w-xs h-2 bg-slate-800 rounded-full overflow-hidden mt-3">
          <div
            style={{ width: `${progressPercent}%` }}
            className={`h-full transition-all duration-300 ${
              mode === "work" ? "bg-amber-400" : "bg-brand-500"
            }`}
          />
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          title="Reiniciar"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={toggleRunning}
          className={`px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all transform active:scale-95 ${
            isRunning
              ? "bg-amber-500 hover:bg-amber-400 text-dark-bg"
              : "bg-brand-500 hover:bg-brand-400 text-dark-bg shadow-brand-500/30"
          }`}
        >
          {isRunning ? <Pause className="w-5 h-5 fill-dark-bg" /> : <Play className="w-5 h-5 fill-dark-bg" />}
          <span>{isRunning ? "Pausar Intervalo" : "Iniciar Pomodoro"}</span>
        </button>

        <button
          onClick={onLaunchQuickStretch}
          className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-brand-500/20 border border-slate-700 hover:border-brand-500/40 text-xs font-bold text-slate-200 hover:text-brand-300 transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span>Pausa Rápida de 2 Min</span>
        </button>
      </div>
    </div>
  );
};
