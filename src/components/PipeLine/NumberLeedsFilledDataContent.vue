<template>
  <div class="border border-color-grey rounded-xl p-5">
    <div class="flex justify-between items-center">
      <span class="text-smm font-medium">Number of Leeds Filled Data</span>
      <SwdSelectFilter destination="numberLeedsFilledData" />
    </div>
    <div>
      <!-- <el-skeleton v-if="isLoading" :rows="3" animated class="p-5" /> -->
      <!-- <SwdErrorBlock v-else-if="isError" /> -->
      <NumberLeedsFilledData class="my-4" :values="data" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import NumberLeedsFilledData from '@/components/PipeLine/Chart/NumberLeedsFilledData/NumberLeedsFilledData'

export default {
  name: 'NumberLeedsFilledDataContent',
  components: {
    NumberLeedsFilledData,
  },
  setup() {
    const data = ref([])
    return {
      data,
    }
  },
}
</script>
