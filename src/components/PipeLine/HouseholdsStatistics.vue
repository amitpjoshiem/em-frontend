<template>
  <div class="border border-color-grey rounded-xl">
    <div v-if="!isLoadingRetired && !isLoadingAge" class="flex">
      <div class="w-8/12 mr-2.5 border-r">
        <div class="p-5">
          <div class="text-smm text-main font-semibold">Households Statistics</div>
          <StatisticsRetiredChart :values="statisticsRetired.data" />
        </div>
      </div>
      <StatisticsAgeChart :values="statisticsAge.data" class="w-4/12 p-5" />
    </div>
    <el-skeleton v-else :rows="3" animated class="p-5" />
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
    const { isLoading: isLoadingAge, isError: isErrorAge, data: statisticsAge } = usePipeLineStatisticsAge()
    const {
      isLoading: isLoadingRetired,
      isError: isErrorRetired,
      data: statisticsRetired,
    } = usePipeLineStatisticsRetired()

    return {
      isLoadingAge,
      isErrorAge,
      statisticsAge,
      isLoadingRetired,
      isErrorRetired,
      statisticsRetired,
    }
  },
}
</script>
