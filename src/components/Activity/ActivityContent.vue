<template>
  <div>isFetchingNextPage - {{ isFetchingNextPage }}</div>
  <div>isFetching - {{ isFetching }}</div>
  <div>isLoading - {{ isLoading }}</div>
  <div class="border rounded-lg p-5">
    <div class="text-main text-smm font-semibold mb-5">Your Activity</div>
    <div
      v-if="(!isFetchingNextPage && isFetching && isLoading) || (!isFetchingNextPage && isFetching && !isLoading)"
      class="flex items-center justify-center h-6"
    >
      <SwdSpinner />
    </div>
    <div v-else class="infinite-list-wrapper" style="overflow: auto">
      <ul
        v-if="status === 'success' && !isLoading"
        v-infinite-scroll="load"
        class="list p-1 mr-4"
        infinite-scroll-disabled="disabled"
      >
        <div v-for="(activ, index) in activities.pages" :key="index">
          <div v-if="activ.data !== undefined">
            <el-timeline v-for="elem in activ.data" :key="elem.day">
              <el-timeline-item :timestamp="elem.date" placement="top" color="#66B9FF">
                <el-card>
                  <h4 v-html="elem.content" />
                  <p>{{ elem.time }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </ul>
      <div v-if="loading && hasMore" class="flex items-center justify-center h-6">
        <SwdSpinner />
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
import IconLastActivityEmpty from '@/assets/svg/icon-last-activity-empty.svg'
import { computed } from 'vue'

export default {
  name: 'ActivityContent',

  setup() {
    const {
      data: activities,
      error,
      status,
      load,
      disabled,
      loading,
      isLoading,
      isFetchingNextPage,
      isFetching,
    } = useFetchActivities()

    const hasMore = computed(() => {
      const lastPage = activities.value.pages.length - 1
      const current_page = activities.value.pages[lastPage].meta.pagination.current_page
      const total_pages = activities.value.pages[lastPage].meta.pagination.total_pages
      return current_page < total_pages
    })

    return {
      activities,
      error,
      loading,
      load,
      status,
      disabled,
      IconLastActivityEmpty,
      isLoading,
      hasMore,
      isFetchingNextPage,
      isFetching,
    }
  },
}
</script>
