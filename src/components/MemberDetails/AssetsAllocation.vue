<template>
  <div class="border border-color-grey box-border flex w-16/24 rounded-md">
    <div class="border-r border-color-grey p-5 w-8/12">
      <span class="text-main text-smm font-semibold">Asset Allocation</span>
      <div class="flex pt-3">
        <AssetsChart />
        <div class="flex ml-4">
          <div class="flex flex-col justify-center mr-3">
            <div class="bg-dark-blue-charts w-2 h-2 rounded-full" />
            <div class="bg-activity w-2 h-2 rounded-full my-6" />
            <div class="bg-color-error w-2 h-2 rounded-full" />
          </div>
          <div class="flex flex-col justify-center text-main text-xs mr-3">
            <div>Liquidity</div>
            <div class="py-4">Growth</div>
            <div>Income</div>
          </div>
          <div class="flex flex-col justify-center text-main text-xs font-medium">
            <div>{{ currencyFormat(10000) }}</div>
            <div class="py-4">{{ currencyFormat(8000) }}</div>
            <div>{{ currencyFormat(2000) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-4/12 flex flex-col">
      <DropDown class="flex justify-end pt-3 pr-3" :options="actionsOptions">
        <template #titleDropDown>
          <span
            class="cursor-pointer bg-white rounded flex justify-center items-center py-2 px-3 border border-color-grey"
          >
            <InlineSvg :src="IconAction" />
          </span>
        </template>
      </DropDown>
      <div class="flex justify-center items-center flex-col">
        <RiskLevelChart />
        <div class="mt-7 text-sm font-semibold">
          <span class="text-main">Risk level: </span>
          <span class="text-activity">Moderate</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssetsChart from '@/components/MemberDetails/Chart/AssetsChart.vue'
import RiskLevelChart from '@/components/MemberDetails/Chart/RiskLevelChart.vue'
import IconAction from '@/assets/svg/icon-action.svg'
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'AssetsAllocation',
  components: {
    AssetsChart,
    RiskLevelChart,
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
      actionsOptions,
      currencyFormat,
      IconAction,
    }
  },
}
</script>
