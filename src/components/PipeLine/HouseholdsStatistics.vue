<template>
  <div class="border border-color-grey rounded-xl">
    <div class="flex">
      <div class="w-8/12 mr-2.5 border-r">
        <div class="px-5 pb-8">
          <div class="text-smm text-main font-semibold py-5">Households Statistics</div>
          <el-skeleton v-if="isLoadingRetired" :rows="2" animated class="p-5" />
          <SwdErrorBlock v-else-if="isErrorRetired" />
          <StatisticsRetiredChart v-else-if="statisticsRetired" :values="statisticsRetired.data" />
        </div>
      </div>
      <div class="w-4/12 px-5 py-8">
        <el-skeleton v-if="isLoadingAge" :rows="2" animated class="p-5" />
        <SwdErrorBlock v-else-if="isErrorAge" />
        <StatisticsAgeChart v-else-if="statisticsAge" :values="statisticsAge.data" />
      </div>
    </div>
  </div>
</template>

<script>
import { usePipeLineStatisticsAge } from '@/api/use-pipeline-statistics-age.js'
import { usePipeLineStatisticsRetired } from '@/api/use-pipeline-statistics-retired.js'
import StatisticsRetiredChart from '@/components/PipeLine/Chart/StatisticsRetiredChart/StatisticsRetiredChart.vue'
import StatisticsAgeChart from '@/components/PipeLine/Chart/StatisticsAgeChart/StatisticsAgeChart.vue'

export default {
  name: 'HouseholdsStatistics',
  components: {
    StatisticsRetiredChart,
    StatisticsAgeChart,
  },
  setup() {
    const {
      isLoading: isLoadingAge,
      isError: isErrorAge,
      isFetching: isFetchingAge,
      data: statisticsAge,
    } = usePipeLineStatisticsAge()

    const {
      isLoading: isLoadingRetired,
      isFetching: isFetchingRetired,
      isError: isErrorRetired,
      data: statisticsRetired,
    } = usePipeLineStatisticsRetired()

    return {
      isLoadingAge,
      isFetchingAge,
      isErrorAge,
      statisticsAge,
      isLoadingRetired,
      isFetchingRetired,
      isErrorRetired,
      statisticsRetired,
    }
  },
}
</script>
