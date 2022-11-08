<template>
  <div class="border border-border-blue rounded-md p-5 mb-4">
    <div class="flex items-center mb-5">
      <InlineSvg :src="IconDoneStep" />
      <div class="text-main text-xl font-semibold ml-2">General Info</div>
    </div>
    <div>
      <div class="flex mb-2">
        <div class="w-2/12">Name:</div>
        <div class="text-main font-semibold">{{ member.name }}</div>
      </div>
      <div class="flex mb-2">
        <div class="w-2/12">Phone:</div>
        <div class="text-main font-semibold">{{ member.phone }}</div>
      </div>
      <div class="flex mb-2">
        <div class="w-2/12">Email:</div>
        <div class="text-main font-semibold">{{ member.email }}</div>
      </div>
      <div class="flex mb-2">
        <div class="w-2/12">Do Not Email:</div>
        <SwdStubForText :text="member.salesforce.do_not_email" plug="&mdash;" class="text-main font-semibold" />
      </div>
      <div class="flex mb-2">
        <div class="w-2/12">Type:</div>
        <div class="text-main font-semibold">{{ member.type }}</div>
      </div>
      <div class="flex mb-2">
        <div class="w-2/12">Category:</div>
        <SwdStubForText :text="member.salesforce.category" plug="&mdash;" class="text-main font-semibold" />
      </div>
      <div class="flex mb-2">
        <div class="w-2/12">Client Start Date:</div>
        <SwdStubForText :text="member.salesforce.client_start_date" plug="&mdash;" class="text-main font-semibold" />
      </div>
      <div class="flex mb-2">
        <div class="w-2/12">Client AR Date:</div>
        <SwdStubForText :text="member.salesforce.client_ar_date" plug="&mdash;" class="text-main font-semibold" />
      </div>
      <div class="flex mb-2">
        <div class="w-2/12">Medicare Client:</div>
        <SwdStubForText :text="member.salesforce.medicare_client" plug="&mdash;" class="text-main font-semibold" />
      </div>
      <div class="flex mb-2">
        <div class="w-2/12">P&C Client:</div>
        <SwdStubForText :text="member.salesforce.p_c_client" plug="&mdash;" class="text-main font-semibold" />
      </div>
      <div class="flex mb-2">
        <div class="w-2/12">Tax Conversion Client:</div>
        <SwdStubForText
          :text="member.salesforce.tax_conversion_client"
          plug="&mdash;"
          class="text-main font-semibold"
        />
      </div>
      <div class="flex mb-2">
        <div class="w-2/12">Platinum Club Client :</div>
        <SwdStubForText :text="member.salesforce.platinum_club_client" plug="&mdash;" class="text-main font-semibold" />
      </div>
    </div>
  </div>
</template>

<script>
import IconDoneStep from '@/assets/svg/icon-done-step.svg'

export default {
  name: 'GeneralInfo',
  props: {
    member: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup() {
    return {
      IconDoneStep,
    }
  },
}
</script>
