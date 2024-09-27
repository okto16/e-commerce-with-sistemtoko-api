import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/demo': {
        target: 'https://sistemtoko.com/public/',
        changeOrigin: true,
        secure: false,
        // Menangani masalah path rewrite jika perlu
        rewrite: (path) => path.replace(/^\/demo/, '/demo')
      }
    }
  }
})
