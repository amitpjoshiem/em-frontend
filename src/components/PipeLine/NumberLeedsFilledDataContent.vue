<template>
  <div class="border border-color-grey rounded-xl p-5">
    <div class="flex justify-between items-center">
      <span class="text-smm font-medium">Number of Leeds Filled Data</span>
      <SwdSelectFilter destination="numberLeedsFilledData" />
    </div>
    <div>
      <el-skeleton v-if="isLoading || isFetching" :rows="3" animated class="p-5" />
      <SwdErrorBlock v-else-if="isError" />
      <NumberLeedsFilledData v-else-if="data.data" class="my-4" :values="data.data" />
    </div>
  </div>
</template>

<script>
import NumberLeedsFilledData from '@/components/PipeLine/Chart/NumberLeedsFilledData/NumberLeedsFilledData'
import { useRevenueDashboardLeadFilled } from '@/api/use-revenue-dashboard-lead-filled.js'

export default {
  name: 'NumberLeedsFilledDataContent',
  components: {
    NumberLeedsFilledData,
  },
  setup() {
    const { isLoading, isFetching, isError, data } = useRevenueDashboardLeadFilled()

    return {
      data,
      isLoading,
      isFetching,
      isError,
    }
  },
}
</script>
