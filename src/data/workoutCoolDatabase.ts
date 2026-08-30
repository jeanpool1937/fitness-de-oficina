export interface MuscleGroup {
  id: string;
  name: string;
  category: "superior" | "core" | "inferior";
  view: "anterior" | "posterior" | "both";
  officeRelevance: string;
  commonIssues: string;
}

export interface ExerciseItem {
  id: string;
  title: string;
  muscleId: string;
  muscleName: string;
  secondaryMuscles: string[];
  equipment: "ninguno" | "escritorio" | "banda" | "mancuerna";
  durationSeconds: number;
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
  officeFocus: "Postura & Cifosis" | "Alivio Lumbar" | "Cuello de Texto" | "Amnesia Glútea" | "Túnel Carpiano" | "Movilidad General";
  instructions: string[];
  breathingTip: string;
  commonMistakes: string;
  iconType: "stretch" | "strength" | "mobility" | "release";
  youtubeId?: string; // Video ID oficial embebido
  visualAnimationType?: "neck-tuck" | "neck-stretch" | "chest-open" | "wall-slide" | "scapular" | "chair-row" | "cat-cow" | "plank" | "wrist-stretch" | "hip-flexor" | "glute-bridge" | "piriformis" | "calf-raise";
}

export const MUSCLE_GROUPS: MuscleGroup[] = [
  {
    id: "neck",
    name: "Cuello y Trapecio Superior",
    category: "superior",
    view: "both",
    officeRelevance: "Soporta el peso de la cabeza inclinada hacia el monitor.",
    commonIssues: "Cervicalgia, cefaleas tensionales y rigidez por 'text-neck'."
  },
  {
    id: "shoulders",
    name: "Hombros y Manguito Rotador",
    category: "superior",
    view: "both",
    officeRelevance: "Tendencia a rotar internamente al teclear.",
    commonIssues: "Hombros adelantados, pinzamiento subacromial."
  },
  {
    id: "chest",
    name: "Pectorales (Mayor y Menor)",
    category: "superior",
    view: "anterior",
    officeRelevance: "Se acorta y tensa excesivamente al escribir.",
    commonIssues: "Cifosis dorsal y restricción respiratoria diafragmática."
  },
  {
    id: "upper_back",
    name: "Romboides y Trapecio Medio",
    category: "superior",
    view: "posterior",
    officeRelevance: "Músculos posturales debilitados por la postura encorvada.",
    commonIssues: "Fatiga interescapular y quemazón dorsal al final del día."
  },
  {
    id: "lower_back",
    name: "Zona Lumbar y Erectores",
    category: "core",
    view: "posterior",
    officeRelevance: "Soporta compresión continua de discos L4-L5 al sentarse.",
    commonIssues: "Lumbalgia, ciática por compresión y fatiga de soporte."
  },
  {
    id: "abs",
    name: "Abdomen y Core Profundo",
    category: "core",
    view: "anterior",
    officeRelevance: "Faja natural que protege la columna vertebral.",
    commonIssues: "Atonía del transverso abdominal y pérdida de estabilidad."
  },
  {
    id: "wrists",
    name: "Antebrazos y Muñecas",
    category: "superior",
    view: "anterior",
    officeRelevance: "Impactados por tecleo continuo y uso repetitivo del ratón.",
    commonIssues: "Síndrome del túnel carpiano y tendinitis de De Quervain."
  },
  {
    id: "hips",
    name: "Flexores de Cadera (Psoas)",
    category: "inferior",
    view: "anterior",
    officeRelevance: "En flexión constante de 90° durante 8 horas.",
    commonIssues: "Acortamiento severo, tracción lumbar y anteversión pélvica."
  },
  {
    id: "glutes",
    name: "Glúteos (Mayor y Medio)",
    category: "inferior",
    view: "posterior",
    officeRelevance: "Desactivados por compresión prolongada en el asiento.",
    commonIssues: "Amnesia glútea, dolor lumbar secundario e inestabilidad de pelvis."
  },
  {
    id: "hamstrings",
    name: "Isquiosurales",
    category: "inferior",
    view: "posterior",
    officeRelevance: "Acortados por la rodilla flexionada en la silla.",
    commonIssues: "Rigidez posterior y limitación en la bisagra de cadera."
  },
  {
    id: "calves",
    name: "Gemelos y Tobillos",
    category: "inferior",
    view: "posterior",
    officeRelevance: "Falta de bombeo circulatorio hacia el corazón.",
    commonIssues: "Pesadez de piernas, retención de líquidos y fascitis plantar."
  }
];

export const WORKOUT_COOL_EXERCISES: ExerciseItem[] = [
  // CUELLO
  {
    id: "ex-neck-1",
    title: "Retracción Cervical (Doble Mentón)",
    muscleId: "neck",
    muscleName: "Cuello y Trapecio Superior",
    secondaryMuscles: ["Erectores cervicales", "Escápulas"],
    equipment: "ninguno",
    durationSeconds: 45,
    difficulty: "Principiante",
    officeFocus: "Cuello de Texto",
    youtubeId: "Pnbwyxh4LJs",
    visualAnimationType: "neck-tuck",
    instructions: [
      "Siéntate erguido con la mirada al frente.",
      "Lleva la barbilla hacia atrás como si quisieras hacerte 'doble mentón', sin inclinar la cabeza hacia abajo.",
      "Mantén la posición 3 segundos sintiendo el estiramiento en la base del cráneo.",
      "Repite de 8 a 10 veces de forma suave y controlada."
    ],
    breathingTip: "Inhala al inicio y exhala al retraer la barbilla.",
    commonMistakes: "No mires hacia el piso; la cabeza debe desplazarse en un plano horizontal.",
    iconType: "mobility"
  },
  {
    id: "ex-neck-2",
    title: "Elongación Lateral de Trapecio con Descenso Escapular",
    muscleId: "neck",
    muscleName: "Cuello y Trapecio Superior",
    secondaryMuscles: ["Elevador de la escápula"],
    equipment: "escritorio",
    durationSeconds: 60,
    difficulty: "Principiante",
    officeFocus: "Cuello de Texto",
    youtubeId: "Pnbwyxh4LJs",
    visualAnimationType: "neck-stretch",
    instructions: [
      "Sujeta el borde del asiento con una mano para fijar el hombro hacia abajo.",
      "Inclina suavemente la oreja contraria hacia el hombro opuesto.",
      "Aplica una ligera presión asistida con la mano libre sobre la sien.",
      "Mantén 30 segundos por lado respirando profundamente."
    ],
    breathingTip: "Exhalaciones largas de 5 segundos para relajar el tono muscular.",
    commonMistakes: "No eleves el hombro que está siendo estirado.",
    iconType: "stretch"
  },

  // HOMBROS & PECHO
  {
    id: "ex-chest-1",
    title: "Apertura Pectoral en Marco de Puerta o Esquina",
    muscleId: "chest",
    muscleName: "Pectorales (Mayor y Menor)",
    secondaryMuscles: ["Deltoides anterior", "Bíceps"],
    equipment: "ninguno",
    durationSeconds: 60,
    difficulty: "Principiante",
    officeFocus: "Postura & Cifosis",
    youtubeId: "Pnbwyxh4LJs",
    visualAnimationType: "chest-open",
    instructions: [
      "Coloca los antebrazos a 90° sobre el marco de una puerta o esquina.",
      "Da un paso suave hacia adelante hasta sentir la apertura en el pecho.",
      "Mantén la columna neutra sin arquear excesivamente la zona lumbar.",
      "Sostén 30 segundos, cambia la pierna adelantada y repite."
    ],
    breathingTip: "Expande la caja torácica en cada inhalación.",
    commonMistakes: "Arquear la zona lumbar para compensar la falta de flexibilidad en el pecho.",
    iconType: "stretch"
  },
  {
    id: "ex-shoulders-1",
    title: "Deslizamientos de Pared en 'W' a 'Y' (Wall Slides)",
    muscleId: "shoulders",
    muscleName: "Hombros y Manguito Rotador",
    secondaryMuscles: ["Serrato anterior", "Trapecio inferior"],
    equipment: "ninguno",
    durationSeconds: 50,
    difficulty: "Intermedio",
    officeFocus: "Postura & Cifosis",
    youtubeId: "Pnbwyxh4LJs",
    visualAnimationType: "wall-slide",
    instructions: [
      "Apoya espalda, cabeza y glúteos contra una pared plana.",
      "Coloca los codos y dorso de las manos contra la pared formando una 'W'.",
      "Desliza los brazos hacia arriba formando una 'Y' sin despegar los codos ni muñecas.",
      "Baja controladamente apretando las escápulas hacia abajo."
    ],
    breathingTip: "Exhala al subir a la 'Y', inhala al bajar a la 'W'.",
    commonMistakes: "Despegar la zona lumbar o los brazos de la pared.",
    iconType: "mobility"
  },

  // ESPALDA SUPERIOR & DORSALES
  {
    id: "ex-back-1",
    title: "Retracciones Escapulares en Vuelo Pájaro (Bruger)",
    muscleId: "upper_back",
    muscleName: "Romboides y Trapecio Medio",
    secondaryMuscles: ["Manguito rotador externo", "Deltoides posterior"],
    equipment: "ninguno",
    durationSeconds: 45,
    difficulty: "Principiante",
    officeFocus: "Postura & Cifosis",
    youtubeId: "y9-_6xBgJbE",
    visualAnimationType: "scapular",
    instructions: [
      "De pie o sentado erguido, abre los brazos a los lados con las palmas hacia adelante.",
      "Gira los pulgares hacia atrás abriendo el pecho al máximo.",
      "Junta las escápulas atrás apretando como si sujetaras una moneda.",
      "Mantén 3 segundos de tensión y relaja suavemente."
    ],
    breathingTip: "Inhala abriendo el pecho, exhala sosteniendo la contracción.",
    commonMistakes: "Elevar los hombros hacia las orejas durante la retracción.",
    iconType: "strength"
  },
  {
    id: "ex-back-2",
    title: "Remo Invertido Isométrico en Silla",
    muscleId: "upper_back",
    muscleName: "Romboides y Trapecio Medio",
    secondaryMuscles: ["Dorsal ancho", "Erectores espinales"],
    equipment: "escritorio",
    durationSeconds: 50,
    difficulty: "Intermedio",
    officeFocus: "Postura & Cifosis",
    youtubeId: "y9-_6xBgJbE",
    visualAnimationType: "chair-row",
    instructions: [
      "Siéntate en el borde de la silla con los codos pegados a los costados.",
      "Empuja los codos firmemente contra el respaldo o reposabrazos hacia atrás.",
      "Proyecta el esternón hacia adelante sintiendo la activación de toda la espalda alta.",
      "Sostén 5 segundos de presión por 3 segundos de descanso (6 repeticiones)."
    ],
    breathingTip: "Respira de forma continua sin bloquear el aire (no hagas Valsalva).",
    commonMistakes: "Flexionar el cuello hacia adelante.",
    iconType: "strength"
  },

  // ZONA LUMBAR & CORE
  {
    id: "ex-lumbar-1",
    title: "Gato-Camello en Cuadrupedia o de Pie sobre Escritorio",
    muscleId: "lower_back",
    muscleName: "Zona Lumbar y Erectores",
    secondaryMuscles: ["Transverso abdominal", "Columna dorsal"],
    equipment: "escritorio",
    durationSeconds: 60,
    difficulty: "Principiante",
    officeFocus: "Alivio Lumbar",
    youtubeId: "Pnbwyxh4LJs",
    visualAnimationType: "cat-cow",
    instructions: [
      "Apoya las manos en el borde del escritorio con rodillas semiflexionadas.",
      "Inhala arqueando suavemente la espalda y mirando al frente (Gato).",
      "Exhala redondeando la columna como un gato erizado, metiendo el abdomen (Camello).",
      "Muévete con fluidez articular durante 1 minuto completo."
    ],
    breathingTip: "Sincroniza 4 segundos de inhalación con 4 segundos de exhalación.",
    commonMistakes: "Forzar rangos articulares extremos si existe dolor agudo.",
    iconType: "mobility"
  },
  {
    id: "ex-core-1",
    title: "Plancha Inclinada de Escritorio con Retroversión",
    muscleId: "abs",
    muscleName: "Abdomen y Core Profundo",
    secondaryMuscles: ["Serrato", "Oblicuos"],
    equipment: "escritorio",
    durationSeconds: 45,
    difficulty: "Intermedio",
    officeFocus: "Alivio Lumbar",
    youtubeId: "y9-_6xBgJbE",
    visualAnimationType: "plank",
    instructions: [
      "Apoya los antebrazos firmemente sobre el escritorio dando 3 pasos hacia atrás.",
      "Forma una línea recta impecable desde los talones hasta la coronilla.",
      "Aprieta el abdomen y los glúteos para evitar que la pelvis se hunda.",
      "Sostén 30 a 45 segundos respirando calmadamente."
    ],
    breathingTip: "Mantén el ombligo pegado a la columna en cada exhalación.",
    commonMistakes: "Dejar caer la cadera hacia el piso comprimiendo las lumbares.",
    iconType: "strength"
  },

  // MUÑECAS & ANTEBRAZOS
  {
    id: "ex-wrists-1",
    title: "Descompresión y Bombeo Miofascial del Túnel Carpiano",
    muscleId: "wrists",
    muscleName: "Antebrazos y Muñecas",
    secondaryMuscles: ["Tendones flexores y extensores"],
    equipment: "ninguno",
    durationSeconds: 45,
    difficulty: "Principiante",
    officeFocus: "Túnel Carpiano",
    youtubeId: "Pnbwyxh4LJs",
    visualAnimationType: "wrist-stretch",
    instructions: [
      "Extiende un brazo al frente con la palma hacia adelante (gesto de 'alto').",
      "Con la otra mano, jala suavemente los 4 dedos hacia el cuerpo.",
      "Abre y cierra los dedos lentamente mientras estiras para descomprimir el nervio mediano.",
      "Invierte el estiramiento apuntando los dedos hacia el suelo."
    ],
    breathingTip: "Respira relajado, sin tensar los hombros.",
    commonMistakes: "Aplicar demasiada fuerza sobre los dedos.",
    iconType: "stretch"
  },

  // CADERA & GLÚTEOS
  {
    id: "ex-hips-1",
    title: "Estocada de Apertura de Psoas en Silla o Suelo",
    muscleId: "hips",
    muscleName: "Flexores de Cadera (Psoas)",
    secondaryMuscles: ["Cuádriceps", "Glúteo opuesto"],
    equipment: "ninguno",
    durationSeconds: 60,
    difficulty: "Principiante",
    officeFocus: "Alivio Lumbar",
    youtubeId: "Pnbwyxh4LJs",
    visualAnimationType: "hip-flexor",
    instructions: [
      "Da un paso largo hacia atrás apoyando la rodilla trasera en el piso o colchoneta.",
      "Realiza una ligera retroversión pélvica (mete los glúteos).",
      "Desplaza suavemente el peso hacia adelante sintiendo la apertura profunda del psoas.",
      "Eleva el brazo del mismo lado para potenciar la fascia anterior."
    ],
    breathingTip: "Exhala al profundizar la apertura de la cadera.",
    commonMistakes: "Arquear la espalda baja en lugar de bascular la pelvis.",
    iconType: "stretch"
  },
  {
    id: "ex-glutes-1",
    title: "Puente de Glúteo Isométrico con Retroversión",
    muscleId: "glutes",
    muscleName: "Glúteos (Mayor y Medio)",
    secondaryMuscles: ["Isquiosurales", "Core profundo"],
    equipment: "ninguno",
    durationSeconds: 50,
    difficulty: "Principiante",
    officeFocus: "Amnesia Glútea",
    youtubeId: "WnYR9zSHyKw",
    visualAnimationType: "glute-bridge",
    instructions: [
      "Acuéstate boca arriba con rodillas flexionadas y pies apoyados al ancho de hombros.",
      "Empuja desde los talones elevando la cadera hasta alinear rodillas, pelvis y hombros.",
      "Aprieta los glúteos al máximo arriba durante 3 segundos.",
      "Baja rozando el piso y repite 12 a 15 veces."
    ],
    breathingTip: "Exhala al subir apretando el glúteo, inhala al descender.",
    commonMistakes: "Empujar con la zona lumbar en vez de con los glúteos.",
    iconType: "strength"
  },
  {
    id: "ex-glutes-2",
    title: "Estiramiento Piramidal en Forma de '4' Sentado",
    muscleId: "glutes",
    muscleName: "Glúteos (Mayor y Medio)",
    secondaryMuscles: ["Rotadores externos de cadera"],
    equipment: "escritorio",
    durationSeconds: 60,
    difficulty: "Principiante",
    officeFocus: "Alivio Lumbar",
    youtubeId: "Pnbwyxh4LJs",
    visualAnimationType: "piriformis",
    instructions: [
      "Siéntate en el borde de la silla con la espalda recta.",
      "Cruza el tobillo derecho sobre la rodilla izquierda formando un '4'.",
      "Inclina el torso hacia adelante desde la cadera con la columna erguida.",
      "Siente el alivio inmediato en el glúteo profundo y nervio ciático."
    ],
    breathingTip: "Exhala inclinando el torso unos milímetros más en cada respiración.",
    commonMistakes: "Encorvar la espalda; la inclinación debe nacer de la pelvis.",
    iconType: "stretch"
  },

  // PIERNAS & PANTORRILLAS
  {
    id: "ex-calves-1",
    title: "Elevaciones de Talón & Bombeo Venoso Soleo-Gemelos",
    muscleId: "calves",
    muscleName: "Gemelos y Tobillos",
    secondaryMuscles: ["Fascia plantar", "Tibial anterior"],
    equipment: "ninguno",
    durationSeconds: 45,
    difficulty: "Principiante",
    officeFocus: "Movilidad General",
    youtubeId: "iUrVkJls9y4",
    visualAnimationType: "calf-raise",
    instructions: [
      "De pie, apoya las yemas de los dedos en el escritorio para equilibrarte.",
      "Elévate sobre la punta de los pies lo más alto posible contrayendo gemelos.",
      "Baja con control y eleva las puntas de los pies apoyándote en los talones.",
      "Realiza 20 repeticiones continuas para activar el retorno venoso."
    ],
    breathingTip: "Ritmo continuo y constante.",
    commonMistakes: "Rebotar rápido sin controlar la bajada excéntrica.",
    iconType: "mobility"
  }
];
