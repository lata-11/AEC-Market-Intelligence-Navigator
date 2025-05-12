/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F2C59',
          50: '#EBF1FF',
          100: '#D6E4FF',
          200: '#ADC8FF',
          300: '#85ADFF',
          400: '#5C91FF',
          500: '#3474FF',
          600: '#0F2C59',
          700: '#082045',
          800: '#051630',
          900: '#020A15',
          950: '#010508',
        },
        secondary: {
          DEFAULT: '#008080',
          50: '#E6FFFF',
          100: '#CCFFFF',
          200: '#99FFFF',
          300: '#66FFFF',
          400: '#33FFFF',
          500: '#00FFFF',
          600: '#00CCCC',
          700: '#008080',
          800: '#004D4D',
          900: '#001A1A',
          950: '#000D0D',
        },
        accent: {
          DEFAULT: '#FFD700',
          50: '#FFFBE6',
          100: '#FFF8CC',
          200: '#FFF199',
          300: '#FFEA66',
          400: '#FFE333',
          500: '#FFD700',
          600: '#CCAC00',
          700: '#998100',
          800: '#665600',
          900: '#332B00',
          950: '#191500',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      animation: {
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};