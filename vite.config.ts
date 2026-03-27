import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages: usa automaticamente "/<repo>/" quando roda no Actions.
  // Local/dev: usa "/".
  base: (() => {
    const repo = process.env.GITHUB_REPOSITORY?.split('/')?.[1]
    return process.env.GITHUB_ACTIONS && repo ? `/${repo}/` : '/'
  })(),
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
