<template>
  <div class="border border-color-grey rounded-t-lg">
    <div class="flex p-5 justify-between">
      <div class="flex items-center">
        <TabAll v-if="visibleTab.includes('all')" :count="!isLoading ? data.count.all : 0" :is-loading="isLoading" />
        <TabOpportunities
          v-if="visibleTab.includes('opportunities')"
          :count="!isLoading ? data.count.prospect : 0"
          :is-loading="isLoading"
        />
        <TabClients
          v-if="visibleTab.includes('clients')"
          :count="!isLoading ? data.count.client : 0"
          :is-loading="isLoading"
        />
        <TabAllLeads
          v-if="visibleTab.includes('all-leads')"
          :count="!isLoading ? data.leads.all : 0"
          :is-loading="isLoading"
        />
        <TabActiveLeads
          v-if="visibleTab.includes('active-leads')"
          :count="!isLoading ? data.leads.active : 0"
          :is-loading="isLoading"
        />
        <TabDeactivatedLeads
          v-if="visibleTab.includes('deactivated-leads')"
          :is-loading="isLoading"
          :count="!isLoading ? data.leads.inactive : 0"
        />
      </div>
      <div class="flex items-center">
        <ListOfHouseholdsFilter v-if="visibleTab.includes('opportunities')" class="pr-2" />
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
import { computed } from 'vue'
import { useFetchStatsMembers } from '@/api/use-fetch-stats-members.js'
import ListOfHouseholdsFilter from './ListOfHouseholdsFilter.vue'

export default {
  name: 'ListContent',
  components: {
    TabAll,
    TabOpportunities,
    TabClients,
    TabAllLeads,
    TabActiveLeads,
    TabDeactivatedLeads,
    ListOfHouseholdsFilter,
  },
  props: {
    visibleTab: {
      type: Array,
      require: true,
      default: () => [],
    },
    destination: {
      type: String,
      require: true,
      default: 'households',
    },
  },
  setup(props) {
    const getMembersStats = computed(() => {
      if (props.destination === 'households') return 'prospect,client'
      return 'lead'
    })

    const { isLoading, isFetching, isError, data } = useFetchStatsMembers(getMembersStats)

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
