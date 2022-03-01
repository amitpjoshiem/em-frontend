<template>
  <div
    v-if="!isLoading"
    class="row-span-2 col-span-1 bg-widget-bg rounded-[10px] font-medium pl-5 pt-5 pr-5 min-h-[250px]"
  >
    <div class="pb-4">
      <router-link :to="{ name: 'activity' }" class="text-smm text-main hover:text-activity">Last Activity</router-link>
    </div>
    <template v-if="activity.data.length">
      <div v-for="elem in activity.data" :key="elem.times" class="active-item flex flex-col text-xs">
        <div class="flex items-center">
          <div class="h-[9px] w-[9px] rounded-full mb-[2px] mr-[8px] bg-activity" />
          <div class="text-activity-item font-medium">
            <DateListActivity :day="elem.date" :timestamp="elem.timestamp" />
          </div>
        </div>
        <div class="pt-px text-main" v-html="elem.content" />
      </div>
    </template>

    <div v-else class="flex flex-col justify-center items-center">
      <div class="w-14 h-14 bg-color-grey rounded-full flex items-center justify-center mt-5">
        <InlineSvg :src="IconLastActivityEmpty" />
      </div>
      <span class="text-gray03 font-semibold text-xss mt-5">No recently activity</span>
    </div>
  </div>
  <el-skeleton v-else :rows="6" animated />
</template>
<script>
import IconLastActivityEmpty from '@/assets/svg/icon-last-activity-empty.svg'
import { useDashboardLastActivity } from '@/api/use-dashboard-last-activity.js'
import DateListActivity from '@/components/Dashboard/LastActivity/DateListActivity.vue'

export default {
  name: 'LastActivity',

  components: {
    DateListActivity,
  },
  setup() {
    const { error, data: activity, isFetching, isLoading } = useDashboardLastActivity()

    return {
      IconLastActivityEmpty,
      error,
      activity,
      isFetching,
      isLoading,
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
