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
        cors:true,
        hmr: {
            host: "localhost", // Connect to the HMR server from the browser via localhost
            protocol: 'ws',
        },
        // watch: {
        //     usePolling: true, // 👈 important when using Docker on Linux/Windows
        // },
    },
});
