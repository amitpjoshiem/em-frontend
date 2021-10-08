<template>
  <div class="border border-input-border rounded-md p-5">
    <div class="text-smm text-main font-semibold mb-5">Number of Households</div>
    <div v-if="!isLoadingCount">
      <StatisticsCountChart :values="statisticsCount.data" />
    </div>
  </div>
</template>
<script>
import { usePipeLineStatisticsCount } from '@/api/use-pipeline-statistics-count.js'
import StatisticsCountChart from './Chart/StatisticsCountChart.vue'
export default {
  name: 'NumberHouseholds',
  components: {
    StatisticsCountChart,
  },
  setup() {
    const { isLoading: isLoadingCount, isError: isErrorCount, data: statisticsCount } = usePipeLineStatisticsCount()
    return {
      isLoadingCount,
      isErrorCount,
      statisticsCount,
    }
  },
}
</script>
