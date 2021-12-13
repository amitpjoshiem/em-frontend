<template>
  <div class="my-3 text-xs border border-input-border rounded p-5">
    <div class="flex">
      <div class="w-4/12 text-gray03 font-semibold">Company Name</div>
      <div class="w-4/12">
        <SwdStubForText :text="employmentItem.companyName[0]" plug="&mdash;" />
      </div>
      <div class="w-4/12">
        <SwdStubForText :text="employmentItem.companyName[1]" plug="&mdash;" />
      </div>
    </div>
    <div class="flex py-2">
      <div class="w-4/12 text-gray03 font-semibold">Occupation</div>
      <div class="w-4/12">
        <SwdStubForText :text="employmentItem.occupation[0]" plug="&mdash;" />
      </div>
      <div class="w-4/12">
        <SwdStubForText :text="employmentItem.occupation[1]" plug="&mdash;" />
      </div>
    </div>
    <div class="flex">
      <div class="w-4/12 text-gray03 font-semibold">Years</div>
      <div class="w-4/12">
        <SwdStubForText :text="employmentItem.years[0]" plug="&mdash;" />
      </div>
      <div class="w-4/12">
        <SwdStubForText :text="employmentItem.years[1]" plug="&mdash;" />
      </div>
    </div>
  </div>
</template>

<script>
import { EmploymentHistoryMerged } from '@/utils/employmentDetail'

export default {
  name: 'EmploymentHistoryItem',
  props: {
    employmentItem: {
      type: EmploymentHistoryMerged,
      require: true,
      default: () => {},
    },
  },
}
</script>
