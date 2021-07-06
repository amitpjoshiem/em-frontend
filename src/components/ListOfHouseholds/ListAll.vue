<template>
  <div>
    <UsersListTable :items-header="itemsHeader" :users-list="usersList" />
  </div>
</template>

<script>
import { itemsHeader } from '@/components/ListOfHouseholds/itemsHeaderTable'
import { useUsersListAll } from '@/components/ListOfHouseholds/DTO/usersListAll'

import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'

export default {
  name: 'ListAll',
  components: {
    UsersListTable,
  },
  setup() {
    const { data: usersList } = useUsersListAll()

    return {
      itemsHeader,
      usersList,
    }
  },
}
</script>
