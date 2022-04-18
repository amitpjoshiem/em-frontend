<template>
  <div class="border border-color-grey border-b-0 rounded-large mt-5 mb-10">
    <div class="p-5 flex justify-between">
      <router-link :to="{ name: 'list-of-advisors' }" class="cursor-pointer hover:text-activity">
        List of Advisors
      </router-link>
      <div class="flex items-center">
        <SwdItemsPerPage destination="superAdminDashboard" />
      </div>
    </div>
    <div v-if="isError">An error has occurred: {{ error }}</div>
    <div>
      <UsersListTable v-if="!isFetching" :users-list="data" />
      <el-skeleton v-else :rows="rows" animated class="p-5" />
    </div>
  </div>
</template>
<script>
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'
import { useHouseholders } from '@/api/use-householders.js'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ListOfAdvisor',
  components: {
    UsersListTable,
  },
  setup() {
    const store = useStore()

    const { isFetching, isLoading, isError, data, houseHolderTypeHandler } = useHouseholders()

    const rows = computed(() => Number(store.state.globalComponents.itemsPerPage.values.advisorDashboard))

    return {
      isFetching,
      isLoading,
      isError,
      data,
      houseHolderTypeHandler,
      rows,
    }
  },
}
</script>
