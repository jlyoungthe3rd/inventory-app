/// <reference types="vitest"/>
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true, // Output clearer (describe, it, expect) without imports
    setupFiles: './src/tests/setup.ts', // (Optional, we might create this later)
  }
})
