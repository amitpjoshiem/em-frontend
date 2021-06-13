<template>
  <div class="bg-widget-bg flex flex-col p-2.5 justify-between rounded-md">
    <div
      class="bg-activity rounded-md flex justify-center items-center w-5 h-5"
    >
      <InlineSvg :src="IconIncomeTop" class="w-2" />
    </div>
    <div class="flex flex-col">
      <span class="text-small text-gray03">Total Income</span>
      <span class="text-sm font-semibold">$102,200,000</span>
      <div
        class="
          flex
          items-center
          bg-color-green-bg
          w-10
          justify-center
          h-4.5
          rounded-md
          mt-2.5
        "
      >
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
