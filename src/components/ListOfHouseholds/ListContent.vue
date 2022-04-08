<template>
  <div class="border border-color-grey rounded-t-lg">
    <div class="flex p-5 justify-between">
      <div class="flex">
        <el-badge
          v-if="visibleTab.includes('all')"
          :value="200"
          :max="99"
          class="mr-8"
          :type="getActiveTab === 'all' ? 'primary' : 'info'"
        >
          <router-link
            :to="{ name: 'all' }"
            class="text-gray03 text-smm cursor-pointer"
            :class="{ active: getActiveTab === 'all' }"
          >
            All Households
          </router-link>
        </el-badge>

        <el-badge
          v-if="visibleTab.includes('opportunities')"
          :value="12"
          :max="99"
          class="mr-8"
          :type="getActiveTab === 'opportunities' ? 'primary' : 'info'"
        >
          <router-link
            :to="{ name: 'opportunities' }"
            class="text-gray03 text-smm cursor-pointer"
            :class="{ active: getActiveTab === 'opportunities' }"
          >
            Opportunities
          </router-link>
        </el-badge>

        <el-badge
          v-if="visibleTab.includes('clients')"
          :value="12"
          :max="99"
          class="mr-8"
          :type="getActiveTab === 'clients' ? 'primary' : 'info'"
        >
          <router-link
            :to="{ name: 'clients' }"
            class="text-gray03 text-smm cursor-pointer"
            :class="{ active: getActiveTab === 'clients' }"
          >
            Clients
          </router-link>
        </el-badge>

        <el-badge
          v-if="visibleTab.includes('leads')"
          :value="12"
          :max="99"
          class="mr-6"
          :type="getActiveTab === 'list-leads' ? 'primary' : 'info'"
        >
          <router-link
            :to="{ name: 'list-leads' }"
            class="text-gray03 text-smm cursor-pointer"
            :class="{ active: getActiveTab === 'list-leads' }"
          >
            Leads
          </router-link>
        </el-badge>
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
