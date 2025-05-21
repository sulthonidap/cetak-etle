import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/etle': {
        target: 'https://backoffice-etle.polri.go.id',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
