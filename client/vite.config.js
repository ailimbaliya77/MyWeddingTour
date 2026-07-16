import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  plugins: [react()],
  // Removed base: "/MyWeddingTour/" — that was only needed for GitHub Pages,
  // where the site was served from a /MyWeddingTour/ subfolder.
  // mywedding.izzotmedia.com serves from the domain root, so assets
  // need to be requested from "/", not "/MyWeddingTour/".
})