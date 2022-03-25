<template>
  <div class="border border-color-grey rounded-t-lg">
    <div class="flex p-5 justify-between">
      <div class="flex">
        <router-link
          v-if="visibleTab.includes('all')"
          :to="{ name: 'all' }"
          class="mr-5 text-gray03 text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'all' }"
        >
          All Households
        </router-link>
        <router-link
          v-if="visibleTab.includes('opportunities')"
          :to="{ name: 'prospects' }"
          class="mr-5 text-gray03 text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'prospects' }"
        >
          Opportunities
        </router-link>
        <router-link
          v-if="visibleTab.includes('clients')"
          :to="{ name: 'clients' }"
          class="mr-5 text-gray03 text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'clients' }"
        >
          Clients
        </router-link>
        <router-link
          v-if="visibleTab.includes('leads')"
          :to="{ name: 'list-leads' }"
          class="text-gray03 text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'list-leads' }"
        >
          Leads
        </router-link>
      </div>
      <div class="flex">
        <SwdItemsPerPage :destination="'listOfHouseholds'" />
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import IconAction from '@/assets/svg/icon-action.svg'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'ListContent',
  props: {
    visibleTab: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  setup() {
    const route = useRoute()

    const getActiveTab = computed(() => {
      return route.name
    })

    return {
      getActiveTab,
      IconAction,
    }
  },
}
</script>

<style scoped>
.active {
  color: #66b6ff;
  border-bottom: 2px solid #66b6ff;
}
</style>
