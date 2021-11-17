<template>
  <div class="border rounded-lg p-5">
    <div class="text-main text-smm font-semibold mb-5">Your Activity</div>
    <div class="infinite-list-wrapper" style="overflow: auto">
      <ul
        v-if="status === 'success' && !isLoading"
        v-infinite-scroll="load"
        class="list p-1 mr-4"
        infinite-scroll-disabled="disabled"
      >
        <div v-for="(activ, index) in activities.pages" :key="index">
          <div v-if="activ.data !== undefined">
            <el-timeline v-for="elem in activ.data" :key="elem.day">
              <div class="mb-6 text-gray03 font-semibold">
                <TitleDayActivity :day="elem.day" />
              </div>
              <el-timeline-item
                v-for="item in elem.events"
                :key="item.timestamp"
                center
                :timestamp="item.timestamp"
                placement="top"
                color="#66B6FF"
              >
                <div v-html="item.content" />
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </ul>
      <div v-if="loading" class="text-center">
        <span>Loading...</span>
      </div>
      <div
        v-if="!loading && !isLoading && !activities.pages[0].data.length"
        class="flex flex-col justify-center items-center"
      >
        <div class="w-14 h-14 bg-color-grey rounded-full flex items-center justify-center">
          <InlineSvg :src="IconLastActivityEmpty" />
        </div>
        <span class="text-gray03 font-semibold text-xss mt-5">No recently activity</span>
      </div>
    </div>
  </div>
</template>
<script>
import { useFetchActivities } from '@/api/use-fetch-activities.js'
import TitleDayActivity from './TitleDayActivity.vue'
import IconLastActivityEmpty from '@/assets/svg/icon-last-activity-empty.svg'

export default {
  name: 'ActivityContent',
  components: {
    TitleDayActivity,
  },
  setup() {
    const { data: activities, error, status, load, disabled, loading, isLoading } = useFetchActivities()
    return {
      activities,
      error,
      loading,
      load,
      status,
      disabled,
      IconLastActivityEmpty,
      isLoading,
    }
  },
}
</script>
