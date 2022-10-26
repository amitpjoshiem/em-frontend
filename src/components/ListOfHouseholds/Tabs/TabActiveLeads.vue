<template>
  <el-badge :value="count" :max="99" class="mr-8" :type="getType" :hidden="isLoading">
    <router-link
      :to="{ name: `${route.meta.type}/active-leads` }"
      class="text-main text-smm cursor-pointer"
      :class="{ active: getType === 'primary' }"
    >
      Active Leads
    </router-link>
  </el-badge>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'TabActiveLeads',
  props: {
    count: {
      type: Number,
      required: true,
      default: 0,
    },
    isLoading: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  setup() {
    const route = useRoute()

    const getType = computed(() => {
      if (route.name === route.meta.type + '/active-leads') return 'primary'
      return 'info'
    })

    return {
      getType,
      route,
    }
  },
}
</script>

<style scoped>
.active {
  color: #83ccf0;
  border-bottom: 2px solid #83ccf0;
}
</style>
