import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    assetsInclude: ['**/*.json'],
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    assetsInlineLimit: 0,
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