<template>
  <div class="border border-color-grey border-b-0 rounded-large mt-5 mb-10">
    <div class="p-5 flex justify-between">
      <span class="cursor-pointer hover:text-activity"> List of Advisors </span>
      <div class="flex items-center">
        <SwdItemsPerPage destination="superAdminDashboard" />
      </div>
    </div>
    <div v-if="isError">An error has occurred: {{ error }}</div>
    <div>
      <AdvisorsListTable v-if="!isFetching" :users-list="data" />
      <el-skeleton v-else :rows="rows" animated class="p-5" />
    </div>
  </div>
</template>
<script>
import AdvisorsListTable from '@/components/SuperAdmin/AdvisorsListTable/AdvisorsListTable.vue'

import { computed } from 'vue'
import { useStore } from 'vuex'
import { useListAdvisors } from '@/api/use-list-advisors.js'

export default {
  name: 'ListOfAdvisor',
  components: {
    AdvisorsListTable,
  },
  setup() {
    const store = useStore()

    const { isLoading, isFetching, isError, data } = useListAdvisors({})

    const rows = computed(() => Number(store.state.globalComponents.itemsPerPage.values.advisorDashboard))

    return {
      isFetching,
      isLoading,
      isError,
      data,
      rows,
    }
  },
}
</script>
