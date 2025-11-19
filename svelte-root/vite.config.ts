import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from "path";
import { defineConfig } from 'vite';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte(), vitePluginSingleSpa({
        type: 'root',
        imo: true
    })],
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
                find: '@core/env',
                replacement: path.resolve('./public/env.js')
            }
        ]
    },
    optimizeDeps: {
        exclude: ['@core/env']
    },
    build: {
        rollupOptions: {
            external: ['/env.js']
        }
    },
    server: {
        port: 4100
    },
    preview: {
        port: 4100
    }
});
