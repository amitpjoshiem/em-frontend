<template>
  <div v-if="!isLoading" class="border border-color-grey rounded-t-lg">
    <div class="flex p-5 justify-between">
      <div class="flex">
        <el-badge
          v-if="visibleTab.includes('all')"
          :value="data.data.count.all"
          :max="99"
          class="mr-8"
          :type="getActiveTab === 'all' || getActiveTab === 'all-list' ? 'primary' : 'info'"
        >
          <router-link
            :to="{ name: context === 'advisor' ? 'all' : 'all-list' }"
            class="text-gray03 text-smm cursor-pointer"
            :class="{ active: getActiveTab === 'all' || getActiveTab === 'all-list' }"
          >
            All Households
          </router-link>
        </el-badge>

        <el-badge
          v-if="visibleTab.includes('opportunities')"
          :value="data.data.count.prospect"
          :max="99"
          class="mr-8"
          :type="getActiveTab === 'opportunities' || getActiveTab === 'opportunities-list' ? 'primary' : 'info'"
        >
          <router-link
            :to="{ name: context === 'advisor' ? 'opportunities' : 'opportunities-list' }"
            class="text-gray03 text-smm cursor-pointer"
            :class="{ active: getActiveTab === 'opportunities' || getActiveTab === 'opportunities-list' }"
          >
            Opportunities
          </router-link>
        </el-badge>

        <el-badge
          v-if="visibleTab.includes('clients')"
          :value="data.data.count.client"
          :max="99"
          class="mr-8"
          :type="getActiveTab === 'clients' || getActiveTab === 'clients-list' ? 'primary' : 'info'"
        >
          <router-link
            :to="{ name: context === 'advisor' ? 'clients' : 'clients-list' }"
            class="text-gray03 text-smm cursor-pointer"
            :class="{ active: getActiveTab === 'clients' || getActiveTab === 'clients-list' }"
          >
            Clients
          </router-link>
        </el-badge>

        <!-- LEADS -->
        <el-badge
          v-if="visibleTab.includes('all-leads')"
          :value="data.data.leads.all"
          :max="99"
          class="mr-6"
          :type="getActiveTab === 'list-all-leads' ? 'primary' : 'info'"
        >
          <router-link
            :to="{ name: 'list-all-leads' }"
            class="text-gray03 text-smm cursor-pointer"
            :class="{ active: getActiveTab === 'list-all-leads' }"
          >
            All Leads
          </router-link>
        </el-badge>
        <el-badge
          v-if="visibleTab.includes('active-leads')"
          :value="data.data.leads.active"
          :max="99"
          class="mr-6"
          :type="getActiveTab === 'list-active-leads' ? 'primary' : 'info'"
        >
          <router-link
            :to="{ name: 'list-active-leads' }"
            class="text-gray03 text-smm cursor-pointer"
            :class="{ active: getActiveTab === 'list-active-leads' }"
          >
            Active Leads
          </router-link>
        </el-badge>
        <el-badge
          v-if="visibleTab.includes('deactivated-leads')"
          :value="data.data.leads.inactive"
          :max="99"
          class="mr-6"
          :type="getActiveTab === 'list-deactivated-leads' ? 'primary' : 'info'"
        >
          <router-link
            :to="{ name: 'list-deactivated-leads' }"
            class="text-gray03 text-smm cursor-pointer"
            :class="{ active: getActiveTab === 'list-deactivated-leads' }"
          >
            Deactivated Leads
          </router-link>
        </el-badge>
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

import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useFetchStatsMembers } from '@/api/use-fetch-stats-members.js'

export default {
  name: 'ListContent',
  props: {
    visibleTab: {
      type: Array,
      require: true,
      default: () => [],
    },
    context: {
      type: String,
      require: false,
      default: 'advisor',
    },
  },
  setup() {
    const route = useRoute()

    const { isLoading, isError, data } = useFetchStatsMembers()

    const getActiveTab = computed(() => {
      return route.name
    })

    return {
      getActiveTab,
      IconAction,

      isLoading,
      isError,
      data,
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
