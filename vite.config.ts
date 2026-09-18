import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    // a foto do copo entra embutida no bundle (versão de arquivo único)
    assetsInlineLimit: 1024 * 1024,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react')) return 'react'
          if (id.includes('framer-motion')) return 'framer-motion'
          if (id.includes('gsap')) return 'gsap'
        },
      },
    },
  },
})
