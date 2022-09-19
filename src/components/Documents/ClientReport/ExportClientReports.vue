<template>
  <SwdWrapper>
    <SwdSubHeader class="p-5" title="All documents" />
    <div class="flex p-5 justify-between">
      <div class="flex">
        <router-link
          :to="{ name: 'all-report', query: { type: getCurrentQuery } }"
          class="mr-5 text-main text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'all-report' }"
        >
          ALL
        </router-link>
        <router-link
          :to="{ name: 'pdf-report', query: { type: getCurrentQuery } }"
          class="mr-5 text-main text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'pdf-report' }"
        >
          PDF
        </router-link>
        <router-link
          :to="{ name: 'excel-report', query: { type: getCurrentQuery } }"
          class="text-main text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'excel-report' }"
        >
          EXCEL
        </router-link>
      </div>
    </div>
    <router-view />
  </SwdWrapper>
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

    const getCurrentQuery = computed(() => {
      return route.query.type
    })

    return {
      getActiveTab,
      getCurrentQuery,
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
