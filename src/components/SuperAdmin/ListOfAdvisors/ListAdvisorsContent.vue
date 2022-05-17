<template>
  <div v-if="!isLoading" class="border border-color-grey rounded-t-lg">
    <div class="flex p-5 justify-between">
      <div class="flex">
        <el-badge v-if="visibleTab.includes('all')" :value="data.data.users.all" :max="99" class="mr-8" type="primary">
          <span class="text-gray03 text-smm cursor-pointer active"> All Advisors </span>
        </el-badge>
      </div>
      <div class="flex">
        <SwdItemsPerPage destination="superAdminListAdvisors" />
      </div>
    </div>
    <router-view />
  </div>
  <el-skeleton v-else :rows="10" animated />
</template>

<script>
import IconAction from '@/assets/svg/icon-action.svg'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useFetchStatsAdvisors } from '@/api/use-fetch-stats-advisors.js'

export default {
  name: 'ListAdvisorsContent',
  props: {
    visibleTab: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  setup() {
    const route = useRoute()

    const { isLoading, isError, data } = useFetchStatsAdvisors()

    const getActiveTab = computed(() => {
      return route.name
    })

    return {
      getActiveTab,
      IconAction,

      isLoading,
      isError,
      data,
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
