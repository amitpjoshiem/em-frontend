<template>
  <div class="border border-color-grey rounded-xl p-5">
    <div class="text-smm text-main font-semibold mb-5">Number of Households</div>
    <el-skeleton v-if="isLoading" :rows="3" animated class="p-5" />
    <SwdErrorBlock v-else-if="isError" />
    <StatisticsCountChart v-else-if="data" :values="data.data" class="my-4" />
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
    const { isLoading, isFetching, isError, data } = usePipeLineStatisticsCount()
    return {
      isLoading,
      isFetching,
      isError,
      data,
    }
  },
}
</script>
