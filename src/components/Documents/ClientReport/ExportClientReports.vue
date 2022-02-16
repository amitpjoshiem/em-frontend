<template>
  <div class="p-5">
    <SwdSubHeader class="p-5" title="All documents" />
    <div class="flex p-5 justify-between">
      <div class="flex">
        <router-link
          :to="{ name: 'all-client-report' }"
          class="mr-5 text-gray03 text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'all-client-report' }"
        >
          ALL
        </router-link>
        <router-link
          :to="{ name: 'pdf-client-report' }"
          class="mr-5 text-gray03 text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'pdf-client-report' }"
        >
          PDF
        </router-link>
        <router-link
          :to="{ name: 'excel-client-report' }"
          class="text-gray03 text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'excel-client-report' }"
        >
          EXCEL
        </router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

import { computed } from 'vue'

export default {
  name: 'ExportClientReports',
  setup() {
    const route = useRoute()

    const getActiveTab = computed(() => {
      return route.name
    })

    return {
      getActiveTab,
    }
  },
}
</script>

<style scoped>
.active {
  color: #66b6ff;
  border-bottom: 2px solid #66b6ff;
}
</style>
