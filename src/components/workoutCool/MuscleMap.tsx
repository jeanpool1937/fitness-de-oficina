import React, { useState } from "react";
import { MUSCLE_GROUPS, MuscleGroup } from "../../data/workoutCoolDatabase";
import { RotateCw, Activity, Check } from "lucide-react";

interface MuscleMapProps {
  selectedMuscleIds: string[];
  onToggleMuscle: (muscleId: string) => void;
  onClearMuscles: () => void;
}

export const MuscleMap: React.FC<MuscleMapProps> = ({
  selectedMuscleIds,
  onToggleMuscle,
  onClearMuscles,
}) => {
  const [view, setView] = useState<"anterior" | "posterior">("anterior");

  const isSelected = (id: string) => selectedMuscleIds.includes(id);

  // Músculos relevantes en la vista activa
  const visibleMuscles = MUSCLE_GROUPS.filter(
    (m) => m.view === "both" || m.view === view
  );

  return (
    <div className="glass-panel-glow rounded-3xl p-4 sm:p-6 space-y-4 border border-brand-500/30 shadow-2xl">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-500/20 text-brand-400">
              <Activity className="w-4 h-4" />
            </span>
            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider font-display">
              Mapa Muscular Anatómico (Workout.cool)
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            Toca los grupos musculares afectados por el escritorio para filtrar ejercicios correctivos.
          </p>
        </div>

        {/* View Switcher (Anterior vs Posterior) */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setView("anterior")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              view === "anterior"
                ? "bg-brand-500 text-dark-bg shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Vista Anterior (Frente)
          </button>
          <button
            onClick={() => setView("posterior")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              view === "posterior"
                ? "bg-brand-500 text-dark-bg shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Vista Posterior (Espalda)
          </button>
        </div>
      </div>

      {/* Interactive Anatomy Canvas + Chips Split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Visual Vector Body Figure */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-950/70 rounded-2xl border border-slate-800 relative group min-h-[340px]">
          {/* Quick Flip Floating Button */}
          <button
            onClick={() => setView(view === "anterior" ? "posterior" : "anterior")}
            className="absolute top-3 right-3 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1 text-[11px] font-semibold z-10 border border-slate-700"
            title="Girar cuerpo"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Girar</span>
          </button>

          {/* SVG Body Map */}
          <svg
            viewBox="0 0 300 450"
            className="w-full max-w-[220px] h-[320px] drop-shadow-xl select-none"
          >
            <defs>
              <filter id="glow-selected" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Body Silhouette Outline */}
            <path
              d="M 150 35 C 138 35 130 45 130 60 C 130 75 140 85 150 85 C 160 85 170 75 170 60 C 170 45 162 35 150 35 Z
                 M 135 90 C 120 100 95 110 80 140 C 70 160 60 210 55 260 C 53 275 65 280 72 270 C 80 250 88 200 95 175 L 95 240 C 95 290 105 350 115 420 C 118 435 132 435 135 420 L 145 310 L 155 310 L 165 420 C 168 435 182 435 185 420 C 195 350 205 290 205 240 L 205 175 C 212 200 220 250 228 270 C 235 280 247 275 245 260 C 240 210 230 160 220 140 C 205 110 180 100 165 90 Z"
              className="fill-slate-900 stroke-slate-800 stroke-[2]"
            />

            {/* Head & Neck */}
            <circle
              cx="150"
              cy="60"
              r="22"
              className="fill-slate-850 stroke-slate-700 stroke-1"
            />
            <path
              d="M 140 82 L 160 82 L 165 98 L 135 98 Z"
              onClick={() => onToggleMuscle("neck")}
              className={`cursor-pointer transition-all ${
                isSelected("neck")
                  ? "fill-brand-500 filter-[url(#glow-selected)] animate-pulse"
                  : "fill-slate-800 hover:fill-brand-500/50"
              }`}
            />

            {view === "anterior" ? (
              // VISTA ANTERIOR (FRENTE)
              <g className="transition-all duration-300">
                {/* Hombros / Deltoides Frontales */}
                <path
                  d="M 115 102 C 105 105 95 115 90 130 C 95 135 108 130 115 118 Z"
                  onClick={() => onToggleMuscle("shoulders")}
                  className={`cursor-pointer transition-all ${
                    isSelected("shoulders")
                      ? "fill-brand-500 filter-[url(#glow-selected)]"
                      : "fill-slate-800 hover:fill-brand-500/50"
                  }`}
                />
                <path
                  d="M 185 102 C 195 105 205 115 210 130 C 205 135 192 130 185 118 Z"
                  onClick={() => onToggleMuscle("shoulders")}
                  className={`cursor-pointer transition-all ${
                    isSelected("shoulders")
                      ? "fill-brand-500 filter-[url(#glow-selected)]"
                      : "fill-slate-800 hover:fill-brand-500/50"
                  }`}
                />

                {/* Pectorales */}
                <path
                  d="M 125 105 L 148 105 L 148 140 C 130 140 120 128 120 115 Z"
                  onClick={() => onToggleMuscle("chest")}
                  className={`cursor-pointer transition-all ${
                    isSelected("chest")
                      ? "fill-brand-500 filter-[url(#glow-selected)]"
                      : "fill-slate-800 hover:fill-brand-500/50"
                  }`}
                />
                <path
                  d="M 175 105 L 152 105 L 152 140 C 170 140 180 128 180 115 Z"
                  onClick={() => onToggleMuscle("chest")}
                  className={`cursor-pointer transition-all ${
                    isSelected("chest")
                      ? "fill-brand-500 filter-[url(#glow-selected)]"
                      : "fill-slate-800 hover:fill-brand-500/50"
                  }`}
                />

                {/* Abdominales / Core */}
                <path
                  d="M 132 145 L 168 145 L 165 200 L 135 200 Z"
                  onClick={() => onToggleMuscle("abs")}
                  className={`cursor-pointer transition-all ${
                    isSelected("abs")
                      ? "fill-brand-500 filter-[url(#glow-selected)]"
                      : "fill-slate-800 hover:fill-brand-500/50"
                  }`}
                />

                {/* Flexores de Cadera / Psoas */}
                <path
                  d="M 125 205 L 175 205 L 165 235 L 135 235 Z"
                  onClick={() => onToggleMuscle("hips")}
                  className={`cursor-pointer transition-all ${
                    isSelected("hips")
                      ? "fill-brand-500 filter-[url(#glow-selected)]"
                      : "fill-slate-800 hover:fill-brand-500/50"
                  }`}
                />

                {/* Muñecas / Antebrazos */}
                <rect
                  x="65"
                  y="225"
                  width="16"
                  height="35"
                  rx="6"
                  onClick={() => onToggleMuscle("wrists")}
                  className={`cursor-pointer transition-all ${
                    isSelected("wrists")
                      ? "fill-brand-500 filter-[url(#glow-selected)]"
                      : "fill-slate-800 hover:fill-brand-500/50"
                  }`}
                />
                <rect
                  x="219"
                  y="225"
                  width="16"
                  height="35"
                  rx="6"
                  onClick={() => onToggleMuscle("wrists")}
                  className={`cursor-pointer transition-all ${
                    isSelected("wrists")
                      ? "fill-brand-500 filter-[url(#glow-selected)]"
                      : "fill-slate-800 hover:fill-brand-500/50"
                  }`}
                />

                {/* Cuádriceps */}
                <path
                  d="M 120 240 L 145 240 L 140 310 L 122 310 Z"
                  className="fill-slate-800 hover:fill-brand-500/30 cursor-pointer"
                />
                <path
                  d="M 180 240 L 155 240 L 160 310 L 178 310 Z"
                  className="fill-slate-800 hover:fill-brand-500/30 cursor-pointer"
                />
              </g>
            ) : (
              // VISTA POSTERIOR (ESPALDA)
              <g className="transition-all duration-300">
                {/* Trapecio Medio & Romboides (Espalda Alta) */}
                <path
                  d="M 130 95 L 170 95 L 165 140 L 150 155 L 135 140 Z"
                  onClick={() => onToggleMuscle("upper_back")}
                  className={`cursor-pointer transition-all ${
                    isSelected("upper_back")
                      ? "fill-brand-500 filter-[url(#glow-selected)]"
                      : "fill-slate-800 hover:fill-brand-500/50"
                  }`}
                />

                {/* Zona Lumbar & Erectores */}
                <path
                  d="M 135 158 L 165 158 L 162 205 L 138 205 Z"
                  onClick={() => onToggleMuscle("lower_back")}
                  className={`cursor-pointer transition-all ${
                    isSelected("lower_back")
                      ? "fill-brand-500 filter-[url(#glow-selected)]"
                      : "fill-slate-800 hover:fill-brand-500/50"
                  }`}
                />

                {/* Glúteos */}
                <path
                  d="M 122 210 L 178 210 L 175 255 C 160 262 140 262 125 255 Z"
                  onClick={() => onToggleMuscle("glutes")}
                  className={`cursor-pointer transition-all ${
                    isSelected("glutes")
                      ? "fill-brand-500 filter-[url(#glow-selected)]"
                      : "fill-slate-800 hover:fill-brand-500/50"
                  }`}
                />

                {/* Isquiosurales */}
                <path
                  d="M 120 260 L 145 260 L 140 320 L 122 320 Z"
                  onClick={() => onToggleMuscle("hamstrings")}
                  className={`cursor-pointer transition-all ${
                    isSelected("hamstrings")
                      ? "fill-brand-500 filter-[url(#glow-selected)]"
                      : "fill-slate-800 hover:fill-brand-500/50"
                  }`}
                />
                <path
                  d="M 180 260 L 155 260 L 160 320 L 178 320 Z"
                  onClick={() => onToggleMuscle("hamstrings")}
                  className={`cursor-pointer transition-all ${
                    isSelected("hamstrings")
                      ? "fill-brand-500 filter-[url(#glow-selected)]"
                      : "fill-slate-800 hover:fill-brand-500/50"
                  }`}
                />

                {/* Gemelos / Pantorrillas */}
                <path
                  d="M 118 335 C 114 360 118 395 125 410 L 135 410 L 138 335 Z"
                  onClick={() => onToggleMuscle("calves")}
                  className={`cursor-pointer transition-all ${
                    isSelected("calves")
                      ? "fill-brand-500 filter-[url(#glow-selected)]"
                      : "fill-slate-800 hover:fill-brand-500/50"
                  }`}
                />
                <path
                  d="M 182 335 C 186 360 182 395 175 410 L 165 410 L 162 335 Z"
                  onClick={() => onToggleMuscle("calves")}
                  className={`cursor-pointer transition-all ${
                    isSelected("calves")
                      ? "fill-brand-500 filter-[url(#glow-selected)]"
                      : "fill-slate-800 hover:fill-brand-500/50"
                  }`}
                />
              </g>
            )}
          </svg>

          <span className="text-[11px] text-slate-400 mt-2 font-mono">
            Vista: <strong className="text-white capitalize">{view}</strong> (Haz clic en los músculos)
          </span>
        </div>

        {/* Right Column: Interactive Muscle Cards & Filter Chips */}
        <div className="md:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Músculos Clave ({visibleMuscles.length})
            </span>
            {selectedMuscleIds.length > 0 && (
              <button
                onClick={onClearMuscles}
                className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 underline transition-colors"
              >
                Limpiar selección ({selectedMuscleIds.length})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {visibleMuscles.map((muscle: MuscleGroup) => {
              const active = isSelected(muscle.id);
              return (
                <button
                  key={muscle.id}
                  onClick={() => onToggleMuscle(muscle.id)}
                  className={`text-left p-3 rounded-xl transition-all border flex flex-col justify-between gap-1.5 ${
                    active
                      ? "bg-brand-950/60 border-brand-400 text-white shadow-md shadow-brand-500/15 ring-1 ring-brand-400"
                      : "bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 w-full">
                    <span className="font-bold text-xs line-clamp-1">{muscle.name}</span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        active ? "bg-brand-500 text-dark-bg font-black" : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {active ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : "+"}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                    {muscle.commonIssues}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
