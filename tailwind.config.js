/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        morning: {
          amber: "#f59e0b",
          sun: "#fbbf24",
          dawn: "#ea580c",
        },
        dark: {
          bg: "#0b0f19",
          card: "#111827",
          border: "#1f2937",
          surface: "#1e293b",
        }
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ],
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 25px rgba(34, 197, 94, 0.45)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 10px rgba(34, 197, 94, 0.2)" },
        },
        sunRise: {
          "0%": { transform: "translateY(15px) scale(0.9)", opacity: "0" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        }
      },
      animation: {
        "pulse-glow": "pulseGlow 2.5s infinite ease-in-out",
        "sunrise": "sunRise 0.8s ease-out forwards",
      }
    },
  },
  plugins: [],
}