export type WorkoutCategory = 
  | "cardio"
  | "movilidad"
  | "fuerza"
  | "completa"
  | "circuito"
  | "recuperacion";

export interface TrainerInfo {
  name: string;
  avatar: string;
  role: string;
  channel: string;
}

export interface WorkoutDay {
  id: string; // e.g. "w1-d1"
  weekNumber: number; // 1 - 12
  dayOfWeek: number; // 1: Lunes, 2: Martes, ..., 7: Domingo
  dayName: string;
  dayShort: string;
  phaseId: number; // 1, 2 or 3
  title: string;
  posturalFocus: string;
  durationMinutes: number;
  trainer: string;
  trainerRole?: string;
  youtubeId: string;
  category: WorkoutCategory;
  executionNotes: string[];
  ergonomicTip: string;
  intensity: "Baja" | "Media" | "Media-Alta" | "Alta";
  targetMuscles: string[];
}

export interface Phase {
  id: number;
  name: string;
  weeksLabel: string;
  startWeek: number;
  endWeek: number;
  badge: string;
  goal: string;
  description: string;
  accentColor: string;
}

export interface CompletedSessionRecord {
  workoutId: string;
  dateStr: string; // YYYY-MM-DD
  completedAt: string; // ISO string
  durationMinutes: number;
  trainer: string;
  notes?: string;
}

export interface UserProgress {
  completedSessions: Record<string, CompletedSessionRecord>; // key: YYYY-MM-DD or workoutId
  completedDateList: string[]; // List of YYYY-MM-DD
  currentStreak: number;
  bestStreak: number;
  totalMinutes: number;
  lastCompletedDate: string | null;
  reminderEnabled: boolean;
  reminderTime: string; // "06:00"
  soundEnabled: boolean;
  activePhase: number;
  currentWeek: number;
  selectedDate: string; // YYYY-MM-DD
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConfigured: boolean;
}
