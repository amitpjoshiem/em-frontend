<template>
  <div>
    <UsersListTable :options-header="optionsHeader" :users-list="usersList" />
  </div>
</template>

<script>
import { optionsHeader } from '@/components/ListOfHouseholds/listOptionsHeader'
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
      optionsHeader,
      usersList,
    }
  },
}
</script>
