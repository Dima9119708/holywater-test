import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svgr({
            include: '**/*.component.svg',
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            shared: path.resolve(__dirname, './src/shared'),
            app: path.resolve(__dirname, './src/app'),
            pages: path.resolve(__dirname, './src/pages'),
        },
    },
});
