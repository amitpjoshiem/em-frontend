<template>
  <div>
    <UsersListTable :items-header="itemsHeader" :users-list="usersList" />
  </div>
</template>

<script>
import { itemsHeader } from '@/components/ListOfHouseholds/itemsHeaderTable'
import { useUsersListClients } from '@/components/ListOfHouseholds/DTO/usersListClients'

import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'

export default {
  name: 'ListClients',
  components: {
    UsersListTable,
  },
  setup() {
    const { data: usersList } = useUsersListClients()

    return {
      itemsHeader,
      usersList,
    }
  },
}
</script>
