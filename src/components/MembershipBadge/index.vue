<template>
  <span
    v-if="role"
    class="membership-badge"
    data-cy="membership-badge"
  >
    {{ role }}
  </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import _ from 'lodash'

export default defineComponent({
  props: {
    entity: { type: Object, required: true },
  },
  computed: {
    role() {
      return _.get(this.entity, 'member.membership.name', _.get(this.entity, 'membership.name'))
    },
  },
})
</script>
