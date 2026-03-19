import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    // Optimize asset loading
    rollupOptions: {
      output: {
        // Enable asset caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          gsap: ['gsap', '@gsap/react'],
        },
      },
    },
    // Compress assets
    minify: 'esbuild',
    target: 'esnext',
  },
  server: {
    // Enable CORS for development
    cors: true,
  },
})
