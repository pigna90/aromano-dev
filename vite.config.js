import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    hooks: {
      'closeBundle': () => {
        // Copy CNAME file to dist directory
        fs.copyFileSync('CNAME', path.join('dist', 'CNAME'))
      }
    }
  }
})
