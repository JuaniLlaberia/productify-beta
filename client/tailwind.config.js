import scrollbarPlugin from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'bg-light-1': '#fcfcfa',
        'bg-light-2': '#fafafa',
        'bg-light-3': '#ffffff',
        'bg-light-hover': '#dddbdb1a',
        'bg-light-hover-2': '#9493931a',
        'bg-light-contrast': '#2B2829',
        'text-light-1': '#1F1C1C',
        'text-light-2': '#575757dd',
        'border-light': 'rgb(229 229 229)',
        'scroll-light': '#e4e4e47e',
        'scroll-light-hover': '#ccc9c96c',
        'bg-dark-1': '#191919',
        'bg-dark-2': '#131212',
        'bg-dark-3': '#313030',
        'bg-dark-contrast': '#F9F6EE',
        'text-dark-1': '#fffafa',
        'text-dark-2': '#ffffffd1',
        'border-dark': '#dcd7dc33',
        'special-color': '#ff9a27',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), scrollbarPlugin({})],
};
