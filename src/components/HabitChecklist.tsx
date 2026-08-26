import React, { useState } from "react";
import { CheckCircle2, Sparkles, Droplets, Eye, Armchair, ShieldCheck, Flame } from "lucide-react";
import { formatDateDisplay } from "../services/storageService";

interface HabitChecklistProps {
  isCompleted: boolean;
  selectedDate: string;
  onToggleComplete: () => void;
  currentStreak: number;
}

export const HabitChecklist: React.FC<HabitChecklistProps> = ({
  isCompleted,
  selectedDate,
  onToggleComplete,
  currentStreak,
}) => {
  // Estado local para micro-hábitos diarios de oficina
  const [habits, setHabits] = useState({
    water: true,
    screen: false,
    stretch: false,
    posture: false,
  });

  const toggleHabit = (key: keyof typeof habits) => {
    setHabits((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const formattedDate = formatDateDisplay(selectedDate);

  return (
    <div className="glass-panel-glow rounded-2xl p-4 sm:p-6 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-xs uppercase font-extrabold tracking-wider text-brand-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Control de Hábitos & Cumplimiento
          </h3>
          <p className="text-xs text-slate-300">
            Fecha: <strong className="text-white">{formattedDate}</strong>
          </p>
        </div>

        {isCompleted && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/40 animate-bounce">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            Racha: {currentStreak} {currentStreak === 1 ? "día" : "días"}
          </span>
        )}
      </div>

      {/* Main Big Completion Action Button */}
      <button
        onClick={onToggleComplete}
        className={`w-full py-4 sm:py-5 px-6 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-95 shadow-xl ${
          isCompleted
            ? "bg-gradient-to-r from-brand-600 to-emerald-500 text-dark-bg ring-4 ring-brand-500/30 shadow-brand-500/40"
            : "bg-gradient-to-r from-slate-800 to-slate-900 text-slate-200 border-2 border-brand-500/50 hover:border-brand-400 hover:text-white hover:bg-slate-850 shadow-slate-900/50 hover:shadow-brand-500/20"
        }`}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 className="w-7 h-7 text-dark-bg fill-dark-bg stroke-emerald-300 stroke-[2.5]" />
            <span>¡SESIÓN DE HOY CUMPLIDA! 🎉</span>
          </>
        ) : (
          <>
            <div className="w-6 h-6 rounded-full border-2 border-brand-400 flex items-center justify-center animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-400" />
            </div>
            <span>Completar Sesión de Hoy (15 min)</span>
          </>
        )}
      </button>

      {/* Micro-habits ergonomic checklist */}
      <div className="pt-2 space-y-2">
        <h4 className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
          Micro-Hábitos Posturales del Día
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Hábito 1: Agua */}
          <button
            onClick={() => toggleHabit("water")}
            className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs transition-all border ${
              habits.water
                ? "bg-brand-950/40 border-brand-500/40 text-slate-200"
                : "bg-slate-900/40 border-slate-800 text-slate-400"
            }`}
          >
            <div className={`p-1.5 rounded-lg ${habits.water ? "bg-brand-500 text-dark-bg" : "bg-slate-800 text-slate-500"}`}>
              <Droplets className="w-3.5 h-3.5" />
            </div>
            <span className={habits.water ? "line-through opacity-80" : ""}>
              500ml de agua al despertar
            </span>
          </button>

          {/* Hábito 2: Pantalla y ojos */}
          <button
            onClick={() => toggleHabit("screen")}
            className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs transition-all border ${
              habits.screen
                ? "bg-brand-950/40 border-brand-500/40 text-slate-200"
                : "bg-slate-900/40 border-slate-800 text-slate-400"
            }`}
          >
            <div className={`p-1.5 rounded-lg ${habits.screen ? "bg-brand-500 text-dark-bg" : "bg-slate-800 text-slate-500"}`}>
              <Eye className="w-3.5 h-3.5" />
            </div>
            <span className={habits.screen ? "line-through opacity-80" : ""}>
              Pausa 20-20-20 visual
            </span>
          </button>

          {/* Hábito 3: Postura Silla */}
          <button
            onClick={() => toggleHabit("posture")}
            className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs transition-all border ${
              habits.posture
                ? "bg-brand-950/40 border-brand-500/40 text-slate-200"
                : "bg-slate-900/40 border-slate-800 text-slate-400"
            }`}
          >
            <div className={`p-1.5 rounded-lg ${habits.posture ? "bg-brand-500 text-dark-bg" : "bg-slate-800 text-slate-500"}`}>
              <Armchair className="w-3.5 h-3.5" />
            </div>
            <span className={habits.posture ? "line-through opacity-80" : ""}>
              Pies planos y hombros relajados
            </span>
          </button>

          {/* Hábito 4: Desconexión */}
          <button
            onClick={() => toggleHabit("stretch")}
            className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs transition-all border ${
              habits.stretch
                ? "bg-brand-950/40 border-brand-500/40 text-slate-200"
                : "bg-slate-900/40 border-slate-800 text-slate-400"
            }`}
          >
            <div className={`p-1.5 rounded-lg ${habits.stretch ? "bg-brand-500 text-dark-bg" : "bg-slate-800 text-slate-500"}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className={habits.stretch ? "line-through opacity-80" : ""}>
              Pausa activa de 2 min cada hora
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
