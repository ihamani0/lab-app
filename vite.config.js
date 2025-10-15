import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    server: {
        host: '0.0.0.0', // Listen on all network interfaces
        port: 5173,
        // hmr: {
        //     host: "192.168.1.40", // Connect to the HMR server from the browser via localhost
        // },
    },
});
