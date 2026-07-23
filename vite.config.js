import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // base: '/',
  base: 'https://dwiosa16.github.io/sociabuzzClonePortfolio/',
  resolve: {
    // Tambahkan alias untuk path yang lebih bersih
    alias: [{ find: '@', replacement: '/src' }],
  },
});
