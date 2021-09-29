<template>
  <div class="p-5 flex justify-between">
    <router-link :to="{ name: 'all' }" class="cursor-pointer hover:text-activity"> List of Households </router-link>
    <div class="flex items-center">
      <SwdItemsPerPage :destination="'dashboard'" />
      <SwdNativeSelect :options="actionsOptions" init-value="All" @select="handleSelect" />
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
        title: 'Prospect',
        command: 'prospect',
      },
    ]

    const options = [
      {
        value: 'Option1',
        label: 'All',
      },
      {
        value: 'Option2',
        label: 'Prospect',
      },
      {
        value: 'Option3',
        label: 'Clients',
      },
    ]

    const actionsMap = {
      All: () => store.commit('dashboard/setHouseHolderType', 'all'),
      Clients: () => store.commit('dashboard/setHouseHolderType', 'client'),
      Prospect: () => store.commit('dashboard/setHouseHolderType', 'prospect'),
    }

    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    return {
      actionsOptions,
      options,
      handleSelect,
    }
  },
}
</script>
