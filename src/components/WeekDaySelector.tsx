import React from "react";
import { Check, Calendar } from "lucide-react";
import { Phase } from "../types";

interface WeekDaySelectorProps {
  activePhase: Phase;
  currentWeek: number;
  selectedDayOfWeek: number;
  onSelectWeek: (week: number) => void;
  onSelectDay: (day: number) => void;
  completedWorkoutIds: Record<string, boolean>; // e.g. "w1-d1": true
}

export const WeekDaySelector: React.FC<WeekDaySelectorProps> = ({
  activePhase,
  currentWeek,
  selectedDayOfWeek,
  onSelectWeek,
  onSelectDay,
  completedWorkoutIds,
}) => {
  // Generar array de semanas para la fase activa
  const phaseWeeks = [];
  for (let w = activePhase.startWeek; w <= activePhase.endWeek; w++) {
    phaseWeeks.push(w);
  }

  const DAYS = [
    { num: 1, name: "Lunes", short: "Lun" },
    { num: 2, name: "Martes", short: "Mar" },
    { num: 3, name: "Miércoles", short: "Mié" },
    { num: 4, name: "Jueves", short: "Jue" },
    { num: 5, name: "Viernes", short: "Vie" },
    { num: 6, name: "Sábado", short: "Sáb" },
    { num: 7, name: "Domingo", short: "Dom" },
  ];

  return (
    <div className="space-y-3 glass-panel rounded-2xl p-4 sm:p-5">
      {/* Week Selector Chips (Scrollable on mobile) */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-brand-400" />
          <span>Semanas de la {activePhase.name.split(":")[0]}</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Semana activa: <strong>#{currentWeek}</strong>
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar -mx-1 px-1">
        {phaseWeeks.map((week) => {
          const isSelected = week === currentWeek;
          // Contar días completados en esta semana
          let doneInWeek = 0;
          for (let d = 1; d <= 7; d++) {
            if (completedWorkoutIds[`w${week}-d${d}`]) {
              doneInWeek++;
            }
          }

          return (
            <button
              key={week}
              onClick={() => onSelectWeek(week)}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? "bg-brand-500 text-dark-bg shadow-md shadow-brand-500/25 scale-[1.02]"
                  : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60"
              }`}
            >
              <span>Semana {week}</span>
              {doneInWeek > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isSelected ? "bg-dark-bg/25 text-dark-bg" : "bg-brand-500/20 text-brand-400"
                  }`}
                >
                  {doneInWeek}/7
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Days of Week (Lun - Dom) Pills */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-1">
        {DAYS.map((day) => {
          const isSelected = day.num === selectedDayOfWeek;
          const workoutId = `w${currentWeek}-d${day.num}`;
          const isDone = Boolean(completedWorkoutIds[workoutId]);

          return (
            <button
              key={day.num}
              onClick={() => onSelectDay(day.num)}
              className={`relative flex flex-col items-center justify-center py-2.5 sm:py-3 px-1 rounded-xl transition-all border ${
                isSelected
                  ? "bg-gradient-to-b from-brand-500/20 to-slate-800/90 border-brand-400 text-white shadow-md shadow-brand-500/10 ring-1 ring-brand-400"
                  : isDone
                  ? "bg-slate-900/60 border-brand-500/30 text-slate-200 hover:bg-slate-800/60"
                  : "bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
              }`}
            >
              {/* Completed checkmark badge */}
              {isDone && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-500 text-dark-bg flex items-center justify-center shadow">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              )}

              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                {day.short}
              </span>
              <span
                className={`text-xs sm:text-sm font-black mt-0.5 font-mono ${
                  isSelected ? "text-brand-300" : isDone ? "text-slate-300" : "text-slate-500"
                }`}
              >
                D{day.num}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
