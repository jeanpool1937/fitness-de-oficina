import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Check } from "lucide-react";
import { getTodayDateString } from "../services/storageService";

interface HeatmapCalendarProps {
  completedDates: string[]; // List of "YYYY-MM-DD"
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
}

export const HeatmapCalendar: React.FC<HeatmapCalendarProps> = ({
  completedDates,
  selectedDate,
  onSelectDate,
}) => {
  const todayStr = getTodayDateString();
  const [viewDate, setViewDate] = useState<Date>(() => {
    const [y, m] = todayStr.split("-").map(Number);
    return new Date(y, m - 1, 1);
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth(); // 0 to 11

  // Nombres de meses en español
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const prevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    const [y, m] = todayStr.split("-").map(Number);
    setViewDate(new Date(y, m - 1, 1));
    onSelectDate(todayStr);
  };

  // Días en el mes actual
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Primer día del mes (0=Dom, 1=Lun, ..., 6=Sáb) -> convertir a 0=Lun, 6=Dom
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;

  // Días del mes anterior para rellenar
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Contar días completados en este mes
  const completedSet = new Set(completedDates);
  const currentMonthStr = `${year}-${String(month + 1).padStart(2, "0")}`;
  const completedInThisMonth = completedDates.filter((d) => d.startsWith(currentMonthStr)).length;

  const DAYS_HEADER = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 space-y-3">
      {/* Header & Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-500/20 text-brand-400">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white capitalize">
              {monthNames[month]} {year}
            </h3>
            <p className="text-[11px] text-slate-400">
              {completedInThisMonth} {completedInThisMonth === 1 ? "día activo" : "días activos"} este mes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={goToToday}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            Hoy
          </button>
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Mes anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Mes siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Columns Header */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-800">
        {DAYS_HEADER.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {/* Leading empty days from previous month */}
        {Array.from({ length: firstDayIndex }).map((_, i) => {
          const dayNum = daysInPrevMonth - firstDayIndex + i + 1;
          return (
            <div
              key={`prev-${i}`}
              className="h-9 sm:h-11 rounded-xl flex items-center justify-center text-xs text-slate-600 bg-slate-900/20 pointer-events-none select-none"
            >
              {dayNum}
            </div>
          );
        })}

        {/* Days of current month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
          const isDone = completedSet.has(dateStr);
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDate;

          return (
            <button
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              className={`relative h-9 sm:h-11 rounded-xl flex flex-col items-center justify-center text-xs font-semibold transition-all border ${
                isSelected
                  ? "ring-2 ring-brand-400 border-transparent z-10 scale-105"
                  : ""
              } ${
                isDone
                  ? "bg-brand-500 text-dark-bg font-extrabold shadow-sm shadow-brand-500/30 border-brand-400"
                  : isToday
                  ? "bg-slate-800 text-amber-300 font-bold border-amber-500/50"
                  : "bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 border-slate-800/80"
              }`}
            >
              <span>{dayNum}</span>

              {/* Status indicator dot or check */}
              {isDone ? (
                <Check className="w-2.5 h-2.5 stroke-[3] text-dark-bg" />
              ) : isToday ? (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Heatmap Legend */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-brand-500 border border-brand-400 shadow-sm shadow-brand-500/30" />
          <span>Día Completado</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-slate-800 border border-amber-500/50" />
          <span>Hoy</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-slate-900 border border-slate-800" />
          <span>Pendiente</span>
        </div>
      </div>
    </div>
  );
};
