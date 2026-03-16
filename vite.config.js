import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
   server: {
    port:5175,
    strictPrort:true,
    proxy: {
      "/api": {
        target: "https://njnxpst2-8081.inc1.devtunnels.ms",
        changeOrigin: true,
        secure: false,
        rewrite:(path)=>path
      }
    }
  }
})
