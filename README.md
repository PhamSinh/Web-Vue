# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur

- Use [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/tsc) for performing the same type checking from the command line, or for generating d.ts files for SFCs.

## Structure of project

-src
 -assets
  - vue.svg
  - vuetify.scss
 - components
  - HelloWord.vue
  - BackgroundAnimation.vue
  - Dashboard.vue
  - Header.vue
  - NavigationDrawer.vue
  - NewScreen.vue
  - LoginForm.vue
 - plugins
  - i18n
   - datetimeFormat.ts
   - en.json
   - I18n.ts
   - locales.ts
   - numberFormat.ts
   - vi.ts
  - vuetify
   - Vuetify.ts
   - VuetifyTheme.ts
 - router
  - index.ts
 - store
  - mock
   - mockData.js
  - modules
   - login.ts
   - user.ts
  - index.ts
 - App.vue
 - http.vue
 - main.ts
 - style.css
 - style.scss
 - vite-env.d.ts
- .gitignore
- index.html
- package-lock.json
- package.json
- postcss.config.cjs
- Readme.md
- tsconfig.json
- tsconfig.node.json
- vite.config.ts
