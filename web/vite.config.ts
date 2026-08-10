import path from 'path';
import {fileURLToPath} from 'url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'vite';

const webRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {alias: {'@': path.resolve(webRoot, 'src')}},
  build: {outDir: path.resolve(webRoot, 'dist'), emptyOutDir: true},
  server: {host: '0.0.0.0', port: 5173}
});
