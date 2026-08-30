import React, { useState, useEffect, useRef } from "react";
import { ExerciseItem } from "../../data/workoutCoolDatabase";
import { soundService } from "../../services/soundService";
import { Play, Pause, SkipForward, X, CheckCircle2, Wind } from "lucide-react";
import confetti from "canvas-confetti";

interface CustomRoutinePlayerProps {
  exercises: ExerciseItem[];
  soundEnabled: boolean;
  onClose: () => void;
  onFinishRoutine: (minutesAccumulated: number) => void;
}

export const CustomRoutinePlayer: React.FC<CustomRoutinePlayerProps> = ({
  exercises,
  soundEnabled,
  onClose,
  onFinishRoutine,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(() => exercises[0]?.durationSeconds || 45);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);
  const currentExercise = exercises[currentIndex] || exercises[0];
  const REST_DURATION = 15; // 15s rest between exercises

  // Reiniciar tiempo al cambiar de ejercicio
  useEffect(() => {
    if (isResting) {
      setTimeLeft(REST_DURATION);
    } else if (currentExercise) {
      setTimeLeft(currentExercise.durationSeconds);
    }
  }, [currentIndex, isResting, currentExercise]);

  // Manejo del temporizador
  useEffect(() => {
    if (isRunning && !isFinished) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Sonido de cambio / finalización
            if (soundEnabled) {
              soundService.playVictory();
            }

            if (!isResting && currentIndex < exercises.length - 1) {
              // Pasar a descanso
              setIsResting(true);
              return REST_DURATION;
            } else if (isResting) {
              // Pasar al siguiente ejercicio
              setIsResting(false);
              setCurrentIndex((idx) => idx + 1);
              return exercises[currentIndex + 1]?.durationSeconds || 45;
            } else {
              // Rutina completa finalizada
              setIsFinished(true);
              setIsRunning(false);
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
              });
              const totalSec = exercises.reduce((acc, curr) => acc + curr.durationSeconds, 0);
              const totalMins = Math.max(1, Math.round(totalSec / 60));
              onFinishRoutine(totalMins);
              return 0;
            }
          }

          // Beep en los últimos 3 segundos
          if (soundEnabled && (prev === 4 || prev === 3 || prev === 2)) {
            soundService.playCountdownTick(prev === 2);
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isFinished, isResting, currentIndex, exercises, soundEnabled, onFinishRoutine]);

  const togglePlay = () => {
    setIsRunning(!isRunning);
  };

  const skipNext = () => {
    if (currentIndex < exercises.length - 1) {
      setIsResting(false);
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
      setIsRunning(false);
    }
  };

  const currentDuration = isResting ? REST_DURATION : (currentExercise?.durationSeconds || 45);
  const progressPercent = Math.max(0, Math.min(100, ((currentDuration - timeLeft) / currentDuration) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl text-center text-slate-100 animate-sunrise">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400">
            {isFinished
              ? "¡Rutina Completada!"
              : isResting
              ? "Pausa de Transición"
              : `Ejercicio ${currentIndex + 1} de ${exercises.length}`}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isFinished ? (
          <>
            {/* Title & Muscle Badge */}
            <div className="space-y-1">
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${
                  isResting
                    ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                    : "bg-brand-500/20 text-brand-300 border-brand-500/30"
                }`}
              >
                {isResting ? "Descanso Activo" : currentExercise.muscleName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
                {isResting ? "Prepárate para el siguiente" : currentExercise.title}
              </h2>
            </div>

            {/* Circular Timer Visualizer */}
            <div className="relative flex items-center justify-center my-4">
              <svg className="w-48 h-48 transform -rotate-90">
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
                  className={`transition-all duration-300 ${
                    isResting ? "stroke-blue-400" : "stroke-brand-500"
                  }`}
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * progressPercent) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-mono font-black tracking-tight text-white">
                  {timeLeft}s
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {isResting ? "Siguiente en breve" : "Mantén la técnica"}
                </span>
              </div>
            </div>

            {/* Cue / Breathing Tip */}
            <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-300 text-left space-y-1.5">
              <div className="flex items-center gap-1 text-teal-300 font-semibold text-[11px] uppercase">
                <Wind className="w-3.5 h-3.5" />
                <span>Respiración & Postura</span>
              </div>
              <p>{isResting ? "Sacude los brazos y respira profundamente por la nariz." : currentExercise.breathingTip}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={togglePlay}
                className="px-8 py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-400 text-dark-bg font-black text-sm flex items-center gap-2 shadow-lg shadow-brand-500/25 transition-all transform active:scale-95"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5 fill-dark-bg" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-dark-bg" />
                    <span>Continuar</span>
                  </>
                )}
              </button>

              <button
                onClick={skipNext}
                className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Saltar al siguiente"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          /* Victory Completion Screen */
          <div className="space-y-4 py-6">
            <div className="w-16 h-16 rounded-full bg-brand-500/20 text-brand-400 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-black text-white">¡Sesión Cumplida con Éxito!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Has liberado la tensión de tus músculos y protegido tu columna para el resto de la jornada.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-400 text-dark-bg font-black text-xs transition-all shadow-lg shadow-brand-500/30"
            >
              Cerrar y Volver a la App
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
