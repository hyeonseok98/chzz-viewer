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
        chzzBackground: "#050814",
        chzzPanel: "#0B1020",
        chzzBorder: "#1B2236",
        chzzAccent: "#00FFA3",
        chzzAccentSoft: "#00C97D",
        chzzTextPrimary: "#F9FAFB",
        chzzTextSecondary: "#9CA3AF",
      },
    },
  },
  plugins: [],
};
export default config;
