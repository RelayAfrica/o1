import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {alias: {'@': path.resolve(__dirname, 'src')}},
  build: {outDir: path.resolve(__dirname, 'dist'), emptyOutDir: true},
  server: {host: '0.0.0.0', port: 5173}
});
