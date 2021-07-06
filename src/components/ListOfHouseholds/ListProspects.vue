<template>
  <div>
    <UsersListTable :items-header="itemsHeader" :users-list="usersList" />
  </div>
</template>

<script>
import { itemsHeader } from '@/components/ListOfHouseholds/itemsHeaderTable'
import { useUsersListProspects } from '@/components/ListOfHouseholds/DTO/usersListProspects'

import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'

export default {
  name: 'ListProspects',
  components: {
    UsersListTable,
  },
  setup() {
    const { data: usersList } = useUsersListProspects()

    return {
      itemsHeader,
      usersList,
    }
  },
}
</script>
