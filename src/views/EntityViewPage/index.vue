<template>
  <entity-view
    v-if="config"
    :config="config"
  />
  <div v-else class="alert alert-warning m-3">
    <p><strong>Unable to load entity configuration.</strong></p>
    <p>The FDP backend did not return entity definitions. This usually means:</p>
    <ul>
      <li>The API server is unreachable or not responding</li>
      <li>The API_URL environment variable is misconfigured</li>
      <li>The network connection to the backend has an issue</li>
    </ul>
    <p>Check the browser console (F12) for more details.</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import _ from 'lodash'
import EntityView from '@/components/EntityView/index.vue'

export default defineComponent({
  components: { EntityView },
  data() {
    return {
      config: null,
    }
  },
  watch: {
    $route: 'init',
  },
  created(): void {
    this.init()
  },
  methods: {
    init() {
      const url = _.get(this.$route, 'params.entity', '')
      this.config = this.$store.getters['entities/config'](url)
      
      if (!this.config) {
        console.error(`Entity config not found for: ${url}`)
        console.error('Available entity configs:', Object.keys(this.$store.state.entities.entityConfigs))
      }
    },
  },
})
</script>
