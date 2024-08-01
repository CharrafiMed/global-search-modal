/** @type {import('tailwindcss').Config} */
import preset from "./../../vendor/filament/support/tailwind.config.preset";

export default {
  darkMode: 'selector',  // preset: [preset],
  content: ["./resources/views/**/*.blade.php", "./src/**/*.php"],
  safelist:[
    'bg-gray-200',
    'bg-white/10',
  ],
  theme: {
    extend: {
      colors: {
        // gray: {
        //   50: "rgba(var(--gray-50), <alpha-value>)",
        //   100: "rgba(var(--gray-100), <alpha-value>)",
        //   200: "rgba(var(--gray-200), <alpha-value>)",
        //   300: "rgba(var(--gray-300), <alpha-value>)",
        //   400: "rgba(var(--gray-400), <alpha-value>)",
        //   500: "rgba(var(--gray-500), <alpha-value>)",
        //   600: "rgba(var(--gray-600), <alpha-value>)",
        //   700: "rgba(var(--gray-700), <alpha-value>)",
        //   800: "rgba(var(--gray-800), <alpha-value>)",
        //   900: "rgba(var(--gray-900), <alpha-value>)",
        //   950: "rgba(var(--gray-950), <alpha-value>)",
        // },
      },
    },
  },
  variants: {
    extend: {
        backgroundColor: ['dark', 'hover', 'focus'],
    },
},
  plugins: [],
};
