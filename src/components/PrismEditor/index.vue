<template>
  <base-prism-editor
    v-bind="attrs"
    :language="language"
    :highlight="highlight"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { PrismEditor as BasePrismEditor } from 'vue-prism-editor'
import Prism from 'prismjs'
import { registerPrismLanguages } from '@/prism-languages'

registerPrismLanguages(Prism)

function escapeHtml(code: string): string {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default defineComponent({
  name: 'PrismEditor',
  components: {
    BasePrismEditor,
  },
  inheritAttrs: false,
  props: {
    language: {
      type: String,
      default: 'markup',
    },
  },
  setup(props, { attrs }) {
    const highlight = (code: string) => {
      const lang = props.language || 'markup'
      const languages = (Prism as any).languages || {}
      const grammar = languages[lang]

      if (!grammar) {
        return escapeHtml(code)
      }

      try {
        return Prism.highlight(code, grammar, lang)
      } catch (error) {
        console.warn(`Prism highlighting failed for "${lang}", falling back to plain text.`, error)
        return escapeHtml(code)
      }
    }

    return {
      attrs,
      highlight,
    }
  },
})
</script>
