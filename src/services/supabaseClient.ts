import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SupabaseConfig } from "../types";

const LOCAL_STORAGE_KEY_URL = "fitness_oficina_supabase_url";
const LOCAL_STORAGE_KEY_ANON = "fitness_oficina_supabase_anon";

let clientInstance: SupabaseClient | null = null;

export function getSupabaseConfig(): SupabaseConfig {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env || {};
  const url = localStorage.getItem(LOCAL_STORAGE_KEY_URL) || metaEnv.VITE_SUPABASE_URL || "";
  const anonKey = localStorage.getItem(LOCAL_STORAGE_KEY_ANON) || metaEnv.VITE_SUPABASE_ANON_KEY || "";
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
    if (error && error.code !== "PGRST116" && error.code !== "42P01") {
      console.log("Supabase response:", error);
    }
    return { success: true, message: "Conexión a Supabase establecida correctamente." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error desconocido de conexión";
    return { success: false, message: msg };
  }
}
