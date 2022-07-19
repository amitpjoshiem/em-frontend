<template>
  <div class="border border-color-grey rounded-xl p-5">
    <div class="flex justify-between items-center">
      <span class="text-smm font-medium">Number of Leeds Closed</span>
      <SwdSelectFilter destination="numberLeedsClosed" />
    </div>
    <div>
      <el-skeleton v-if="isLoading" :rows="3" animated class="p-5" />
      <!-- <SwdErrorBlock v-else-if="isError" /> -->
      <NumberLeedsClosed v-if="data" class="my-4" :values="data.data" />
    </div>
  </div>
</template>

<script>
import NumberLeedsClosed from '@/components/PipeLine/Chart/NumberLeedsClosed/NumberLeedsClosed'
import { useRevenueDashboardLeadClosed } from '@/api/use-revenue-dashboard-lead-closed.js'

export default {
  name: 'NumberLeedsClosedContent',
  components: {
    NumberLeedsClosed,
  },
  setup() {
    const { isLoading, isFetching, isError, data } = useRevenueDashboardLeadClosed()

    return {
      data,
      isLoading,
      isFetching,
      isError,
    }
  },
}
</script>
