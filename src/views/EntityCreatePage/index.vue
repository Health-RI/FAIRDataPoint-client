<template>
  <entity-create
    v-if="entityConfig && entityParentConfig"
    :config="entityConfig"
    :parent-config="entityParentConfig"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import _ from 'lodash'
import { ChildSpec, EntityConfig } from '@/entity/EntityConfig'
import EntityCreate from '@/components/EntityCreate/index.vue'

export default defineComponent({
  components: { EntityCreate },
  data() {
    return {
      config: null as EntityConfig | null,
      parentConfig: null as EntityConfig | null,
    }
  },
  computed: {
    entityConfig(): EntityConfig | undefined {
      return this.config as EntityConfig | undefined
    },
    entityParentConfig(): EntityConfig | undefined {
      return this.parentConfig as EntityConfig | undefined
    },
  },
  watch: {
    $route: 'init',
  },
  created(): void {
    this.init()
  },
  methods: {
    init() {
      const entity = _.get(this.$route.params, 'entity', '')
      const parentEntity = _.get(this.$route.params, 'parentEntity', '')
      this.config = this.$store.getters['entities/config'](entity)
      this.parentConfig = this.$store.getters['entities/config'](parentEntity)

      if (!this.config || !this.parentConfig) return

      const containsChild = this.parentConfig.children.some(
        (child: ChildSpec) => child.resourceDefinitionUuid === this.config?.uuid,
      )

      if (!containsChild) {
        this.config = null
        this.parentConfig = null
      }
    },
  },
})
</script>
