<template>
  <div class="w-full border border-color-grey box-border rounded-md p-5 bg-main-gray">
    <div>
      <span class="text-main text-smm font-semibold"> Retirement Income Plan </span>
      <RetirementIncomeChart class="h-40 mb-2 mt-2" />
    </div>
    <div class="flex justify-between items-center">
      <div>
        <span class="text-main text-xs font-semibold"> Retirement spending ability </span>
      </div>
      <div class="text-main text-xs">
        <span>Projected </span>
        <span class="font-semibold">---</span>
      </div>
      <div class="text-main text-xs">
        <span>Planned </span>
        <span class="font-semibold">---</span>
      </div>
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
}
</script>
