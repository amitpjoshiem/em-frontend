<template>
  <div>
    <AdvisorsListTable v-if="!isLoading" :users-list="data" />
    <el-skeleton v-else :rows="rows" animated class="p-5" />
    <div class="flex items-center justify-center border-color-grey py-6">
      <SwdPagination v-if="pagination.value" :options="pagination.value" @selectPage="handlePaginationChange" />
    </div>
  </div>
</template>

<script>
import { useListAdvisors } from '@/api/use-list-advisors.js'
import AdvisorsListTable from '@/components/SuperAdmin/AdvisorsListTable/AdvisorsListTable.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { usePaginationData } from '@/utils/use-pagination-data.js'

export default {
  name: 'ListAdvisorsAll',
  components: {
    AdvisorsListTable,
  },
  setup() {
    const store = useStore()

    const { isLoading, isError, data, pagination } = useListAdvisors({
      page: paginationData,
    })

    const { paginationData, handlePaginationChange } = usePaginationData()

    const rows = computed(() => Number(store.state.globalComponents.itemsPerPage.values.superAdminListAdvisors))

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
