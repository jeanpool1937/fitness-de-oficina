import { Phase, TrainerInfo, WorkoutDay } from "../types";

export const TRAINERS: Record<string, TrainerInfo> = {
  "Sergio Peinado": {
    name: "Sergio Peinado",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100",
    role: "Licenciado en Ciencias de la Actividad Física y Deporte",
    channel: "Entrena con Sergio Peinado"
  },
  "María Martínez (Siéntete Joven)": {
    name: "María Martínez (Siéntete Joven)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    role: "Especialista en Cardio Bajo Impacto y Salud Postural",
    channel: "Siéntete Joven"
  },
  "Elena Malova": {
    name: "Elena Malova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    role: "Instructora Internacional de Yoga y Flexibilidad",
    channel: "MalovaElena"
  },
  "Chuy Almada": {
    name: "Chuy Almada",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    role: "Entrenador de Fuerza Funcional y Cardio Box",
    channel: "Chuy Almada"
  },
  "Pipe Arenas": {
    name: "Pipe Arenas",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    role: "Especialista en HIIT y Acondicionamiento Metabólico",
    channel: "Pipe Arenas Fitness"
  },
  "Fausto Murillo (Turbosteps)": {
    name: "Fausto Murillo (Turbosteps)",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100",
    role: "Master Coach en Resistencia y Pérdida de Grasa",
    channel: "Turbosteps"
  }
};

export const CURATED_WORKOUT_VIDEOS = {
  // 1. MOVILIDAD ARTICULAR & DESPERTAR (6:00 AM)
  SP_MOVILIDAD_DESPERTAR: {
    id: "iUrVkJls9y4",
    title: "Movilidad Matutina Completa para Despertar el Cuerpo",
    trainer: "Sergio Peinado",
    category: "movilidad" as const,
    durationMinutes: 15
  },
  MALOVA_YOGA_ENERGIA: {
    id: "F_fP_H-x0E4",
    title: "Yoga en 15 Min para Buena Energía y Vitalidad",
    trainer: "Elena Malova",
    category: "recuperacion" as const,
    durationMinutes: 15
  },
  MALOVA_YOGA_DE_PIE: {
    id: "q6P41yvUo8c",
    title: "Yoga de Pie 15 Min para Energizar sin Suelo",
    trainer: "Elena Malova",
    category: "movilidad" as const,
    durationMinutes: 15
  },
  MALOVA_YOGA_DINAMICO: {
    id: "k1t6Ff63UjE",
    title: "Yoga Dinámico 15 Min Todo Cuerpo",
    trainer: "Elena Malova",
    category: "movilidad" as const,
    durationMinutes: 15
  },
  MALOVA_ESTIRAMIENTOS: {
    id: "Pnbwyxh4LJs",
    title: "Estiramientos y Flexibilidad para Espalda y Piernas",
    trainer: "Elena Malova",
    category: "recuperacion" as const,
    durationMinutes: 15
  },

  // 2. POSTURA & ANTIDOLOR DE ESPALDA
  SP_ESPALDA_RECTA: {
    id: "Pnbwyxh4LJs",
    title: "Espalda Recta y Corrección de Hombros Caídos",
    trainer: "Sergio Peinado",
    category: "fuerza" as const,
    durationMinutes: 15
  },
  SP_FUERZA_POSTURAL: {
    id: "y9-_6xBgJbE",
    title: "Fuerza Postural y Retracción Escapular",
    trainer: "Sergio Peinado",
    category: "fuerza" as const,
    durationMinutes: 15
  },
  MM_BRAZOS_ESPALDA: {
    id: "q6_yF8u0L-0",
    title: "Tonificación de Espalda y Brazos Sin Pesas",
    trainer: "María Martínez (Siéntete Joven)",
    category: "fuerza" as const,
    durationMinutes: 15
  },
  CHUY_FUERZA_FUNCIONAL: {
    id: "wVu5f89LGOQ",
    title: "Fuerza Funcional y Resistencia Corporal",
    trainer: "Chuy Almada",
    category: "fuerza" as const,
    durationMinutes: 15
  },

  // 3. CARDIO SIN IMPACTO
  MM_CARDIO_BAJO_IMPACTO: {
    id: "83n7vD00m1Y",
    title: "Cardio Bajo Impacto Sin Saltos (Cero Dolor Articular)",
    trainer: "María Martínez (Siéntete Joven)",
    category: "cardio" as const,
    durationMinutes: 15
  },
  MM_CARDIO_FULL_BODY: {
    id: "wX-y5Bf_e2Y",
    title: "Full Body Cardio 15 Minutos Quema Grasa",
    trainer: "María Martínez (Siéntete Joven)",
    category: "cardio" as const,
    durationMinutes: 15
  },
  MM_CARDIO_DESPERTAR: {
    id: "kU_U6rN44bE",
    title: "Activación Cardio Matutina 15 Minutos",
    trainer: "María Martínez (Siéntete Joven)",
    category: "cardio" as const,
    durationMinutes: 15
  },
  FAUSTO_CARDIO_PRINCIPIANTES: {
    id: "83n7vD00m1Y",
    title: "Cardio Suave y Quema Calorías sin Saltos",
    trainer: "Fausto Murillo (Turbosteps)",
    category: "cardio" as const,
    durationMinutes: 15
  },
  SP_CARDIO_ADELGAZAR: {
    id: "o04i64u3W0c",
    title: "Cardio Quemagrasa 15 Minutos en Casa",
    trainer: "Sergio Peinado",
    category: "cardio" as const,
    durationMinutes: 15
  },

  // 4. ABDOMEN & CORE
  MM_ABS_DE_PIE: {
    id: "L5_2w8-l76w",
    title: "Abdominales y Cintura de Pie (Sin Tirarse al Suelo)",
    trainer: "María Martínez (Siéntete Joven)",
    category: "fuerza" as const,
    durationMinutes: 15
  },
  SP_CORE_LUMBAR: {
    id: "y9-_6xBgJbE",
    title: "Fortalecimiento de Core y Protección Lumbar",
    trainer: "Sergio Peinado",
    category: "fuerza" as const,
    durationMinutes: 15
  },

  // 5. HIIT & TABATA
  PIPE_TABATA_15: {
    id: "WnYR9zSHyKw",
    title: "Tabata 15 Minutos Quema Grasa y Aceleración",
    trainer: "Pipe Arenas",
    category: "circuito" as const,
    durationMinutes: 15
  },
  MM_HIIT_FAT_BURNER: {
    id: "Zf_xV1rFw2c",
    title: "Full Body HIIT Fat Burner 15 Minutos",
    trainer: "María Martínez (Siéntete Joven)",
    category: "circuito" as const,
    durationMinutes: 15
  },
  SP_HIIT_INTENSO: {
    id: "Fj-P_0z7g7k",
    title: "Rutina Cardio HIIT Intensa 15 Minutos",
    trainer: "Sergio Peinado",
    category: "circuito" as const,
    durationMinutes: 15
  },
  SP_CARDIO_BOX: {
    id: "nQ3qLdJ_eSI",
    title: "Cardio Box 15 Minutos Quema Calorías",
    trainer: "Sergio Peinado",
    category: "cardio" as const,
    durationMinutes: 15
  },
  SP_FULL_BODY_HIIT: {
    id: "5Vj-z3-Q-Z4",
    title: "Full Body Weight Loss HIIT 15 Minutos",
    trainer: "Sergio Peinado",
    category: "circuito" as const,
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
    goal: "Máxima vitalidad mental y física para afrontar jornadas intensas de trabajo.",
    description: "Circuitos HIIT y Tabata de alta densidad, fuerza funcional completa y control postural absoluto.",
    accentColor: "from-amber-500 to-orange-600"
  }
];

const DAY_NAMES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const DAY_SHORTS = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];

function generateAllWorkouts(): WorkoutDay[] {
  const list: WorkoutDay[] = [];

  for (let week = 1; week <= 12; week++) {
    const phaseId = week <= 3 ? 1 : week <= 8 ? 2 : 3;

    for (let day = 1; day <= 7; day++) {
      const id = `w${week}-d${day}`;
      const dayName = DAY_NAMES[day - 1];
      const dayShort = DAY_SHORTS[day - 1];

      let workout: WorkoutDay;

      // FASE 1: SEMANAS 1-3
      if (phaseId === 1) {
        if (day === 1) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Despertar Articular y Movilidad Matutina (S${week})`,
            posturalFocus: "Descompresión cervical y desbloqueo de escápulas tras la noche.",
            durationMinutes: 15,
            trainer: "Sergio Peinado",
            trainerRole: TRAINERS["Sergio Peinado"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.SP_MOVILIDAD_DESPERTAR.id,
            category: "movilidad",
            executionNotes: [
              "Círculos de cuello y retracción cervical asistida (3 min)",
              "Apertura torácica y rotaciones de hombros (4 min)",
              "Gato-camello y movilización lumbopélvica (4 min)",
              "Flexores de cadera y respiración diafragmática (4 min)"
            ],
            ergonomicTip: "Al llegar a tu escritorio, ajusta la altura de la pantalla al nivel de tus ojos para evitar flexionar el cuello.",
            intensity: "Baja",
            targetMuscles: ["Cuello", "Trapecio", "Columna Dorsal", "Caderas"]
          };
        } else if (day === 2) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Cardio Bajo Impacto Sin Saltos (S${week})`,
            posturalFocus: "Activación del retorno venoso y quema calórica sin impacto articular.",
            durationMinutes: 15,
            trainer: "María Martínez (Siéntete Joven)",
            trainerRole: TRAINERS["María Martínez (Siéntete Joven)"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.MM_CARDIO_BAJO_IMPACTO.id,
            category: "cardio",
            executionNotes: [
              "Marcha dinámica con elevación de rodillas controlada (3 min)",
              "Pasos laterales con brazos en cruz (4 min)",
              "Sentadillas suaves sin impacto (4 min)",
              "Paso de patinador suave y estiramiento final (4 min)"
            ],
            ergonomicTip: "Pon una botella de 1 litro de agua en tu mesa. Beber agua constantemente te obligará a levantarte.",
            intensity: "Baja",
            targetMuscles: ["Cuádriceps", "Glúteos", "Gemelos", "Core"]
          };
        } else if (day === 3) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Fuerza Postural y Retracción Escapular (S${week})`,
            posturalFocus: "Corrección de hombros caídos hacia adelante (cifosis de escritorio).",
            durationMinutes: 15,
            trainer: "Sergio Peinado",
            trainerRole: TRAINERS["Sergio Peinado"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.SP_ESPALDA_RECTA.id,
            category: "fuerza",
            executionNotes: [
              "Vuelos en 'W' contra la pared para escápulas (4 min)",
              "Remo isométrico con brazos al cuerpo (4 min)",
              "Puente de glúteos con retroversión pélvica (4 min)",
              "Estiramiento de pectorales en puerta (3 min)"
            ],
            ergonomicTip: "Evita sentarte sobre una pierna cruzada debajo de ti; genera asimetría en la pelvis y compresión lumbar.",
            intensity: "Media",
            targetMuscles: ["Romboides", "Dorsal Ancho", "Manguito Rotador", "Glúteos"]
          };
        } else if (day === 4) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Abdominales y Cintura de Pie Sin Suelo (S${week})`,
            posturalFocus: "Activación del transverso abdominal como faja protectora de la columna.",
            durationMinutes: 15,
            trainer: "María Martínez (Siéntete Joven)",
            trainerRole: TRAINERS["María Martínez (Siéntete Joven)"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.MM_ABS_DE_PIE.id,
            category: "fuerza",
            executionNotes: [
              "Rodillas al pecho cruzadas con torsión de torso (4 min)",
              "Flexiones laterales para oblicuos de pie (4 min)",
              "Contracción isométrica con respiración forzada (4 min)",
              "Descompresión lumbar y estiramiento de columna (3 min)"
            ],
            ergonomicTip: "Cada vez que envíes un correo importante, haz una contracción de 10 segundos del ombligo hacia la columna.",
            intensity: "Media",
            targetMuscles: ["Transverso", "Oblicuos", "Recto Abdominal", "Flexores"]
          };
        } else if (day === 5) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Full Body Cardio & Energía Laboral (S${week})`,
            posturalFocus: "Despeje mental y liberación de cortisol acumulado durante la semana.",
            durationMinutes: 15,
            trainer: "María Martínez (Siéntete Joven)",
            trainerRole: TRAINERS["María Martínez (Siéntete Joven)"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.MM_CARDIO_FULL_BODY.id,
            category: "cardio",
            executionNotes: [
              "Calentamiento de balanceo articular (2 min)",
              "Bloque aeróbico de 3 estaciones continuas (8 min)",
              "Piques suaves en el sitio y desplazamientos (3 min)",
              "Vuelta a la calma y elongación (2 min)"
            ],
            ergonomicTip: "Organiza una reunión caminando por teléfono hoy en lugar de estar sentado frente a la pantalla.",
            intensity: "Media",
            targetMuscles: ["Cuerpo Completo", "Hombros", "Piernas", "Core"]
          };
        } else if (day === 6) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Yoga Matutino de Pie para Vitalidad (S${week})`,
            posturalFocus: "Mejora del equilibrio corporal y apertura de caja torácica.",
            durationMinutes: 15,
            trainer: "Elena Malova",
            trainerRole: TRAINERS["Elena Malova"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.MALOVA_YOGA_DE_PIE.id,
            category: "movilidad",
            executionNotes: [
              "Postura de la montaña (Tadasana) con respiración profunda (3 min)",
              "Guerrero I y II suaves para apertura de caderas (5 min)",
              "Inclinaciones laterales con elongación intercostal (4 min)",
              "Flexión hacia adelante suave (Uttanasana) (3 min)"
            ],
            ergonomicTip: "Los fines de semana camina al menos 30 minutos al aire libre bajo la luz natural del sol.",
            intensity: "Baja",
            targetMuscles: ["Columna Vertebral", "Tobillos", "Cadena Posterior", "Hombros"]
          };
        } else {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Descarga Lumbar y Flexibilidad Total (S${week})`,
            posturalFocus: "Preparación neuromuscular y relajación fascial para la semana.",
            durationMinutes: 15,
            trainer: "Elena Malova",
            trainerRole: TRAINERS["Elena Malova"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.MALOVA_YOGA_ENERGIA.id,
            category: "recuperacion",
            executionNotes: [
              "Estiramiento en forma de '4' para piramidal y ciático (4 min)",
              "Torsiones espinales suaves en suelo o colchoneta (4 min)",
              "Apertura pasiva de flexores de cadera (4 min)",
              "Respiración diafragmática en reposo (3 min)"
            ],
            ergonomicTip: "Prepara tu ropa de entrenamiento la noche anterior al lado de la cama para levantarte sin fricción a las 6:00 AM.",
            intensity: "Baja",
            targetMuscles: ["Isquiotibiales", "Glúteos", "Zona Lumbar", "Cuello"]
          };
        }
      }

      // FASE 2: SEMANAS 4-8
      else if (phaseId === 2) {
        if (day === 1) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Tonificación de Espalda y Brazos Antifatiga (S${week})`,
            posturalFocus: "Refuerzo del dorsal ancho y deltoides posterior para mantener postura erguida.",
            durationMinutes: 15,
            trainer: "María Martínez (Siéntete Joven)",
            trainerRole: TRAINERS["María Martínez (Siéntete Joven)"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.MM_BRAZOS_ESPALDA.id,
            category: "fuerza",
            executionNotes: [
              "Elevaciones en 'Y' y 'T' para estabilización escapular (4 min)",
              "Extensiones de tríceps y remos dinámicos (4 min)",
              "Plancha de antebrazos con rotación de cadera (4 min)",
              "Estiramiento de hombros cruzados (3 min)"
            ],
            ergonomicTip: "Configura tu silla con soporte lumbar firme para mantener la curva natural lordótica de tu espalda.",
            intensity: "Media-Alta",
            targetMuscles: ["Dorsales", "Tríceps", "Romboides", "Hombros"]
          };
        } else if (day === 2) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Cardio Box y Quema de Calorías en Casa (S${week})`,
            posturalFocus: "Descompresión de hombros y aceleración del gasto energético.",
            durationMinutes: 15,
            trainer: "Sergio Peinado",
            trainerRole: TRAINERS["Sergio Peinado"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.SP_CARDIO_BOX.id,
            category: "cardio",
            executionNotes: [
              "Jabs y crosses en guardia media (4 min)",
              "Ganchos y esquivas con rotación de tronco (4 min)",
              "Rodillazos al aire con contracción de core (4 min)",
              "Descanso activo y soltura de brazos (3 min)"
            ],
            ergonomicTip: "Si trabajas con ratón convencional, considera un ratón vertical ergonómico para proteger tu muñeca.",
            intensity: "Media-Alta",
            targetMuscles: ["Hombros", "Pectorales", "Core", "Gemelos"]
          };
        } else if (day === 3) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Fuerza Funcional y Resistencia Corporal (S${week})`,
            posturalFocus: "Activación del tren inferior para combatir la debilidad por sedentarismo.",
            durationMinutes: 15,
            trainer: "Chuy Almada",
            trainerRole: TRAINERS["Chuy Almada"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.CHUY_FUERZA_FUNCIONAL.id,
            category: "fuerza",
            executionNotes: [
              "Sentadillas isométricas con pausa abajo (4 min)",
              "Flexiones inclinadas con empuje potente (4 min)",
              "Zancadas alternas con torso recto (4 min)",
              "Estiramiento de cuádriceps y glúteos (3 min)"
            ],
            ergonomicTip: "Haz 10 sentadillas cada vez que te levantes de tu silla para ir al baño o por agua.",
            intensity: "Media-Alta",
            targetMuscles: ["Glúteo Mayor", "Isquiosurales", "Core", "Pectorales"]
          };
        } else if (day === 4) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Core Profundo y Protección Lumbar Activa (S${week})`,
            posturalFocus: "Estabilidad lumbopélvica para evitar pinzamientos en discos L5-S1.",
            durationMinutes: 15,
            trainer: "Sergio Peinado",
            trainerRole: TRAINERS["Sergio Peinado"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.SP_CORE_LUMBAR.id,
            category: "fuerza",
            executionNotes: [
              "Bird-Dog con retención de 3s (4 min)",
              "Plancha lateral con elevación de cadera (4 min)",
              "Puente de glúteos a una pierna (4 min)",
              "Estiramiento de esfinge para columna (3 min)"
            ],
            ergonomicTip: "Evita inclinarte hacia adelante hacia la pantalla; acerca la silla al escritorio y apoya los antebrazos.",
            intensity: "Media",
            targetMuscles: ["Transverso", "Erectores Espinales", "Oblicuos"]
          };
        } else if (day === 5) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Tabata 15 Minutos Aceleración Metabólica (S${week})`,
            posturalFocus: "Pico de energía y estimulación cardiovascular de alta eficiencia.",
            durationMinutes: 15,
            trainer: "Pipe Arenas",
            trainerRole: TRAINERS["Pipe Arenas"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.PIPE_TABATA_15.id,
            category: "circuito",
            executionNotes: [
              "Intervalo 20s/10s: Sentadillas con pulso (4 min)",
              "Intervalo 20s/10s: Step jacks activos (4 min)",
              "Intervalo 20s/10s: Mountain climbers controlados (4 min)",
              "Vuelta a la calma y respiración (3 min)"
            ],
            ergonomicTip: "La activación matutina de alta intensidad mejora la agudeza mental por hasta 8 horas.",
            intensity: "Alta",
            targetMuscles: ["Cuerpo Completo", "Cardiovascular", "Piernas"]
          };
        } else if (day === 6) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Yoga Dinámico de Flujo y Apertura (S${week})`,
            posturalFocus: "Movilidad articular continua en cadenas cruzadas.",
            durationMinutes: 15,
            trainer: "Elena Malova",
            trainerRole: TRAINERS["Elena Malova"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.MALOVA_YOGA_DINAMICO.id,
            category: "movilidad",
            executionNotes: [
              "Saludo al sol adaptado con fluidez (5 min)",
              "Guerrero inverso con apertura costal (4 min)",
              "Torsiones en lunge bajo (3 min)",
              "Postura del niño (Balasana) (3 min)"
            ],
            ergonomicTip: "Aprovecha el fin de semana para desconectar de las pantallas al menos 2 horas antes de dormir.",
            intensity: "Media",
            targetMuscles: ["Cuerpo Completo", "Flexores", "Columna"]
          };
        } else {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Flexibilidad Profunda y Regeneración Fascial (S${week})`,
            posturalFocus: "Alivio de sobrecargas musculares y flexibilidad de cadera.",
            durationMinutes: 15,
            trainer: "Elena Malova",
            trainerRole: TRAINERS["Elena Malova"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.MALOVA_ESTIRAMIENTOS.id,
            category: "recuperacion",
            executionNotes: [
              "Apertura profunda de caderas en mariposa (4 min)",
              "Estiramiento de isquiotibiales con toalla (4 min)",
              "Apertura pectoral en suelo (4 min)",
              "Relajación consciente guiada (3 min)"
            ],
            ergonomicTip: "Mantén un horario regular de sueño: dormir a la misma hora afianza el hábito de las 6:00 AM.",
            intensity: "Baja",
            targetMuscles: ["Isquiosurales", "Glúteos", "Psoas", "Pectorales"]
          };
        }
      }

      // FASE 3: SEMANAS 9-12
      else {
        if (day === 1) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `HIIT Quema Grasa y Potencia Metabólica (S${week})`,
            posturalFocus: "Máximo gasto calórico matutino para un metabolismo acelerado todo el día.",
            durationMinutes: 15,
            trainer: "Sergio Peinado",
            trainerRole: TRAINERS["Sergio Peinado"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.SP_HIIT_INTENSO.id,
            category: "circuito",
            executionNotes: [
              "Calentamiento de reactivación muscular (2 min)",
              "Circuito 45s activo / 15s descanso x 4 rondas (10 min)",
              "Plancha de potencia con toques de hombro (2 min)",
              "Respiración de recuperación rápida (1 min)"
            ],
            ergonomicTip: "Inicia tu lunes con la sesión completada: la sensación de victoria matutina elimina la ansiedad laboral.",
            intensity: "Alta",
            targetMuscles: ["Cuerpo Completo", "Tren Inferior", "Core"]
          };
        } else if (day === 2) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Full Body Weight Loss & Fuerza Total (S${week})`,
            posturalFocus: "Densidad muscular postural y resistencia a la fatiga estática.",
            durationMinutes: 15,
            trainer: "Sergio Peinado",
            trainerRole: TRAINERS["Sergio Peinado"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.SP_FULL_BODY_HIIT.id,
            category: "fuerza",
            executionNotes: [
              "Sentadillas profundas controladas (4 min)",
              "Flexiones completas con pausa en el suelo (4 min)",
              "Zancadas con torso erguido (4 min)",
              "Retracción escapular isométrica (3 min)"
            ],
            ergonomicTip: "Durante tus llamadas de pie, mantén el peso distribuido equilibradamente en ambas plantas del pie.",
            intensity: "Alta",
            targetMuscles: ["Pectorales", "Dorsales", "Cuádriceps", "Glúteos"]
          };
        } else if (day === 3) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Full Body HIIT Fat Burner Express (S${week})`,
            posturalFocus: "Resistencia cardiopulmonar y agilidad motriz.",
            durationMinutes: 15,
            trainer: "María Martínez (Siéntete Joven)",
            trainerRole: TRAINERS["María Martínez (Siéntete Joven)"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.MM_HIIT_FAT_BURNER.id,
            category: "circuito",
            executionNotes: [
              "Secuencia de alta combustión 4x3 (9 min)",
              "Trabajo de core en suspensión de pie (3 min)",
              "Paso de patinador explosivo (2 min)",
              "Estiramiento restaurativo (1 min)"
            ],
            ergonomicTip: "Asegúrate de hacer una pausa activa de 2 minutos tras cada 50 minutos de trabajo concentrado.",
            intensity: "Alta",
            targetMuscles: ["Cuerpo Completo", "Hombros", "Piernas", "Abdomen"]
          };
        } else if (day === 4) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Blindaje de Espalda y Corrección Cifótica (S${week})`,
            posturalFocus: "Alineación definitiva de columna cervical y dorsal.",
            durationMinutes: 15,
            trainer: "Sergio Peinado",
            trainerRole: TRAINERS["Sergio Peinado"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.SP_FUERZA_POSTURAL.id,
            category: "fuerza",
            executionNotes: [
              "Deslizamientos en pared en 'W-Y' (4 min)",
              "Remo invertido de alta tensión (4 min)",
              "Puente de glúteos unilateral (4 min)",
              "Descompresión torácica en esquina (3 min)"
            ],
            ergonomicTip: "Si sientes tensión en el trapecio, realiza 5 respiraciones diafragmáticas bajando conscientemente los hombros.",
            intensity: "Media-Alta",
            targetMuscles: ["Romboides", "Trapecio Medio", "Erectores", "Glúteos"]
          };
        } else if (day === 5) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Tabata Power Quema Grasa y Resistencia (S${week})`,
            posturalFocus: "Desconexión total del estrés y cierre enérgico de la semana laboral.",
            durationMinutes: 15,
            trainer: "Pipe Arenas",
            trainerRole: TRAINERS["Pipe Arenas"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.PIPE_TABATA_15.id,
            category: "circuito",
            executionNotes: [
              "Tabata Round 1: Rodillas arriba y sentadillas (4 min)",
              "Tabata Round 2: Planchas dinámicas y escaladores (4 min)",
              "Tabata Round 3: Burpees sin impacto (4 min)",
              "Estiramiento final (3 min)"
            ],
            ergonomicTip: "¡Felicidades por cerrar otra semana con disciplina! Tu cuerpo y tu postura son ahora tu mejor armadura.",
            intensity: "Alta",
            targetMuscles: ["Cardio", "Piernas", "Core", "Brazos"]
          };
        } else if (day === 6) {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Yoga Dinámico de Flujo y Flexibilidad Global (S${week})`,
            posturalFocus: "Libertad de movimiento y apertura de la cadena miofascial anterior.",
            durationMinutes: 15,
            trainer: "Elena Malova",
            trainerRole: TRAINERS["Elena Malova"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.MALOVA_YOGA_DINAMICO.id,
            category: "movilidad",
            executionNotes: [
              "Secuencia fluida de Vinyasa adaptada (5 min)",
              "Postura de la cobra suave y perro boca abajo (4 min)",
              "Apertura profunda de psoas y cuádriceps (3 min)",
              "Savasana corta de integración mental (3 min)"
            ],
            ergonomicTip: "El ejercicio no es un castigo por lo que comiste, es una celebración de lo que tu cuerpo es capaz de hacer.",
            intensity: "Media",
            targetMuscles: ["Cuerpo Completo", "Caderas", "Pectorales"]
          };
        } else {
          workout = {
            id,
            weekNumber: week,
            dayOfWeek: day,
            dayName,
            dayShort,
            phaseId,
            title: `Regeneración Fascial y Balance Postural (S${week})`,
            posturalFocus: "Relajación del sistema nervioso simpático y descanso profundo.",
            durationMinutes: 15,
            trainer: "Elena Malova",
            trainerRole: TRAINERS["Elena Malova"].role,
            youtubeId: CURATED_WORKOUT_VIDEOS.MALOVA_YOGA_ENERGIA.id,
            category: "recuperacion",
            executionNotes: [
              "Liberación de tensión ocular y cervical (3 min)",
              "Estiramiento de glúteos e isquiotibiales (4 min)",
              "Torsiones vertebrales en decúbito supino (4 min)",
              "Meditación guiada de enfoque (4 min)"
            ],
            ergonomicTip: "Visualiza tus metas de la próxima semana y prepárate para conquistar tu rutina a las 6:00 AM.",
            intensity: "Baja",
            targetMuscles: ["Columna", "Caderas", "Músculos Oculares", "Cuello"]
          };
        }
      }

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
