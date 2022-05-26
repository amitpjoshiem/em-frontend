<template>
  <div class="border rounded-lg p-5">
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
        <div v-for="(activ, index) in logs.pages" :key="index">
          <div v-if="activ.data !== undefined">
            <el-timeline v-for="elem in activ.data" :key="elem.day">
              <el-timeline-item :timestamp="elem.date + ' ' + elem.time" placement="top" color="#66B9FF">
                <el-card>
                  <div class="text-main mb-2">
                    <span class="pr-2">Assistant:</span>
                    <span class="font-semibold">{{ elem.user.username }}</span>
                  </div>
                  <div class="text-main mb-2">
                    <span class="pr-2">Action:</span>
                    <el-tag v-if="elem.action === 'created'" size="small">{{ elem.action }}</el-tag>
                    <el-tag v-if="elem.action === 'updated'" type="success" size="small">{{ elem.action }}</el-tag>
                  </div>
                  <div class="text-main mb-2">
                    <span class="pr-2">Entity:</span>
                    <span class="font-semibold">{{ elem.entity }}</span>
                  </div>
                  <div class="text-main mb-2">
                    <span class="pr-2">Member: </span>
                    <router-link
                      v-if="elem.member_type !== 'lead'"
                      :to="{ name: 'member-details', params: { id: elem.member_id } }"
                      class="text-smm font-medium hover:text-activity"
                    >
                      {{ elem.member_name }}
                    </router-link>
                    <router-link
                      v-if="elem.member_type === 'lead'"
                      :to="{ name: 'confirmation-page', params: { id: elem.member_id } }"
                      class="text-smm font-medium hover:text-activity"
                    >
                      {{ elem.member_name }}
                    </router-link>
                  </div>
                  <div class="text-main mb-2">
                    <span class="pr-2">Changes: </span>
                    <span v-if="!elem.changes.length">&mdash;</span>
                    <span v-for="(item, indexChanges) in elem.changes" v-else :key="indexChanges" class="pr-2">
                      <el-tag type="info" size="small" class="mb-2">{{ item }}</el-tag>
                    </span>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </ul>
      <div v-if="loading && hasMore" class="flex items-center justify-center h-6">
        <SwdSpinner />
      </div>
      <div v-if="!isLoading && !logs.pages[0].data.length" class="flex flex-col justify-center items-center pt-10">
        <div class="w-14 h-14 bg-color-grey rounded-full flex items-center justify-center">
          <InlineSvg :src="IconLastActivityEmpty" />
        </div>
        <span class="text-gray03 font-semibold text-xss mt-5">No recently added activities</span>
      </div>
    </div>
  </div>
</template>
<script>
import { useFetchLogs } from '@/api/use-fetch-logs'
import IconLastActivityEmpty from '@/assets/svg/icon-last-activity-empty.svg'
import { computed, onUnmounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'LogsContent',

  setup() {
    const store = useStore()

    const {
      data: logs,
      error,
      status,
      load,
      disabled,
      loading,
      isLoading,
      isFetchingNextPage,
      isFetching,
    } = useFetchLogs()

    const hasMore = computed(() => {
      const lastPage = logs.value.pages.length - 1
      const current_page = logs.value.pages[lastPage].meta.pagination.current_page
      const total_pages = logs.value.pages[lastPage].meta.pagination.total_pages
      return current_page < total_pages
    })

    onUnmounted(() => {
      store.commit('logs/setPage', 1)
    })

    return {
      logs,
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
