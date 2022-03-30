<template>
  <div class="border border-b-0 border-color-grey rounded-t p-10 mt-12">
    <!-- GENERAL -->
    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-base text-main font-semibold">General</span>
      </div>
      <div class="w-9/24">
        <span class="text-xs text-gray03 font-semibold mr-1">OWNER</span>
        <SwdRetiredLabel :retired="prospect.retired" />
      </div>
      <div class="w-9/24">
        <span class="text-xs text-gray03 font-semibold mr-1">SPOUSE</span>
        <SwdRetiredLabel v-if="prospect.married" :retired="spouse.retired" />
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">Name</span>
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
        <span class="text-xss text-gray03 font-semibold">Phone</span>
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
        <span class="text-xss text-gray03 font-semibold">Email</span>
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
        <span class="text-xss text-gray03 font-semibold"> Date of Birth </span>
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
        <span class="text-xss text-gray03 font-semibold"> Retirement Date </span>
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
        <span class="text-xss text-gray03 font-semibold">Address</span>
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
}
</script>
