import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Build normal (npm run build) → chunks separados, imagens como arquivo.
 * Build de arquivo único (SINGLE_FILE=1 npm run build) → tudo num bundle só,
 * com as imagens em base64, para gerar o .html avulso de demonstração.
 *
 * No Vite 8 (rolldown) a chave é build.rolldownOptions, e manualChunks só
 * aceita função — a forma de objeto não passa no type-check.
 */
const singleFile = process.env.SINGLE_FILE === '1'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: singleFile
    ? {
        assetsInlineLimit: 1024 * 1024,
        // sem esta linha o GSAP (import dinâmico) ficaria fora do arquivo único
        rolldownOptions: { output: { inlineDynamicImports: true } },
      }
    : {
        rolldownOptions: {
          output: {
            manualChunks(id: string) {
              if (!id.includes('node_modules')) return
              if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
                return 'framer-motion'
              }
              if (id.includes('react')) return 'react'
            },
          },
        },
      },
})