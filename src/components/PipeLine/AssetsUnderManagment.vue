<template>
  <div v-if="!isLoading" class="border border-input-border rounded-md p-5">
    <div class="text-smm text-main font-semibold mb-5">Assets Under Managment</div>
    <AumChart :values="aum.data" />
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
    const { isLoading: isLoading, isError, data: aum } = usePipeLineAum()

    return {
      isLoading: isLoading,
      isError,
      aum,
    }
  },
}
</script>
