import { defineConfig } from 'vite';

import { resolve } from 'path';

import vue from '@vitejs/plugin-vue';

import windi from 'vite-plugin-windicss';
import svg from 'vite-svg-loader';

import { VitePWA as pwa } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    windi(),
    svg(),
    pwa(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
