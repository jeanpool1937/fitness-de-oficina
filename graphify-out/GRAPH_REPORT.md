# Graph Report - lucid-bose  (2026-08-26)

## Corpus Check
- 31 files · ~14,789 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 168 nodes · 265 edges · 15 communities (14 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c1743720`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `UserProgress` - 11 edges
3. `getTodayDateString()` - 10 edges
4. `SoundService` - 9 edges
5. `StorageService` - 8 edges
6. `NotificationService` - 6 edges
7. `getSupabaseConfig()` - 6 edges
8. `🌟 Características Principales` - 6 edges
9. `useMorningAlarm()` - 5 edges
10. `WorkoutDay` - 5 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `useMorningAlarm()`  [EXTRACTED]
  src/App.tsx → src/hooks/useMorningAlarm.ts
- `SettingsModalProps` --references--> `UserProgress`  [EXTRACTED]
  src/components/SettingsModal.tsx → src/types/index.ts
- `StatsPanelProps` --references--> `UserProgress`  [EXTRACTED]
  src/components/StatsPanel.tsx → src/types/index.ts
- `WeekDaySelectorProps` --references--> `Phase`  [EXTRACTED]
  src/components/WeekDaySelector.tsx → src/types/index.ts
- `WorkoutCardProps` --references--> `WorkoutDay`  [EXTRACTED]
  src/components/WorkoutCard.tsx → src/types/index.ts

## Import Cycles
- None detected.

## Communities (15 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (16): PhaseSelector(), PhaseSelectorProps, WeekDaySelector(), WeekDaySelectorProps, WorkoutCard(), WorkoutCardProps, YouTubeEmbed(), YouTubeEmbedProps (+8 more)

### Community 1 - "Community 1"
Cohesion: 0.20
Nodes (12): HabitChecklist(), HabitChecklistProps, HeatmapCalendar(), HeatmapCalendarProps, BeforeInstallPromptEvent, InstallPwaBanner(), StatsPanel(), useWorkoutProgress() (+4 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (18): devDependencies, autoprefixer, postcss, tailwindcss, @types/canvas-confetti, @types/react, @types/react-dom, typescript (+10 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+10 more)

### Community 4 - "Community 4"
Cohesion: 0.23
Nodes (11): Navbar(), NavbarProps, SettingsModal(), clearSupabaseConfig(), getSupabaseClient(), getSupabaseConfig(), saveSupabaseConfig(), testSupabaseConnection() (+3 more)

### Community 5 - "Community 5"
Cohesion: 0.21
Nodes (6): MorningModule(), MorningModuleProps, MorningAlarmState, useMorningAlarm(), NotificationService, NotificationStatus

### Community 6 - "Community 6"
Cohesion: 0.24
Nodes (5): SessionTimer(), SessionTimerProps, TimerOptions, useTimer(), SoundService

### Community 7 - "Community 7"
Cohesion: 0.17
Nodes (11): background_color, categories, description, display, icons, lang, name, orientation (+3 more)

### Community 8 - "Community 8"
Cohesion: 0.17
Nodes (11): 1. 🌅 Módulo 6:00 AM y Recordatorios, 2. 📺 Visor de Rutinas Diarias y Video, 3. ✅ Checklist, Hábitos y Analíticas, 4. ☁️ Sincronización Cross-Device y Fallback Offline, 5. 📱 PWA & Optimización iOS Mobile-First, 🌟 Características Principales, 🚀 Comandos de Terminal, ☁️ Configuración de Supabase (Opcional) (+3 more)

### Community 9 - "Community 9"
Cohesion: 0.38
Nodes (5): SettingsModalProps, StatsPanelProps, getDefaultUserProgress(), StorageService, UserProgress

### Community 10 - "Community 10"
Cohesion: 0.25
Nodes (8): dependencies, canvas-confetti, clsx, lucide-react, react, react-dom, @supabase/supabase-js, tailwind-merge

## Knowledge Gaps
- **73 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+68 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SoundService` connect `Community 6` to `Community 0`, `Community 5`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `UserProgress` connect `Community 9` to `Community 0`, `Community 1`, `Community 4`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _73 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12648221343873517 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._