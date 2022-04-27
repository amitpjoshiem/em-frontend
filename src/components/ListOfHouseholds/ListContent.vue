<template>
  <div v-if="!isLoading && !isFetching" class="border border-color-grey rounded-t-lg">
    <div class="flex p-5 justify-between">
      <div class="flex">
        <TabAll v-if="visibleTab.includes('all')" :count="data.data.count.all" />
        <TabOpportunities v-if="visibleTab.includes('opportunities')" :count="data.data.count.prospect" />
        <TabClients v-if="visibleTab.includes('clients')" :count="data.data.count.client" />
        <TabAllLeads v-if="visibleTab.includes('all-leads')" :count="data.data.leads.all" />
        <TabActiveLeads v-if="visibleTab.includes('active-leads')" :count="data.data.leads.active" />
        <TabDeactivatedLeads v-if="visibleTab.includes('deactivated-leads')" :count="data.data.leads.inactive" />
      </div>
      <div class="flex">
        <SwdItemsPerPage :destination="'listOfHouseholds'" />
      </div>
    </div>
    <router-view />
  </div>
  <el-skeleton v-else :rows="10" animated />
</template>

<script>
import IconAction from '@/assets/svg/icon-action.svg'
import TabAll from './Tabs/TabAll.vue'
import TabOpportunities from './Tabs/TabOpportunities.vue'
import TabClients from './Tabs/TabClients.vue'
import TabAllLeads from './Tabs/TabAllLeads.vue'
import TabActiveLeads from './Tabs/TabActiveLeads.vue'
import TabDeactivatedLeads from './Tabs/TabDeactivatedLeads.vue'

import { useFetchStatsMembers } from '@/api/use-fetch-stats-members.js'

export default {
  name: 'ListContent',
  components: {
    TabAll,
    TabOpportunities,
    TabClients,
    TabAllLeads,
    TabActiveLeads,
    TabDeactivatedLeads,
  },
  props: {
    visibleTab: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  setup() {
    const { isLoading, isFetching, isError, data } = useFetchStatsMembers()

    return {
      IconAction,
      isLoading,
      isFetching,
      isError,
      data,
    }
  },
}
</script>
