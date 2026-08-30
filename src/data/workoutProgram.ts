import { Phase, TrainerInfo, WorkoutDay } from "../types";

export const TRAINERS: Record<string, TrainerInfo> = {
  "Sergio Peinado": {
    name: "Sergio Peinado",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100",
    role: "Licenciado en Ciencias de la Actividad Física y del Deporte",
    channel: "Entrena con Sergio Peinado"
  },
  "María Martínez (Siéntete Joven)": {
    name: "María Martínez (Siéntete Joven)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    role: "Especialista en Cardio Bajo Impacto y Salud Postural",
    channel: "Siéntete Joven"
  },
  "Chuy Almada": {
    name: "Chuy Almada",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    role: "Entrenador de Fuerza Funcional, Boxeo y Condición Física",
    channel: "Chuy Almada"
  }
};

// Colección de videos 100% REALES de EJERCICIOS Y ENTRENAMIENTOS (Cero Yoga)
export const CURATED_WORKOUT_VIDEOS = {
  // 1. MOVILIDAD ARTICULAR, ESTIRAMIENTO Y CALENTAMIENTO (SERGIO PEINADO)
  SP_ESTIRAR_MOVILIDAD: {
    id: "Pnbwyxh4LJs",
    title: "Ejercicios para Estirar y Aumentar tu Movilidad",
    trainer: "Sergio Peinado",
    category: "movilidad" as const,
    durationMinutes: 15
  },
  SP_GANAR_FLEXIBILIDAD: {
    id: "ZqbWXx3xcuY",
    title: "Estiramientos para Ganar Flexibilidad Muscular",
    trainer: "Sergio Peinado",
    category: "recuperacion" as const,
    durationMinutes: 15
  },
  SP_CALENTAMIENTO: {
    id: "dg6MBDRcGAo",
    title: "Rutina de Calentamiento y Activación Articular",
    trainer: "Sergio Peinado",
    category: "movilidad" as const,
    durationMinutes: 15
  },
  SP_RUTINA_PRINCIPIANTES: {
    id: "WnYR9zSHyKw",
    title: "Rutina Completa en Casa: Cardio + Fuerza + Abdominales",
    trainer: "Sergio Peinado",
    category: "fuerza" as const,
    durationMinutes: 15
  },

  // 2. ESPALDA, POSTURA Y BRAZOS (SERGIO PEINADO)
  SP_TOP8_ESPALDA: {
    id: "WQRr_r43wvA",
    title: "Top 8 Ejercicios para una Espalda Fuerte y Sin Dolor",
    trainer: "Sergio Peinado",
    category: "fuerza" as const,
    durationMinutes: 15
  },
  SP_ESPALDA_MANCUERNAS: {
    id: "KHUvqjktkNs",
    title: "Rutina de Espalda y Hombros para Corregir Postura",
    trainer: "Sergio Peinado",
    category: "fuerza" as const,
    durationMinutes: 15
  },
  SP_ESPALDA_BRAZOS: {
    id: "ERbjcT5iyDo",
    title: "Súper Ejercicios para Espalda y Brazos Fuertes",
    trainer: "Sergio Peinado",
    category: "fuerza" as const,
    durationMinutes: 15
  },
  SP_PECHO_ESPALDA_SIN_PESAS: {
    id: "HJOrVf6Uyx8",
    title: "Pecho, Brazos y Espalda Fuertes Sin Pesas",
    trainer: "Sergio Peinado",
    category: "fuerza" as const,
    durationMinutes: 15
  },
  SP_SUSTITUTO_MAQUINAS: {
    id: "qPUsBG2MNIQ",
    title: "Entrenamiento de Espalda, Pecho y Brazos en Casa",
    trainer: "Sergio Peinado",
    category: "fuerza" as const,
    durationMinutes: 15
  },

  // 3. CARDIO BAJO IMPACTO Y QUEMA CALORÍAS (MARÍA MARTÍNEZ)
  MM_CARDIO_30: {
    id: "uQ2ba_Y2XXk",
    title: "Cardio Bajo Impacto para Adelgazar Rápido",
    trainer: "María Martínez (Siéntete Joven)",
    category: "cardio" as const,
    durationMinutes: 15
  },
  MM_CARDIO_QUEMA_GRASA: {
    id: "oZaOdsx4kLM",
    title: "Quema Grasa con Cardio Sin Impacto",
    trainer: "María Martínez (Siéntete Joven)",
    category: "cardio" as const,
    durationMinutes: 15
  },
  MM_CARDIO_SIN_SALTOS: {
    id: "WNz9C_vyIB0",
    title: "Cardio Sin Saltos para Perder Peso Rápido",
    trainer: "María Martínez (Siéntete Joven)",
    category: "cardio" as const,
    durationMinutes: 15
  },
  MM_CARDIO_40: {
    id: "lNc6k4hXQUQ",
    title: "Cardio Bajo Impacto Cero Dolor Articular",
    trainer: "María Martínez (Siéntete Joven)",
    category: "cardio" as const,
    durationMinutes: 15
  },
  MM_CARDIO_SIN_SALTOS_2: {
    id: "dNA2luP7yl0",
    title: "Cardio Quema Calorías Sin Saltos",
    trainer: "María Martínez (Siéntete Joven)",
    category: "cardio" as const,
    durationMinutes: 15
  },
  MM_CARDIO_CUERPO_COMPLETO: {
    id: "eh_dr7au4K0",
    title: "Cardio Dinámico Todo el Cuerpo Sin Saltos",
    trainer: "María Martínez (Siéntete Joven)",
    category: "cardio" as const,
    durationMinutes: 15
  },
  MM_CARDIO_BAJO_IMPACTO_2: {
    id: "DvSv27X5Bz8",
    title: "Cardio Quema Grasa Rápido - Bajo Impacto",
    trainer: "María Martínez (Siéntete Joven)",
    category: "cardio" as const,
    durationMinutes: 15
  },

  // 4. FUERZA FUNCIONAL, TREN INFERIOR Y CORE (CHUY ALMADA)
  CHUY_PRINCIPIANTES_20: {
    id: "y9-_6xBgJbE",
    title: "Rutina de Ejercicio para Principiantes en Casa",
    trainer: "Chuy Almada",
    category: "fuerza" as const,
    durationMinutes: 15
  },
  CHUY_SUPER_AMIGABLE: {
    id: "1Ue8uT4lT30",
    title: "Ejercicio para Principiantes Súper Amigable",
    trainer: "Chuy Almada",
    category: "fuerza" as const,
    durationMinutes: 15
  },
  CHUY_BASICOS_CASA: {
    id: "8I17t1Sl9C4",
    title: "Rutina para Principiantes: Ejercicios Básicos",
    trainer: "Chuy Almada",
    category: "fuerza" as const,
    durationMinutes: 15
  },
  CHUY_DIA_2: {
    id: "3l0u-GEcqRE",
    title: "Ejercicio para Principiantes: Progresión Día 2",
    trainer: "Chuy Almada",
    category: "fuerza" as const,
    durationMinutes: 15
  },
  CHUY_CARDIO_PRINCIPIANTES: {
    id: "4mK5Q39jczI",
    title: "Cardio para Principiantes en Casa",
    trainer: "Chuy Almada",
    category: "cardio" as const,
    durationMinutes: 15
  },
  CHUY_DIA_3: {
    id: "qIkJ9nIn1Sc",
    title: "Ejercicio para Principiantes: Progresión Día 3",
    trainer: "Chuy Almada",
    category: "fuerza" as const,
    durationMinutes: 15
  }
};

export const PHASES: Phase[] = [
  {
    id: 1,
    name: "Fase 1: Despertar & Descompresión Postural",
    weeksLabel: "Semanas 1 a 3",
    startWeek: 1,
    endWeek: 3,
    badge: "🌅 Despertar y Postura",
    goal: "Establecer el hábito del madrugón y eliminar la rigidez inicial de cuello y lumbares.",
    description: "Activación suave a las 6:00 AM, desbloqueo de columna, hombros adelantados y cardio bajo impacto sin saltos.",
    accentColor: "from-emerald-500 to-teal-600"
  },
  {
    id: 2,
    name: "Fase 2: Fortalecimiento y Resistencia Muscular",
    weeksLabel: "Semanas 4 a 8",
    startWeek: 4,
    endWeek: 8,
    badge: "💪 Fuerza y Resistencia",
    goal: "Blindar la espalda contra el dolor crónico y elevar el gasto calórico matutino.",
    description: "Tonificación de la cadena posterior, activación profunda de glúteos y core, y cardio con mayor ritmo.",
    accentColor: "from-blue-500 to-indigo-600"
  },
  {
    id: 3,
    name: "Fase 3: Alta Energía, Definición & Hábito Blindado",
    weeksLabel: "Semanas 9 a 12",
    startWeek: 9,
    endWeek: 12,
    badge: "🔥 Máxima Energía",
    goal: "Máxima vitalidad física para afrontar jornadas intensas de trabajo.",
    description: "Circuitos de ejercicios dinámicos, fuerza funcional completa y control postural absoluto.",
    accentColor: "from-amber-500 to-orange-600"
  }
];

const DAY_NAMES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const DAY_SHORTS = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];

// Matriz de rotación exclusiva de EJERCICIOS (100% libres de yoga)
const ROTATION_VIDEOS = {
  // Lunes: Movilidad y Activación Articular
  lunes: [
    CURATED_WORKOUT_VIDEOS.SP_ESTIRAR_MOVILIDAD,
    CURATED_WORKOUT_VIDEOS.SP_CALENTAMIENTO,
    CURATED_WORKOUT_VIDEOS.SP_GANAR_FLEXIBILIDAD,
    CURATED_WORKOUT_VIDEOS.SP_RUTINA_PRINCIPIANTES
  ],
  // Martes: Cardio Bajo Impacto Sin Saltos
  martes: [
    CURATED_WORKOUT_VIDEOS.MM_CARDIO_30,
    CURATED_WORKOUT_VIDEOS.MM_CARDIO_QUEMA_GRASA,
    CURATED_WORKOUT_VIDEOS.MM_CARDIO_SIN_SALTOS,
    CURATED_WORKOUT_VIDEOS.MM_CARDIO_40
  ],
  // Miércoles: Espalda Recta y Postura
  miercoles: [
    CURATED_WORKOUT_VIDEOS.SP_TOP8_ESPALDA,
    CURATED_WORKOUT_VIDEOS.SP_ESPALDA_MANCUERNAS,
    CURATED_WORKOUT_VIDEOS.SP_ESPALDA_BRAZOS,
    CURATED_WORKOUT_VIDEOS.SP_PECHO_ESPALDA_SIN_PESAS
  ],
  // Jueves: Fuerza Funcional y Tren Inferior
  jueves: [
    CURATED_WORKOUT_VIDEOS.CHUY_PRINCIPIANTES_20,
    CURATED_WORKOUT_VIDEOS.CHUY_SUPER_AMIGABLE,
    CURATED_WORKOUT_VIDEOS.CHUY_BASICOS_CASA,
    CURATED_WORKOUT_VIDEOS.CHUY_DIA_2
  ],
  // Viernes: Cardio Dinámico y Quema Grasa
  viernes: [
    CURATED_WORKOUT_VIDEOS.MM_CARDIO_SIN_SALTOS_2,
    CURATED_WORKOUT_VIDEOS.CHUY_CARDIO_PRINCIPIANTES,
    CURATED_WORKOUT_VIDEOS.MM_CARDIO_CUERPO_COMPLETO,
    CURATED_WORKOUT_VIDEOS.MM_CARDIO_BAJO_IMPACTO_2
  ],
  // Sábado: Fuerza de Abdomen, Core y Brazos
  sabado: [
    CURATED_WORKOUT_VIDEOS.SP_RUTINA_PRINCIPIANTES,
    CURATED_WORKOUT_VIDEOS.CHUY_DIA_3,
    CURATED_WORKOUT_VIDEOS.SP_SUSTITUTO_MAQUINAS,
    CURATED_WORKOUT_VIDEOS.CHUY_BASICOS_CASA
  ],
  // Domingo: Estiramientos Musculares y Descarga Postural
  domingo: [
    CURATED_WORKOUT_VIDEOS.SP_GANAR_FLEXIBILIDAD,
    CURATED_WORKOUT_VIDEOS.SP_ESTIRAR_MOVILIDAD,
    CURATED_WORKOUT_VIDEOS.SP_CALENTAMIENTO,
    CURATED_WORKOUT_VIDEOS.SP_TOP8_ESPALDA
  ]
};

function generateAllWorkouts(): WorkoutDay[] {
  const list: WorkoutDay[] = [];

  for (let week = 1; week <= 12; week++) {
    const phaseId = week <= 3 ? 1 : week <= 8 ? 2 : 3;
    const weekCycleIndex = (week - 1) % 4; // Rotación equilibrada

    for (let day = 1; day <= 7; day++) {
      const id = `w${week}-d${day}`;
      const dayName = DAY_NAMES[day - 1];
      const dayShort = DAY_SHORTS[day - 1];

      let vInfo: { id: string; title: string; trainer: string; category: WorkoutDay["category"]; durationMinutes: number } = ROTATION_VIDEOS.lunes[weekCycleIndex];
      let posturalFocus = "Descompresión cervical y desbloqueo de columna.";
      let intensity: "Baja" | "Media" | "Media-Alta" | "Alta" = "Baja";
      let targetMuscles = ["Cuello", "Trapecio", "Columna Dorsal", "Caderas"];
      let ergonomicTip = "Al llegar al escritorio, ajusta la pantalla a la altura de tus ojos para evitar flexionar el cuello.";
      let executionNotes = [
        "Calentamiento articular guiado (3 min)",
        "Bloque principal continuo de ejercicios (9 min)",
        "Estiramiento muscular de vuelta a la calma (3 min)"
      ];

      if (day === 1) {
        vInfo = ROTATION_VIDEOS.lunes[weekCycleIndex];
        posturalFocus = "Desbloqueo de articulaciones y apertura de hombros caídos tras el fin de semana.";
        intensity = "Baja";
        targetMuscles = ["Cuello", "Trapecio", "Columna Dorsal", "Caderas"];
        ergonomicTip = "Inicia el lunes ajustando tu silla: codos a 90° sobre la mesa y pies firmes en el piso.";
        executionNotes = [
          "Círculos de hombros y retracción escapular (4 min)",
          "Apertura torácica y respiración profunda (4 min)",
          "Desbloqueo lumbopélvico y caderas (4 min)",
          "Vuelta a la calma e hidratación (3 min)"
        ];
      } else if (day === 2) {
        vInfo = ROTATION_VIDEOS.martes[weekCycleIndex];
        posturalFocus = "Estimulación del retorno venoso en piernas y quema calórica sin impacto en rodillas.";
        intensity = "Media";
        targetMuscles = ["Cuádriceps", "Glúteos", "Gemelos", "Core"];
        ergonomicTip = "Ten a la mano una botella de agua; levantarte a rellenarla promueve micro-pausas activas.";
        executionNotes = [
          "Marcha dinámica y pasos laterales (4 min)",
          "Sentadillas suaves sin impacto (4 min)",
          "Elevaciones de talón y braceo continuo (4 min)",
          "Estiramiento de gemelos y cuádriceps (3 min)"
        ];
      } else if (day === 3) {
        vInfo = ROTATION_VIDEOS.miercoles[weekCycleIndex];
        posturalFocus = "Fortalecimiento de romboides y dorsal ancho para erradicar la cifosis de escritorio.";
        intensity = phaseId === 1 ? "Media" : "Media-Alta";
        targetMuscles = ["Romboides", "Dorsales", "Deltoides Posterior", "Glúteos"];
        ergonomicTip = "Evita cruzar las piernas debajo de la silla para no rotar asimétricamente la pelvis.";
        executionNotes = [
          "Vuelos en 'W' y retracción escapular (4 min)",
          "Remo isométrico y aperturas dorsales (4 min)",
          "Puente de glúteos con retroversión (4 min)",
          "Apertura pectoral asistida (3 min)"
        ];
      } else if (day === 4) {
        vInfo = ROTATION_VIDEOS.jueves[weekCycleIndex];
        posturalFocus = "Fuerza funcional de core y tren inferior para combatir la amnesia glútea.";
        intensity = phaseId === 1 ? "Media" : "Media-Alta";
        targetMuscles = ["Glúteo Mayor", "Core Profundo", "Isquiotibiales", "Pectorales"];
        ergonomicTip = "Cada hora, haz 5 respiraciones profundas llevando conscientemente los hombros hacia abajo.";
        executionNotes = [
          "Sentadillas controladas de activación (4 min)",
          "Empujes de brazos y flexiones inclinadas (4 min)",
          "Zancadas estáticas con torso erguido (4 min)",
          "Descompresión lumbar (3 min)"
        ];
      } else if (day === 5) {
        vInfo = ROTATION_VIDEOS.viernes[weekCycleIndex];
        posturalFocus = "Liberación del estrés acumulado en la semana y aceleración cardiovascular.";
        intensity = phaseId === 3 ? "Alta" : "Media-Alta";
        targetMuscles = ["Cuerpo Completo", "Cardiovascular", "Hombros", "Piernas"];
        ergonomicTip = "Organiza llamadas de pie o caminando hoy para reducir el tiempo total sentado.";
        executionNotes = [
          "Circuito aeróbico de bajo impacto (5 min)",
          "Intervalos dinámicos de cardio (6 min)",
          "Soltura de articulaciones y brazos (2 min)",
          "Estiramiento restaurativo final (2 min)"
        ];
      } else if (day === 6) {
        vInfo = ROTATION_VIDEOS.sabado[weekCycleIndex];
        posturalFocus = "Fuerza y tonificación integral de core, brazos y piernas.";
        intensity = "Media";
        targetMuscles = ["Core", "Abdomen", "Brazos", "Piernas"];
        ergonomicTip = "Aprovecha el fin de semana para mantenerte activo y sumar pasos al aire libre.";
        executionNotes = [
          "Calentamiento dinámico con flexiones asistidas (3 min)",
          "Circuito de fuerza y core funcional (9 min)",
          "Estiramientos musculares de tronco y piernas (3 min)"
        ];
      } else {
        vInfo = ROTATION_VIDEOS.domingo[weekCycleIndex];
        posturalFocus = "Descarga muscular activa, estiramientos de cadenas posteriores y relajación lumbar.";
        intensity = "Baja";
        targetMuscles = ["Isquiosurales", "Glúteos", "Zona Lumbar", "Cuello"];
        ergonomicTip = "Deja tu ropa de entrenamiento lista al lado de la cama para despertar a las 6:00 AM sin fricción.";
        executionNotes = [
          "Estiramiento en forma de '4' para glúteos y ciático (4 min)",
          "Descarga lumbar y elongación de espalda (4 min)",
          "Apertura de cadera y cuádriceps (4 min)",
          "Respiración diafragmática de relajación (3 min)"
        ];
      }

      const workout: WorkoutDay = {
        id,
        weekNumber: week,
        dayOfWeek: day,
        dayName,
        dayShort,
        phaseId,
        title: `${vInfo.title} (S${week})`,
        posturalFocus,
        durationMinutes: 15,
        trainer: vInfo.trainer,
        trainerRole: TRAINERS[vInfo.trainer]?.role || "Coach de Fuerza y Acondicionamiento Físico",
        youtubeId: vInfo.id,
        category: vInfo.category,
        executionNotes,
        ergonomicTip,
        intensity,
        targetMuscles
      };

      list.push(workout);
    }
  }

  return list;
}

export const WORKOUT_PROGRAM: WorkoutDay[] = generateAllWorkouts();

export function getWorkout(week: number, day: number): WorkoutDay {
  const item = WORKOUT_PROGRAM.find((w) => w.weekNumber === week && w.dayOfWeek === day);
  return item || WORKOUT_PROGRAM[0];
}

export function getPhase(phaseId: number): Phase {
  return PHASES.find((p) => p.id === phaseId) || PHASES[0];
}
