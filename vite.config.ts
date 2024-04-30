import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import autoprefixer from 'autoprefixer'

const componentsAliases = ['atoms', 'modecules', 'organisms', 'templates'];
const aliases = ['pages', 'constants', 'models', 'utils', 'assets', 'plugins'];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        autoprefixer({}) // add options if needed
      ],
    }
  },
  resolve: {
    alias: componentsAliases.map(alias => ({
      find: `@${alias}`,
      replacement: fileURLToPath(new URL(`./src/components/${alias}`, import.meta.url))
    })).concat(
      aliases.map(alias => ({
        find: `@${alias}`, replacement: fileURLToPath(new URL(`./src/${alias}`, import.meta.url))
      }))
    )
  },
})
