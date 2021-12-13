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
          DEFAULT: '#6E56CF',
          light: '#9E8CFC',
          dark: '#5842C3',
        },
      },
    },
  },
  plugins: [
    require('windicss/plugin/forms'),
    require('windicss/plugin/typography'),
  ],
});
