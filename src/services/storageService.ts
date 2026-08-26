import { CompletedSessionRecord, UserProgress } from "../types";
import { getSupabaseClient } from "./supabaseClient";

const STORAGE_KEY = "fitness_oficina_user_progress_v1";

// Obtener fecha local en formato YYYY-MM-DD
export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Formateador de fechas según reglas del proyecto: ddd dd/mm/yy (ej: Lun 06/07/26)
export function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const date = new Date(year, month, day);
  const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const dayName = days[date.getDay()];

  const dd = String(day).padStart(2, "0");
  const mm = String(month + 1).padStart(2, "0");
  const yy = String(year).slice(-2);

  return `${dayName} ${dd}/${mm}/${yy}`;
}

export function getDefaultUserProgress(): UserProgress {
  const today = getTodayDateString();
  return {
    completedSessions: {},
    completedDateList: [],
    currentStreak: 0,
    bestStreak: 0,
    totalMinutes: 0,
    lastCompletedDate: null,
    reminderEnabled: true,
    reminderTime: "06:00",
    soundEnabled: true,
    activePhase: 1,
    currentWeek: 1,
    selectedDate: today,
  };
}

// Calcular racha continua de días
export function calculateStreaks(completedDates: string[]): { currentStreak: number; bestStreak: number } {
  if (!completedDates || completedDates.length === 0) {
    return { currentStreak: 0, bestStreak: 0 };
  }

  // Ordenar fechas únicas de más antigua a más reciente
  const uniqueSortedDates = Array.from(new Set(completedDates)).sort();
  
  let maxStreak = 0;
  let runningStreak = 0;
  let prevDate: Date | null = null;

  for (const dateStr of uniqueSortedDates) {
    const [y, m, d] = dateStr.split("-").map(Number);
    const currentDate = new Date(y, m - 1, d);

    if (!prevDate) {
      runningStreak = 1;
    } else {
      const diffTime = currentDate.getTime() - prevDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

      if (diffDays === 1) {
        runningStreak += 1;
      } else if (diffDays > 1) {
        runningStreak = 1;
      }
    }
    if (runningStreak > maxStreak) {
      maxStreak = runningStreak;
    }
    prevDate = currentDate;
  }

  // Comprobar si la racha actual está viva (hoy o ayer)
  const todayStr = getTodayDateString();
  const [ty, tm, td] = todayStr.split("-").map(Number);
  const today = new Date(ty, tm - 1, td);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yMonth = String(yesterday.getMonth() + 1).padStart(2, "0");
  const yDay = String(yesterday.getDate()).padStart(2, "0");
  const yesterdayStr = `${yesterday.getFullYear()}-${yMonth}-${yDay}`;

  const lastDate = uniqueSortedDates[uniqueSortedDates.length - 1];
  let currentStreak = 0;

  if (lastDate === todayStr || lastDate === yesterdayStr) {
    // Contar hacia atrás desde la última fecha continua
    currentStreak = 1;
    for (let i = uniqueSortedDates.length - 1; i > 0; i--) {
      const [y2, m2, d2] = uniqueSortedDates[i].split("-").map(Number);
      const [y1, m1, d1] = uniqueSortedDates[i - 1].split("-").map(Number);
      const date2 = new Date(y2, m2 - 1, d2);
      const date1 = new Date(y1, m1 - 1, d1);
      const diff = Math.round((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
      if (diff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  return {
    currentStreak,
    bestStreak: Math.max(maxStreak, currentStreak)
  };
}

class StorageService {
  public loadProgress(): UserProgress {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Garantizar campos por defecto si faltan
        const defaults = getDefaultUserProgress();
        return { ...defaults, ...parsed };
      }
    } catch (e) {
      console.error("Error al cargar progreso local:", e);
    }
    return getDefaultUserProgress();
  }

  public async saveProgress(progress: UserProgress): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error("Error al guardar progreso local:", e);
    }

    // Intentar sincronizar en la nube con Supabase si está disponible
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id || "local-device-user";

        await supabase.from("fitness_user_progress").upsert({
          id: userId,
          progress_data: progress,
          updated_at: new Date().toISOString()
        });
      } catch (err) {
        console.log("Supabase sync en segundo plano omitido (modo offline o tabla no creada).");
      }
    }
  }

  // Toggle de sesión completada
  public async toggleSession(
    workoutId: string,
    dateStr: string,
    durationMinutes: number,
    trainer: string
  ): Promise<UserProgress> {
    const current = this.loadProgress();
    const sessions = { ...current.completedSessions };
    const dateKey = dateStr;

    if (sessions[dateKey] && sessions[dateKey].workoutId === workoutId) {
      // Desmarcar sesión
      delete sessions[dateKey];
    } else {
      // Marcar sesión
      const record: CompletedSessionRecord = {
        workoutId,
        dateStr,
        completedAt: new Date().toISOString(),
        durationMinutes: durationMinutes || 15,
        trainer
      };
      sessions[dateKey] = record;
    }

    const completedDateList = Object.keys(sessions);
    const totalMinutes = Object.values(sessions).reduce((acc, curr) => acc + (curr.durationMinutes || 15), 0);
    const { currentStreak, bestStreak } = calculateStreaks(completedDateList);

    const updated: UserProgress = {
      ...current,
      completedSessions: sessions,
      completedDateList,
      totalMinutes,
      currentStreak,
      bestStreak: Math.max(current.bestStreak, bestStreak),
      lastCompletedDate: completedDateList.length > 0 ? completedDateList.sort()[completedDateList.length - 1] : null
    };

    await this.saveProgress(updated);
    return updated;
  }

  // Exportar backup JSON
  public exportData(): string {
    const data = this.loadProgress();
    return JSON.stringify(data, null, 2);
  }

  // Importar backup JSON
  public async importData(jsonString: string): Promise<UserProgress | null> {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed === "object" && parsed !== null) {
        const validated: UserProgress = {
          ...getDefaultUserProgress(),
          ...parsed
        };
        await this.saveProgress(validated);
        return validated;
      }
    } catch (e) {
      console.error("Error importando datos:", e);
    }
    return null;
  }
}

export const storageService = new StorageService();
