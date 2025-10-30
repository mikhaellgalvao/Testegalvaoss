/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}", // Isso lê seus arquivos React
  ],
  theme: {
    extend: {
      // É aqui que você adiciona suas cores personalizadas
      colors: {
        'brand-orange': '#EF7E13',
        'brand-green': '#0E5847',
      }
    },
  },
  plugins: [],
}