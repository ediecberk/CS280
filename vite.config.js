import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Setting base to './' ensures relative paths for assets work seamlessly when deployed to GitHub Pages
  base: './',
})
