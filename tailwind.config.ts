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
        "blue-primary": "#09A2C1",
        "blue-header": "#142942",
        "gray-stroke": "#E9E9E9",
        "gray-text-dark": "#484848",
        "gray-text-light": "#767676",
        "green-easy": "#5BCE51",
        "yellow-medium": "#FFE39A",
        "red-hard": "#EB5F5F"
      },
      boxShadow: {
        "center": "0 0px 5px rgba(0,0,0,0.15)"
      }
    },
  },
  plugins: [],
  mode: "jit",
  safelist: [
    "bg-green-easy",
    "bg-yellow-medium",
    "bg-red-hard"
  ]
};
export default config;
