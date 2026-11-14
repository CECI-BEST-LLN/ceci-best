import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // BASE_PATH is set by the GitHub Pages workflow (e.g. "/" or "/repo-name/").
  base: process.env.BASE_PATH ?? '/',
  build: {
    // Never inline board photos as base64: there are many of them and they would bloat the
    // JavaScript bundle. As separate files they are lazy-loaded and cached by the browser.
    assetsInlineLimit: (file) => (file.includes('/assets/boards/') ? false : undefined),
  },
})
