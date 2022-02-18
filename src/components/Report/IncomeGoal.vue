<template>
  <div class="w-5/12 border border-color-grey rounded-lg ml-2 mr-5 p-5 flex flex-col items-center justify-center">
    <div>Income Goal</div>
    <TotalChart :goal="member.goal" />
  </div>
</template>
<script>
import { useProspectDetails } from '@/api/use-prospect-details.js'
import TotalChart from '@/components/NewProspect/Chart/TotalChart.vue'

export default {
  name: 'IncomeGoal',
  components: {
    TotalChart,
  },
  setup() {
    const { isLoading, isError, data: member, other } = useProspectDetails()

    return {
      isLoading,
      isError,
      member,
      other,
    }
  },
}
</script>
