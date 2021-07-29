<template>
  <div>
    <UsersListTable :items-header="itemsHeader" :users-list="data" />
  </div>
</template>

<script>
import { itemsHeader } from '@/components/ListOfHouseholds/itemsHeaderTable'
// import { useUsersListClients } from '@/components/ListOfHouseholds/DTO/usersListClients'
import { useListHouseholders } from '@/api/use-list-householders.js'
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'

export default {
  name: 'ListClients',
  components: {
    UsersListTable,
  },
  setup() {
    // const { data: usersList } = useUsersListClients()
    const { isLoading, isError, data } = useListHouseholders('client')

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
