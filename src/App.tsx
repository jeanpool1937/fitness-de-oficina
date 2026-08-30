import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { MorningModule } from "./components/MorningModule";
import { PhaseSelector } from "./components/PhaseSelector";
import { WeekDaySelector } from "./components/WeekDaySelector";
import { YouTubeEmbed } from "./components/YouTubeEmbed";
import { WorkoutCard } from "./components/WorkoutCard";
import { SessionTimer } from "./components/SessionTimer";
import { HabitChecklist } from "./components/HabitChecklist";
import { HeatmapCalendar } from "./components/HeatmapCalendar";
import { StatsPanel } from "./components/StatsPanel";
import { SettingsModal } from "./components/SettingsModal";
import { InstallPwaBanner } from "./components/InstallPwaBanner";
import { MuscleMap } from "./components/workoutCool/MuscleMap";
import { ExerciseBrowser } from "./components/workoutCool/ExerciseBrowser";
import { CustomRoutinePlayer } from "./components/workoutCool/CustomRoutinePlayer";
import { OfficeBreakTimer } from "./components/OfficeBreakTimer";
import { ExerciseItem, WORKOUT_COOL_EXERCISES } from "./data/workoutCoolDatabase";
import { useWorkoutProgress } from "./hooks/useWorkoutProgress";
import { useMorningAlarm } from "./hooks/useMorningAlarm";
import { getTodayDateString } from "./services/storageService";
import { Calendar, Activity, Coffee, BarChart3 } from "lucide-react";

type MainTab = "routine" | "workoutCool" | "breaks" | "stats";

export const App: React.FC = () => {
  const {
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
    toggleCompleteCurrent,
    setPhase,
    setWeek,
    setDay,
    selectCalendarDate,
    updateSettings,
    reloadProgress,
  } = useWorkoutProgress();

  const [activeTab, setActiveTab] = useState<MainTab>("routine");
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [selectedMuscleIds, setSelectedMuscleIds] = useState<string[]>([]);
  const [activeCustomRoutine, setActiveCustomRoutine] = useState<ExerciseItem[] | null>(null);

  const {
    hasNotificationPermission,
    requestNotifications,
  } = useMorningAlarm("06:00", progress.soundEnabled);

  // Map of completed workout IDs
  const completedWorkoutIds: Record<string, boolean> = {};
  Object.values(progress.completedSessions).forEach((s) => {
    completedWorkoutIds[s.workoutId] = true;
  });

  const isTodayDone = Boolean(progress.completedSessions[getTodayDateString()]);

  const handleToggleMuscle = (muscleId: string) => {
    if (selectedMuscleIds.includes(muscleId)) {
      setSelectedMuscleIds(selectedMuscleIds.filter((id) => id !== muscleId));
    } else {
      setSelectedMuscleIds([...selectedMuscleIds, muscleId]);
    }
  };

  const handleLaunchQuickStretch = () => {
    const quickExercises = WORKOUT_COOL_EXERCISES.slice(0, 3);
    setActiveCustomRoutine(quickExercises);
  };

  const handleFinishCustomRoutine = async () => {
    await toggleCompleteCurrent();
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-brand-500 selection:text-dark-bg">
      {/* 1. Header / Navbar */}
      <Navbar
        currentStreak={progress.currentStreak}
        soundEnabled={progress.soundEnabled}
        onToggleSound={() => updateSettings({ soundEnabled: !progress.soundEnabled })}
        onOpenSettings={() => setShowSettings(true)}
        hasNotificationPermission={hasNotificationPermission}
        onRequestNotifications={requestNotifications}
      />

      {/* 2. Main Tab Navigation Bar */}
      <div className="w-full bg-slate-950/70 border-b border-slate-800/80 sticky top-[61px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none no-scrollbar">
          <button
            onClick={() => setActiveTab("routine")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "routine"
                ? "bg-brand-500 text-dark-bg shadow-md shadow-brand-500/25 scale-[1.02]"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Rutina 6:00 AM (12 Semanas)</span>
          </button>

          <button
            onClick={() => setActiveTab("workoutCool")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "workoutCool"
                ? "bg-brand-500 text-dark-bg shadow-md shadow-brand-500/25 scale-[1.02]"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Mapa Muscular & Ejercicios (Workout.cool)</span>
          </button>

          <button
            onClick={() => setActiveTab("breaks")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "breaks"
                ? "bg-brand-500 text-dark-bg shadow-md shadow-brand-500/25 scale-[1.02]"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>Pausas Activas (50/5 Oficina)</span>
          </button>

          <button
            onClick={() => setActiveTab("stats")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "stats"
                ? "bg-brand-500 text-dark-bg shadow-md shadow-brand-500/25 scale-[1.02]"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Estadísticas & Heatmap</span>
          </button>
        </div>
      </div>

      {/* 3. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 py-5 space-y-6 pb-24">
        {/* Morning Objective Module (Siempre visible como ancla matutina) */}
        <MorningModule
          soundEnabled={progress.soundEnabled}
          onStartSessionTimer={() => setShowTimer(true)}
          isTodayDone={isTodayDone}
        />

        {/* TAB 1: Rutina 6:00 AM (12 Semanas con Videos Oficiales) */}
        {activeTab === "routine" && (
          <div className="space-y-6 animate-sunrise">
            {/* Phase Navigation */}
            <PhaseSelector
              activePhaseId={activePhaseId}
              onSelectPhase={setPhase}
              progressPercentage={phaseProgressPercentage}
            />

            {/* Week & Day Selector */}
            <WeekDaySelector
              activePhase={activePhaseObj}
              currentWeek={currentWeek}
              selectedDayOfWeek={selectedDayOfWeek}
              onSelectWeek={setWeek}
              onSelectDay={setDay}
              completedWorkoutIds={completedWorkoutIds}
            />

            {/* Floating / Active Session Countdown Timer */}
            {showTimer && (
              <div className="animate-sunrise">
                <SessionTimer
                  initialMinutes={15}
                  soundEnabled={progress.soundEnabled}
                  onClose={() => setShowTimer(false)}
                  onSessionFinished={() => {
                    if (!isWorkoutCompleted) {
                      toggleCompleteCurrent();
                    }
                  }}
                  isFloating={true}
                />
              </div>
            )}

            {/* Main Video & Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (YouTube Player + Workout Card) */}
              <div className="lg:col-span-7 space-y-5">
                <YouTubeEmbed
                  videoId={currentWorkout.youtubeId}
                  title={currentWorkout.title}
                  trainer={currentWorkout.trainer}
                />
                <WorkoutCard
                  workout={currentWorkout}
                  isCompleted={isWorkoutCompleted}
                  onToggleComplete={toggleCompleteCurrent}
                  onOpenTimer={() => setShowTimer(true)}
                />
              </div>

              {/* Right Column (Habits Checklist & Monthly Heatmap) */}
              <div className="lg:col-span-5 space-y-5">
                <HabitChecklist
                  isCompleted={isWorkoutCompleted}
                  selectedDate={selectedDate}
                  onToggleComplete={toggleCompleteCurrent}
                  currentStreak={progress.currentStreak}
                />
                <HeatmapCalendar
                  completedDates={progress.completedDateList}
                  selectedDate={selectedDate}
                  onSelectDate={selectCalendarDate}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Workout-Cool (Interactive Muscle Map & Custom Routine Builder) */}
        {activeTab === "workoutCool" && (
          <div className="space-y-6 animate-sunrise">
            {/* Interactive SVG Muscle Map */}
            <MuscleMap
              selectedMuscleIds={selectedMuscleIds}
              onToggleMuscle={handleToggleMuscle}
              onClearMuscles={() => setSelectedMuscleIds([])}
            />

            {/* Exercise Browser & Custom Stacking */}
            <ExerciseBrowser
              selectedMuscleIds={selectedMuscleIds}
              onStartCustomRoutine={(routine) => setActiveCustomRoutine(routine)}
              onLaunchSingleExercise={(ex) => setActiveCustomRoutine([ex])}
            />
          </div>
        )}

        {/* TAB 3: Pausas Activas & Pomodoro 50/5 */}
        {activeTab === "breaks" && (
          <div className="space-y-6 animate-sunrise">
            <OfficeBreakTimer
              soundEnabled={progress.soundEnabled}
              onLaunchQuickStretch={handleLaunchQuickStretch}
            />
            {/* Direct preview of micro-mobility exercises */}
            <ExerciseBrowser
              selectedMuscleIds={[]}
              onStartCustomRoutine={(routine) => setActiveCustomRoutine(routine)}
              onLaunchSingleExercise={(ex) => setActiveCustomRoutine([ex])}
            />
          </div>
        )}

        {/* TAB 4: Estadísticas, Heatmap y Reporte */}
        {activeTab === "stats" && (
          <div className="space-y-6 animate-sunrise">
            <StatsPanel
              progress={progress}
              phaseProgressPercentage={phaseProgressPercentage}
              totalProgramProgressPercentage={totalProgramProgressPercentage}
              activePhaseName={activePhaseObj.name}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HeatmapCalendar
                completedDates={progress.completedDateList}
                selectedDate={selectedDate}
                onSelectDate={selectCalendarDate}
              />
              <HabitChecklist
                isCompleted={isWorkoutCompleted}
                selectedDate={selectedDate}
                onToggleComplete={toggleCompleteCurrent}
                currentStreak={progress.currentStreak}
              />
            </div>
          </div>
        )}
      </main>

      {/* Live Custom Routine Player Modal */}
      {activeCustomRoutine && (
        <CustomRoutinePlayer
          exercises={activeCustomRoutine}
          soundEnabled={progress.soundEnabled}
          onClose={() => setActiveCustomRoutine(null)}
          onFinishRoutine={() => {
            handleFinishCustomRoutine();
            setActiveCustomRoutine(null);
          }}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        progress={progress}
        onUpdateProgress={updateSettings}
        onReload={reloadProgress}
      />

      {/* PWA Installation Guide Banner */}
      <InstallPwaBanner />
    </div>
  );
};

export default App;
