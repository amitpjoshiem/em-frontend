<template>
  <div class="border border-border-blue rounded-md p-5 mb-4">
    <div class="flex items-center mb-5">
      <InlineSvg :src="IconDoneStep" />
      <div class="text-main text-xl font-semibold ml-2">Household Info</div>
    </div>
    <div class="flex">
      <div class="w-6/12 flex mb-4">
        <div class="pr-2">Household value:</div>
        <SwdStubForText :text="getAmount" plug="&mdash;" class="text-main font-semibold" />
      </div>
      <div class="w-6/12 flex mb-4">
        <div class="pr-2">Total investment size:</div>
        <SwdStubForText
          :text="member.salesforce.total_investment_size"
          plug="&mdash;"
          class="text-main font-semibold"
        />
      </div>
    </div>
    <div class="flex">
      <div class="w-6/12 flex mb-4">
        <div class="pr-2">Political Stance:</div>
        <SwdStubForText :text="member.salesforce.political_stance" plug="&mdash;" class="text-main font-semibold" />
      </div>
      <div class="w-6/12 flex mb-4">
        <div class="pr-2">Client Average Age:</div>
        <SwdStubForText :text="member.salesforce.client_average_age" plug="&mdash;" class="text-main font-semibold" />
      </div>
    </div>
    <div class="flex">
      <div class="w-6/12 flex mb-4">
        <div class="pr-2">Primary Contact:</div>
        <SwdStubForText :text="member.salesforce.primary_contact" plug="&mdash;" class="text-main font-semibold" />
      </div>
      <div class="w-6/12 flex mb-4">
        <div class="pr-2">Military Veteran :</div>
        <SwdStubForText :text="member.salesforce.military_veteran" plug="&mdash;" class="text-main font-semibold" />
      </div>
    </div>
    <div class="flex">
      <div class="w-6/12 flex mb-4">
        <div class="pr-2">HomeWork Completed:</div>
        <SwdStubForText :text="member.salesforce.homework_completed" plug="&mdash;" class="text-main font-semibold" />
      </div>
      <div class="w-6/12 flex mb-4">
        <div class="pr-2">Client Start Date:</div>
        <SwdStubForText :text="getClientStartDate" plug="&mdash;" class="text-main font-semibold" />
      </div>
    </div>
  </div>
</template>

<script>
import IconDoneStep from '@/assets/svg/icon-done-step.svg'
import { computed } from 'vue'
import { currencyFormat } from '@/utils/currencyFormat'
import dayjs from 'dayjs'

export default {
  name: 'HouseHoldInfo',
  props: {
    member: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const getAmount = computed(() => {
      if (props.member.salesforce.household_value) {
        return currencyFormat(props.member.salesforce.household_value)
      }
      return ''
    })

    const getClientStartDate = computed(() => {
      if (props.member.salesforce.client_start_date) {
        return dayjs(props.member.salesforce.client_start_date).format('MM/DD/YYYY')
      }
      return ''
    })

    return {
      IconDoneStep,
      getAmount,
      getClientStartDate,
    }
  },
}
</script>
