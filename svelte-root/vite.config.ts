import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import path from 'path';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte(), vitePluginSingleSpa({
        type: 'root',
        imoVersion: '2.4.2'
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
                replacement: '/env.js'
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
