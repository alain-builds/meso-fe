import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  root: 'ui_kits/meso-app',
  plugins: [react()],
  resolve: {
    alias: {
      '@/tokens': resolve(__dirname, 'tokens/index.ts'),
    },
  },
  test: {
    environment: 'node',
    include: ['__tests__/**/*.test.js'],
  },
})
