// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'esbuild',
    lib: {
      // @ts-ignore
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@nocht/plugin',
      // the proper extensions will be added
      fileName: 'index',
      formats: ['es']
    }
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
  plugins: [dts({ rollupTypes: true })]
})