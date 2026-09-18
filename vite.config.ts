import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  // a foto do copo entra embutida no bundle (versão de arquivo único)
  build: { assetsInlineLimit: 1024 * 1024 },
})
