import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // BASE_PATH is set by the GitHub Pages workflow (e.g. "/" or "/repo-name/").
  base: process.env.BASE_PATH ?? '/',
})
