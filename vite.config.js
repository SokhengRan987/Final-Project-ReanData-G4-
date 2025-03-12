// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],


  // server: {
  //   proxy: {
  //     '/rpc': {
  //       target: 'https://reandata-api.istad.co',
  //       changeOrigin: true,
  //     },
  //   },
  // },
});