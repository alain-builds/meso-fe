import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['tokens/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  outDir: 'tokens/dist',
})
