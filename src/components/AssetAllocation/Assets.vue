<template>
  <div class="border box-border color-main-gray rounded-lg">
    <div class="text-smm font-medium text-main py-5 pl-5">Asset</div>
    <div class="flex h-6 bg-main-gray">
      <div class="w-5/12 title pl-5">asset Name</div>
      <div class="w-1/12 title">$</div>
      <div class="w-1/12 title">%</div>
      <div class="w-2/12 title">asset class</div>
      <div class="w-1/12 title">$</div>
    </div>
    <div class="line-item">
      <div class="w-5/12 item pl-5 font-semibold">BCM energy income</div>
      <div class="w-1/12 item">$12000</div>
      <div class="w-1/12 item">10%</div>
      <div class="w-2/12 item">
        <SwdCircularProgress :percentage="10" color="#FF92A5" />
        <span class="ml-2">Income</span>
      </div>
      <div class="w-1/12 item">$2000</div>
    </div>
    <div class="line-item">
      <div class="w-5/12 item pl-5 font-semibold">Ishares russel midcap growth</div>
      <div class="w-1/12 item">$6000</div>
      <div class="w-1/12 item">05%</div>
      <div class="w-2/12 item">
        <SwdCircularProgress :percentage="30" color="#53576A" />
        <span class="ml-2">Liquidity</span>
      </div>
      <div class="w-1/12 item">$2200</div>
    </div>
    <div class="line-item">
      <div class="w-5/12 item pl-5 font-semibold">Ishares russel midcap value</div>
      <div class="w-1/12 item">$14400</div>
      <div class="w-1/12 item">12%</div>
      <div class="w-2/12 item">
        <SwdCircularProgress :percentage="65" color="#66B6FF" />
        <span class="ml-2">Growth</span>
      </div>
      <div class="w-1/12 item">$1200</div>
    </div>
  </div>
</template>
<script>
import SwdCircularProgress from '@/components/Global/SwdCircularProgress.vue'

export default {
  name: 'Assets',
  components: {
    SwdCircularProgress,
  },
  setup() {},
}
</script>

<style scoped>
.title {
  @apply text-small text-main flex items-center uppercase text-center last:border-r-0;
}

.item {
  @apply text-xs text-main flex items-center text-center last:border-r-0;
}

.line-item {
  @apply last:border-b-0 border-b box-border py-3 text-main text-sm flex;
}
</style>
