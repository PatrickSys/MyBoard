import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      formats: ['es'],
      fileName: () => 'mb-notes.js',
    },
    outDir: '../../apps/host/public/widgets',
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
      '@myboard/widget-utils': new URL('../widget-utils/src/index.ts', import.meta.url).pathname,
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env': '{}',
    'process': '{}',
  },
});




