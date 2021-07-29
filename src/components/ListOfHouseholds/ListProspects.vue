<template>
  <div>
    <UsersListTable :items-header="itemsHeader" :users-list="data" />
    <!-- <UsersListTable :items-header="itemsHeader" :users-list="usersList" /> -->
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

    const { isLoading, isError, data } = useListHouseholders('prospect')

    return {
      itemsHeader,
      // usersList,
      isLoading,
      isError,
      data,
    }
  },
}
</script>
