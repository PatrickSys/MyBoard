import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'mb-taskboard.js',
    },
    outDir: resolve(__dirname, '../../apps/host/public/widgets'),
    emptyOutDir: false,
    rollupOptions: {
      external: [],
    },
  },
  resolve: {
    alias: {
      '@myboard/sdk': new URL('../sdk/src/index.ts', import.meta.url).pathname,
    },
  },
});

