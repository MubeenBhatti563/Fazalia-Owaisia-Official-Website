import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f4f8fd",
          100: "#e7effa",
          200: "#c5d7f0",
          400: "#4272b3",
          500: "#2d5a96",
          600: "#23487a",
          700: "#1b3860",
          800: "#142a4a",
          850: "#0f2038",
          900: "#0b1626",
          950: "#060e1a",
        },
        gold: {
          50: "#fdfaf3",
          100: "#faeed0",
          200: "#f2dc8e",
          300: "#e6c55d",
          400: "#d4af37",
          500: "#c59b27",
          600: "#a9801c",
        },
        whatsapp: {
          DEFAULT: "#25d366",
          dark: "#128c7e",
        },
        urgent: {
          DEFAULT: "#b91c1c",
          light: "#ef4444",
        },
      },
      fontFamily: {
        urdu: ["'Noto Nastaliq Urdu'", "Amiri", "serif"],
        poppins: ["Poppins", "system-ui", "-apple-system", "sans-serif"],
        amiri: ["Amiri", "serif"],
      },
      boxShadow: {
        gold: "0 10px 30px rgba(197, 155, 39, 0.28)",
        "gold-glow": "0 0 20px rgba(212, 175, 55, 0.4)",
        "navy-lg": "0 20px 45px rgba(11, 22, 38, 0.13)",
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #d4af37 0%, #c59b27 50%, #a9801c 100%)",
        "gradient-gold-hover": "linear-gradient(135deg, #e5c363 0%, #d4af37 50%, #b88d20 100%)",
        "gradient-navy-hero": "linear-gradient(135deg, #060d17 0%, #0b1a2e 50%, #102642 100%)",
        "gradient-navy-dark": "linear-gradient(135deg, #07101d 0%, #0d1e33 60%, #132a47 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
