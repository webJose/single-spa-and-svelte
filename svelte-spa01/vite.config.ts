import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default function (opts) {
  console.log('Executing Vite %s in %s mode...', opts.command, opts.mode);
  const input = {};
  let preserveEntrySignatures: false | 'strict' | 'allow-extension' | 'exports-only';
  const assetFileNames = 'assets/[name][extname]';
  const entryFileNames = '[name].js';
  if (opts.mode === 'standalone') {
    input['index'] = 'index.html';
    preserveEntrySignatures = false;
  }
  else {
    console.log('SPA build.');
    input['spa'] = 'src/spa.ts';
    preserveEntrySignatures = 'exports-only';
  }
  return defineConfig({
    plugins: [svelte()],
    build: {
      target: 'es2022',
      manifest: true,
      rollupOptions: {
        input,
        preserveEntrySignatures,
        output: {
          exports: 'auto',
          assetFileNames,
          entryFileNames
        }
      }
    },
    base: 'http://localhost:4101',
    server: {
      port: 4101
    },
    preview: {
      port: 4101
    }
  });
};
