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
        atmosphere: {
          50: '#F5F8FC',
          100: '#EBF2FA',
          200: '#DBE7F6',
          300: '#BFD5EF',
          400: '#94BAE5',
          500: '#6499D9',
          600: '#3D7BC9',
          700: '#2A5EA2',
          800: '#1D457B',
          900: '#143159',
          dark: '#0B0F19',
          cardDark: '#131926',
          borderDark: '#202A3D',
        },
        cloud: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
        },
        slateSoft: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        accent: {
          DEFAULT: '#3B82F6', // Soft Royal Sky Blue
          hover: '#2563EB',
          light: '#EFF6FF',
          glow: '#60A5FA',
          coral: '#F43F5E',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(15, 23, 42, 0.05)',
        'soft': '0 10px 30px -5px rgba(15, 23, 42, 0.05), 0 4px 12px -2px rgba(15, 23, 42, 0.02)',
        'soft-lg': '0 20px 40px -10px rgba(15, 23, 42, 0.08), 0 8px 16px -4px rgba(15, 23, 42, 0.03)',
        'float': '0 25px 60px -15px rgba(37, 99, 235, 0.12), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
