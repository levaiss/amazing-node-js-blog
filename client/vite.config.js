import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// eslint-disable-next-line no-undef
const isDev = process.env.APP_ENV === 'development'
// eslint-disable-next-line no-undef
const PORT = process.env.APP_PORT || 3000;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    ...isDev && {
      proxy: {
        '/api': `http://localhost:${PORT}`
      }
    }
  },
  plugins: [react()],
})
