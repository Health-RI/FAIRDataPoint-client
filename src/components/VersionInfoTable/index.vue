<template>
  <div class="version-info-table">
    <table class="table table-borderless">
      <thead>
        <tr>
          <th colspan="2">
            {{ title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Version</th>
          <td><code>{{ safeVersion.slice(0, 36) }}</code></td>
        </tr>
        <tr>
          <th>Built at</th>
          <td>{{ builtAtFormatted }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'

export default defineComponent({
  props: {
    title: { type: String, required: true },
    version: { type: String, default: '' },
    builtAt: { type: String, default: '' },
  },
  computed: {
    safeVersion(): string {
      return this.version || ''
    },
    builtAtFormatted() {
      return this.builtAt ? moment(this.builtAt).format('D. M. YYYY, HH:mm') : 'Unknown'
    },
  },
})
</script>
