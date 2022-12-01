<template>
  <div class="border border-color-grey rounded-large mt-5 mb-10">
    <ListHouseholdsDashboardHeader />
    <el-skeleton v-if="isLoading" :rows="rows" animated class="p-5" />
    <SwdErrorBlock v-else-if="isError" />
    <UsersListTable v-else-if="data" :users-list="data" is-show-label is-show-onboarding is-show-net-worth />
  </div>
</template>
<script>
import ListHouseholdsDashboardHeader from '@/components/Dashboard/ListHouseholdsDashboardHeader.vue'
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'
import { useHouseholders } from '@/api/use-householders.js'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ListHouseholdsDashboard',
  components: {
    ListHouseholdsDashboardHeader,
    UsersListTable,
  },
  setup() {
    const store = useStore()

    const { isLoading, isError, data, status } = useHouseholders()

    const rows = computed(() => Number(store.state.globalComponents.itemsPerPage.values.advisorDashboard))

    return {
      isLoading,
      isError,
      data,
      rows,
      status,
    }
  },
}
</script>
