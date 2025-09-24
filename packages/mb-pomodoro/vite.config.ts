import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'mb-pomodoro.js',
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





