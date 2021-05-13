export default {
  target: 'static',
  srcDir: 'src',
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: 'Fav - Modern Favicon Generator',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Fav - Modern Favicon Generator' },
      {
        hid: 'og:image',
        name: 'og:image',
        content: '/og-banner.png',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Fav - Modern Favicon Generator',
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: 'https://fav-namchee.vercel.app',
      },
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'website',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@lakban_hitam',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Fav - Modern Favicon Generator',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: '/og-banner.png',
      },
      {
        hid: 'twitter:url',
        name: 'og:url',
        content: 'https://fav-namchee.vercel.app',
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#121212',
      },
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/manifest.webmanifest' },
      { rel: 'canonical', href: 'https://fav-namchee.vercel.app' },
    ],
  },
  loading: {
    color: '#6366F1',
    height: '5px',
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
    '@nuxtjs/pwa',
  ],
  tailwindcss: {
    configPath: '../tailwind.config.js',
    cssPath: '~/assets/style.css',
    jit: true,
  },
  pwa: {
    icon: {
      source: '~/static/icon.svg',
    },
  },
  serverMiddleware: ['redirect-ssl'],
};
