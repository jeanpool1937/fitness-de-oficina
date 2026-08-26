import { Phase, TrainerInfo, WorkoutDay } from "../types";

export const TRAINERS: Record<string, TrainerInfo> = {
  "Sergio Peinado": {
    name: "Sergio Peinado",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "Lic. Ciencias de la Actividad Física y Salud",
    channel: "Fuertacos / Sergio Peinado"
  },
  "Chuy Almada": {
    name: "Chuy Almada",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    role: "Especialista en Acondicionamiento y Boxeo",
    channel: "Chuy Almada Fitness"
  },
  "Pipe Arenas": {
    name: "Pipe Arenas",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    role: "Entrenador Funcional y Alta Intensidad",
    channel: "Pipe Arenas Trainer"
  }
};

export const PHASES: Phase[] = [
  {
    id: 1,
    name: "Fase 1: Despertar Postural y Adaptación",
    weeksLabel: "Semanas 1 - 3",
    startWeek: 1,
    endWeek: 3,
    badge: "Adaptación",
    goal: "Corregir el síndrome del oficinista cruzado superior e inferior, activar el core y reactivar el metabolismo matutino.",
    description: "Enfocada en movilidad articular, descompresión espinal y cardio de bajo impacto para crear el hábito sin sobrecargar articulaciones.",
    accentColor: "from-emerald-500 to-teal-600"
  },
  {
    id: 2,
    name: "Fase 2: Fuerza Funcional y Resistencia Metabólica",
    weeksLabel: "Semanas 4 - 8",
    startWeek: 4,
    endWeek: 8,
    badge: "Consistencia",
    goal: "Fortalecer la musculatura estabilizadora profunda, glúteos, deltoides posteriores y aumentar la quema calórica residual.",
    description: "Incremento progresivo de intensidad combinando ejercicios de fuerza con peso corporal y circuitos dinámicos de 15 minutos.",
    accentColor: "from-blue-500 to-indigo-600"
  },
  {
    id: 3,
    name: "Fase 3: Potencia, Movilidad Total y Consolidación",
    weeksLabel: "Semanas 9 - 12",
    startWeek: 9,
    endWeek: 12,
    badge: "Maestría",
    goal: "Consolidar una postura erguida impecable, máxima agilidad muscular y un nivel físico sobresaliente para la vida laboral.",
    description: "Circuitos funcionales combinados de alta eficiencia, trabajo pliométrico controlado y secuencias completas de cuerpo entero.",
    accentColor: "from-amber-500 to-orange-600"
  }
];

// YouTube IDs oficiales provistos
export const OFFICIAL_VIDEOS = {
  CARDIO_CERO_IMPACTO: "iUrVkJls9y4", // Sergio Peinado
  MOVILIDAD_POSTURA: "Pnbwyxh4LJs",    // Sergio Peinado
  FUERZA_PRINCIPIANTES: "y9-_6xBgJbE", // Chuy Almada
  RUTINA_COMPLETA: "WnYR9zSHyKw",      // Sergio Peinado
  CIRCUITO_AVANZADO: "wVu5f89LGOQ"     // Pipe Arenas
};

// Generador estructurado de las 12 semanas (84 días de lunes a domingo)
export const WORKOUT_PROGRAM: WorkoutDay[] = [];

const DAYS_META = [
  { dayOfWeek: 1, name: "Lunes", short: "Lun" },
  { dayOfWeek: 2, name: "Martes", short: "Mar" },
  { dayOfWeek: 3, name: "Miércoles", short: "Mié" },
  { dayOfWeek: 4, name: "Jueves", short: "Jue" },
  { dayOfWeek: 5, name: "Viernes", short: "Vie" },
  { dayOfWeek: 6, name: "Sábado", short: "Sáb" },
  { dayOfWeek: 7, name: "Domingo", short: "Dom" },
];

for (let week = 1; week <= 12; week++) {
  let phaseId = 1;
  if (week >= 4 && week <= 8) phaseId = 2;
  if (week >= 9) phaseId = 3;

  DAYS_META.forEach((dayMeta) => {
    const id = `w${week}-d${dayMeta.dayOfWeek}`;
    let title = "";
    let posturalFocus = "";
    let trainer = "Sergio Peinado";
    let youtubeId = OFFICIAL_VIDEOS.MOVILIDAD_POSTURA;
    let category: WorkoutDay["category"] = "movilidad";
    let intensity: WorkoutDay["intensity"] = "Baja";
    let targetMuscles = ["Columna vertebral", "Pectorales", "Cuello"];
    let executionNotes = [
      "Mantén la respiración diafragmática constante.",
      "Realiza cada rango de movimiento sin rebotes ni tirones.",
      "Si sientes molestia en la zona lumbar, reduce la amplitud."
    ];
    let ergonomicTip = "Ajusta la altura de tu monitor para que el borde superior quede a la altura de tus ojos.";

    // Definición por Fase y Día de la semana
    if (phaseId === 1) {
      // FASE 1 (Semanas 1-3)
      switch (dayMeta.dayOfWeek) {
        case 1: // Lunes
          title = `Activación y Descompresión Lumbar Matutina (S${week})`;
          posturalFocus = "Liberación de la fascia toracolumbar y alineación espinal tras el descanso de fin de semana.";
          trainer = "Sergio Peinado";
          youtubeId = OFFICIAL_VIDEOS.MOVILIDAD_POSTURA;
          category = "movilidad";
          intensity = "Baja";
          targetMuscles = ["Erectores espinales", "Psoas ilíaco", "Trapecio inferior"];
          executionNotes = [
            "Concéntrate en la elongación axial de la coronilla hacia el techo.",
            "Descomprime las vértebras antes de tu primera videollamada del día.",
            "15 minutos continuos a ritmo pausado y controlado."
          ];
          ergonomicTip = "Mantén la pelvis neutra al sentarte: apoya los isquiones directamente sobre el asiento.";
          break;
        case 2: // Martes
          title = `Cardio Cero Impacto & Despertar Metabólico (S${week})`;
          posturalFocus = "Activación de la bomba muscular de las pantorrillas y apertura de cadera sin estrés articular.";
          trainer = "Sergio Peinado";
          youtubeId = OFFICIAL_VIDEOS.CARDIO_CERO_IMPACTO;
          category = "cardio";
          intensity = "Media";
          targetMuscles = ["Gemelos", "Cuádriceps", "Glúteo medio", "Sistema cardiovascular"];
          executionNotes = [
            "Pisa con suavidad apoyando primero el antepié y luego el talón.",
            "Activa el abdomen en cada movimiento de elevación de rodillas.",
            "Ritmo ideal para acelerar el ritmo cardíaco sin sudar en exceso."
          ];
          ergonomicTip = "Coloca tus pies planos sobre el piso o en un reposapiés para evitar la presión bajo los muslos.";
          break;
        case 3: // Miércoles
          title = `Fuerza Postural Básica y Retracción Escapular (S${week})`;
          posturalFocus = "Corrección de hombros caídos hacia adelante (cifosis dorsal de escritorio).";
          trainer = "Chuy Almada";
          youtubeId = OFFICIAL_VIDEOS.FUERZA_PRINCIPIANTES;
          category = "fuerza";
          intensity = "Media";
          targetMuscles = ["Romboides", "Dorsal ancho", "Core profundo", "Glúteos"];
          executionNotes = [
            "Junta las escápulas atrás como si apretaras un lápiz entre ellas.",
            "Aprieta el abdomen al final de cada repetición para proteger la zona lumbar.",
            "Controla la fase excéntrica (bajada) en 3 segundos."
          ];
          ergonomicTip = "Apoya los codos a 90 grados sobre los reposabrazos para relajar los hombros mientras tecleas.";
          break;
        case 4: // Jueves
          title = `Movilidad de Cuello, Muñecas y Cadera (S${week})`;
          posturalFocus = "Alivio del síndrome del túnel carpiano y prevención del cuello de texto (text-neck).";
          trainer = "Sergio Peinado";
          youtubeId = OFFICIAL_VIDEOS.MOVILIDAD_POSTURA;
          category = "movilidad";
          intensity = "Baja";
          targetMuscles = ["Esternocleidomastoideo", "Flexores de muñeca", "Rotadores de cadera"];
          executionNotes = [
            "Movimientos suaves de rotación y flexión lateral cervical sin forzar.",
            "Extensión activa de dedos y muñecas para desinflamar tendones.",
            "Aperturas en 'mariposa' y estocadas bajas para descontracturar flexores."
          ];
          ergonomicTip = "Usa un mouse ergonómico vertical o mantén la muñeca en línea recta con el antebrazo.";
          break;
        case 5: // Viernes
          title = `Cardio Dinámico Suave & Quema Grasa (S${week})`;
          posturalFocus = "Aceleración circulatoria de fin de semana para eliminar toxinas del sedentarismo.";
          trainer = "Sergio Peinado";
          youtubeId = OFFICIAL_VIDEOS.CARDIO_CERO_IMPACTO;
          category = "cardio";
          intensity = "Media";
          targetMuscles = ["Cuerpo completo", "Core", "Isquiosurales"];
          executionNotes = [
            "Mantén un braceo activo y coordinado con los pasos.",
            "Sonríe y conecta con la energía matutina antes del cierre semanal.",
            "Finaliza con 2 minutos de respiración profunda en calma."
          ];
          ergonomicTip = "Aplica la regla 20-20-20: cada 20 minutos mira a 20 pies (6 metros) durante 20 segundos.";
          break;
        case 6: // Sábado
          title = `Rutina Integral de Alineación y Vigor (S${week})`;
          posturalFocus = "Integración cinemática completa: pies a cabeza para liberar tensión acumulada.";
          trainer = "Sergio Peinado";
          youtubeId = OFFICIAL_VIDEOS.RUTINA_COMPLETA;
          category = "completa";
          intensity = "Media";
          targetMuscles = ["Cadena posterior", "Glúteo mayor", "Abdominales transversos"];
          executionNotes = [
            "Combina secuencias de movilidad con activación muscular de todo el cuerpo.",
            "Tómate tu tiempo para sentir cada articulación libre de bloqueos.",
            "Hidrátate con 500ml de agua al despertar antes de iniciar."
          ];
          ergonomicTip = "Aprovecha el fin de semana para caminar descalzo sobre césped o alfombra para activar receptores plantares.";
          break;
        case 7: // Domingo
          title = `Recuperación Regenerativa & Reset Mental (S${week})`;
          posturalFocus = "Relajación miofascial pasiva y respiración profunda para preparar la semana.";
          trainer = "Sergio Peinado";
          youtubeId = OFFICIAL_VIDEOS.MOVILIDAD_POSTURA;
          category = "recuperacion";
          intensity = "Baja";
          targetMuscles = ["Diafragma", "Zona lumbar", "Pectoral menor"];
          executionNotes = [
            "Respira 4 segundos por la nariz, retén 4 y exhala 6 por la boca.",
            "Estiramientos prolongados de 45 a 60 segundos por postura.",
            "Deja tu espacio de trabajo listo y ordenado para el lunes a las 6:00 AM."
          ];
          ergonomicTip = "Asegura entre 7 y 8 horas de sueño continuo para reparar el tejido conectivo muscular.";
          break;
      }
    } else if (phaseId === 2) {
      // FASE 2 (Semanas 4-8)
      switch (dayMeta.dayOfWeek) {
        case 1: // Lunes
          title = `Fuerza Funcional: Espalda y Glúteos de Acero (S${week})`;
          posturalFocus = "Desactivación de la amnesia glútea y fortalecimiento del dorsal para una espalda erguida.";
          trainer = "Chuy Almada";
          youtubeId = OFFICIAL_VIDEOS.FUERZA_PRINCIPIANTES;
          category = "fuerza";
          intensity = "Media-Alta";
          targetMuscles = ["Glúteos", "Dorsales", "Isquiosurales", "Core"];
          executionNotes = [
            "Puente de glúteo con pausa de 2 segundos arriba en máxima contracción.",
            "Remos invertidos con toalla o peso corporal.",
            "Mantén la pelvis neutra y cuello alineado en todo el ejercicio."
          ];
          ergonomicTip = "Configura la inclinación de tu respaldo a 100-110 grados para reducir la presión en discos L4-L5.";
          break;
        case 2: // Martes
          title = `Cardio Quema Grasa y Agilidad Matutina (S${week})`;
          posturalFocus = "Movilidad rotacional del torso y reactivación cardiovascular pre-laboral.";
          trainer = "Sergio Peinado";
          youtubeId = OFFICIAL_VIDEOS.CARDIO_CERO_IMPACTO;
          category = "cardio";
          intensity = "Media-Alta";
          targetMuscles = ["Tren inferior", "Deltoides", "Cardiovascular"];
          executionNotes = [
            "Aumenta la cadencia de pasos en los intervalos de 45 segundos.",
            "Aterrizajes silenciosos como un felino para amortiguar impacto.",
            "Monitorea tu respiración: debes poder hablar entrecortado."
          ];
          ergonomicTip = "Levántate cada 50 minutos para dar 100 pasos alrededor de tu oficina o departamento.";
          break;
        case 3: // Miércoles
          title = `Circuito Metabólico Escalonado 15 Min (S${week})`;
          posturalFocus = "Estabilidad central anti-extensión y anti-rotación bajo fatiga controlada.";
          trainer = "Pipe Arenas";
          youtubeId = OFFICIAL_VIDEOS.CIRCUITO_AVANZADO;
          category = "circuito";
          intensity = "Media-Alta";
          targetMuscles = ["Core 360°", "Hombros", "Cuádriceps", "Cardio"];
          executionNotes = [
            "Realiza 40 segundos de trabajo por 20 segundos de descanso activo.",
            "Si un ejercicio es muy exigente, usa la variante de apoyo de rodillas.",
            "Mantén el ritmo constante durante los 15 minutos."
          ];
          ergonomicTip = "Mantén la pantalla perpendicular a las ventanas para evitar reflejos y fatiga ocular.";
          break;
        case 4: // Jueves
          title = `Desbloqueo Torácico y Cadena Posterior (S${week})`;
          posturalFocus = "Liberación del pectoral menor comprimido y elongación del psoas ilíaco.";
          trainer = "Sergio Peinado";
          youtubeId = OFFICIAL_VIDEOS.MOVILIDAD_POSTURA;
          category = "movilidad";
          intensity = "Media";
          targetMuscles = ["Caja torácica", "Psoas", "Rotadores externos", "Columna dorsal"];
          executionNotes = [
            "Extensión dorsal sobre toalla enrollada o colchoneta.",
            "Rotaciones torácicas en cuadrupedia con mirada a la mano arriba.",
            "Siente cómo se expanden tus costillas en cada inhalación."
          ];
          ergonomicTip = "Coloca los documentos que leas en un atril o soporte para no flexionar el cuello continuamente.";
          break;
        case 5: // Viernes
          title = `Fuerza Total: Tren Superior & Core Anti-Silla (S${week})`;
          posturalFocus = "Contrarrestar el encorvamiento de escribir en teclado durante 40 horas semanales.";
          trainer = "Chuy Almada";
          youtubeId = OFFICIAL_VIDEOS.FUERZA_PRINCIPIANTES;
          category = "fuerza";
          intensity = "Media-Alta";
          targetMuscles = ["Pectorales", "Tríceps", "Abdomen", "Escápulas"];
          executionNotes = [
            "Flexiones adaptadas (en mesa, pared o suelo) cuidando que los codos formen una flecha de 45°.",
            "Planchas frontales con retroversión pélvica.",
            "Enfoque en tensión mecánica controlada."
          ];
          ergonomicTip = "Alterna entre trabajar sentado y trabajar de pie si cuentas con un standing desk.";
          break;
        case 6: // Sábado
          title = `Rutina Completa de Alta Energía Fin de Semana (S${week})`;
          posturalFocus = "Sinergia neuromuscular total: fuerza, resistencia y rango de movimiento óptimo.";
          trainer = "Sergio Peinado";
          youtubeId = OFFICIAL_VIDEOS.RUTINA_COMPLETA;
          category = "completa";
          intensity = "Alta";
          targetMuscles = ["Todo el cuerpo", "Capacidad aeróbica"];
          executionNotes = [
            "Disfruta la fluidez de movimientos y la música motivadora del video.",
            "Esfuerzo percibido 7-8 sobre 10.",
            "Hidratación con electrolitos naturales post-sesión."
          ];
          ergonomicTip = "Sal a recibir luz solar directa durante 15 minutos en la mañana para sincronizar tu ritmo circadiano.";
          break;
        case 7: // Domingo
          title = `Movilidad Miofascial y Descanso Terapéutico (S${week})`;
          posturalFocus = "Descompresión sacrolumbar y oxigenación celular profunda.";
          trainer = "Sergio Peinado";
          youtubeId = OFFICIAL_VIDEOS.MOVILIDAD_POSTURA;
          category = "recuperacion";
          intensity = "Baja";
          targetMuscles = ["Fascia plantar", "Gemelos", "Zona lumbar", "Cuello"];
          executionNotes = [
            "Rueda una pelota de tenis bajo la planta de los pies.",
            "Mantén posturas de yoga sencillas (niño, cobra suave, perro boca abajo).",
            "Relaja mandíbula y entrecejo (zonas de acumulación de estrés laboral)."
          ];
          ergonomicTip = "Planifica tus snacks saludables (frutos secos, fruta fresca) para la semana laboral.";
          break;
      }
    } else {
      // FASE 3 (Semanas 9-12)
      switch (dayMeta.dayOfWeek) {
        case 1: // Lunes
          title = `Potencia Matutina & Activación Neuromuscular (S${week})`;
          posturalFocus = "Máxima alineación dinámica y reactividad motriz para iniciar la semana con vigor extremo.";
          trainer = "Pipe Arenas";
          youtubeId = OFFICIAL_VIDEOS.CIRCUITO_AVANZADO;
          category = "circuito";
          intensity = "Alta";
          targetMuscles = ["Fibras rápidas", "Core", "Tren superior e inferior"];
          executionNotes = [
            "Transiciones rápidas entre ejercicios manteniendo técnica estricta.",
            "Control de la estabilidad de rodillas y tobillos en aterrizajes.",
            "Desata tu máximo potencial a las 6:00 AM."
          ];
          ergonomicTip = "Verifica que tus pies no cuelguen ni se crucen bajo la silla durante la jornada.";
          break;
        case 2: // Martes
          title = `Cardio HIIT Cero Impacto Avanzado (S${week})`;
          posturalFocus = "Resistencia cardiorrespiratoria de alto rendimiento sin daño articular.";
          trainer = "Sergio Peinado";
          youtubeId = OFFICIAL_VIDEOS.CARDIO_CERO_IMPACTO;
          category = "cardio";
          intensity = "Alta";
          targetMuscles = ["Cardio", "Abdominales", "Piernas", "Hombros"];
          executionNotes = [
            "Intervalos 30s explosión / 15s recuperación.",
            "Mantén la espalda recta durante los desplazamientos laterales.",
            "Enfoque en velocidad de ejecución con control postural."
          ];
          ergonomicTip = "Toma pausas visuales activas: mira por la ventana a puntos lejanos para relajar los músculos ciliares.";
          break;
        case 3: // Miércoles
          title = `Fuerza Calisténica & Estabilidad Escapular Máxima (S${week})`;
          posturalFocus = "Blindaje lumbar y hombros sólidos como roca para soportar horas de trabajo.";
          trainer = "Chuy Almada";
          youtubeId = OFFICIAL_VIDEOS.FUERZA_PRINCIPIANTES;
          category = "fuerza";
          intensity = "Alta";
          targetMuscles = ["Serrato anterior", "Romboides", "Core 360", "Femorales"];
          executionNotes = [
            "Fondos controlados y planchas dinámicas con toque de hombros.",
            "Alinea cabeza, cuello y columna como una sola tabla rígida.",
            "Siente la activación profunda del abdomen antes de mover extremidades."
          ];
          ergonomicTip = "Mantén el teclado y mouse a la misma altura de tus codos flexionados a 90 grados.";
          break;
        case 4: // Jueves
          title = `Movilidad Articular 3D & Descompresión Cervicotorácica (S${week})`;
          posturalFocus = "Amplitud articular completa en todos los planos (sagital, frontal y transversal).";
          trainer = "Sergio Peinado";
          youtubeId = OFFICIAL_VIDEOS.MOVILIDAD_POSTURA;
          category = "movilidad";
          intensity = "Media";
          targetMuscles = ["Cápsulas articulares", "Manguito rotador", "Columna dorsal"];
          executionNotes = [
            "Círculos escapulares amplios y controlados.",
            "Elongación profunda del cuadrado lumbar y piramidal.",
            "Conexión mente-músculo en cada respiración diafragmática."
          ];
          ergonomicTip = "Evita sujetar el teléfono entre el hombro y la oreja; usa audífonos manos libres.";
          break;
        case 5: // Viernes
          title = `Circuito Total Body: Potencia y Resistencia de Cierre (S${week})`;
          posturalFocus = "Consolidación de patrones de movimiento funcionales (empuje, tracción, bisagra de cadera).";
          trainer = "Pipe Arenas";
          youtubeId = OFFICIAL_VIDEOS.CIRCUITO_AVANZADO;
          category = "circuito";
          intensity = "Alta";
          targetMuscles = ["Cuerpo completo", "Core profundo", "Sistema metabólico"];
          executionNotes = [
            "Completa las 3 rondas del circuito dando tu 100% de enfoque.",
            "Concéntrate en la postura perfecta incluso cuando sientas fatiga.",
            "¡Celebra el cierre de semana con energía inquebrantable!"
          ];
          ergonomicTip = "Al terminar tu jornada, desconéctate de pantallas 1 hora antes de dormir para un descanso profundo.";
          break;
        case 6: // Sábado
          title = `Maestría Física & Rutina Completa de Alto Rendimiento (S${week})`;
          posturalFocus = "Integración cinemática óptima y sensación de ligereza corporal total.";
          trainer = "Sergio Peinado";
          youtubeId = OFFICIAL_VIDEOS.RUTINA_COMPLETA;
          category = "completa";
          intensity = "Alta";
          targetMuscles = ["Cuerpo completo", "Capacidad pulmonar", "Postura erguida"];
          executionNotes = [
            "15 minutos fluidos que combinan cardio, movilidad y fuerza activa.",
            "Postura erguida, pecho abierto y mirada al frente.",
            "Nota la diferencia radical en tu energía comparado con la Semana 1."
          ];
          ergonomicTip = "Realiza actividades recreativas al aire libre como senderismo o ciclismo suave este fin de semana.";
          break;
        case 7: // Domingo
          title = `Restauración Postural Profunda & Meditación Activa (S${week})`;
          posturalFocus = "Equilibrio neurovegetativo, desinflamación sistémica y agradecimiento corporal.";
          trainer = "Sergio Peinado";
          youtubeId = OFFICIAL_VIDEOS.MOVILIDAD_POSTURA;
          category = "recuperacion";
          intensity = "Baja";
          targetMuscles = ["Diafragma", "Fascia corporal", "Sistema nervioso parasimpático"];
          executionNotes = [
            "Respira pausadamente en postura de mariposa acostada.",
            "Alinea tu columna vertebral con soporte bajo las rodillas si es necesario.",
            "Visualiza tus metas de salud física y productividad para la próxima semana."
          ];
          ergonomicTip = "Mantén una botella de 1 litro de agua fresca en tu escritorio para beber a lo largo del día.";
          break;
      }
    }

    WORKOUT_PROGRAM.push({
      id,
      weekNumber: week,
      dayOfWeek: dayMeta.dayOfWeek,
      dayName: dayMeta.name,
      dayShort: dayMeta.short,
      phaseId,
      title,
      posturalFocus,
      durationMinutes: 15,
      trainer,
      trainerRole: TRAINERS[trainer]?.role,
      youtubeId,
      category,
      executionNotes,
      ergonomicTip,
      intensity,
      targetMuscles
    });
  });
}
