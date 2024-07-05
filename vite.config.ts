import react from '@vitejs/plugin-react';

import * as path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

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
            shared: path.resolve(__dirname, './src/shared'),
            app: path.resolve(__dirname, './src/app'),
            pages: path.resolve(__dirname, './src/pages'),
        },
    },
});
