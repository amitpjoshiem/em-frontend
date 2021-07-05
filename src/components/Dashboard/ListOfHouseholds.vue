<template>
  <div class="border border-color-grey rounded-large mt-5">
    <ListOfHouseholdsHeader />
    <UsersListTable :options-header="optionsHeader" :users-list="usersList" />
  </div>
</template>
<script>
import ListOfHouseholdsHeader from '@/components/Dashboard/ListOfHouseholdsHeader.vue'
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'

import { useUserList } from '@/components/UsersListTable/DTO/usersList'
import { optionsHeader } from '@/components/ListOfHouseholds/listOptionsHeader'

export default {
  components: {
    ListOfHouseholdsHeader,
    UsersListTable,
  },
  setup() {
    const { data: usersList } = useUserList()

    return {
      optionsHeader,
      usersList,
    }
  },
}
</script>
