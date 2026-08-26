import React, { useState } from "react";
import {
  X,
  Cloud,
  Database,
  Volume2,
  Bell,
  Download,
  Upload,
  Check,
  AlertCircle,
  Key,
  Globe,
  Trash2,
  RefreshCw,
  Copy
} from "lucide-react";
import {
  getSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
  testSupabaseConnection
} from "../services/supabaseClient";
import { storageService } from "../services/storageService";
import { UserProgress } from "../types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onUpdateProgress: (updated: Partial<UserProgress>) => void;
  onReload: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  progress,
  onUpdateProgress,
  onReload,
}) => {
  const [supabaseUrl, setSupabaseUrl] = useState<string>(() => getSupabaseConfig().url);
  const [supabaseAnonKey, setSupabaseAnonKey] = useState<string>(() => getSupabaseConfig().anonKey);
  const [testResult, setTestResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveSupabase = async () => {
    saveSupabaseConfig(supabaseUrl, supabaseAnonKey);
    setIsTesting(true);
    const res = await testSupabaseConnection(supabaseUrl, supabaseAnonKey);
    setIsTesting(false);
    setTestResult(res);
  };

  const handleClearSupabase = () => {
    clearSupabaseConfig();
    setSupabaseUrl("");
    setSupabaseAnonKey("");
    setTestResult(null);
  };

  const handleExportBackup = () => {
    const dataStr = storageService.exportData();
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fitness-de-oficina-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      const imported = await storageService.importData(content);
      if (imported) {
        setImportStatus("¡Progreso importado con éxito!");
        onReload();
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        setImportStatus("Error al leer el archivo de respaldo.");
      }
    };
    reader.readAsText(file);
  };

  const sqlSchemaSnippet = `-- Tabla recomendada en Supabase para sincronización:
CREATE TABLE IF NOT EXISTS fitness_user_progress (
  id TEXT PRIMARY KEY,
  progress_data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar acceso anónimo para la app:
ALTER TABLE fitness_user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir lectura y escritura a clientes de la app" 
ON fitness_user_progress FOR ALL 
USING (true) WITH CHECK (true);`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlSchemaSnippet);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const isConfigured = getSupabaseConfig().isConfigured;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-5 sm:p-7 space-y-6 my-8 text-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Configuración y Nube</h2>
              <p className="text-xs text-slate-400">Sincronización multi-dispositivo y preferencias</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Supabase Cross-Device Sync */}
        <div className="space-y-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-sm text-white">Sincronización con Supabase</h3>
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${
                isConfigured
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isConfigured ? "bg-blue-400 animate-pulse" : "bg-slate-500"}`} />
              {isConfigured ? "Nube Activa" : "Modo Local (Offline)"}
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Si deseas sincronizar tu racha y días completados entre tu teléfono móvil (iOS/Android) y tu computadora de oficina, ingresa tus credenciales de Supabase. Si no las tienes, la app continuará funcionando al 100% de forma local en tu navegador.
          </p>

          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Supabase Project URL</span>
              </label>
              <input
                type="text"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://xyzcompany.supabase.co"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-brand-500 focus:outline-none text-xs font-mono text-white placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-slate-400" />
                <span>Supabase Anon Public API Key</span>
              </label>
              <input
                type="password"
                value={supabaseAnonKey}
                onChange={(e) => setSupabaseAnonKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-brand-500 focus:outline-none text-xs font-mono text-white placeholder:text-slate-600"
              />
            </div>

            {testResult && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  testResult.success
                    ? "bg-brand-950/50 border border-brand-500/40 text-brand-300"
                    : "bg-red-950/50 border border-red-500/40 text-red-300"
                }`}
              >
                {testResult.success ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{testResult.message}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={handleSaveSupabase}
                disabled={isTesting}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-400 text-dark-bg transition-colors flex items-center gap-1.5"
              >
                {isTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Guardar y Probar Conexión</span>
              </button>

              {isConfigured && (
                <button
                  onClick={handleClearSupabase}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-red-950 hover:text-red-300 border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Desconectar Nube</span>
                </button>
              )}
            </div>
          </div>

          {/* Collapsible SQL Script helper */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span>Script SQL para Supabase (opcional):</span>
              <button
                onClick={copySql}
                className="flex items-center gap-1 text-brand-400 hover:text-brand-300 font-semibold"
              >
                {copiedSql ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSql ? "Copiado" : "Copiar SQL"}</span>
              </button>
            </div>
            <pre className="p-2.5 rounded-xl bg-slate-900 text-[10px] font-mono text-slate-300 border border-slate-800 overflow-x-auto">
              {sqlSchemaSnippet}
            </pre>
          </div>
        </div>

        {/* Section 2: Backup Local (Import / Export) */}
        <div className="rounded-2xl bg-slate-950/60 border border-slate-800/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Respaldo Manual (JSON)</h3>
          </div>
          <p className="text-xs text-slate-400">
            Descarga un archivo con todo tu progreso histórico para migrarlo a cualquier otro dispositivo sin requerir base de datos.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={handleExportBackup}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-brand-400" />
              <span>Exportar Progreso JSON</span>
            </button>

            <label className="cursor-pointer px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition-colors">
              <Upload className="w-4 h-4 text-blue-400" />
              <span>Importar Archivo JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>

          {importStatus && (
            <p className="text-xs text-brand-400 font-semibold pt-1 animate-pulse">
              {importStatus}
            </p>
          )}
        </div>

        {/* Section 3: App Audio & Notifications */}
        <div className="rounded-2xl bg-slate-950/60 border border-slate-800/80 p-4 sm:p-5 space-y-3">
          <h3 className="font-bold text-sm text-white">Preferencias de Sonido y Alarmas</h3>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium text-slate-200">Efectos de audio y campanas</span>
              </div>
              <input
                type="checkbox"
                checked={progress.soundEnabled}
                onChange={(e) => onUpdateProgress({ soundEnabled: e.target.checked })}
                className="w-4 h-4 text-brand-500 rounded bg-slate-800 border-slate-700 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium text-slate-200">Recordatorio activo a las 06:00 AM</span>
              </div>
              <input
                type="checkbox"
                checked={progress.reminderEnabled}
                onChange={(e) => onUpdateProgress({ reminderEnabled: e.target.checked })}
                className="w-4 h-4 text-brand-500 rounded bg-slate-800 border-slate-700 focus:ring-0"
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-brand-500 hover:bg-brand-400 text-dark-bg transition-all"
          >
            Listo / Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
