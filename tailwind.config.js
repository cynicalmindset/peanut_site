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
        bg: '#FAFAFA',
        surface: '#FFFFFF',
        border: '#E8E8E8',
        'border-light': '#F0F0F0',
        primary: '#111111',
        secondary: '#555555',
        muted: '#999999',
        accent: '#111111',
        'accent-hover': '#333333',
        highlight: '#2563EB',
        'highlight-light': '#EFF6FF',
        dark: {
          bg: '#0A0A0A',
          surface: '#141414',
          border: '#222222',
          'border-light': '#1A1A1A',
          primary: '#EEEEEE',
          secondary: '#999999',
          muted: '#666666',
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      maxWidth: {
        'page': '1200px',
        'narrow': '720px',
      },
    },
  },
  plugins: [],
};
