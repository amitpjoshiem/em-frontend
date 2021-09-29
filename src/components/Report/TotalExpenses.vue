<template>
  <div class="w-5/12 border border-color-grey rounded-lg ml-2 mr-5 p-5 flex flex-col items-center justify-center">
    <div>Total Expenses</div>
    <TotalChart />
  </div>
</template>
<script>
import TotalChart from '@/components/NewProspect/Chart/TotalChart.vue'
export default {
  name: 'TotalExpenses',
  components: {
    TotalChart,
  },
  setup() {},
}
</script>
