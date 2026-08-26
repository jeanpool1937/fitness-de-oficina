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
import { useWorkoutProgress } from "./hooks/useWorkoutProgress";
import { useMorningAlarm } from "./hooks/useMorningAlarm";
import { getTodayDateString } from "./services/storageService";

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

  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showTimer, setShowTimer] = useState<boolean>(false);

  const {
    hasNotificationPermission,
    requestNotifications,
  } = useMorningAlarm("06:00", progress.soundEnabled);

  // Map of completed workout IDs for quick indicators in week/day selector
  const completedWorkoutIds: Record<string, boolean> = {};
  Object.values(progress.completedSessions).forEach((s) => {
    completedWorkoutIds[s.workoutId] = true;
  });

  const isTodayDone = Boolean(progress.completedSessions[getTodayDateString()]);

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

      {/* 2. Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 py-4 sm:py-6 space-y-6 pb-24">
        {/* Module 6:00 AM & Reminders */}
        <MorningModule
          soundEnabled={progress.soundEnabled}
          onStartSessionTimer={() => setShowTimer(true)}
          isTodayDone={isTodayDone}
        />

        {/* Phase Navigation (Fase 1: Semanas 1-3 | Fase 2: Semanas 4-8 | Fase 3: Semanas 9-12) */}
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

        {/* Main Workout & Action Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Video Player + Routine Card) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Embedded YouTube Player */}
            <YouTubeEmbed
              videoId={currentWorkout.youtubeId}
              title={currentWorkout.title}
              trainer={currentWorkout.trainer}
            />

            {/* Daily Routine Detail Card */}
            <WorkoutCard
              workout={currentWorkout}
              isCompleted={isWorkoutCompleted}
              onToggleComplete={toggleCompleteCurrent}
              onOpenTimer={() => setShowTimer(true)}
            />
          </div>

          {/* Right Column (Checklist, Habit Controls & Monthly Heatmap) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Habit Completion Card */}
            <HabitChecklist
              isCompleted={isWorkoutCompleted}
              selectedDate={selectedDate}
              onToggleComplete={toggleCompleteCurrent}
              currentStreak={progress.currentStreak}
            />

            {/* Monthly Heatmap Activity Calendar */}
            <HeatmapCalendar
              completedDates={progress.completedDateList}
              selectedDate={selectedDate}
              onSelectDate={selectCalendarDate}
            />
          </div>
        </div>

        {/* Bottom Section: Comprehensive Statistics Panel */}
        <div className="pt-2">
          <StatsPanel
            progress={progress}
            phaseProgressPercentage={phaseProgressPercentage}
            totalProgramProgressPercentage={totalProgramProgressPercentage}
            activePhaseName={activePhaseObj.name}
          />
        </div>
      </main>

      {/* Modals & Banners */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        progress={progress}
        onUpdateProgress={updateSettings}
        onReload={reloadProgress}
      />

      <InstallPwaBanner />
    </div>
  );
};

export default App;
