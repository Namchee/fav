export default {
  target: 'static',
  ssr: false,
  srcDir: 'src',
  head: {
    title: 'Fav - Modern Favicon Generator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
  css: [
    '~/assets/style.css',
  ],
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  modules: [
    '@nuxtjs/svg',
  ],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    configPath: '../tailwind.config.js',
    cssPath: '~/assets/style.css',
  },
};
