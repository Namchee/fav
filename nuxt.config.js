export default {
  target: 'static',
  ssr: false,
  srcDir: 'src',
  head: {
    title: 'Fav - Modern Favicon Generator',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/manifest.webmanifest' },
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
    jit: true,
  },
};
