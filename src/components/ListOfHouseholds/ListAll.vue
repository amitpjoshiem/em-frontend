<template>
  <div>
    <UsersListTable v-if="!isLoading" :items-header="itemsHeader" :users-list="data" />
    <el-skeleton v-else :rows="rows" animated class="p-5" />
    <div class="flex items-center justify-center border-color-grey py-6">
      <SwdPagination v-if="pagination.value" :options="pagination.value" @selectPage="handlePaginationChange" />
    </div>
  </div>
</template>

<script>
import { itemsHeader } from '@/components/ListOfHouseholds/itemsHeaderTable'
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
      type: 'all',
      page: paginationData,
    })

    return {
      itemsHeader,
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
