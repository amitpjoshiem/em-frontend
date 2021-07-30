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
// import { useUsersListProspects } from '@/components/ListOfHouseholds/DTO/usersListProspects'
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'
import { useListHouseholders } from '@/api/use-list-householders.js'

export default {
  name: 'ListProspects',
  components: {
    UsersListTable,
  },
  setup() {
    // const { data: usersList } = useUsersListProspects()

    const { isLoading, isError, data, isFetching } =
      useListHouseholders('prospect')

    return {
      itemsHeader,
      // usersList,
      isLoading,
      isError,
      data,
      isFetching,
    }
  },
}
</script>
