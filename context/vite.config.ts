import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: "umd",
    }
  },
  plugins: [react()],
})
