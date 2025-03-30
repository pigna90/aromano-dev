import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: true, // Listen on all addresses
    port: 5173  // Default Vite port
  },
  build: {
    hooks: {
      'closeBundle': () => {
        // Copy CNAME file to dist directory
        fs.copyFileSync('CNAME', path.join('dist', 'CNAME'))
      }
    }
  }
})
