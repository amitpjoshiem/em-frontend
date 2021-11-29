<template>
  <div class="mb-5 w-[49%]">
    <div class="flex justify-between items-center bg-widget-bg p-5 rounded-t">
      <div class="flex items-center">
        <span class="w-9 h-9 rounded-md flex justify-center items-center bg-activity">
          <InlineSvg :src="IconCurrentYear" />
        </span>
        <span class="ml-4 text-main text-title font-semibold">Contract {{ contract.contract_number }}</span>
      </div>
      <span class="text-xs text-gray03">issue date: {{ getIssueDate }}</span>
    </div>

    <div class="border border-t-0 border-color-grey flex justify-between px-4 py-2">
      <span class="text-main text-sm">Carrier</span>
      <span class="text-main text-sm font-semibold">{{ contract.carrier }}</span>
    </div>

    <div class="border border-t-0 border-color-grey flex justify-between px-4 py-2">
      <span class="text-main text-sm">Beginning Balance</span>
      <span class="text-main text-sm font-semibold">---</span>
    </div>

    <div class="border border-t-0 border-color-grey flex justify-between px-4 py-2">
      <span class="text-main text-sm">Contract Value</span>
      <span class="text-main text-sm font-semibold">{{ currencyFormat(contract.contract_value) }}</span>
    </div>
    <div class="border border-t-0 border-color-grey flex justify-end px-4 py-2">
      <el-button size="mini" @click="moreAction">More info</el-button>
    </div>

    <div></div>
  </div>
</template>

<script>
import IconCurrentYear from '@/assets/svg/icon-current-year.svg'
import { currencyFormat } from '@/utils/currencyFormat'
import { computed } from 'vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

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
    const router = useRouter()

    const getIssueDate = computed(() => {
      return dayjs(props.contract.issue_at).format('MM/DD/YYYY')
    })

    const moreAction = () => {
      console.log('moreAction')
      router.push({ name: 'contract-info', params: { id: props.contract.id } })
    }

    return {
      IconCurrentYear,
      currencyFormat,
      getIssueDate,
      moreAction,
    }
  },
}
</script>
