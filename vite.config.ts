import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';

export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(__dirname, './src/locales/languages/vue-i18n/**'), // Обновленный путь
    }),
  ],
  assetsInclude: ['src/languages/**'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/teacher': {
        target: 'http://185.156.42.37:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/teacher/, '/api/teacher'),
      },
    },
  },
});