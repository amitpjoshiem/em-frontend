<template>
  <div class="p-5">
    <!-- <SwdSubHeader class="p-5" title="All documents" /> -->
    <div class="pb-5 flex">
      <div class="w-3/12">
        <BackButton text="Back" @click="$router.go(-1)" />
      </div>
      <div class="w-6/12 text-center">
        <span class="text-title text-main font-semibold"> All documents</span>
      </div>
    </div>
    <div class="flex p-5 justify-between">
      <div class="flex">
        <router-link
          :to="{ name: 'all-report', query: { type: getCurrentQuery } }"
          class="mr-5 text-gray03 text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'all-report' }"
        >
          ALL
        </router-link>
        <router-link
          :to="{ name: 'pdf-report', query: { type: getCurrentQuery } }"
          class="mr-5 text-gray03 text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'pdf-report' }"
        >
          PDF
        </router-link>
        <router-link
          :to="{ name: 'excel-report', query: { type: getCurrentQuery } }"
          class="text-gray03 text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'excel-report' }"
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
  color: #66b6ff;
  border-bottom: 2px solid #66b6ff;
}
</style>
