<template>
  <div class="bg-widget-bg p-2.5 rounded-md mt-5 flex justify-center">
    <div class="flex items-center justify-between w-8/12">
      <div class="bg-activity rounded-md flex justify-center items-center w-5 h-5">
        <InlineSvg :src="IconIncomeTop" class="w-2" />
      </div>
      <div>
        <span class="text-small text-gray03">Total Income: </span>
        <span class="text-sm font-medium">$102,200,000</span>
      </div>
      <div class="flex items-center w-10 justify-center h-4.5 rounded-md bg-gray03">
        <InlineSvg :src="IconLightning" class="w-2 mr-[2px]" />
        <span class="text-smallx text-white">23%</span>
      </div>
    </div>
  </div>
</template>

<script>
import IconIncomeTop from '@/assets/svg/icon-income-top.svg'
import IconLightning from '@/assets/svg/icon-lightning.svg'

export default {
  setup() {
    return {
      IconIncomeTop,
      IconLightning,
    }
  },
}
</script>
