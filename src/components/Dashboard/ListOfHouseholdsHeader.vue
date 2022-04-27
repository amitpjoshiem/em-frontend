<template>
  <div class="p-5 flex justify-between">
    <router-link :to="{ name: 'all' }" class="cursor-pointer hover:text-activity"> List of Households </router-link>
    <div class="flex items-center">
      <SwdItemsPerPage destination="advisorDashboard" />
      <SwdNativeSelect :options="actionsOptions" init-value="all" @select="handleSelect" />
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'

export default {
  name: 'ListOfHouseholdsHeader',
  setup() {
    const store = useStore()

    const actionsOptions = [
      {
        title: 'All',
        command: 'all',
      },
      {
        title: 'Clients',
        command: 'clients',
      },
      {
        title: 'Opportunity',
        command: 'prospect',
      },
    ]

    const actionsMap = {
      all: () => store.commit('dashboard/setHouseHolderType', 'client,prospect'),
      clients: () => store.commit('dashboard/setHouseHolderType', 'client'),
      prospect: () => store.commit('dashboard/setHouseHolderType', 'prospect'),
    }

    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    return {
      actionsOptions,
      handleSelect,
    }
  },
}
</script>
