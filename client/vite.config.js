import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
    preview: {
  host: "0.0.0.0",
  port: 4173,
  allowedHosts: ["mern-frontend-236690.onrender.com"]
}
})
=======
  preview: {
    host: '0.0.0.0',
    port: 4173,
    proxy: {
      '/api': {
        target: 'http://backend:5000',
        changeOrigin: true,
      },
    },
  },
})
>>>>>>> 466a6b5517c589069bb4f16ca88d2bbcbbe56fa2
