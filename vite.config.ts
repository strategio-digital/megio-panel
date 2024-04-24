import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'megio-panel',
            fileName: 'megio-panel'
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    plugins: [vue(), dts()],
    define: {
        '__VUE_OPTIONS_API__': true,
        '__VUE_PROD_DEVTOOLS__': true,
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false
    }
})