<template>
  <div class="w-6/12 ml-2">
    <div class="flex justify-between items-center bg-widget-bg p-5 rounded-t">
      <div class="flex">
        <span
          class="
            w-9
            h-9
            rounded-md
            flex
            justify-center
            items-center
            bg-color-error
          "
        >
          <InlineSvg :src="IconSinceInception" />
        </span>
        <span class="ml-4 text-main text-title font-semibold">
          Since Inception
        </span>
      </div>
      <span class="text-small text-gray03">issue date: 2021-10-03</span>
    </div>
    <div class="border border-color-grey flex justify-between px-5 py-2">
      <span class="text-gray03 text-xs font-semibold"> Carrier: Acme Inc </span>
      <span class="text-gray03 text-xs font-semibold">Contract: 4567</span>
    </div>

    <div
      class="border border-t-0 border-color-grey flex justify-between px-4 py-2"
    >
      <span class="text-main text-sm">Beginning Balance</span>
      <span class="text-main text-sm font-semibold">$125,000</span>
    </div>

    <div
      class="border border-t-0 border-color-grey flex justify-between px-4 py-2"
    >
      <span class="text-main text-sm">Interest Credited</span>
      <span class="text-main text-sm font-semibold">$187,500</span>
    </div>

    <div
      class="border border-t-0 border-color-grey flex justify-between px-4 py-2"
    >
      <span class="text-main text-sm">Growth</span>
      <span class="text-main text-sm font-semibold">50%</span>
    </div>

    <div
      class="border border-t-0 border-color-grey flex justify-between px-4 py-2"
    >
      <span class="text-main text-sm">Withdrawals</span>
      <span class="text-main text-sm font-semibold">$25,000</span>
    </div>

    <div
      class="border border-t-0 border-color-grey flex justify-between px-4 py-2"
    >
      <span class="text-main text-sm">Contract Value</span>
      <span class="text-main text-sm font-semibold">$1,500</span>
    </div>

    <div class="bg-orange-bg flex justify-between px-4 py-3 rounded-b">
      <span class="text-main text-sm">Total Fees:</span>
      <span class="text-main text-sm font-semibold">$1,500</span>
    </div>
  </div>
</template>
<script>
import IconSinceInception from '@/assets/svg/icon-since-inception.svg'

export default {
  name: 'SinceInception',
  setup() {
    return {
      IconSinceInception,
    }
  },
}
</script>
