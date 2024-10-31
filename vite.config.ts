import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://flux1-api.up.railway.app/',
        changeOrigin: true,
      },
    },
  },
});