<template>
  <div class="border border-color-grey rounded-large mt-5 mb-10">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">An error has occurred: {{ error }}</div>
    <div v-else-if="data">
      <ListOfHouseholdsHeader />
      <UsersListTable :items-header="itemsHeader" :users-list="data" />
    </div>
  </div>
</template>
<script>
import ListOfHouseholdsHeader from '@/components/Dashboard/ListOfHouseholdsHeader.vue'
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'
import { useHouseholders } from '@/api/use-householders.js'
import { itemsHeader } from '@/components/ListOfHouseholds/itemsHeaderTable.js'

export default {
  components: {
    ListOfHouseholdsHeader,
    UsersListTable,
  },
  setup() {
    const { isLoading, isError, data, houseHolderTypeHandler } =
      useHouseholders()

    return {
      itemsHeader,
      isLoading,
      isError,
      data,
      houseHolderTypeHandler,
    }
  },
}
</script>
