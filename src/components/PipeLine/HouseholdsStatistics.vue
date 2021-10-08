<template>
  <div class="border border-input-border rounded-md p-5">
    <div>HouseholdsStatistics</div>

    <div v-if="!isLoadingCount">
      <div>COUNT</div>
      {{ statisticsCount }}
    </div>
    <div v-if="!isLoadingRetired">
      <!-- <div>RETIRED</div> -->
      <StatisticsRetiredChart :values="statisticsRetired.data" />
      <!-- {{ statisticsRetired }} -->
    </div>

    <div v-if="!isLoadingAge">
      <!-- <div>AGE</div> -->
      <StatisticsAgeChart />
      <!-- {{ statisticsAge }} -->
    </div>
  </div>
</template>
<script>
import { usePipeLineStatisticsAge } from '@/api/use-pipeline-statistics-age.js'
import { usePipeLineStatisticsCount } from '@/api/use-pipeline-statistics-count.js'
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
    const { isLoading: isLoadingCount, isError: isErrorCount, data: statisticsCount } = usePipeLineStatisticsCount()
    const {
      isLoading: isLoadingRetired,
      isError: isErrorRetired,
      data: statisticsRetired,
    } = usePipeLineStatisticsRetired()

    return {
      isLoadingAge,
      isErrorAge,
      statisticsAge,
      isLoadingCount,
      isErrorCount,
      statisticsCount,
      isLoadingRetired,
      isErrorRetired,
      statisticsRetired,
    }
  },
}
</script>
