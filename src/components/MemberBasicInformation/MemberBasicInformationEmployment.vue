<template>
  <div class="border border-t-0 border-color-grey rounded-b px-10 pb-10">
    <div class="flex mb-7">
      <div class="w-6/24">
        <!-- <router-link
          :to="{ name: 'prospect-employment', params: { id: prospect.id } }"
          class="text-base text-main font-semibold"
        >
          Employment History
        </router-link> -->
        <!-- <span class="text-base text-main font-semibold cursor-pointer" @click="goEmploymentHistory">
          Employment History
        </span> -->
      </div>
    </div>
    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">Company Name</span>
      </div>
      <div class="w-9/24">
        <SwdStubForText :text="employmentProspect.companyName" plug="&mdash;" class="text-sm text-main" />
      </div>
      <div class="w-9/24">
        <SwdStubForText :text="employmentSpouse.companyName" plug="&mdash;" class="text-sm text-main" />
      </div>
    </div>
    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">Occupation</span>
      </div>
      <div class="w-9/24">
        <SwdStubForText :text="employmentProspect.occupation" plug="&mdash;" class="text-sm text-main" />
      </div>
      <div class="w-9/24">
        <SwdStubForText :text="employmentSpouse.occupation" plug="&mdash;" class="text-sm text-main" />
      </div>
    </div>
    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">Years</span>
      </div>
      <div class="w-9/24">
        <SwdStubForText :text="employmentProspect.years" plug="&mdash;" class="text-sm text-main" />
      </div>
      <div class="w-9/24">
        <SwdStubForText :text="employmentSpouse.years" plug="&mdash;" class="text-sm text-main" />
      </div>
    </div>
  </div>
</template>

<script>
// import { MemberDetailsUser } from '@/dto/Member/MemberDetailsUser'
// import { SpouseLastEmployment } from '@/dto/Member/SpouseLastEmployment'
// import { MemberLastEmployment } from '@/dto/Member/MemberLastEmployment'
export default {
  name: 'MemberBasicInformationEmployment',
  props: {
    prospect: {
      type: Object,
      // type: MemberDetailsUser,
      require: true,
      default: () => {},
    },
    employmentProspect: {
      type: Object,
      // type: MemberLastEmployment,
      require: true,
      default: () => {},
    },
    employmentSpouse: {
      type: Object,
      // type: SpouseLastEmployment,
      require: true,
      default: () => {},
    },
  },
  setup() {
    const goEmploymentHistory = () => {
      console.log('goEmploymentHistory')
    }

    return {
      goEmploymentHistory,
    }
  },
}
</script>
