import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/rpc': {
        target:'https://reandata-api.istad.co',
        changeOrigin: true,
      }
    }
  }
})
