import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        AutoImport({
            imports: ['vue', 'vue-router']
        }),

        Components({
            resolvers: [NaiveUiResolver()]
        }),
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
