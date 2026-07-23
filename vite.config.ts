import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const prismGlobalComponents = new Set([
  'prism-turtle.js',
  'prism-sparql.js',
])

// Prism language components (prism-turtle, prism-sparql) are plain scripts that
// reference a free global `Prism` at evaluation time. In a bundle their body is
// emitted at the top level of the chunk and runs before any `globalThis.Prism`
// is set, so a bare global reference throws "Can't find variable: Prism".
// Prepending `import Prism from 'prismjs'` turns that free reference into a real
// module binding and forces the Prism core to evaluate first. Works in both the
// dev server and the production build (see optimizeDeps.exclude below, which
// keeps esbuild from pre-bundling these files past this transform in dev).
function prismComponentImportPlugin() {
  return {
    name: 'prism-component-import',
    transform(code: string, id: string) {
      const normalizedId = id.replaceAll('\\', '/')

      if (!normalizedId.includes('/node_modules/prismjs/components/')) {
        return undefined
      }

      // Strip any Vite query suffix (e.g. `?v=hash`, `?import`) before matching.
      const basename = path.basename(normalizedId.split('?')[0])
      if (!prismGlobalComponents.has(basename)) {
        return undefined
      }

      return `import Prism from 'prismjs'\n${code}`
    },
  }
}

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/app/' : '/',
  plugins: [prismComponentImportPlugin(), vue()],
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  resolve: {
    alias: [
      { find: /^@\//, replacement: `${path.resolve(__dirname, 'src')}/` },
      { find: /^process\/$/, replacement: path.resolve(__dirname, 'node_modules/process/browser.js') },
      { find: /^process$/, replacement: path.resolve(__dirname, 'node_modules/process/browser.js') },
      { find: /^buffer\/$/, replacement: path.resolve(__dirname, 'node_modules/buffer/') },
      { find: /^buffer$/, replacement: path.resolve(__dirname, 'node_modules/buffer/') },
      { find: 'querystring', replacement: 'querystring-es3' },
      { find: 'url', replacement: 'url' },
    ],
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
    // Keep esbuild from pre-bundling these Prism components so they flow through
    // the prismComponentImportPlugin transform above in the dev server too.
    // Derive the excluded component paths from prismGlobalComponents so the lists stay in sync.
    exclude: Array.from(prismGlobalComponents).map(
      (component) => `prismjs/components/prism-${component}`,
    ),
  },
  build: {
    chunkSizeWarningLimit: 600,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined

          if (/[\\/]node_modules[\\/]@?vue[\\/]/.test(id)) return 'vue'
          if (/[\\/]node_modules[\\/]vue-router[\\/]/.test(id)) return 'vue-router'
          if (/[\\/]node_modules[\\/]vuex[\\/]/.test(id)) return 'vuex'
          if (/[\\/]node_modules[\\/]@fortawesome[\\/]/.test(id)) return 'fontawesome'
          if (/[\\/]node_modules[\\/]bootstrap-vue-next[\\/]/.test(id)) return 'bootstrap-vue'
          if (/[\\/]node_modules[\\/]vue-select[\\/]/.test(id)) return 'vue-select'
          if (/[\\/]node_modules[\\/]bootstrap/.test(id)) return 'bootstrap'
          if (/[\\/]node_modules[\\/]vis-/.test(id)) return 'vis'
          if (/[\\/]node_modules[\\/]rdflib[\\/]/.test(id)) return 'rdflib'
          if (/[\\/]node_modules[\\/]prismjs[\\/]/.test(id)) return 'prism'
          if (/[\\/]node_modules[\\/]axios[\\/]/.test(id)) return 'axios'
          if (/[\\/]node_modules[\\/]moment[\\/]/.test(id)) return 'moment'

          return 'vendor'
        },
      },
    },
  },
}))
