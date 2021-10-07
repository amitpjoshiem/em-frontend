<template>
  <div class="bg-widget-bg p-2.5 rounded-md mt-5 flex justify-center">
    <div class="flex items-center justify-between w-8/12">
      <!-- <div class="bg-activity rounded-md flex justify-center items-center w-5 h-5">
        <InlineSvg v-if="up" :src="IconIncomeTop" class="w-2" />
        <InlineSvg v-else :src="IconIncomeTop" class="w-2" />
      </div> -->
      <div>
        <InlineSvg v-if="up" :src="IconUpRisk" class="h-5" />
        <InlineSvg v-else :src="IconDownRisk" class="h-5" />
      </div>
      <div>
        <span class="text-small text-gray03">Total Income: </span>
        <span class="text-sm font-medium">{{ currencyFormat(total) }}</span>
      </div>
      <div class="flex items-center justify-center h-4.5 rounded-md bg-gray03">
        <div class="flex items-center px-1 py-px">
          <InlineSvg :src="IconLightning" class="w-2 mr-[2px]" />
          <span class="text-smallx text-white font-semibold">{{ percentFormat(percent / 100) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconIncomeTop from '@/assets/svg/icon-income-top.svg'
import IconLightning from '@/assets/svg/icon-lightning.svg'

import IconDownRisk from '@/assets/svg/icon-down-risk.svg'
import IconUpRisk from '@/assets/svg/icon-up-risk.svg'

import { currencyFormat } from '@/utils/currencyFormat'
import { percentFormat } from '@/utils/percentFormat'

export default {
  props: {
    percent: {
      type: String,
      require: true,
      default: '',
    },
    total: {
      type: String,
      require: true,
      default: '',
    },
    up: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  setup() {
    return {
      IconDownRisk,
      IconUpRisk,
      IconIncomeTop,
      IconLightning,
      currencyFormat,
      percentFormat,
    }
  },
}
</script>
