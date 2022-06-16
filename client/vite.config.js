import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../server/public'
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000/',
                changeOrigin: true,
            },
        }
    }
})
