<template>
  <div class="border border-color-grey rounded-large mt-5">
    <ListOfHouseholdsHeader />
    <UsersListTable :items-header="itemsHeader" :users-list="usersList" />
  </div>
</template>
<script>
import ListOfHouseholdsHeader from '@/components/Dashboard/ListOfHouseholdsHeader.vue'
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'

import { useUserList } from '@/components/UsersListTable/DTO/usersList'
import { itemsHeader } from '@/components/ListOfHouseholds/itemsHeaderTable.js'

export default {
  components: {
    ListOfHouseholdsHeader,
    UsersListTable,
  },
  setup() {
    const { data: usersList } = useUserList()

    return {
      itemsHeader,
      usersList,
    }
  },
}
</script>
