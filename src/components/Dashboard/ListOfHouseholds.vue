<template>
  <div class="border border-color-grey rounded-large mt-5 mb-10">
    <div v-if="isError">An error has occurred: {{ error }}</div>
    <div>
      <ListOfHouseholdsHeader />
      <UsersListTable v-if="!isFetching" :items-header="itemsHeader" :users-list="data" />
      <el-skeleton v-else :rows="rows" animated class="p-5" />
    </div>
  </div>
</template>
<script>
import ListOfHouseholdsHeader from '@/components/Dashboard/ListOfHouseholdsHeader.vue'
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'
import { useHouseholders } from '@/api/use-householders.js'
import { itemsHeader } from '@/components/ListOfHouseholds/itemsHeaderTable.js'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    ListOfHouseholdsHeader,
    UsersListTable,
  },
  setup() {
    const store = useStore()

    const { isFetching, isLoading, isError, data, houseHolderTypeHandler } = useHouseholders()

    const rows = computed(() => Number(store.state.globalComponents.itemsPerPage.values.dashboard))

    return {
      isFetching,
      itemsHeader,
      isLoading,
      isError,
      data,
      houseHolderTypeHandler,
      rows,
    }
  },
}
</script>
