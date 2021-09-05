<template>
  <div class="w-16/24">
    <div>
      <span class="text-main text-smm font-semibold">
        Retirement Income Plan
      </span>
      <RetirementIncomeChart />
    </div>
  </div>
</template>
<script>
import RetirementIncomeChart from '@/components/MemberDetails/Chart/RetirementIncomeChart.vue'

export default {
  name: 'RetirementIncomePlan',
  components: {
    RetirementIncomeChart,
  },
  setup() {},
}
</script>
