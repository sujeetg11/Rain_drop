import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ghPages } from 'vite-plugin-gh-pages'

// https://vitejs.dev/config/
// base: Command === 'build' ? '/Rain_drop/' : '/',

export default defineConfig({
  plugins: [react(), ghPages()],
  base: '/Rain_drop/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})