import React from "react";

interface ExerciseVisualGraphicProps {
  type?: string;
  className?: string;
}

export const ExerciseVisualGraphic: React.FC<ExerciseVisualGraphicProps> = ({
  type = "chest-open",
  className = "w-full h-full",
}) => {
  switch (type) {
    case "neck-tuck":
    case "neck-stretch":
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <defs>
            <linearGradient id="grad-neck" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#22c55e" />
              <stop offset="100%" stop-color="#3b82f6" />
            </linearGradient>
          </defs>
          <rect width="200" height="160" rx="16" fill="#0f172a" />
          {/* Torso & Head */}
          <path d="M 70 145 C 70 120 85 105 100 105 C 115 105 130 120 130 145 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <path d="M 94 88 L 106 88 L 108 108 L 92 108 Z" fill="#475569" />
          {/* Head & Movement Vector */}
          <circle cx="100" cy="65" r="22" fill="#334155" stroke="#4ade80" strokeWidth="2" />
          <circle cx="98" cy="65" r="3" fill="#94a3b8" />
          {/* Animated arrows / motion lines */}
          <path d="M 128 65 L 145 65 M 138 58 L 145 65 L 138 72" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 68 65 L 52 65 M 59 58 L 52 65 L 59 72" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
          {/* Focus badge */}
          <rect x="15" y="15" width="80" height="20" rx="6" fill="#166534" fillOpacity="0.6" />
          <text x="55" y="29" fill="#86efac" fontSize="9" fontWeight="bold" textAnchor="middle">CUELLO & POSTURA</text>
        </svg>
      );

    case "chest-open":
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <rect width="200" height="160" rx="16" fill="#0f172a" />
          {/* Door Frame */}
          <line x1="45" y1="20" x2="45" y2="150" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          <line x1="155" y1="20" x2="155" y2="150" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          {/* Person in Doorway */}
          <circle cx="100" cy="52" r="16" fill="#334155" stroke="#4ade80" strokeWidth="2" />
          <path d="M 100 68 L 100 115 M 100 115 L 85 150 M 100 115 L 115 150" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          {/* Arms on Frame */}
          <path d="M 100 78 L 65 72 L 45 65 M 100 78 L 135 72 L 155 65" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {/* Chest Expansion Glow */}
          <circle cx="100" cy="85" r="14" fill="#22c55e" fillOpacity="0.25" />
          <path d="M 90 85 Q 100 95 110 85" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Badge */}
          <rect x="15" y="15" width="80" height="20" rx="6" fill="#166534" fillOpacity="0.6" />
          <text x="55" y="29" fill="#86efac" fontSize="9" fontWeight="bold" textAnchor="middle">APERTURA PECHO</text>
        </svg>
      );

    case "wall-slide":
    case "scapular":
    case "chair-row":
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <rect width="200" height="160" rx="16" fill="#0f172a" />
          {/* Person Back View */}
          <circle cx="100" cy="45" r="16" fill="#334155" stroke="#38bdf8" strokeWidth="2" />
          <path d="M 100 62 L 100 110" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          {/* Scapula Tension Highlight */}
          <path d="M 85 75 L 95 90 L 88 100 Z M 115 75 L 105 90 L 112 100 Z" fill="#22c55e" fillOpacity="0.6" stroke="#4ade80" strokeWidth="1.5" />
          {/* Arms in W pose */}
          <path d="M 100 72 L 68 85 L 58 55 M 100 72 L 132 85 L 142 55" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {/* Retraction Arrows */}
          <path d="M 72 88 L 84 88 M 80 84 L 84 88 L 80 92" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 128 88 L 116 88 M 120 84 L 116 88 L 120 92" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
          {/* Badge */}
          <rect x="15" y="15" width="85" height="20" rx="6" fill="#1e3a8a" fillOpacity="0.6" />
          <text x="57" y="29" fill="#93c5fd" fontSize="9" fontWeight="bold" textAnchor="middle">RETRACCIÓN ESCAPULAR</text>
        </svg>
      );

    case "cat-cow":
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <rect width="200" height="160" rx="16" fill="#0f172a" />
          {/* Desk Edge */}
          <line x1="140" y1="65" x2="190" y2="65" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          <line x1="180" y1="65" x2="180" y2="145" stroke="#334155" strokeWidth="4" />
          {/* Standing Cat-Cow Pose */}
          <circle cx="130" cy="52" r="13" fill="#334155" stroke="#4ade80" strokeWidth="2" />
          <path d="M 130 65 L 145 65" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
          {/* Spine wave (Cat arc) */}
          <path d="M 130 65 Q 95 38 65 85" stroke="#22c55e" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Legs */}
          <path d="M 65 85 L 60 145 M 75 85 L 80 145" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          {/* Motion Indicators */}
          <path d="M 95 42 L 95 30 M 91 35 L 95 30 L 99 35" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
          {/* Badge */}
          <rect x="15" y="15" width="80" height="20" rx="6" fill="#78350f" fillOpacity="0.6" />
          <text x="55" y="29" fill="#fde68a" fontSize="9" fontWeight="bold" textAnchor="middle">MOVILIDAD LUMBAR</text>
        </svg>
      );

    case "plank":
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <rect width="200" height="160" rx="16" fill="#0f172a" />
          {/* Desk */}
          <rect x="140" y="65" width="50" height="10" rx="2" fill="#475569" />
          <line x1="170" y1="75" x2="170" y2="150" stroke="#334155" strokeWidth="4" />
          {/* Incline Plank Line */}
          <line x1="40" y1="140" x2="140" y2="70" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" />
          <circle cx="148" cy="62" r="12" fill="#334155" stroke="#4ade80" strokeWidth="2" />
          {/* Forearms on Desk */}
          <line x1="140" y1="70" x2="145" y2="65" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
          {/* Core activation glow */}
          <circle cx="90" cy="105" r="12" fill="#f59e0b" fillOpacity="0.4" />
          <path d="M 80 105 L 100 105" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          {/* Badge */}
          <rect x="15" y="15" width="80" height="20" rx="6" fill="#166534" fillOpacity="0.6" />
          <text x="55" y="29" fill="#86efac" fontSize="9" fontWeight="bold" textAnchor="middle">CORE & ESTABILIDAD</text>
        </svg>
      );

    case "wrist-stretch":
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <rect width="200" height="160" rx="16" fill="#0f172a" />
          {/* Forearm & Hand */}
          <path d="M 30 90 L 105 90 L 125 60 L 140 55" stroke="#475569" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Extended Fingers */}
          <line x1="125" y1="60" x2="128" y2="40" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
          <line x1="130" y1="60" x2="135" y2="38" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
          <line x1="135" y1="60" x2="142" y2="42" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
          {/* Assisting hand pulling back */}
          <path d="M 155 45 C 150 40 140 38 135 50" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 122 35 L 110 42 M 113 34 L 110 42 L 118 45" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Carpal Tunnel glow */}
          <circle cx="115" cy="80" r="10" fill="#22c55e" fillOpacity="0.3" />
          {/* Badge */}
          <rect x="15" y="15" width="85" height="20" rx="6" fill="#1e3a8a" fillOpacity="0.6" />
          <text x="57" y="29" fill="#93c5fd" fontSize="9" fontWeight="bold" textAnchor="middle">TÚNEL CARPIANO</text>
        </svg>
      );

    case "hip-flexor":
    case "glute-bridge":
    case "piriformis":
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <rect width="200" height="160" rx="16" fill="#0f172a" />
          {/* Lunge / Stretch figure */}
          <circle cx="95" cy="45" r="13" fill="#334155" stroke="#4ade80" strokeWidth="2" />
          <path d="M 95 58 L 95 100 M 95 100 L 135 105 L 140 145" stroke="#475569" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Back knee down stretching hip */}
          <path d="M 95 100 L 60 115 L 45 145" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Psoas / Hip Glow */}
          <circle cx="85" cy="105" r="12" fill="#22c55e" fillOpacity="0.4" />
          <path d="M 75 105 L 95 105" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
          {/* Arm up */}
          <path d="M 95 65 L 85 30" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          {/* Badge */}
          <rect x="15" y="15" width="85" height="20" rx="6" fill="#166534" fillOpacity="0.6" />
          <text x="57" y="29" fill="#86efac" fontSize="9" fontWeight="bold" textAnchor="middle">DESBLOQUEO PSOAS</text>
        </svg>
      );

    case "calf-raise":
    default:
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <rect width="200" height="160" rx="16" fill="#0f172a" />
          {/* Desk */}
          <line x1="125" y1="70" x2="180" y2="70" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          <line x1="165" y1="70" x2="165" y2="150" stroke="#334155" strokeWidth="3" />
          {/* Standing Figure on Toes */}
          <circle cx="95" cy="45" r="13" fill="#334155" stroke="#4ade80" strokeWidth="2" />
          <path d="M 95 58 L 95 105 M 95 70 L 130 70" stroke="#475569" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {/* Legs elevated on toes */}
          <path d="M 95 105 L 90 140 L 98 148" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 95 105 L 105 140 L 113 148" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {/* Elevation vector */}
          <path d="M 125 130 L 125 110 M 120 115 L 125 110 L 130 115" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Calves Glow */}
          <circle cx="95" cy="125" r="9" fill="#22c55e" fillOpacity="0.4" />
          {/* Badge */}
          <rect x="15" y="15" width="85" height="20" rx="6" fill="#166534" fillOpacity="0.6" />
          <text x="57" y="29" fill="#86efac" fontSize="9" fontWeight="bold" textAnchor="middle">RETORNO VENOSO</text>
        </svg>
      );
  }
};
