import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: { alias: { '@': `${process.cwd()}/src` } },
  server: { host: '0.0.0.0', port: 3000, strictPort: true, allowedHosts: ['.sg2.manus.computer'] },
})
