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
        chzzkBackground: "#050814",
        chzzkPanel: "#0B1020",
        chzzkBorder: "#1B2236",
        chzzkAccent: "#00FFA3",
        chzzkAccentSoft: "#00C97D",
        chzzkTextPrimary: "#ffffff",
        chzzkTextSecondary: "#9CA3AF",
      },
    },
  },
  plugins: [],
};
export default config;
