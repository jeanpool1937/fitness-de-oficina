import React, { useState, useEffect } from "react";
import { Download, Share2, PlusSquare, X, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const InstallPwaBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(() => {
    return localStorage.getItem("fitness_pwa_banner_dismissed") === "true";
  });
  const [showIosGuide, setShowIosGuide] = useState<boolean>(false);

  useEffect(() => {
    // Detectar si ya está instalada como standalone
    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(Boolean(isStandaloneMode));

    // Detectar iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Capturar evento de instalación de Chrome/Android
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  if (isStandalone || dismissed) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else if (isIos) {
      setShowIosGuide(true);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("fitness_pwa_banner_dismissed", "true");
  };

  return (
    <>
      {/* Floating Bottom / Top Banner */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 z-40 p-4 rounded-2xl glass-panel-glow border border-brand-500/40 shadow-2xl animate-sunrise">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500 text-dark-bg flex items-center justify-center font-bold flex-shrink-0 shadow-lg shadow-brand-500/25">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Instalar Fitness de Oficina
              </h4>
              <p className="text-[11px] text-slate-300">
                Acceso directo táctil a las 6:00 AM y modo 100% offline.
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="w-full py-2 px-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-dark-bg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-brand-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Añadir a la Pantalla de Inicio</span>
          </button>
        </div>
      </div>

      {/* iOS Modal Guide */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 mx-auto flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white">Instalar en tu iPhone</h3>
            
            <ol className="text-xs text-slate-300 text-left space-y-2.5 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-500 text-dark-bg font-bold flex items-center justify-center text-[10px]">1</span>
                <span>Toca el botón <strong>Compartir</strong> <Share2 className="inline w-3.5 h-3.5 text-blue-400" /> en Safari.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-500 text-dark-bg font-bold flex items-center justify-center text-[10px]">2</span>
                <span>Baja y selecciona <strong>"Añadir a la pantalla de inicio"</strong> <PlusSquare className="inline w-3.5 h-3.5 text-emerald-400" />.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-500 text-dark-bg font-bold flex items-center justify-center text-[10px]">3</span>
                <span>Toca <strong>Añadir</strong> arriba a la derecha. ¡Listo!</span>
              </li>
            </ol>

            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full py-2.5 rounded-xl bg-brand-500 text-dark-bg font-bold text-xs"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};
