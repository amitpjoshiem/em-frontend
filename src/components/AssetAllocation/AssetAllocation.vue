<template>
  <div class="flex">
    <div class="w-9/12 rounded-l-md border-color-grey border pt-6 pb-6 pr-5">
      <div class="pl-5 text-main font-semibold text-smm mb-2">Asset Allocation</div>
      <div class="flex">
        <div class="w-4/12 flex justify-center items-center">
          <ChartAssetAllocation />
        </div>
        <div class="w-8/12">
          <div class="flex font-semibold text-sm mb-3">
            <div class="flex items-center w-4/12">
              <div class="bg-dark-blue-charts w-3 h-3 rounded-full" />
              <span class="text-main mx-2">Liquidity</span>
              <span class="text-gray03">59%</span>
            </div>
            <div class="flex items-center w-4/12">
              <div class="bg-activity w-3 h-3 rounded-full" />
              <span class="text-main mx-2">Growth</span>
              <span class="text-gray03">27%</span>
            </div>
            <div class="flex items-center w-4/12">
              <div class="bg-color-error w-3 h-3 rounded-full" />
              <span class="text-main mx-2">Income</span>
              <span class="text-gray03">14%</span>
            </div>
          </div>
          <div class="flex text-main font-semibold text-sm mb-3">
            <div class="w-4/12">$70.800</div>
            <div class="w-4/12">$32.400</div>
            <div class="w-4/12">$16.800</div>
          </div>
          <div class="flex mb-3">
            <div class="w-4/12 text-gray03 text-xxs">Highest assets invested</div>
            <div class="w-8/12 flex items-center">
              <InlineSvg :src="IconAssetsLine" />
            </div>
          </div>
          <div class="flex text-main font-semibold text-xs mb-3">
            <div class="w-4/12">Internaational Equity Portfolio ($20,000)</div>
            <div class="w-4/12">
              NPL WP Cash <br />
              ($13.000)
            </div>
            <div class="w-4/12">
              Cope Engineering <br />
              Ltd ($2.000)
            </div>
          </div>
          <div class="flex mb-3">
            <div class="w-4/12 text-gray03 text-xxs">Lowest assets invested</div>
            <div class="w-8/12 flex items-center">
              <InlineSvg :src="IconAssetsLine" />
            </div>
          </div>
          <div class="flex text-main font-semibold text-xs">
            <div class="w-4/12">
              LLLA Unite Linked <br />
              Emerging ... ($1,200)
            </div>
            <div class="w-4/12">
              Bank of America <br />
              ($1.000)
            </div>
            <div class="w-4/12">
              Cope Engineering <br />
              Ltd ($2.000)
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-3/12 rounded-r-md border-color-grey border-t border-r border-b flex flex-col justify-between">
      <SwdDropDown class="flex justify-end pt-3 pr-3" :options="actionsOptions">
        <template #titleDropDown>
          <span
            class="cursor-pointer bg-white rounded flex justify-center items-center py-2 px-3 border border-color-grey"
          >
            <InlineSvg :src="IconAction" />
          </span>
        </template>
      </SwdDropDown>
      <div class="flex justify-center">
        <ChartRiskLevel class="items-center" />
      </div>
      <div class="text-sm font-semibold bg-widget-bg p-3 flex justify-center">
        <span class="text-main">Risk level: </span>
        <span class="text-activity">Moderate</span>
      </div>
    </div>
  </div>
</template>
<script>
import ChartAssetAllocation from './chart/ChartAssetAllocation.vue'
import ChartRiskLevel from './chart/ChartRiskLevel.vue'
import IconAssetsLine from '@/assets/svg/icon-assets-line.svg'
import IconAction from '@/assets/svg/icon-action.svg'

export default {
  name: 'AssetAllocation',
  components: {
    ChartAssetAllocation,
    ChartRiskLevel,
  },
  setup() {
    const actionsOptions = [
      {
        title: 'Item 1',
        command: 'item-1',
      },
      {
        title: 'Item 2',
        command: 'item2',
      },
      {
        title: 'Item 3',
        command: 'item3',
      },
    ]
    return {
      IconAssetsLine,
      actionsOptions,
      IconAction,
    }
  },
}
</script>
