import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/rpc': {
        target:'https://reandata-api.istad.co:443',
        changeOrigin: true,
      }
    }
  },
  optimizeDeps: {
    include: ["@emailjs/browser"]  // Ensure it's bundled
  }
});
