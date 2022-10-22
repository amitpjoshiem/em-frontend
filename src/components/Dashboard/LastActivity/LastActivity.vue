<template>
  <div class="row-span-2 col-span-1 bg-main-gray rounded-[10px] pl-5 pt-5 pr-5 min-h-[250px]">
    <div class="pb-4">
      <router-link :to="{ name: getLink }" class="text-primary text-sm font-semibold hover:text-main-blue">
        Last Activity
      </router-link>
    </div>
    <el-skeleton v-if="isLoading" :rows="4" animated />
    <SwdErrorBlock v-else-if="isError" />
    <template v-else-if="activity.data?.length">
      <div v-for="elem in activity.data" :key="elem.times" class="font-medium active-item flex flex-col text-xs">
        <div class="flex items-center">
          <div class="h-[9px] w-[9px] rounded-full mb-[2px] mr-[8px] bg-activity" />
          <div class="text-activity">
            <DateListActivity :day="elem.date" :timestamp="elem.timestamp" />
          </div>
        </div>
        <div class="pt-px text-main" v-html="elem.content" />
      </div>
    </template>

    <div v-else class="flex flex-col justify-center items-center">
      <div class="w-14 h-14 bg-main-gray border border-main-blue rounded-full flex items-center justify-center mt-5">
        <InlineSvg :src="IconLastActivityEmpty" />
      </div>
      <span class="text-main font-semibold text-xss mt-5">No recently activity</span>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

import IconLastActivityEmpty from '@/assets/svg/icon-last-activity-empty.svg'
import { useDashboardLastActivity } from '@/api/use-dashboard-last-activity.js'
import DateListActivity from '@/components/Dashboard/LastActivity/DateListActivity.vue'

export default {
  name: 'LastActivity',

  components: {
    DateListActivity,
  },
  setup() {
    const store = useStore()

    const { error, data: activity, isFetching, isLoading, isError } = useDashboardLastActivity()

    const getCurrentTypeUser = computed(() => {
      return store.state.globalComponents.currentTypeUser
    })

    const getLink = computed(() => {
      if (getCurrentTypeUser.value === 'advisor') return 'activity'
      if (getCurrentTypeUser.value === 'admin') return 'admin-activity'
      if (getCurrentTypeUser.value === 'ceo') return 'ceo/activity'
      return '404'
    })

    return {
      IconLastActivityEmpty,
      error,
      activity,
      isFetching,
      isLoading,
      getLink,
      isError,
    }
  },
}
</script>

<style scoped>
.active-item:not(:first-of-type) {
  margin-left: -20px;
  margin-right: -20px;
  padding: 10px 20px;
}
.active-item:first-of-type {
  padding-bottom: 15px;
}

.active-item:last-of-type {
  padding-bottom: 20px;
}
</style>
