import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      formats: ['es'],
      fileName: () => 'mb-notes.js',
    },
    outDir: resolve(__dirname, '../../apps/host/public/widgets'),
    emptyOutDir: false,
    rollupOptions: {
      external: [],
    },
    target: 'esnext',
    sourcemap: false,
    cssCodeSplit: false,
    minify: 'esbuild',
  },
  resolve: {
    alias: {
      '@myboard/sdk': new URL('../sdk/src/index.ts', import.meta.url).pathname,
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env': '{}',
    process: '{}',
  },
});
