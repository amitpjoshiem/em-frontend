<template>
  <div v-if="!isLoading" class="row-span-2 col-span-1 bg-widget-bg rounded-[10px] font-medium pl-5 pt-5 pr-5">
    <p class="text-smm text-main pb-4">Last Activity</p>
    <div v-for="item in activity.data" :key="item.day" class="flex flex-col text-xs">
      <div v-for="elem in item.events" :key="elem.timestamp" class="active-item">
        <div class="flex items-center">
          <div class="h-[9px] w-[9px] rounded-full mb-[2px] mr-[8px] bg-activity" />
          <div class="text-activity-item font-medium">
            <DateListActivity :day="item.day" :timestamp="elem.timestamp" />
          </div>
        </div>
        <div class="pt-px text-main" v-html="elem.content" />
      </div>
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
  padding: 15px 20px;
}
.active-item:first-of-type {
  padding-bottom: 15px;
}

.active-item:last-of-type {
  padding-bottom: 20px;
}
</style>
