import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.tsx',
      name: 'AmqurWidget',
      fileName: () => 'amqur-widget.js',
      formats: ['iife'],
    },
    cssCodeSplit: false,
    emptyOutDir: true,
  },
});
