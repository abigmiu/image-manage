import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        UnoCSS(),
    ],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve('src')
            }
        ]
    },
    server: {
        proxy: {
            '/api': 'http://127.0.0.1:3000'
        }
    }
});
