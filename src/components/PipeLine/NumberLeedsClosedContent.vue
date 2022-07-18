<template>
  <div class="border border-color-grey rounded-xl p-5">
    <div class="flex justify-between items-center">
      <span class="text-smm font-medium">Number of Leeds Closed</span>
      <SwdSelectFilter destination="numberLeedsContent" />
    </div>
    <div>
      <!-- <el-skeleton v-if="isLoading" :rows="3" animated class="p-5" /> -->
      <!-- <SwdErrorBlock v-else-if="isError" /> -->
      <NumberLeedsClosed class="my-4" :values="data" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import NumberLeedsClosed from '@/components/PipeLine/Chart/NumberLeedsClosed/NumberLeedsClosed'

export default {
  name: 'NumberLeedsClosedContent',
  components: {
    NumberLeedsClosed,
  },
  setup() {
    const data = ref([])
    return {
      data,
    }
  },
}
</script>
