<template>
  <el-skeleton v-if="isLoading" :rows="rows" animated class="p-5" />
  <SwdErrorBlock v-else-if="isError" />
  <UsersListTable v-else-if="data" :users-list="data" />
  <div class="flex items-center justify-center border-color-grey py-6">
    <SwdPagination v-if="pagination.value" :options="pagination.value" @selectPage="handlePaginationChange" />
  </div>
</template>

<script>
import { useListHouseholders } from '@/api/use-list-householders.js'
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { usePaginationData } from '@/utils/use-pagination-data.js'

export default {
  name: 'ListAll',
  components: {
    UsersListTable,
  },
  setup() {
    const store = useStore()

    const { paginationData, handlePaginationChange } = usePaginationData()

    const rows = computed(() => Number(store.state.globalComponents.itemsPerPage.values.listOfHouseholds))

    const { isLoading, isError, data, pagination } = useListHouseholders({
      type: 'client,prospect',
      page: paginationData,
    })

    return {
      isLoading,
      isError,
      data,
      pagination,
      handlePaginationChange,
      rows,
    }
  },
}
</script>
