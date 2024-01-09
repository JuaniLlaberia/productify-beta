import scrollbarPlugin from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-light-1': '#f5f4f0',
        'bg-light-2': '#fcfcfa',
        'bg-light-3': '#ffffff',
        'bg-light-hover': '#dddbdb1a',
        'bg-light-hover-2': '#9493931a',
        'bg-light-contrast': '#2B2829',
        'text-light-1': '#1F1C1C',
        'text-light-2': '#575757dd',
        'border-light': '#0c0b0c25',
        'scroll-light': '#e4e4e47e',
        'scroll-light-hover': '#ccc9c96c',
        'bg-dark-1': '#252324',
        'bg-dark-2': '#201e1e',
        'bg-dark-3': '#313030',
        'bg-dark-contrast': '#F9F6EE',
        'text-dark-1': '#fffafa',
        'text-dark-2': '#ffffffd1',
        'border-dark': '#dcd7dc33',
        'special-color': '#ffb14b',
      },
    },
  },
  plugins: [scrollbarPlugin({})],
};
