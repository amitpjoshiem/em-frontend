<template>
  <div class="border border-color-grey rounded-xl p-5">
    <div class="flex justify-between items-center">
      <span class="text-smm font-medium">Number of Leeds Converted</span>
      <SwdSelectFilter destination="numberLeedsConverted" />
    </div>
    <div>
      <el-skeleton v-if="isLoading" :rows="3" animated class="p-5" />
      <SwdErrorBlock v-else-if="isError" />
      <NumberLeedsConverted v-else-if="data" class="my-4" :values="data.data" />
    </div>
  </div>
</template>

<script>
import NumberLeedsConverted from '@/components/PipeLine/Chart/NumberLeedsConverted/NumberLeedsConverted'
import { useRevenueDashboardLeadConverted } from '@/api/use-revenue-dashboard-lead-converted.js'

export default {
  name: 'NumberLeedsConvertedContent',
  components: {
    NumberLeedsConverted,
  },
  setup() {
    const { isLoading, isFetching, isError, data } = useRevenueDashboardLeadConverted()

    return {
      data,
      isLoading,
      isFetching,
      isError,
    }
  },
}
</script>
