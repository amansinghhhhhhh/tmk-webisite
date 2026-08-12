import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('react-router') ||
              id.includes('react-helmet-async') ||
              id.includes('/react/') ||
              id.includes('/react-dom/')
            ) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('swiper')) return 'swiper';
          }
        },
      },
    },
  },
  server: {
    historyApiFallback: true,
  },
})