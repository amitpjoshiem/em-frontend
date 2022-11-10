<template>
  <div class="flex mb-4">
    <div class="w-3/12">Name:</div>
    <SwdStubForText :text="annualItem.name" plug="&mdash;" class="text-main font-semibold" />
  </div>
  <div class="flex mb-4">
    <div class="w-3/12">Amount:</div>
    <SwdStubForText :text="getAmount" plug="&mdash;" class="text-main font-semibold" />
  </div>
  <div class="flex mb-4">
    <div class="w-3/12">Review date:</div>
    <SwdStubForText :text="getReviewDate" plug="&mdash;" class="text-main font-semibold" />
  </div>
  <div class="flex mb-4">
    <div class="w-3/12">Type:</div>
    <SwdStubForText :text="annualItem.type" plug="&mdash;" class="text-main font-semibold" />
  </div>
  <div class="flex mb-4">
    <div class="w-3/12">New money :</div>
    <SwdTag :status="!!annualItem.new_money" />
  </div>
  <div class="flex mb-4">
    <div class="w-3/12">Notes:</div>
    <SwdStubForText :text="annualItem.notes" plug="&mdash;" class="text-main font-semibold" />
  </div>
</template>

<script>
import IconDoneStep from '@/assets/svg/icon-done-step.svg'
import dayjs from 'dayjs'
import { computed } from 'vue'
import { currencyFormat } from '@/utils/currencyFormat'

export default {
  name: 'AnnualReviewsInfo',
  props: {
    annualItem: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const getReviewDate = computed(() => {
      if (props.annualItem.client_start_date) {
        return dayjs(props.annualItem.client_start_date).format('MM/DD/YYYY')
      }
      return ''
    })

    const getAmount = computed(() => {
      if (props.annualItem.amount) {
        return currencyFormat(props.annualItem.amount)
      }
      return ''
    })

    return {
      IconDoneStep,
      getReviewDate,
      getAmount,
    }
  },
}
</script>
