<template>
  <div class="bg-widget-bg p-2.5 rounded-md mt-5 flex justify-center">
    <div class="flex items-center justify-between w-8/12">
      <div>
        <InlineSvg v-if="up" :src="IconUpRisk" class="h-5" />
        <InlineSvg v-else :src="IconDownRisk" class="h-5" />
      </div>
      <div>
        <span class="text-small text-gray03">Total Income: </span>
        <span class="text-sm font-medium">{{ currencyFormat(total) }}</span>
      </div>
      <div class="flex items-center justify-center h-4.5 rounded-md" :class="getPercentClass">
        <div class="flex items-center px-1 py-px">
          <InlineSvg :src="IconLightning" class="w-2 mx-1" :class="{ 'icon-transform': !up }" />
          <span class="text-small text-white font-semibold">{{ percentFormat(percent / 100) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

import IconIncomeTop from '@/assets/svg/icon-income-top.svg'
import IconLightning from '@/assets/svg/icon-lightning.svg'

import IconDownRisk from '@/assets/svg/icon-down-risk.svg'
import IconUpRisk from '@/assets/svg/icon-up-risk.svg'

import { currencyFormat } from '@/utils/currencyFormat'
import { percentFormat } from '@/utils/percentFormat'

export default {
  props: {
    percent: {
      type: Number,
      require: true,
      default: 0,
    },
    total: {
      type: Number,
      require: true,
      default: 0,
    },
    up: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  setup(props) {
    const getPercentClass = computed(() => {
      if (props.up) return 'bg-border-green'
      return 'bg-color-error'
    })
    return {
      getPercentClass,
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

<style>
.icon-transform {
  transform: scale(1, -1);
}
</style>
