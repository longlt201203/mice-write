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
        navyBlue: {
          "0": "#003366",
          "1": "#3874AF"
        },
        myNeutral: {
          softGrey: "#F5F5F5",
          charcoalGrey: "#333333",
          white: "#FFFFFF"
        }
      },
      fontFamily: {
        display: "Playfair Display, serif",
        heading: "Roboto Slab, serif",
        body: "Open Sans, sans-serif",
        label: "Lato, sans-serif",
        code: "Fira Code, monospace"
      }
    },
  },
  plugins: [],
};
export default config;
