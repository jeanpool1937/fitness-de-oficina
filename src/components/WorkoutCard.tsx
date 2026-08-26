import React from "react";
import { WorkoutDay } from "../types";
import { Clock, ShieldAlert, Dumbbell, Compass, Lightbulb, CheckCircle2, Play } from "lucide-react";
import { TRAINERS } from "../data/workoutProgram";

interface WorkoutCardProps {
  workout: WorkoutDay;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onOpenTimer: () => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  isCompleted,
  onToggleComplete,
  onOpenTimer,
}) => {
  const trainerInfo = TRAINERS[workout.trainer];

  const getIntensityBadge = (intensity: string) => {
    switch (intensity) {
      case "Baja":
        return "bg-teal-500/20 text-teal-300 border-teal-500/30";
      case "Media":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Media-Alta":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "Alta":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6 space-y-4 border border-slate-800 shadow-xl">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-brand-500/20 text-brand-400 font-bold text-xs uppercase tracking-wider border border-brand-500/30">
            {workout.dayName} • S{workout.weekNumber}
          </span>
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${getIntensityBadge(workout.intensity)}`}>
            Intensidad {workout.intensity}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
          <Clock className="w-3.5 h-3.5 text-brand-400" />
          <span>{workout.durationMinutes} min</span>
        </div>
      </div>

      {/* Routine Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display">
          {workout.title}
        </h2>
      </div>

      {/* Postural Focus Alert Box */}
      <div className="rounded-xl bg-gradient-to-r from-brand-950/60 to-emerald-950/40 border border-brand-500/30 p-3.5 space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-brand-300 uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-brand-400" />
          <span>Enfoque Postural de Oficina</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
          {workout.posturalFocus}
        </p>
      </div>

      {/* Target Muscles */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1 text-[11px] uppercase font-bold text-slate-400 tracking-wider">
          <Dumbbell className="w-3.5 h-3.5 text-slate-400" />
          <span>Músculos Activados</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {workout.targetMuscles.map((muscle, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/70 text-slate-300"
            >
              {muscle}
            </span>
          ))}
        </div>
      </div>

      {/* Trainer Info */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-3">
          <img
            src={trainerInfo?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
            alt={workout.trainer}
            className="w-10 h-10 rounded-full object-cover border-2 border-brand-500/40 shadow-sm"
          />
          <div>
            <div className="font-bold text-sm text-white flex items-center gap-1">
              {workout.trainer}
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Coach
              </span>
            </div>
            <div className="text-[11px] text-slate-400">{workout.trainerRole}</div>
          </div>
        </div>

        {/* Quick actions inside card */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTimer}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Abrir temporizador regresivo de 15 min"
          >
            <Play className="w-4 h-4 fill-current" />
          </button>
          <button
            onClick={onToggleComplete}
            className={`p-2 rounded-xl border transition-all ${
              isCompleted
                ? "bg-brand-500/20 border-brand-500 text-brand-400"
                : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"
            }`}
            title={isCompleted ? "Sesión marcada como completada" : "Completar rutina"}
          >
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Execution Notes */}
      <div className="space-y-2">
        <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-brand-400" />
          <span>Notas de Ejecución y Técnica</span>
        </h4>
        <ul className="space-y-1.5">
          {workout.executionNotes.map((note, idx) => (
            <li
              key={idx}
              className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 bg-slate-900/40 p-2 rounded-lg border border-slate-800/60"
            >
              <span className="text-brand-400 font-bold font-mono text-xs mt-0.5">•</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Ergonomic Tip of the Day */}
      <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5">
        <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
            Consejo Ergonómico de Trabajo
          </div>
          <div className="text-xs text-slate-300 leading-relaxed">
            {workout.ergonomicTip}
          </div>
        </div>
      </div>
    </div>
  );
};
