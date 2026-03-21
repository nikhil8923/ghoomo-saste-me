import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    postcss: {
      plugins: [] // <-- THIS SHIELD BLOCKS THE PARENT FOLDER'S CONFIG!
    }
  }
})