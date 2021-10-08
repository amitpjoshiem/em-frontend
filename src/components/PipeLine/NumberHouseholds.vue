<template>
  <div class="border border-input-border rounded-md p-5">
    <div class="text-smm text-main font-semibold mb-5">Number of Households</div>
    <!-- <div v-if="!isLoading">
      {{ statisticsAge }}
    </div> -->
  </div>
</template>
<script>
// import { usePipeLineStatisticsAge } from '@/api/use-pipeline-statistics-age.js'

export default {
  name: 'NumberHouseholds',
  setup() {
    // const { isLoading, isError, data: statisticsAge } = usePipeLineStatisticsAge()
    // return {
    //   isLoading,
    //   isError,
    //   statisticsAge,
    // }
  },
}
</script>
