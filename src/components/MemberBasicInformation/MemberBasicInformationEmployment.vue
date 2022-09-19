<template>
  <div class="border border-border-blue rounded-md p-5 mb-4">
    <div class="flex items-center mb-5">
      <InlineSvg :src="IconDoneStep" />
      <div>
        <router-link
          :to="{ name: 'prospect-employment', params: { id: prospect.id } }"
          class="text-xl text-main font-semibold ml-2"
        >
          Employment History
        </router-link>
      </div>
    </div>
    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-main font-semibold">Company Name</span>
      </div>
      <div class="w-9/24" data-testid="basic-information-employment-prospect-company-name">
        <SwdStubForText :text="employmentProspect.companyName" plug="&mdash;" class="text-sm text-main" />
      </div>
      <div class="w-9/24" data-testid="basic-information-employment-spouse-company-name">
        <SwdStubForText :text="employmentSpouse.companyName" plug="&mdash;" class="text-sm text-main" />
      </div>
    </div>
    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-main font-semibold">Occupation</span>
      </div>
      <div class="w-9/24" data-testid="basic-information-employment-prospect-occupation">
        <SwdStubForText :text="employmentProspect.occupation" plug="&mdash;" class="text-sm text-main" />
      </div>
      <div class="w-9/24" data-testid="basic-information-employment-spouse-occupation">
        <SwdStubForText :text="employmentSpouse.occupation" plug="&mdash;" class="text-sm text-main" />
      </div>
    </div>
    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-main font-semibold">Years</span>
      </div>
      <div class="w-9/24" data-testid="basic-information-employment-prospect-years">
        <SwdStubForText :text="employmentProspect.years" plug="&mdash;" class="text-sm text-main" />
      </div>
      <div class="w-9/24" data-testid="basic-information-employment-spouse-years">
        <SwdStubForText :text="employmentSpouse.years" plug="&mdash;" class="text-sm text-main" />
      </div>
    </div>
  </div>
</template>

<script>
import { MemberDetailsUser } from '@/dto/Member/MemberDetailsUser'
import { SpouseLastEmployment } from '@/dto/Member/SpouseLastEmployment'
import { MemberLastEmployment } from '@/dto/Member/MemberLastEmployment'
import IconDoneStep from '@/assets/svg/icon-done-step.svg'

export default {
  name: 'MemberBasicInformationEmployment',
  props: {
    prospect: {
      type: MemberDetailsUser,
      require: true,
      default: () => {},
    },
    employmentProspect: {
      type: MemberLastEmployment,
      require: true,
      default: () => {},
    },
    employmentSpouse: {
      type: SpouseLastEmployment,
      require: true,
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
