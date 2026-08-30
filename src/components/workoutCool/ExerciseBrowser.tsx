import React, { useState } from "react";
import { ExerciseItem, WORKOUT_COOL_EXERCISES } from "../../data/workoutCoolDatabase";
import {
  Clock,
  Play,
  Check,
  Plus,
  Trash2,
  Sparkles,
  Wind,
  ShieldAlert,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface ExerciseBrowserProps {
  selectedMuscleIds: string[];
  onStartCustomRoutine: (exercises: ExerciseItem[]) => void;
  onLaunchSingleExercise: (exercise: ExerciseItem) => void;
}

export const ExerciseBrowser: React.FC<ExerciseBrowserProps> = ({
  selectedMuscleIds,
  onStartCustomRoutine,
  onLaunchSingleExercise,
}) => {
  const [equipmentFilter, setEquipmentFilter] = useState<string>("all");
  const [focusFilter, setFocusFilter] = useState<string>("all");
  const [customRoutine, setCustomRoutine] = useState<ExerciseItem[]>([]);
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(null);

  // Filtrado reactivo de ejercicios
  const filteredExercises = WORKOUT_COOL_EXERCISES.filter((ex) => {
    // Filtro por músculo seleccionado (si hay seleccionados)
    if (selectedMuscleIds.length > 0 && !selectedMuscleIds.includes(ex.muscleId)) {
      return false;
    }
    // Filtro por equipamiento
    if (equipmentFilter !== "all" && ex.equipment !== equipmentFilter) {
      return false;
    }
    // Filtro por enfoque ergonómico
    if (focusFilter !== "all" && ex.officeFocus !== focusFilter) {
      return false;
    }
    return true;
  });

  const toggleAddToRoutine = (exercise: ExerciseItem) => {
    if (customRoutine.some((item) => item.id === exercise.id)) {
      setCustomRoutine(customRoutine.filter((item) => item.id !== exercise.id));
    } else {
      setCustomRoutine([...customRoutine, exercise]);
    }
  };

  const isExerciseInRoutine = (id: string) => customRoutine.some((item) => item.id === id);

  const totalRoutineMinutes = Math.ceil(
    customRoutine.reduce((acc, curr) => acc + curr.durationSeconds + 15, 0) / 60
  );

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-brand-400" />
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-300">
              Filtros Ergonómicos
            </h4>
          </div>

          <span className="text-xs font-mono text-brand-400 font-bold bg-brand-950/50 px-2.5 py-1 rounded-lg border border-brand-500/30">
            {filteredExercises.length} Ejercicios Disponibles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Equipamiento */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Material Requerido
            </label>
            <select
              value={equipmentFilter}
              onChange={(e) => setEquipmentFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
            >
              <option value="all">Cualquier Equipamiento</option>
              <option value="ninguno">Sin Material (100% Corporal)</option>
              <option value="escritorio">Silla / Escritorio de Oficina</option>
              <option value="banda">Banda Elástica</option>
            </select>
          </div>

          {/* Enfoque de Oficina */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Patología / Enfoque Postural
            </label>
            <select
              value={focusFilter}
              onChange={(e) => setFocusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-brand-500 focus:outline-none"
            >
              <option value="all">Todos los Enfoques</option>
              <option value="Postura & Cifosis">Postura & Cifosis (Hombros Adelantados)</option>
              <option value="Alivio Lumbar">Alivio Lumbar & Espalda Baja</option>
              <option value="Cuello de Texto">Cuello de Texto (Cervicalgia)</option>
              <option value="Amnesia Glútea">Amnesia Glútea & Cadera</option>
              <option value="Túnel Carpiano">Túnel Carpiano & Muñecas</option>
              <option value="Movilidad General">Movilidad y Retorno Venoso</option>
            </select>
          </div>
        </div>
      </div>

      {/* Floating Custom Routine Stacking Tray (If items added) */}
      {customRoutine.length > 0 && (
        <div className="glass-panel-glow rounded-2xl p-4 sm:p-5 border-2 border-brand-500/60 shadow-2xl space-y-3 animate-sunrise">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-brand-500 text-dark-bg font-black text-xs">
                {customRoutine.length}
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">Mi Rutina Personalizada de Oficina</h4>
                <p className="text-[11px] text-slate-300">
                  Duración estimada: ~<strong>{totalRoutineMinutes} min</strong> con descansos activos.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCustomRoutine([])}
                className="p-2 rounded-xl bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-300 transition-colors"
                title="Vaciar rutina"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onStartCustomRoutine(customRoutine)}
                className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-dark-bg font-black text-xs flex items-center gap-2 shadow-lg shadow-brand-500/30 transition-all transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-dark-bg" />
                <span>INICIAR RUTINA GUIADA</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {customRoutine.map((item, idx) => (
              <div
                key={item.id}
                className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-brand-500/40 text-xs font-semibold text-white"
              >
                <span className="text-brand-400 font-mono font-bold">#{idx + 1}</span>
                <span className="truncate max-w-[140px]">{item.title}</span>
                <button
                  onClick={() => toggleAddToRoutine(item)}
                  className="text-slate-500 hover:text-red-400 ml-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid of Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredExercises.map((exercise) => {
          const isAdded = isExerciseInRoutine(exercise.id);
          const isExpanded = expandedExerciseId === exercise.id;

          return (
            <div
              key={exercise.id}
              className={`glass-panel rounded-2xl p-4 sm:p-5 space-y-3 transition-all border ${
                isAdded
                  ? "border-brand-500/60 bg-gradient-to-br from-brand-950/30 to-slate-900/80 shadow-lg shadow-brand-500/10"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
                      {exercise.muscleName}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {exercise.officeFocus}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white leading-snug">
                    {exercise.title}
                  </h4>
                </div>

                <span className="flex-shrink-0 flex items-center gap-1 text-xs font-mono font-bold text-slate-300 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700">
                  <Clock className="w-3 h-3 text-brand-400" />
                  <span>{exercise.durationSeconds}s</span>
                </span>
              </div>

              {/* Collapsible Steps & Technique */}
              <div className="space-y-2">
                <div className="text-xs text-slate-300 leading-relaxed space-y-1.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                  <div className="font-semibold text-slate-200 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-brand-400" />
                    <span>Pasos de Ejecución</span>
                  </div>
                  <ul className="space-y-1 pl-1">
                    {exercise.instructions.slice(0, isExpanded ? undefined : 2).map((step, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                        <span className="text-brand-400 font-bold">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Breathing / Common Mistakes when expanded */}
                  {isExpanded && (
                    <div className="pt-2 border-t border-slate-800/80 space-y-2">
                      <div className="flex items-start gap-1.5 text-[11px] text-teal-300">
                        <Wind className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        <span><strong>Respiración:</strong> {exercise.breathingTip}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-[11px] text-rose-300">
                        <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        <span><strong>Error común:</strong> {exercise.commonMistakes}</span>
                      </div>
                    </div>
                  )}

                  {/* Expand / Collapse Button */}
                  <button
                    onClick={() => setExpandedExerciseId(isExpanded ? null : exercise.id)}
                    className="text-[10px] font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1 pt-1"
                  >
                    {isExpanded ? (
                      <>
                        <span>Ver menos</span>
                        <ChevronUp className="w-3 h-3" />
                      </>
                    ) : (
                      <>
                        <span>Ver técnica completa ({exercise.instructions.length} pasos)</span>
                        <ChevronDown className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
                <button
                  onClick={() => onLaunchSingleExercise(exercise)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Play className="w-3 h-3 text-brand-400 fill-brand-400" />
                  <span>Realizar Ahora ({exercise.durationSeconds}s)</span>
                </button>

                <button
                  onClick={() => toggleAddToRoutine(exercise)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isAdded
                      ? "bg-brand-500 text-dark-bg shadow-sm"
                      : "bg-slate-800/80 hover:bg-brand-500/20 text-slate-300 hover:text-brand-300 border border-slate-700"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>En mi Rutina</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Añadir a Rutina</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
