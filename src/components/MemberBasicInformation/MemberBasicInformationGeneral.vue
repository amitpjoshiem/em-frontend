<template>
  <div class="border border-border-blue rounded-md p-5 mb-4">
    <div class="flex items-center mb-5">
      <InlineSvg :src="IconDoneStep" />
      <div class="text-main text-xl font-semibold ml-2">General</div>
    </div>
    <div class="flex mb-7">
      <div class="w-6/24"></div>
      <div class="w-9/24">
        <span class="text-xs text-main font-semibold mr-1">OWNER</span>
        <SwdRetiredLabel :retired="prospect.retired" />
      </div>
      <div class="w-9/24">
        <span class="text-xs text-main font-semibold mr-1">SPOUSE</span>
        <SwdRetiredLabel v-if="prospect.married" :retired="spouse.retired" />
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-main font-semibold">Name</span>
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main font-semibold" data-testid="member-basic-information-prospect-name">
          {{ prospect.name }}
        </span>
      </div>
      <div class="w-9/24" data-testid="member-basic-information-spouse-name">
        <SwdStubForText :text="spouse.name" plug="&mdash;" class="text-sm text-main font-semibold" />
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-main font-semibold">Phone</span>
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main" data-testid="member-basic-information-prospect-phone">
          {{ prospect.phone }}
        </span>
      </div>
      <div class="w-9/24" data-testid="member-basic-information-spouse-phone">
        <SwdStubForText :text="spouse.phone" plug="&mdash;" class="text-sm text-main" />
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-main font-semibold">Email</span>
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main" data-testid="member-basic-information-prospect-emeil">
          {{ prospect.email }}
        </span>
      </div>
      <div class="w-9/24" data-testid="member-basic-information-spouse-emeil">
        <SwdStubForText :text="spouse.email" plug="&mdash;" class="text-sm text-main" />
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-main font-semibold"> Date of Birth </span>
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main" data-testid="member-basic-information-prospect-birthday">
          {{ prospect.birthdayFormatted }}
        </span>
      </div>
      <div class="w-9/24" data-testid="member-basic-information-spouse-birthday">
        <SwdStubForText :text="spouse.birthdayFormatted" plug="&mdash;" class="text-sm text-main" />
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-main font-semibold"> Retirement Date </span>
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main" data-testid="member-basic-information-prospect-retirement-date">
          <SwdStubForText :text="prospect.retirementDateFormatted" plug="&mdash;" class="text-sm text-main" />
        </span>
      </div>
      <div class="w-9/24" data-testid="member-basic-information-spouse-retirement-date">
        <SwdStubForText :text="spouse.retirementDateFormatted" plug="&mdash;" class="text-sm text-main" />
      </div>
    </div>

    <div class="flex mb-10">
      <div class="w-6/24">
        <span class="text-xss text-main font-semibold">Address</span>
      </div>
      <div class="w-18">
        <span class="text-sm text-main" data-testid="member-basic-information-prospect-address">
          {{ prospect.address }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { MemberDetailsSpouse } from '@/dto/Member/MemberDetailsSpouse'
import { MemberDetailsUser } from '@/dto/Member/MemberDetailsUser'
import IconDoneStep from '@/assets/svg/icon-done-step.svg'

export default {
  name: 'MemberBasicInformationGeneral',
  props: {
    prospect: {
      type: MemberDetailsUser,
      require: true,
      default: () => {},
    },
    spouse: {
      type: MemberDetailsSpouse,
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
