<template>
  <div class="border border-color-grey rounded-xl p-5">
    <div class="flex justify-between items-center">
      <span class="text-smm font-medium">Number of Leeds</span>
      <SwdSelectFilter destination="numberLeeds" />
    </div>
    <div>
      <el-skeleton v-if="isLoading" :rows="3" animated class="p-5" />
      <SwdErrorBlock v-else-if="isError" />
      <NumberLeeds v-else-if="data" class="my-4" :values="data.data" />
    </div>
  </div>
</template>

<script>
import { useRevenueDashboardLeadCreated } from '@/api/use-revenue-dashboard-lead-created.js'
import NumberLeeds from '@/components/PipeLine/Chart/NumberLeeds/NumberLeeds'

export default {
  name: 'NumberLeedsContent',
  components: {
    NumberLeeds,
  },
  setup() {
    const { isLoading, isFetching, isError, data } = useRevenueDashboardLeadCreated()

    return {
      isLoading,
      isFetching,
      isError,
      data,
    }
  },
}
</script>
