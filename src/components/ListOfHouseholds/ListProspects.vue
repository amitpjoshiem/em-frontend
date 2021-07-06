<template>
  <div>
    <UsersListTable :options-header="optionsHeader" :users-list="usersList" />
  </div>
</template>

<script>
import { optionsHeader } from '@/components/ListOfHouseholds/listOptionsHeader'
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
      optionsHeader,
      usersList,
    }
  },
}
</script>
