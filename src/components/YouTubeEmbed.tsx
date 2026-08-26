import React, { useState } from "react";
import { Play, Film, ExternalLink } from "lucide-react";
import { OFFICIAL_VIDEOS } from "../data/workoutProgram";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  trainer: string;
  onSelectAlternativeVideo?: (id: string) => void;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title,
  trainer,
  onSelectAlternativeVideo,
}) => {
  const [activeVideoId, setActiveVideoId] = useState<string>(videoId);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Sincronizar si cambia el prop
  React.useEffect(() => {
    setActiveVideoId(videoId);
    setIsPlaying(false);
  }, [videoId]);

  const VIDEO_OPTIONS = [
    { id: OFFICIAL_VIDEOS.MOVILIDAD_POSTURA, label: "Movilidad & Postura", trainer: "Sergio Peinado" },
    { id: OFFICIAL_VIDEOS.CARDIO_CERO_IMPACTO, label: "Cardio Cero Impacto", trainer: "Sergio Peinado" },
    { id: OFFICIAL_VIDEOS.FUERZA_PRINCIPIANTES, label: "Fuerza Principiantes", trainer: "Chuy Almada" },
    { id: OFFICIAL_VIDEOS.RUTINA_COMPLETA, label: "Rutina Completa Total", trainer: "Sergio Peinado" },
    { id: OFFICIAL_VIDEOS.CIRCUITO_AVANZADO, label: "Circuito Metabólico", trainer: "Pipe Arenas" },
  ];

  const handleSelectVideo = (id: string) => {
    setActiveVideoId(id);
    setIsPlaying(true);
    if (onSelectAlternativeVideo) {
      onSelectAlternativeVideo(id);
    }
  };

  return (
    <div className="space-y-3">
      {/* Video Player Container (16:9 Aspect Ratio) */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
        {!isPlaying ? (
          // Custom Cover / Thumbnail with Play Overlay (Prevents auto heavy loading on iOS)
          <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
            <img
              src={`https://img.youtube.com/vi/${activeVideoId}/maxresdefault.jpg`}
              alt={title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              onError={(e) => {
                // Fallback a hqdefault si maxresdefault no está disponible
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${activeVideoId}/hqdefault.jpg`;
              }}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-black/40" />

            {/* Play Button Trigger */}
            <button
              onClick={() => setIsPlaying(true)}
              className="relative z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-500/90 text-dark-bg hover:bg-brand-400 hover:scale-110 shadow-xl shadow-brand-500/30 transition-all duration-300 transform active:scale-95"
              aria-label="Reproducir video de rutina"
            >
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-dark-bg translate-x-0.5" />
            </button>

            {/* Bottom info badge */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
              <span className="font-semibold px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 line-clamp-1">
                {title} • {trainer}
              </span>
              <span className="font-mono text-[11px] px-2 py-1 rounded-lg bg-brand-500 text-dark-bg font-bold">
                15 MIN
              </span>
            </div>
          </div>
        ) : (
          // Embebed IFrame
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        )}
      </div>

      {/* Alternative Official Videos Quick Switcher */}
      <div className="glass-panel rounded-xl p-2.5 sm:p-3">
        <div className="flex items-center justify-between gap-2 mb-2 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-brand-400" />
            Videos Oficiales del Programa (15 min)
          </span>
          <a
            href={`https://www.youtube.com/watch?v=${activeVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-slate-400 hover:text-brand-400 flex items-center gap-1 transition-colors"
          >
            <span>Ver en YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {VIDEO_OPTIONS.map((opt) => {
            const isSelected = opt.id === activeVideoId;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectVideo(opt.id)}
                className={`flex-shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  isSelected
                    ? "bg-brand-500/20 border-brand-500 text-brand-300 shadow-sm"
                    : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60"
                }`}
              >
                <div className="text-left">
                  <div className="font-bold text-[11px] leading-tight">{opt.label}</div>
                  <div className="text-[9px] text-slate-400 font-normal">{opt.trainer}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
