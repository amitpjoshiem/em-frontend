<template>
  <el-skeleton v-if="isLoading" :rows="rows" animated class="p-5" />
  <SwdErrorBlock v-else-if="isError" />
  <UsersListTable v-else-if="data" :users-list="data" />
  <div class="flex items-center justify-center border-color-grey py-6">
    <div class="w-3/12" />
    <div class="w-6/12 flex justify-center">
      <SwdPagination v-if="pagination.value" :options="pagination.value" @selectPage="handlePaginationChange" />
    </div>
    <div class="w-3/12 flex justify-end">
      <SwdItemsPerPage :destination="'listOfHouseholds'" />
    </div>
  </div>
</template>

<script>
import { useListHouseholders } from '@/api/use-list-householders.js'
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { usePaginationData } from '@/utils/use-pagination-data.js'

export default {
  name: 'ListClients',
  components: {
    UsersListTable,
  },
  setup() {
    const store = useStore()

    const { paginationData, handlePaginationChange } = usePaginationData()

    const { isLoading, isError, data, pagination } = useListHouseholders({
      type: 'client',
      page: paginationData,
    })

    const rows = computed(() => Number(store.state.globalComponents.itemsPerPage.values.listOfHouseholds))

    return {
      isLoading,
      isError,
      data: data,
      pagination: pagination,
      handlePaginationChange,
      rows,
    }
  },
}
</script>
