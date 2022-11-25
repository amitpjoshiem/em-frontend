<template>
  <div class="border border-color-grey rounded-b-xl">
    <el-skeleton v-if="isLoading" :rows="7" animated class="p-5" />
    <OpportunityListTable v-if="salesforce" :users-list="data" class="min-h-[335px]" />
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
      type: 'client,prospect',
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
