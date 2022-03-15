<template>
  <div class="flex h-10 w-full">
    <div class="w-6/24 total">Totals</div>
    <div class="w-2/24 total">
      <SwdSpinner v-if="isFetching" />
      <span v-else>{{ percentFormat(total.percent_of_holdings / 100, 2, 2) }}</span>
    </div>
    <div class="w-3/24 total">
      <SwdSpinner v-if="isFetching" />
      <span v-else>{{ currencyFormat(total.amount) }}</span>
    </div>
    <div class="w-2/24 total">
      <SwdSpinner v-if="isFetching" />
      <span v-else>{{ percentFormat(total.management_expense / 100, 2, 2) }}</span>
    </div>
    <div class="w-2/24 total">
      <SwdSpinner v-if="isFetching" />
      <span v-else>{{ percentFormat(total.turnover / 100, 2, 2) }}</span>
    </div>
    <div class="w-2/24 total">
      <SwdSpinner v-if="isFetching" />
      <span v-else>{{ percentFormat(total.trading_cost / 100, 2, 2) }}</span>
    </div>
    <div class="w-2/24 total">
      <SwdSpinner v-if="isFetching" />
      <span v-else>{{ percentFormat(total.wrap_fee / 100, 2, 2) }}</span>
    </div>
    <div class="w-2/24 total">
      <SwdSpinner v-if="isFetching" />
      <span v-else>{{ percentFormat(total.total_cost_percent / 100, 2, 2) }}</span>
    </div>
    <div class="w-3/24 total">
      <SwdSpinner v-if="isFetching" />
      <span v-else>{{ currencyFormat(total.total_cost) }}</span>
    </div>
    <div v-if="isAddLine" class="w-1/24 total">
      <div class="w-[15px] h-[15px] cursor-pointer">
        <InlineSvg :src="IconAdd" @click="addLine" />
      </div>
    </div>
  </div>
</template>

<script>
import { currencyFormat } from '@/utils/currencyFormat'
import { percentFormat } from '@/utils/percentFormat'

import IconAdd from '@/assets/svg/icon-add.svg'

export default {
  name: 'TotalTable',
  props: {
    total: {
      type: Object,
      require: true,
      default: () => {},
    },
    isFetching: {
      type: Boolean,
      require: true,
      default: false,
    },
    isAddLine: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  emits: ['addTableLine'],
  setup(_, { emit }) {
    const addLine = () => {
      emit('addTableLine')
    }
    return {
      currencyFormat,
      IconAdd,
      addLine,
      percentFormat,
    }
  },
}
</script>

<style scoped>
.total {
  @apply bg-color-grey text-xs font-medium text-main flex items-center justify-center text-center last:bg-white;
  @apply border-title-gray border-b border-r first:border-l;
}
</style>
