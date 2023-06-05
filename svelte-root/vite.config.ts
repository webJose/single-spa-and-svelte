import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig, type PluginOption } from 'vite';
import type { Plugin } from 'vite';
import { promises as fs, existsSync } from 'fs';
import path from 'path';

/*
NOTE:
-----

Import map logic mostly taken from vite-plugin-import-maps (https://github.com/pakholeung37/vite-plugin-import-maps).

It's been modified to suit single-spa.
*/

export type ImportMap = {
    imports?: Record<string, string>
    scope?: Record<string, string>
};

export type SingleSpaPluginOptions = {
    type: 'root' | 'mife';
    importMaps?: {
        dev?: string;
        build?: string;
    },
    includeImo?: boolean,
    imoVersion?: string
};

function testPlugin(config?: SingleSpaPluginOptions) {
    console.log('Config passed to plugin: %o', config);
    const loadImportMap = (command: string) => {
        console.log('loadImportMap --- command: %s', command);
        const defaultFile = existsSync('src/importMap.dev.json') ? 'src/importMap.dev.json' : 'src/importMap.json';
        const mapFile = command === 'serve' ?
            (config?.importMaps?.dev ?? defaultFile) :
            (config?.importMaps?.build ?? 'src/importMap.json');
        return fs.readFile(mapFile, {
            encoding: 'utf8'
        });
    }

    let importMap: Required<ImportMap>;
    function buildImportMap(maps: Required<ImportMap>[]) {
        const oriImportMap: Required<ImportMap> = Object.assign(
            { imports: {}, scope: {} },
            ...maps,
        );
        importMap = {
            imports: {
                ...oriImportMap.imports,
                ...Object.keys(oriImportMap.imports).reduce(
                    (acc, imp) => ({
                        ...acc,
                        // [`${prefix}${imp}`]: oriImportMap.imports[imp],
                        [`${imp}`]: oriImportMap.imports[imp],
                    }),
                    {},
                ),
            },
            scope: {
                ...oriImportMap.scope,
            },
        };
    }

    return [
        {
            name: 'test-plugin',
            async config(_cfg, opts) {
                const importMapText = await loadImportMap(opts.command);
                console.log('Import map text: %s', importMapText);
                buildImportMap([JSON.parse(importMapText)]);
                console.log('IM ready: %o', importMap);
                return {};
            },
            transformIndexHtml: {
                order: 'post',
                handler(html: string) {
                    const tags: Record<string, any>[] = [{
                        tag: 'script',
                        attrs: {
                            type: 'overridable-importmap',
                            // type: 'importmap',
                        },
                        children: JSON.stringify(importMap, null, 2),
                        injectTo: 'head-prepend',
                    }];
                    if (!(config?.includeImo === false)) {
                        const imoVersion = config?.imoVersion ?? 'latest'
                        tags.push({
                            tag: 'script',
                            attrs: {
                                type: 'text/javascript',
                                src: `https://cdn.jsdelivr.net/npm/import-map-overrides@${imoVersion}/dist/import-map-overrides.js`
                            },
                            injectTo: 'head-prepend'
                        });
                    }
                    return {
                        html,
                        tags
                    };
                },
            },
        },
    ];
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte(), testPlugin({
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
        target: 'es2022',
        rollupOptions: {
            external: ['/env.js'],
            output: {
                assetFileNames: 'assets/[name][extname]',
                entryFileNames: '[name].js'
            }
        }
    },
    server: {
        port: 4100
    },
    preview: {
        port: 4100
    }
});
