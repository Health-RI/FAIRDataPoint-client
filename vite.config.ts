import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const prismGlobalComponents = new Set([
  'prism-turtle.js',
  'prism-sparql.js',
])

function prismComponentImportPlugin() {
  return {
    name: 'prism-component-import',
    transform(code: string, id: string) {
      const normalizedId = id.replaceAll('\\', '/')

      if (!normalizedId.includes('/node_modules/prismjs/components/')) {
        return undefined
      }

      if (!prismGlobalComponents.has(path.basename(normalizedId))) {
        return undefined
      }

      // Prism language components expect a free global `Prism` script variable.
      // Make it explicit for Vite/Rolldown module builds. Upstream issue:
      // https://github.com/PrismJS/prism/issues/4088
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
