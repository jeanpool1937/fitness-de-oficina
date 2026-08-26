import React from "react";
import { Flame, Clock, Trophy, Target, TrendingUp } from "lucide-react";
import { UserProgress } from "../types";
import { getTodayDateString } from "../services/storageService";

interface StatsPanelProps {
  progress: UserProgress;
  phaseProgressPercentage: number;
  totalProgramProgressPercentage: number;
  activePhaseName: string;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({
  progress,
  phaseProgressPercentage,
  totalProgramProgressPercentage,
  activePhaseName,
}) => {
  const todayStr = getTodayDateString();

  // Generar los últimos 7 días para el gráfico con formato de fechas de 2 líneas según reglas:
  // Línea superior: número de día o DD/MM (ej: 26/08)
  // Línea inferior: nombre abreviado del día (ej: mié)
  const last7Days = [];
  const daysShort = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dayNum = String(d.getDate()).padStart(2, "0");
    const dateStr = `${y}-${m}-${dayNum}`;
    const dayName = daysShort[d.getDay()];

    const isDone = Boolean(progress.completedSessions[dateStr]);
    const minutes = isDone ? (progress.completedSessions[dateStr]?.durationMinutes || 15) : 0;

    last7Days.push({
      dateStr,
      dayTop: `${dayNum}/${m}`,
      dayBottom: dayName,
      isDone,
      minutes,
      isToday: dateStr === todayStr
    });
  }

  return (
    <div className="space-y-4">
      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Racha Actual */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-800 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Racha Actual
            </span>
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {progress.currentStreak}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              {progress.currentStreak === 1 ? "día" : "días"}
            </span>
          </div>
          <div className="text-[10px] text-amber-400/90 font-medium mt-1">
            Mejor racha: {progress.bestStreak} días
          </div>
        </div>

        {/* Card 2: Minutos Acumulados */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-800 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Minutos Totales
            </span>
            <div className="p-1.5 rounded-lg bg-brand-500/20 text-brand-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-brand-400 font-mono">
              {progress.totalMinutes}
            </span>
            <span className="text-xs text-slate-400 font-semibold">min</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {Object.keys(progress.completedSessions).length} sesiones completadas
          </div>
        </div>

        {/* Card 3: Avance de Fase */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-800 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Avance de Fase
            </span>
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {phaseProgressPercentage}%
            </span>
          </div>
          <div className="text-[10px] text-blue-400 font-medium mt-1 truncate" title={activePhaseName}>
            {activePhaseName.split(":")[0]}
          </div>
        </div>

        {/* Card 4: Avance Total 12 Semanas */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-800 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Programa Total
            </span>
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {totalProgramProgressPercentage}%
            </span>
            <span className="text-xs text-slate-400 font-semibold">de 84 días</span>
          </div>
          <div className="text-[10px] text-purple-300 font-medium mt-1">
            12 Semanas completas
          </div>
        </div>
      </div>

      {/* Activity Bar Chart (Últimos 7 días con formato de fecha en 2 líneas) */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 space-y-3 border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-brand-500/20 text-brand-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Actividad de los Últimos 7 Días</h3>
              <p className="text-[11px] text-slate-400">Minutos diarios dedicados a la salud postural</p>
            </div>
          </div>
          <span className="text-xs font-mono text-brand-400 font-bold bg-brand-950/40 px-2 py-1 rounded-lg border border-brand-500/30">
            {last7Days.filter((d) => d.isDone).length}/7 Activos
          </span>
        </div>

        {/* Custom Bar Visualizer */}
        <div className="grid grid-cols-7 gap-2 pt-4 pb-1 items-end min-h-[140px]">
          {last7Days.map((day) => {
            const heightPercent = day.isDone ? 100 : 8;

            return (
              <div key={day.dateStr} className="flex flex-col items-center gap-2 group">
                {/* Minute Label on Hover or Active */}
                <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-brand-300 transition-colors">
                  {day.isDone ? `${day.minutes}m` : "0m"}
                </span>

                {/* Vertical Bar Container */}
                <div className="w-full max-w-[36px] h-20 bg-slate-900 rounded-xl overflow-hidden p-1 flex flex-col justify-end border border-slate-800">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-lg transition-all duration-500 ${
                      day.isDone
                        ? "bg-gradient-to-t from-brand-600 to-emerald-400 shadow-md shadow-brand-500/30"
                        : "bg-slate-800"
                    }`}
                  />
                </div>

                {/* Eje X de fecha en dos líneas (REGLA DEL PROYECTO):
                    Línea arriba: número de día / mes (ej. 26/08)
                    Línea abajo: nombre abreviado del día (ej. mié) */}
                <div
                  className={`flex flex-col items-center justify-center text-center ${
                    day.isToday ? "text-amber-300 font-bold" : "text-slate-400"
                  }`}
                >
                  <span className="text-[10px] font-mono leading-none tracking-tight">
                    {day.dayTop}
                  </span>
                  <span className="text-[10px] font-bold lowercase leading-tight mt-0.5">
                    {day.dayBottom}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
