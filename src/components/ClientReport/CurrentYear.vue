<template>
  <div class="mb-5">
    <div class="flex justify-between items-center bg-widget-bg p-5 rounded-t">
      <div class="flex">
        <span class="w-9 h-9 rounded-md flex justify-center items-center bg-activity">
          <InlineSvg :src="IconCurrentYear" />
        </span>
        <span class="ml-4 text-main text-title font-semibold"> Current Year </span>
      </div>
      <span class="text-small text-gray03">issue date: {{ getIssueDate }}</span>
    </div>
    <div class="border border-color-grey flex justify-between px-5 py-2">
      <span class="text-gray03 text-xs font-semibold"> Carrier: {{ contract.carrier }}</span>
      <span class="text-gray03 text-xs font-semibold">{{ contract.contract_number }}</span>
    </div>

    <div class="border border-t-0 border-color-grey flex justify-between px-4 py-2">
      <span class="text-main text-sm">Beginning Balance</span>
      <span class="text-main text-sm font-semibold">---</span>
    </div>

    <div class="border border-t-0 border-color-grey flex justify-between px-4 py-2">
      <span class="text-main text-sm">Interest Credited</span>
      <span class="text-main text-sm font-semibold">---</span>
    </div>

    <div class="border border-t-0 border-color-grey flex justify-between px-4 py-2">
      <span class="text-main text-sm">Growth</span>
      <span class="text-main text-sm font-semibold">---</span>
    </div>

    <div class="border border-t-0 border-color-grey flex justify-between px-4 py-2">
      <span class="text-main text-sm">Withdrawals</span>
      <span class="text-main text-sm font-semibold">---</span>
    </div>

    <div class="border border-t-0 border-color-grey flex justify-between px-4 py-2">
      <span class="text-main text-sm">Contract Value</span>
      <span class="text-main text-sm font-semibold">{{ currencyFormat(contract.contract_value) }}</span>
    </div>

    <div class="bg-color-light-blue flex justify-between px-4 py-3 rounded-b">
      <span class="text-main text-sm">Total Fees:</span>
      <span class="text-main text-sm font-semibold">---</span>
    </div>
  </div>
</template>

<script>
import IconCurrentYear from '@/assets/svg/icon-current-year.svg'
import { currencyFormat } from '@/utils/currencyFormat'
import { computed } from 'vue'
import dayjs from 'dayjs'

export default {
  name: 'CurrentYear',

  props: {
    contract: {
      type: Object,
      require: true,
      default: () => {},
    },
  },

  setup(props) {
    const getIssueDate = computed(() => {
      return dayjs(props.contract.issue_at).format('MM/DD/YYYY')
    })

    return {
      IconCurrentYear,
      currencyFormat,
      getIssueDate,
    }
  },
}
</script>
