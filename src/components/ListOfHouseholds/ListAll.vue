<template>
  <div>
    <template v-if="!isLoading">
      <UsersListTable :items-header="itemsHeader" :users-list="data" />
      <div
        class="flex items-center justify-center border-t border-color-grey py-6"
      >
        <Pagination :options="pagination.value" />
      </div>
    </template>
    <el-skeleton v-else :rows="8" animated class="p-5" />
  </div>
</template>

<script>
import { itemsHeader } from '@/components/ListOfHouseholds/itemsHeaderTable'
import { useListHouseholders } from '@/api/use-list-householders.js'
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'

export default {
  name: 'ListAll',
  components: {
    UsersListTable,
  },
  setup() {
    const { isLoading, isError, data, pagination } = useListHouseholders('all')

    return {
      itemsHeader,
      isLoading,
      isError,
      data: data,
      pagination: pagination,
    }
  },
}
</script>
