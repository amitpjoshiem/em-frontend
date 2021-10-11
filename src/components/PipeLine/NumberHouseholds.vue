<template>
  <div class="border border-color-grey rounded-xl p-5">
    <div class="text-smm text-main font-semibold mb-5">Number of Households</div>
    <div v-if="!isLoadingCount">
      <StatisticsCountChart :values="statisticsCount.data" class="my-4" />
    </div>
    <el-skeleton v-else :rows="3" animated class="p-5" />
  </div>
</template>
<script>
import { usePipeLineStatisticsCount } from '@/api/use-pipeline-statistics-count.js'
import StatisticsCountChart from '@/components/PipeLine/Chart/StatisticsCountChart/StatisticsCountChart.vue'
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
