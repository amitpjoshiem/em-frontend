<template>
  <div>
    <UsersListTable
      v-if="!isFetching"
      :items-header="itemsHeader"
      :users-list="data"
    />
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
    const { isFetching, isLoading, isError, data } = useListHouseholders('all')

    return {
      itemsHeader,
      isLoading,
      isError,
      data,
      isFetching,
    }
  },
}
</script>
