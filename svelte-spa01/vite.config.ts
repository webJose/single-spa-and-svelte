import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vitePluginSingleSpa from 'vite-plugin-single-spa';

export default function (opts) {
  return defineConfig({
    plugins: [svelte(), vitePluginSingleSpa({
      type: 'mife',
      serverPort: 4101
    })],
  });
};
