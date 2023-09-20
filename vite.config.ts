/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import legacy from '@vitejs/plugin-legacy'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import transformerDirective from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { ElementUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      dirs: [{ dir: 'src/views', baseRoute: '' }],
      exclude: ['**/components/**/*.vue', '**/_*.vue'],
      extensions: ['vue'],
      /**
      * Import routes directly or as async components
      * @default 'root index file => "sync", others => "async"'
      */
      // importMode: ImportMode | ImportModeResolver;
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({
      layoutsDir: 'src/layouts',
      defaultLayout: 'default',
      exclude: ['**/components/**/*.vue', '**/_*.vue'],
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue/macros', 'vue-router', '@vueuse/core'],
      dts: true,
      // dirs: ['./src/composables/*.ts'], // TODO 未生效
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      resolvers: [ElementUiResolver()],
      dts: true,
      globs: ['src/components/**/!(_)*.vue'],
    }),

    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss({
      transformers: [transformerVariantGroup(), transformerDirective()],
    }),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
