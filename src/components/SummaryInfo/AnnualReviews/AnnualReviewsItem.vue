<template>
  <div class="flex">
    <div class="w-6/12 flex mb-4">
      <div class="pr-2">Name:</div>
      <SwdStubForText :text="annualItem.name" plug="&mdash;" class="text-main font-semibold" />
    </div>
    <div class="w-6/12 flex mb-4">
      <div class="pr-2">Amount:</div>
      <SwdStubForText :text="getAmount" plug="&mdash;" class="text-main font-semibold" />
    </div>
  </div>
  <div class="flex">
    <div class="w-6/12 flex mb-4">
      <div class="pr-2">Review Date:</div>
      <SwdStubForText :text="getReviewDate" plug="&mdash;" class="text-main font-semibold" />
    </div>
    <div class="w-6/12 flex mb-4">
      <div class="pr-2">Type:</div>
      <SwdStubForText :text="annualItem.type" plug="&mdash;" class="text-main font-semibold" />
    </div>
  </div>
  <div class="flex">
    <div class="w-6/12 flex mb-4">
      <div class="pr-2">New money :</div>
      <SwdTag :status="!!annualItem.new_money" />
    </div>
    <div class="w-6/12 mb-4">
      <div class="pr-2 pb-2">Notes:</div>
      <SwdStubForText :text="annualItem.notes" plug="&mdash;" class="text-main font-semibold" />
    </div>
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
      if (props.annualItem.review_date) {
        return dayjs(props.annualItem.review_date).format('MM/DD/YYYY')
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
