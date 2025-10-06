import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), svelte()],
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
