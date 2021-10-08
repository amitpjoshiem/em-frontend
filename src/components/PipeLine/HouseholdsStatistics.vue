<template>
  <div class="border border-input-border rounded-md p-5">
    <div class="text-smm text-main font-semibold mb-5">HouseholdsStatistics</div>
    <div class="flex">
      <div v-if="!isLoadingRetired" class="w-8/12 mr-2.5">
        <StatisticsRetiredChart :values="statisticsRetired.data" />
      </div>
      <div v-if="!isLoadingAge" class="w-4/12 ml-2.5 -mt-4">
        <StatisticsAgeChart :values="statisticsAge.data" />
      </div>
    </div>
  </div>
</template>
<script>
import { usePipeLineStatisticsAge } from '@/api/use-pipeline-statistics-age.js'
import { usePipeLineStatisticsRetired } from '@/api/use-pipeline-statistics-retired.js'

import StatisticsRetiredChart from './Chart/StatisticsRetiredChart.vue'
import StatisticsAgeChart from './Chart/StatisticsAgeChart.vue'

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
