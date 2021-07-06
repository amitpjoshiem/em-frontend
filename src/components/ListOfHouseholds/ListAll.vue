<template>
  <div>
    <UsersListTable :options-header="optionsHeader" :users-list="usersList" />
  </div>
</template>

<script>
import { optionsHeader } from '@/components/ListOfHouseholds/listOptionsHeader'
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
      optionsHeader,
      usersList,
    }
  },
}
</script>
