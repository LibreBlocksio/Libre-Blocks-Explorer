/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      fontSize: {
        '4.5xl': ['2.5rem', '3rem'],
      },
      colors: {
        primary: {
          DEFAULT: '#FF6200',
        },
        shade: {
          ...colors.neutral,
        },
        line: {
          DEFAULT: 'rgb(225 225 255 / .12)',
        },
      },
      borderWidth: {
        3: '3px',
      },
      spacing: {
        6.5: '1.625rem',
        18: '4.5rem', // 72px
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addComponents }) {
      addComponents({
        '.container': {
          width: '100%',
          paddingLeft: '.75rem',
          paddingRight: '.75rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          '@media (min-width: 980px)': {
            maxWidth: '980px',
          },
          '@media (min-width: 1366px)': {
            maxWidth: '1248px',
          },
        },
      });
    },
  ],
};
