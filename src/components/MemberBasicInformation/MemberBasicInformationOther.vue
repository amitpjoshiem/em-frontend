<template>
  <div class="border border-color-grey rounded p-10 mt-10">
    <span class="text-base text-main font-semibold">Other</span>
    <div v-if="other.id">
      <div class="flex my-7">
        <div class="w-2/12">
          <span class="text-gray03 text-xss font-semibold">Risk Tolerance</span>
        </div>
        <div class="w-10/12">
          <span class="text-main text-sm font-semibold capitalize" data-testid="member-basic-information-other-risk">
            {{ other.risk }}
          </span>
        </div>
      </div>
      <div class="flex justify-between mb-7">
        <div class="w-2/12">
          <span class="text-gray03 text-xss font-semibold">Specific questions</span>
        </div>
        <div class="w-10/12">
          <span class="text-main text-sm" data-testid="member-basic-information-other-questions">
            {{ other.questions }}
          </span>
        </div>
      </div>
      <div class="flex justify-between mb-7">
        <div class="w-2/12">
          <span class="text-gray03 text-xss font-semibold">Goal for retirement</span>
        </div>
        <div class="w-10/12">
          <span class="text-main text-sm" data-testid="member-basic-information-other-retirement">
            {{ other.retirement }}
          </span>
        </div>
      </div>
      <div class="flex justify-between mb-7">
        <div class="w-2/12">
          <span class="text-gray03 text-xss font-semibold">Goal for retirement money</span>
        </div>
        <div class="w-10/12">
          <span class="text-main text-sm" data-testid="member-basic-information-other-retirementMoney">
            {{ other.retirementMoney }}
          </span>
        </div>
      </div>
    </div>

    <div v-else class="mt-4">
      <span class="text-gray03" data-testid="member-basic-information-no-other">No other information</span>
    </div>
  </div>
</template>
<script>
import { MemberDetailsOther } from '@/dto/Member/MemberDetailsOther'

export default {
  name: 'MemberBasicInformationOther',
  props: {
    other: {
      type: MemberDetailsOther,
      require: true,
      default: () => {},
    },
  },
}
</script>
