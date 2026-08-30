import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SupabaseConfig } from "../types";

// Credenciales por defecto preconfiguradas del proyecto Supabase
export const DEFAULT_SUPABASE_URL = "https://soevlirfkblxtetawgcv.supabase.co";
export const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvZXZsaXJma2JseHRldGF3Z2N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MTQ4MDQsImV4cCI6MjA4NDQ5MDgwNH0.KX0QnIJmBzagcVrZuGwsifyCzDzDs_X-M77_QVuc6vc";

const LOCAL_STORAGE_KEY_URL = "fitness_oficina_supabase_url";
const LOCAL_STORAGE_KEY_ANON = "fitness_oficina_supabase_anon";

let clientInstance: SupabaseClient | null = null;

export function getSupabaseConfig(): SupabaseConfig {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env || {};
  const url = localStorage.getItem(LOCAL_STORAGE_KEY_URL) || metaEnv.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const anonKey = localStorage.getItem(LOCAL_STORAGE_KEY_ANON) || metaEnv.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey && url.startsWith("http"))
  };
}

export function saveSupabaseConfig(url: string, anonKey: string): boolean {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_URL, url.trim());
    localStorage.setItem(LOCAL_STORAGE_KEY_ANON, anonKey.trim());
    clientInstance = null; // Reiniciar instancia
    return true;
  } catch {
    return false;
  }
}

export function clearSupabaseConfig(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY_URL);
  localStorage.removeItem(LOCAL_STORAGE_KEY_ANON);
  clientInstance = null;
}

export function getSupabaseClient(): SupabaseClient | null {
  if (clientInstance) return clientInstance;

  const config = getSupabaseConfig();
  if (config.isConfigured) {
    try {
      clientInstance = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      });
      return clientInstance;
    } catch (e) {
      console.warn("Error inicializando cliente Supabase:", e);
      return null;
    }
  }
  return null;
}

export async function testSupabaseConnection(url: string, anonKey: string): Promise<{ success: boolean; message: string }> {
  try {
    const testClient = createClient(url.trim(), anonKey.trim());
    const { error } = await testClient.from("fitness_user_progress").select("id").limit(1);
    if (error) {
      return { success: false, message: `Error Supabase: ${error.message}` };
    }
    return { success: true, message: "¡Conexión exitosa a Supabase con la tabla fitness_user_progress!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error desconocido de conexión";
    return { success: false, message: msg };
  }
}
