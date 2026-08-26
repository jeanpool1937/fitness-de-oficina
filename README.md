# 🏃 Fitness de Oficina | PWA Matutina 6:00 AM

Aplicación Web Progresiva (PWA) moderna, responsive y multi-dispositivo diseñada para combatir el sedentarismo, corregir el síndrome cruzado superior/inferior de escritorio y recargar la energía antes de la jornada laboral en sesiones de **15 minutos** a las **06:00 AM**.

---

## 🌟 Características Principales

### 1. 🌅 Módulo 6:00 AM y Recordatorios
- **Visualizador de Hora Objetivo**: Muestra en tiempo real el conteo regresivo hacia la sesión matutina de las 6:00 AM.
- **Notificaciones Web (Notification API + Service Worker)**: Suscripción a alarmas nativas para iniciar el día con postura activa.
- **Temporizador de Sesión de 15 Minutos**:
  - Cuenta regresiva regresiva interactiva (900 s).
  - Alerta sonora y campana matutina con **Web Audio API nativo** (100% offline).
  - Modo enfoque en pantalla completa para apoyar el móvil/iPhone en el escritorio.

### 2. 📺 Visor de Rutinas Diarias y Video
- **Estructura en 3 Fases Progresivas (12 Semanas completas)**:
  - **Fase 1 (Semanas 1 - 3)**: Despertar Postural y Adaptación.
  - **Fase 2 (Semanas 4 - 8)**: Fuerza Funcional y Resistencia Metabólica.
  - **Fase 3 (Semanas 9 - 12)**: Potencia, Movilidad Total y Consolidación.
- **Tarjeta Diaria Ergonómica**: Enfoque postural de oficina, músculos activados, duración (15 min), entrenador asignado, notas técnicas y tip ergonómico laboral.
- **Reproductor de Video Responsive**: Embebido YouTube optimizado para iOS con selector rápido de los 5 videos oficiales:
  - Cardio cero impacto: `iUrVkJls9y4` (Sergio Peinado)
  - Movilidad y postura: `Pnbwyxh4LJs` (Sergio Peinado)
  - Fuerza principiantes: `y9-_6xBgJbE` (Chuy Almada)
  - Rutina completa: `WnYR9zSHyKw` (Sergio Peinado)
  - Circuito avanzado escalado: `wVu5f89LGOQ` (Pipe Arenas)

### 3. ✅ Checklist, Hábitos y Analíticas
- **Botón "Completar Sesión de Hoy"**: Animación festiva de confeti (`canvas-confetti`), retroalimentación háptica y registro de racha.
- **Calendario Heatmap Mensual**: Pinta en verde esmeralda los días activos, con navegación mes a mes y selección de días históricos.
- **Panel de Estadísticas**:
  - Racha actual (días seguidos) y mejor racha histórica.
  - Minutos totales acumulados.
  - Porcentaje de avance de la fase actual y total del programa.
  - Gráfico de actividad de los últimos 7 días con fechas en 2 líneas (`26/08` arriba / `mié` abajo).

### 4. ☁️ Sincronización Cross-Device y Fallback Offline
- **Supabase Cloud Sync**: Conexión opcional para sincronizar el progreso entre tu iPhone, Android y PC de oficina.
- **Fallback a LocalStorage**: Funciona de inmediato sin necesidad de backend o conexión a internet.
- **Exportación e Importación JSON**: Respaldo instantáneo descargable en un clic.

### 5. 📱 PWA & Optimización iOS Mobile-First
- `manifest.json` y Service Worker (`sw.js`) configurados con soporte standalone.
- Meta tags de Apple Web App (`apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style: black-translucent`, safe area insets `env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`).
- Guía interactiva de instalación para iPhone (Safari: Compartir -> Añadir a la pantalla de inicio).

---

## 🛠️ Pila Tecnológica

- **Frontend**: React 18 + TypeScript + Vite
- **Estilos**: Tailwind CSS con paleta *Dark Emerald & Golden Sunrise*
- **Iconografía**: Lucide React
- **Audio**: Web Audio API sintetizado nativo (sin archivos externos)
- **Efectos**: Canvas Confetti
- **Base de Datos / Sincronización**: Supabase Client + LocalStorage + Service Worker Caching

---

## 🚀 Comandos de Terminal

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor local de desarrollo
npm run dev

# 3. Compilar para producción
npm run build

# 4. Previsualizar compilación de producción
npm run preview
```

---

## ☁️ Configuración de Supabase (Opcional)

Puedes configurar Supabase desde la interfaz de la app (icono de engranaje ⚙️) o mediante variables de entorno en un archivo `.env`:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

### Script SQL para Supabase:
```sql
CREATE TABLE IF NOT EXISTS fitness_user_progress (
  id TEXT PRIMARY KEY,
  progress_data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE fitness_user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir lectura y escritura a clientes de la app" 
ON fitness_user_progress FOR ALL 
USING (true) WITH CHECK (true);
```
