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
      colors: {
        primary: {
          DEFAULT: '#5373E7',
          light: '#849DFF',
          dark: '#3E63DD',
        },
        content: {
          DEFAULT: '#161618',
          light: '#908E96',
          shade: '#BAB8BE',
        },
      },
    },
  },
  plugins: [
    require('windicss/plugin/forms'),
    require('windicss/plugin/typography'),
  ],
});
