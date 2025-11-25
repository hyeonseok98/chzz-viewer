import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chzzViewPrimary: "#F5Df4D",
        chzzkBackground: "#050814",
        chzzkPanel: "#0B1020",
        chzzkBorder: "#1B2236",
        chzzkAccent: "#00FFA3",
        chzzkAccentSoft: "#00C97D",
        chzzkTextPrimary: "#ffffff",
        chzzkTextSecondary: "#A5AEBF",
      },
      animation: {
        "spin-slow": "spin 40s linear infinite",
        "pulse-soft": "pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
