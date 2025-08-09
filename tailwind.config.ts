// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Here we define the custom college colors
        primary: {
          DEFAULT: '#941c1f', // The main maroon from the website
          dark: '#7a1a1c',   // A slightly darker version for hover effects
        },
        accent: '#f5be41', // The gold/yellow for accents
      },
    },
  },
  plugins: [],
};
export default config;