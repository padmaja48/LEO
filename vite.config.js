import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Listen on all interfaces
    port: process.env.PORT || 5173,  // Use the Render-provided PORT or fallback to 5173
    allowedHosts: [
      'leo-1-hgfl.onrender.com/', // Allow this host
      'localhost', // Allow localhost (for local development)
    ],
  },
})
