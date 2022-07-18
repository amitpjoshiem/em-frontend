<template>
  <div class="border border-color-grey rounded-xl p-5">
    <div class="flex justify-between items-center">
      <span class="text-smm font-medium">Number of Leeds Converted</span>
      <SwdSelectFilter destination="numberLeedsConverted" />
    </div>
    <div>
      <!-- <el-skeleton v-if="isLoading" :rows="3" animated class="p-5" /> -->
      <!-- <SwdErrorBlock v-else-if="isError" /> -->
      <NumberLeedsConverted class="my-4" :values="data" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import NumberLeedsConverted from '@/components/PipeLine/Chart/NumberLeedsConverted/NumberLeedsConverted'

export default {
  name: 'NumberLeedsConvertedContent',
  components: {
    NumberLeedsConverted,
  },
  setup() {
    const data = ref([])
    return {
      data,
    }
  },
}
</script>
