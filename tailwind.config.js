/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,css}",
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        'Atkinson Hyperlegible',
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
              color: '#5878E1',
              textDecoration: 'none',
            },
          },
        },
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
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
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
