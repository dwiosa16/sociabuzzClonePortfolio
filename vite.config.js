import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  // Pastikan base URL sesuai dengan nama repository Anda di GitHub.
  // Ini adalah path tempat situs Anda akan di-host.
  // Contoh: https://<username>.github.io/<repository-name>/
  // base:'/', //lokal
  base: '/sociabuzzClonePortfolio/',
  plugins: [vue()],
  resolve: {
    // Tambahkan alias untuk path yang lebih bersih
    alias: [{ find: '@', replacement: '/src' }],
  },
});
