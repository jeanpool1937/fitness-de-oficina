import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { UserProgress, WorkoutDay } from "../types";
import { PHASES, WORKOUT_PROGRAM } from "../data/workoutProgram";
import {
  storageService,
  getTodayDateString,
} from "../services/storageService";
import { soundService } from "../services/soundService";

// Helper para obtener el día de la semana ISO (1=Lun, 7=Dom)
function getDayOfWeekIso(date: Date = new Date()): number {
  const day = date.getDay(); // 0 is Sunday, 1 is Monday...
  return day === 0 ? 7 : day;
}

export function useWorkoutProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => storageService.loadProgress());
  const [activePhaseId, setActivePhaseId] = useState<number>(1);
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<number>(() => getDayOfWeekIso());
  const [selectedDate, setSelectedDate] = useState<string>(() => getTodayDateString());

  // Sincronizar estado inicial
  useEffect(() => {
    const loaded = storageService.loadProgress();
    setProgress(loaded);
    setActivePhaseId(loaded.activePhase || 1);
    setCurrentWeek(loaded.currentWeek || 1);
  }, []);

  // Encontrar el entrenamiento actual seleccionado
  const currentWorkout: WorkoutDay = WORKOUT_PROGRAM.find(
    (w) => w.weekNumber === currentWeek && w.dayOfWeek === selectedDayOfWeek
  ) || WORKOUT_PROGRAM[0];

  // Comprobar si el día o workout actual está completado
  const isWorkoutCompleted = Boolean(progress.completedSessions[selectedDate]);

  // Lanzar efecto de confeti
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ["#22c55e", "#4ade80", "#f59e0b", "#38bdf8", "#ec4899"],
      disableForReducedMotion: true
    });

    // Pequeño burst secundario
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#22c55e", "#10b981", "#fbbf24"]
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#22c55e", "#10b981", "#fbbf24"]
      });
    }, 250);
  }, []);

  // Toggle de completar la sesión actual
  const toggleCompleteCurrent = useCallback(async () => {
    const wasCompleted = Boolean(progress.completedSessions[selectedDate]);
    
    if (!wasCompleted) {
      if (progress.soundEnabled) {
        soundService.playVictory();
      }
      triggerConfetti();
      // Vibración háptica en móviles si está soportado
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([100, 50, 150]);
      }
    }

    const updated = await storageService.toggleSession(
      currentWorkout.id,
      selectedDate,
      currentWorkout.durationMinutes,
      currentWorkout.trainer
    );
    setProgress(updated);
  }, [progress, selectedDate, currentWorkout, triggerConfetti]);

  // Cambiar de fase
  const setPhase = useCallback((phaseId: number) => {
    setActivePhaseId(phaseId);
    const phase = PHASES.find((p) => p.id === phaseId);
    if (phase) {
      // Ajustar semana a la primera de esa fase si la semana actual está fuera
      if (currentWeek < phase.startWeek || currentWeek > phase.endWeek) {
        setCurrentWeek(phase.startWeek);
      }
    }
  }, [currentWeek]);

  // Cambiar semana seleccionada
  const setWeek = useCallback((week: number) => {
    setCurrentWeek(week);
    if (week >= 1 && week <= 3) setActivePhaseId(1);
    else if (week >= 4 && week <= 8) setActivePhaseId(2);
    else if (week >= 9 && week <= 12) setActivePhaseId(3);
  }, []);

  // Cambiar día seleccionado
  const setDay = useCallback((dayOfWeek: number) => {
    setSelectedDayOfWeek(dayOfWeek);
  }, []);

  // Seleccionar fecha del calendario (Heatmap)
  const selectCalendarDate = useCallback((dateStr: string) => {
    setSelectedDate(dateStr);
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    const isoDay = getDayOfWeekIso(date);
    setSelectedDayOfWeek(isoDay);
  }, []);

  // Actualizar configuraciones
  const updateSettings = useCallback(async (newSettings: Partial<UserProgress>) => {
    const updated = {
      ...progress,
      ...newSettings
    };
    await storageService.saveProgress(updated);
    setProgress(updated);
  }, [progress]);

  // Cálculo de estadísticas de la fase activa
  const activePhaseObj = PHASES.find((p) => p.id === activePhaseId) || PHASES[0];
  const totalDaysInPhase = (activePhaseObj.endWeek - activePhaseObj.startWeek + 1) * 7;
  
  // Contar cuántos entrenamientos de las semanas de esta fase han sido completados
  const completedInActivePhase = Object.values(progress.completedSessions).filter((session) => {
    const workout = WORKOUT_PROGRAM.find((w) => w.id === session.workoutId);
    return workout && workout.phaseId === activePhaseId;
  }).length;

  const phaseProgressPercentage = Math.min(
    100,
    Math.round((completedInActivePhase / totalDaysInPhase) * 100)
  );

  const totalProgramProgressPercentage = Math.min(
    100,
    Math.round((Object.keys(progress.completedSessions).length / 84) * 100)
  );

  return {
    progress,
    currentWorkout,
    activePhaseId,
    activePhaseObj,
    currentWeek,
    selectedDayOfWeek,
    selectedDate,
    isWorkoutCompleted,
    phaseProgressPercentage,
    totalProgramProgressPercentage,
    completedInActivePhase,
    totalDaysInPhase,
    toggleCompleteCurrent,
    setPhase,
    setWeek,
    setDay,
    selectCalendarDate,
    updateSettings,
    triggerConfetti,
    reloadProgress: () => setProgress(storageService.loadProgress())
  };
}
