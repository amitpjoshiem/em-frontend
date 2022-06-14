<template>
  <div class="border border-color-grey rounded-xl p-5">
    <div class="text-smm text-main font-semibold mb-5">Assets Under Management</div>
    <el-skeleton v-if="isLoading" :rows="3" animated class="p-5" />
    <SwdErrorBlock v-else-if="isError" />
    <AumChart v-else-if="aum" :values="aum.data" class="my-4" />
  </div>
</template>
<script>
import { usePipeLineAum } from '@/api/use-pipeline-aum.js'
import AumChart from '@/components/PipeLine/Chart/AumChart/AumChart.vue'

export default {
  name: 'AssetsUnderManagement',
  components: {
    AumChart,
  },
  setup() {
    const { isLoading, isFetching, isError, data: aum } = usePipeLineAum()

    return {
      isLoading,
      isFetching,
      isError,
      aum,
    }
  },
}
</script>
