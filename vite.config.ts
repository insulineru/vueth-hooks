import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import nodePolyfills from 'rollup-plugin-polyfill-node'
const isProd = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), !isProd
      && nodePolyfills({
        include: ['node_modules/**/*.js', /node_modules\/.vite\/.*js/],
      }),
  ],

  build: {
    rollupOptions: {
      plugins: [
        nodePolyfills(),
      ],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
