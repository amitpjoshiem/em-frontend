<template>
  <div class="border border-color-grey rounded-lg mr-5 mt-5 p-5">
    <span>Net Worth</span>
    <div class="flex mt-5">
      <div class="w-7/12 flex justify-between">
        <div class="flex flex-col items-center pt-1.5">
          <div class="bg-dark-blue-charts w-2 h-2 rounded-full" />
          <div class="bg-activity w-2 h-2 rounded-full my-3.5" />
          <div class="bg-color-error w-2 h-2 rounded-full" />
        </div>
        <div class="flex flex-col text-main text-sm">
          <div>Market:</div>
          <div>Liquid:</div>
          <div>Income safe:</div>
        </div>
        <div class="flex flex-col text-main text-sm font-medium">
          <div>$50000</div>
          <div>$90000</div>
          <div>$10000</div>
        </div>
        <div class="flex flex-col text-main text-sm font-medium">
          <div>33%</div>
          <div>60%</div>
          <div>7%</div>
        </div>
      </div>

      <div class="w-5/12 flex justify-center items-center -mt-11 pl-9">
        <NetWorthChart />
      </div>
    </div>
  </div>
</template>

<script>
import NetWorthChart from '@/components/NewProspect/Chart/NetWorthChart.vue'

export default {
  name: 'NetWorth',
  components: {
    NetWorthChart,
  },
}
</script>
