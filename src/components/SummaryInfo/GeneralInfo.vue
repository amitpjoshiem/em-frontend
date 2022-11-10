<template>
  <div class="border border-border-blue rounded-md p-5 mb-4">
    <div class="flex items-center mb-5">
      <InlineSvg :src="IconDoneStep" />
      <div class="text-main text-xl font-semibold ml-2">General Info</div>
    </div>
    <div>
      <div class="flex mb-4">
        <div class="w-3/12">Name:</div>
        <div class="text-main font-semibold">{{ member.name }}</div>
      </div>
      <div class="flex mb-4">
        <div class="w-3/12">Phone:</div>
        <SwdStubForText :text="member.phone" plug="&mdash;" class="text-main font-semibold" />
      </div>
      <div class="flex mb-4">
        <div class="w-3/12">Email:</div>
        <SwdStubForText :text="member.email" plug="&mdash;" class="text-main font-semibold" />
      </div>
      <div class="flex mb-4">
        <div class="w-3/12">Do Not Email:</div>
        <SwdTag :status="!!member.salesforce.do_not_email" />
      </div>
      <div class="flex mb-4">
        <div class="w-3/12">Type:</div>
        <div class="text-main font-semibold">{{ member.type }}</div>
      </div>
      <div class="flex mb-4">
        <div class="w-3/12">Category:</div>
        <SwdStubForText :text="member.salesforce.category" plug="&mdash;" class="text-main font-semibold" />
      </div>
      <div class="flex mb-4">
        <div class="w-3/12">Client Start Date:</div>
        <SwdStubForText :text="getClientStartDate" plug="&mdash;" class="text-main font-semibold" />
      </div>
      <div class="flex mb-4">
        <div class="w-3/12">Client AR Date:</div>
        <SwdStubForText :text="getClientArDate" plug="&mdash;" class="text-main font-semibold" />
      </div>
      <div class="flex mb-4">
        <div class="w-3/12">Medicare Client:</div>
        <SwdTag :status="!!member.salesforce.medicare_client" />
      </div>
      <div class="flex mb-4">
        <div class="w-3/12">P&C Client:</div>
        <SwdTag :status="!!member.salesforce.p_c_client" />
      </div>
      <div class="flex mb-4">
        <div class="w-3/12">Tax Conversion Client:</div>
        <SwdTag :status="!!member.salesforce.tax_conversion_client" />
      </div>
      <div class="flex mb-4">
        <div class="w-3/12">Platinum Club Client :</div>
        <SwdTag :status="!!member.salesforce.platinum_club_client" />
      </div>
    </div>
  </div>
</template>

<script>
import IconDoneStep from '@/assets/svg/icon-done-step.svg'
import dayjs from 'dayjs'
import { computed } from 'vue'

export default {
  name: 'GeneralInfo',
  props: {
    member: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const getClientStartDate = computed(() => {
      if (props.member.salesforce.client_start_date) {
        return dayjs(props.member.salesforce.client_start_date).format('MM/DD/YYYY')
      }
      return ''
    })

    const getClientArDate = computed(() => {
      if (props.member.salesforce.client_ar_date) {
        return dayjs(props.member.salesforce.client_ar_date).format('MM/DD/YYYY')
      }
      return ''
    })

    return {
      IconDoneStep,
      getClientStartDate,
      getClientArDate,
    }
  },
}
</script>
