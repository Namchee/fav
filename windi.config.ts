import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  extract: {
    include: ['**/*.{vue,css}'],
    exclude: ['node_modules', '.git'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        'Anderson Grotesk',
        'system-ui',
        'Segoe UI',
        'Arial',
        'sans-serif',
      ],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'none',
            },
          },
        },
      },
      colors: {
        primary: {
          DEFAULT: '#3E63DD',
          light: '#5878E1',
          dark: '#3A5CCC',
        },
        content: {
          DEFAULT: '#161618',
          light: '#908E96',
          shade: '#BAB8BE',
          white: '#FDFCFD',
        },
        danger: '#E54D2E',
      },
    },
  },
  plugins: [
    require('windicss/plugin/forms'),
    require('windicss/plugin/typography'),
  ],
});
