/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FCFBF9',
          100: '#FAF8F5',
          200: '#F2EFE9',
          300: '#E6E1D7',
          400: '#D5CFC3',
          dark: '#0F1012',
          cardDark: '#17181B',
          borderDark: '#282A30',
        },
        ink: {
          900: '#121316',
          800: '#222328',
          700: '#383A42',
          600: '#525560',
          500: '#717582',
          400: '#9498A4',
          300: '#C2C5CE',
        },
        accent: {
          DEFAULT: '#E83D1B', // Electric Vermilion
          hover: '#CF2E0E',
          light: '#FDF0ED',
          dark: '#B0250A',
        },
        ochre: {
          DEFAULT: '#C49746',
          light: '#F8F4EC',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cabinet Grotesk"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
