-- Migración: Crear tabla de sincronización de progreso de usuario para Fitness de Oficina
CREATE TABLE IF NOT EXISTS public.fitness_user_progress (
  id TEXT PRIMARY KEY,
  progress_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.fitness_user_progress ENABLE ROW LEVEL SECURITY;

-- Política de lectura y escritura para clientes de la aplicación
CREATE POLICY "Permitir acceso publico/anonimo a su progreso"
  ON public.fitness_user_progress
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Índice para búsquedas rápidas por fecha de actualización
CREATE INDEX IF NOT EXISTS idx_fitness_progress_updated ON public.fitness_user_progress(updated_at DESC);
