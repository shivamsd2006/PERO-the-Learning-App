import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: '/PERO-the-Learning-App/',
  server: {
    proxy: {
      '/api': {
        
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    }
  }
})