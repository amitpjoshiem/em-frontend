<template>
  <div class="w-8/24 bg-widget-bg rounded-lg mr-5">
    <div class="p-5">
      <span class="text-main text-smm font-semibold"> Past Stress Test Results </span>
      <div class="flex mb-6">
        <LiquidityChart />
        <GrowthChart />
      </div>
      <Button :default-primary="!fetching" full text-btn="Stress test Hidden Levers" />
    </div>
  </div>
</template>

<script>
import LiquidityChart from '@/components/MemberDetails/Chart/LiquidityChart.vue'
import GrowthChart from '@/components/MemberDetails/Chart/GrowthChart.vue'

export default {
  name: 'PastStressTestResults',
  components: {
    LiquidityChart,
    GrowthChart,
  },
  setup() {},
}
</script>
