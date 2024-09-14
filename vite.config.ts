import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath } from 'node:url'
import autoprefixer from 'autoprefixer'

// Thay đổi từ componentsAliases và aliases thành một cấu hình alias duy nhất nếu cần
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({}) // add options if needed
      ],
    }
  },
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: fileURLToPath(new URL('./src/components', import.meta.url))
      },
      {
        find: '@pages',
        replacement: fileURLToPath(new URL('./src/pages', import.meta.url))
      },
      {
        find: '@constants',
        replacement: fileURLToPath(new URL('./src/constants', import.meta.url))
      },
      {
        find: '@models',
        replacement: fileURLToPath(new URL('./src/models', import.meta.url))
      },
      {
        find: '@utils',
        replacement: fileURLToPath(new URL('./src/utils', import.meta.url))
      },
      {
        find: '@assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url))
      },
      {
        find: '@plugins',
        replacement: fileURLToPath(new URL('./src/plugins', import.meta.url))
      },
      {
        find: '@scss',
        replacement: fileURLToPath(new URL('./src/scss', import.meta.url))
      },
      {
        find: '@layouts',
        replacement: fileURLToPath(new URL('./src/layouts', import.meta.url))
      }
      ,
      {
        find: '@store',
        replacement: fileURLToPath(new URL('./src/store', import.meta.url))
      },
      {
        find: '@utils',
        replacement: fileURLToPath(new URL('./src/utils', import.meta.url))
      },
      {
        find: '@views',
        replacement: fileURLToPath(new URL('./src/views', import.meta.url))
      },
      {
        find: '@router',
        replacement: fileURLToPath(new URL('./src/router', import.meta.url))
      }
      ,
      {
        find: '@types',
        replacement: fileURLToPath(new URL('./src/types', import.meta.url))
      },
      {
        find: '@theme',
        replacement: fileURLToPath(new URL('./src/theme', import.meta.url))
      }
    ]
  },
})
