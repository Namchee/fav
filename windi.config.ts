import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  extract: {
    include: ['**/*.{vue,css}'],
    exclude: ['node_modules', '.git', '.nuxt'],
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
      color: {
        primary: {
          DEFAULT: '#5373E7',
          light: '#849DFF',
          dark: '#3E63DD',
        },
      },
    },
  },
  plugins: [
    require('windicss/plugin/forms'),
    require('windicss/plugin/typography'),
  ],
});
