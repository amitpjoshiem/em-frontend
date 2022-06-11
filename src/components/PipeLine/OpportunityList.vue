<template>
  <div class="border border-color-grey rounded-xl">
    <div class="p-5">Revenue Dashboard</div>
    <OpportunityListTable v-if="!isLoading" :users-list="data" class="min-h-[335px]" />
    <el-skeleton v-else :rows="7" animated class="p-5" />
    <div class="flex items-center justify-center border-color-grey my-4">
      <SwdPagination v-if="pagination.value" :options="pagination.value" @selectPage="handlePaginationChange" />
    </div>
  </div>
</template>

<script>
import { useListHouseholders } from '@/api/use-list-householders.js'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { usePaginationData } from '@/utils/use-pagination-data.js'
import OpportunityListTable from '@/components/PipeLine/OpportunityListTable.vue'

export default {
  name: 'OpportunityList',
  components: {
    OpportunityListTable,
  },
  setup() {
    const store = useStore()

    const { paginationData, handlePaginationChange } = usePaginationData()

    const rows = computed(() => Number(store.state.globalComponents.itemsPerPage.values.listOfHouseholds))

    const { isLoading, isError, data, pagination, salesforce } = useListHouseholders({
      type: 'prospect',
      include: 'salesforce',
      page: paginationData,
    })

    return {
      isLoading,
      isError,
      data,
      pagination,
      rows,
      handlePaginationChange,
      salesforce,
    }
  },
}
</script>
