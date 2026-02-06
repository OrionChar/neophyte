import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from "path";
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        svelte(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
                globPatterns: [
                    '**/*.{js,wasm,css,html}',
                    './fonts/*.json',
                    './3d-assets/*.glb'
                ]
            },
            devOptions: {
                enabled: true,
            },
            includeAssets: ['logo-apple-touch-icon.png', 'logo.svg'],
            manifest: {
                name: 'Neophyte',
                short_name: 'Neophyte',
                description: 'The Service of The Biomechanism',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'logo-pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'logo-pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
        }),
    ],
    build: {
        target: 'es2022',
    },
    esbuild: {
        target: 'es2022',
    },
    optimizeDeps: {
        esbuildOptions: {
            target: 'es2022',
        }
    },
    resolve: {
        alias: {
            $shadcn: path.resolve("./src/shadcn"),
        },
    },
});
