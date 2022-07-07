<template>
  <div class="border border-color-grey rounded-t-lg">
    <div></div>
    <div class="flex p-5 justify-between">
      <div class="flex">
        <TabAll v-if="visibleTab.includes('all')" :count="count ? count.data.count.all : 0" :is-loading="isLoading" />
        <TabOpportunities
          v-if="visibleTab.includes('opportunities')"
          :count="count ? count.data.count.prospect : 0"
          :is-loading="isLoading"
        />
        <TabClients
          v-if="visibleTab.includes('clients')"
          :count="count ? count.data.count.client : 0"
          :is-loading="isLoading"
        />
        <TabAllLeads
          v-if="visibleTab.includes('all-leads')"
          :count="count ? count.data.leads.all : 0"
          :is-loading="isLoading"
        />
        <TabActiveLeads
          v-if="visibleTab.includes('active-leads')"
          :count="count ? count.data.leads.active : 0"
          :is-loading="isLoading"
        />
        <TabDeactivatedLeads
          v-if="visibleTab.includes('deactivated-leads')"
          :is-loading="isLoading"
          :count="count ? count.data.leads.inactive : 0"
        />
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
    const { isLoading, isFetching, isError, data: count } = useFetchStatsMembers()

    return {
      IconAction,
      isLoading,
      isFetching,
      isError,
      count,
    }
  },
}
</script>
