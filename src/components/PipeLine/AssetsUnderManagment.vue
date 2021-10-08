<template>
  <div class="border border-color-grey rounded-xl p-5">
    <div v-if="!isLoading">
      <div class="text-smm text-main font-semibold mb-5">Assets Under Managment</div>
      <AumChart :values="aum.data" class="my-4" />
    </div>
    <el-skeleton v-else :rows="3" animated class="p-5" />
  </div>
</template>
<script>
import { usePipeLineAum } from '@/api/use-pipeline-aum.js'
import AumChart from './Chart/AumChart.vue'
export default {
  name: 'AssetsUnderManagment',
  components: {
    AumChart,
  },
  setup() {
    const { isLoading, isError, data: aum } = usePipeLineAum()

    return {
      isLoading,
      isError,
      aum,
    }
  },
}
</script>
