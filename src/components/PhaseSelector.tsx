import React from "react";
import { Phase } from "../types";
import { PHASES } from "../data/workoutProgram";
import { ShieldCheck, Zap, Award } from "lucide-react";

interface PhaseSelectorProps {
  activePhaseId: number;
  onSelectPhase: (phaseId: number) => void;
  progressPercentage: number;
}

export const PhaseSelector: React.FC<PhaseSelectorProps> = ({
  activePhaseId,
  onSelectPhase,
  progressPercentage,
}) => {
  const getPhaseIcon = (id: number) => {
    switch (id) {
      case 1:
        return <ShieldCheck className="w-4 h-4" />;
      case 2:
        return <Zap className="w-4 h-4" />;
      case 3:
        return <Award className="w-4 h-4" />;
      default:
        return <ShieldCheck className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
          Estructura del Programa (12 Semanas)
        </h2>
        <span className="text-xs text-brand-400 font-semibold font-mono">
          Fase {activePhaseId} de 3
        </span>
      </div>

      {/* Grid of 3 Phases */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PHASES.map((phase: Phase) => {
          const isActive = phase.id === activePhaseId;
          return (
            <button
              key={phase.id}
              onClick={() => onSelectPhase(phase.id)}
              className={`text-left relative overflow-hidden rounded-2xl p-3.5 sm:p-4 transition-all duration-200 border ${
                isActive
                  ? "bg-gradient-to-b from-slate-800/90 to-slate-900/95 border-brand-500/60 shadow-lg shadow-brand-500/10 ring-1 ring-brand-500/40"
                  : "bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700 text-slate-400"
              }`}
            >
              {/* Active Indicator Top Bar */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-emerald-400" />
              )}

              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`p-1.5 rounded-lg ${
                      isActive
                        ? "bg-brand-500/20 text-brand-400"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {getPhaseIcon(phase.id)}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    {phase.weeksLabel}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                    isActive
                      ? "bg-brand-500/20 text-brand-300 border border-brand-500/30"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {phase.badge}
                </span>
              </div>

              <h3
                className={`font-bold text-sm sm:text-base leading-snug line-clamp-1 ${
                  isActive ? "text-white" : "text-slate-200"
                }`}
              >
                {phase.name.split(":")[1] || phase.name}
              </h3>

              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {phase.goal}
              </p>

              {/* Mini Phase Progress Bar if Active */}
              {isActive && (
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Avance de esta fase</span>
                  <span className="font-bold font-mono text-brand-400">
                    {progressPercentage}%
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
