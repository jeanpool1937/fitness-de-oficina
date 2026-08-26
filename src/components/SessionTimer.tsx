import React, { useState } from "react";
import { Play, Pause, RotateCcw, Maximize2, Minimize2, Plus, Minus, CheckCircle, X } from "lucide-react";
import { useTimer } from "../hooks/useTimer";

interface SessionTimerProps {
  initialMinutes?: number;
  soundEnabled: boolean;
  onSessionFinished?: () => void;
  onClose?: () => void;
  isFloating?: boolean;
}

export const SessionTimer: React.FC<SessionTimerProps> = ({
  initialMinutes = 15,
  soundEnabled,
  onSessionFinished,
  onClose,
  isFloating = false,
}) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const {
    formattedTime,
    progressPercent,
    isRunning,
    isCompleted,
    toggleTimer,
    resetTimer,
    adjustTime,
    minutes,
    seconds
  } = useTimer({
    initialMinutes,
    soundEnabled,
    onComplete: onSessionFinished
  });

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const containerClasses = isFullscreen
    ? "fixed inset-0 z-50 bg-[#0b0f19]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-white"
    : isFloating
    ? "glass-panel-glow rounded-2xl p-4 sm:p-5 shadow-2xl"
    : "glass-panel rounded-2xl p-4 sm:p-5 shadow-lg";

  return (
    <div className={containerClasses}>
      {/* Header controls inside timer */}
      <div className="w-full flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? "bg-brand-400 animate-ping" : "bg-slate-500"}`} />
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
            Temporizador de Sesión ({initialMinutes} min)
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title={isFullscreen ? "Salir de pantalla completa" : "Modo Enfoque Pantalla Completa"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
              title="Cerrar temporizador"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Time Visualizer */}
      <div className="flex flex-col items-center justify-center my-3 sm:my-5">
        {/* Animated Progress Ring / Digits */}
        <div className="relative flex items-center justify-center">
          {/* Radial progress stroke */}
          <svg className="w-44 h-44 sm:w-56 sm:h-56 transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="42%"
              className="stroke-slate-800"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r="42%"
              className="stroke-brand-500 transition-all duration-300 ease-linear"
              strokeWidth="8"
              strokeDasharray="264"
              strokeDashoffset={264 - (264 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Digital Digits */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`font-mono font-black tracking-tighter ${
                isFullscreen ? "text-6xl sm:text-7xl" : "text-4xl sm:text-5xl"
              } ${isCompleted ? "text-brand-400 animate-bounce" : isRunning ? "text-white" : "text-slate-200"}`}
            >
              {formattedTime}
            </span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-1">
              {isCompleted ? "¡Sesión Completada!" : isRunning ? "En Progreso..." : "En Pausa"}
            </span>
          </div>
        </div>

        {/* Adjust Time Mini Buttons */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => adjustTime(-60)}
            disabled={minutes === 0 && seconds <= 10}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white disabled:opacity-30 text-xs font-mono flex items-center gap-0.5"
            title="-1 Minuto"
          >
            <Minus className="w-3 h-3" /> 1m
          </button>
          <button
            onClick={() => adjustTime(60)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-mono flex items-center gap-0.5"
            title="+1 Minuto"
          >
            <Plus className="w-3 h-3" /> 1m
          </button>
        </div>
      </div>

      {/* Control Action Buttons */}
      <div className="flex items-center justify-center gap-3 mt-2">
        <button
          onClick={() => resetTimer()}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all transform active:scale-95"
          title="Reiniciar temporizador"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={toggleTimer}
          className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg ${
            isRunning
              ? "bg-amber-500 hover:bg-amber-400 text-dark-bg shadow-amber-500/20"
              : "bg-brand-500 hover:bg-brand-400 text-dark-bg shadow-brand-500/30"
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 fill-dark-bg" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-dark-bg" />
              <span>{isCompleted ? "Repetir" : "Comenzar"}</span>
            </>
          )}
        </button>

        {onSessionFinished && !isCompleted && (
          <button
            onClick={onSessionFinished}
            className="p-3 rounded-xl bg-brand-950/60 border border-brand-500/40 text-brand-400 hover:bg-brand-900/60 transition-all transform active:scale-95"
            title="Marcar sesión como terminada ahora"
          >
            <CheckCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
