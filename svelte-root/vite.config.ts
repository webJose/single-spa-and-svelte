import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: [
      {
        find: '$lib',
        replacement: path.resolve('./src/lib')
      },
      {
        find: '$stores',
        replacement: path.resolve('./src/stores')
      },
      {
        find: '@env',
        replacement: '/env.js'
      }
    ]
  },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js'
      }
    }
  },
  server: {
    port: 4100
  }
});
