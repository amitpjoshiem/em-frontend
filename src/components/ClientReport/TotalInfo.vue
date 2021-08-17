<template>
  <div class="flex justify-between mt-7">
    <div class="w-4/12 bg-widget-bg py-6 rounded flex flex-col items-center">
      <span class="text-gray03 font-semibold text-sm">TDA Total Value</span>
      <span class="text-main font-semibold text-2xl mt-2">$239,293</span>
    </div>
    <div
      class="w-4/12 mx-5 bg-widget-bg py-6 rounded flex flex-col items-center"
    >
      <span class="text-gray03 font-semibold text-sm">
        Total Current Value
      </span>
      <span class="text-main font-semibold text-2xl mt-2">$239,293</span>
    </div>
    <div class="w-4/12 bg-widget-bg py-6 rounded flex flex-col items-center">
      <span class="text-gray03 font-semibold text-sm">CAGR Growth Rate</span>
      <span class="text-main font-semibold text-2xl mt-2">0,0%</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TotalInfo',
  setup() {},
}
</script>
