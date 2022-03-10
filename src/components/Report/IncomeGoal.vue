<template>
  <div
    v-if="member"
    class="w-5/12 border border-color-grey rounded-lg ml-2 mr-5 p-5 flex flex-col items-center justify-center"
  >
    <div>Income Goal</div>
    <TotalChart :goal="member.goal" />
  </div>
</template>
<script>
import TotalChart from '@/components/NewProspect/Chart/TotalChart.vue'

export default {
  name: 'IncomeGoal',
  components: {
    TotalChart,
  },
  props: {
    member: {
      type: Object,
      require: false,
      default: () => {},
    },
  },
  setup() {},
}
</script>
