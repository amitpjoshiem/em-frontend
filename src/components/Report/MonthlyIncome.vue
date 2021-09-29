<template>
  <div class="w-5/12">
    <div class="bg-widget-bg pt-5 pl-5 pb-2 rounded-tr-lg rounded-tl-lg text-smm text-main font-medium">
      Monthly Income analysis
    </div>
    <div class="flex py-2 border-b border-r border-l border-color-grey">
      <div class="w-6/12" />
      <div class="w-3/12 text-xs text-gray03">Current</div>
      <div class="w-3/12 text-xs text-gray03 text-right pr-7">Future</div>
    </div>

    <div
      v-for="(item, index) in monthlyIncome"
      :key="index"
      class="flex text-xss text-main border-b border-r border-l border-color-grey py-2"
    >
      <div class="w-6/12 pl-5">{{ item.title }}</div>
      <div class="w-3/12">{{ item.current }}</div>
      <div class="w-3/12 text-right pr-5">{{ item.future }}</div>
    </div>

    <div class="bg-widget-bg pt-5 pl-5 pb-2 text-xss text-main font-medium flex justify-between">
      <div class="w-6/12">Monthly Expenses</div>
      <div class="w-3/12 text-right pr-5">$2000</div>
    </div>

    <div
      v-for="(item, index) in monthlyExpenses"
      :key="index"
      class="flex justify-between text-xss text-main border-b border-r border-l border-color-grey py-2"
    >
      <div class="w-6/12 pl-5">{{ item.title }}</div>
      <div class="w-3/12 pr-5 text-right">{{ item.future }}</div>
    </div>

    <div class="bg-color-light-blue rounded-br-lg rounded-bl-lg text-xss text-main font-medium">
      <div class="pl-5 pr-5 py-3 flex justify-between">
        <span>Total:</span>
        <span>$1.500</span>
      </div>
      <div class="pl-5 pr-5 pb-3 flex justify-between">
        <span>Shortfall:</span>
        <span>$1.500</span>
      </div>
    </div>
  </div>
</template>
<script>
import { useMonthlyIncome, useMonthlyExpenses } from '@/components/NewProspect/DTO/blueReport'

export default {
  name: 'MonthlyIncome',
  setup() {
    const { data: monthlyIncome } = useMonthlyIncome()
    const { data: monthlyExpenses } = useMonthlyExpenses()

    return {
      monthlyIncome,
      monthlyExpenses,
    }
  },
}
</script>
