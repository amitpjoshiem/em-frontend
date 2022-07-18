<template>
  <div class="border border-color-grey rounded-xl p-5">
    <div class="flex justify-between items-center">
      <span class="text-smm font-medium">Number of Leeds</span>
      <SwdSelectFilter destination="numberLeeds" />
    </div>
    <div>
      <!-- <el-skeleton v-if="isLoading" :rows="3" animated class="p-5" /> -->
      <!-- <SwdErrorBlock v-else-if="isError" /> -->
      <NumberLeeds class="my-4" :values="data" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import NumberLeeds from '@/components/PipeLine/Chart/NumberLeeds/NumberLeeds'

export default {
  name: 'NumberLeedsContent',
  components: {
    NumberLeeds,
  },
  setup() {
    const data = ref([])
    return {
      data,
    }
  },
}
</script>
