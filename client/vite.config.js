import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

dotenv.config({ path: '../.env' })

// eslint-disable-next-line no-undef
const APP_ENV = process.env.VITE_APP_ENV;
// eslint-disable-next-line no-undef
const API_HOST = process.env.VITE_API_HOST;

// https://vitejs.dev/config/
export default defineConfig(() => {
  const isDev = APP_ENV === 'development';

  return {
    envDir: '../',
    server: {
      ...isDev && {
        proxy: {
          '/api': API_HOST
        }
      }
    },
    plugins: [react()],
  }
})
