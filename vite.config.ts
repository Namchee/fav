import { defineConfig } from 'vite';

import { resolve } from 'path';

import vue from '@vitejs/plugin-vue';

import svg from 'vite-svg-loader';

import { VitePWA as pwa } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svg(),
    pwa({
      includeAssets: [
        'icon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
      ],
      manifest: {
        lang: 'en',
        name: 'Fav',
        short_name: 'Fav',
        description:
          'Generate compact favicon set for your websites within few clicks',
        theme_color: '#3E63DD',
        background_color: '#FFFFFF',
        display: 'standalone',
        orientation: 'natural',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/192.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'any',
          },
          {
            src: '/512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any',
          },
          {
            src: '/192-mask.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'maskable',
          },
          {
            src: '/512-mask.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'vue': 'vue/dist/vue.esm-bundler',
    },
  },
});
