<template>
  <div class="border border-color-grey rounded-large mt-5 mb-10">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">An error has occurred: {{ error }}</div>
    <div v-else-if="data">
      <ListOfHouseholdsHeader />
      <UsersListTable :items-header="itemsHeader" :users-list="data.data" />
    </div>
  </div>
</template>
<script>
import ListOfHouseholdsHeader from '@/components/Dashboard/ListOfHouseholdsHeader.vue'
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'

import { itemsHeader } from '@/components/ListOfHouseholds/itemsHeaderTable.js'
import { fetchMembersList } from '@/api/vueQuery/fetch-members.js'
// import { fetchMembers } from '@/api/vueQuery/fetch-members.js'
import { useQuery } from 'vue-query'
import { reactive } from 'vue'

export default {
  components: {
    ListOfHouseholdsHeader,
    UsersListTable,
  },
  setup() {
    const queryKey = reactive(['members', { type: 'client' }])

    const { isLoading, isError, isFetching, data, error, refetch } = useQuery(
      queryKey,
      fetchMembersList
    )

    return {
      itemsHeader,
      isLoading,
      isError,
      isFetching,
      data,
      error,
      refetch,
    }
  },
}
</script>
