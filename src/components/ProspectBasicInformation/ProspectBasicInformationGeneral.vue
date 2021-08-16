<template>
  <div class="border border-color-grey rounded p-10 mt-12">
    <!-- GENERAL -->
    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-base text-main font-semibold">General</span>
      </div>
      <div class="w-9/24">
        <span class="text-xs text-gray03 font-semibold mr-1">OWNER</span>
        <span
          v-if="!prospect.retired"
          class="
            text-border-green text-xxs
            font-semibold
            bg-light-green
            rounded
            pr-2
            pl-1
            py-1
          "
        >
          Not Retired
        </span>
        <span
          v-else
          class="
            text-xxs text-orange-badge
            font-semibold
            bg-orange-bg
            rounded
            pr-2
            pl-1
            py-1
          "
        >
          Retired
        </span>
      </div>
      <div class="w-9/24">
        <span class="text-xs text-gray03 font-semibold mr-1">SPOUSE</span>
        <span
          v-if="prospect.married && !spouse.retired"
          class="
            text-border-green text-xxs
            font-semibold
            bg-light-green
            rounded
            pr-2
            pl-1
            py-1
          "
        >
          Not Retired
        </span>
        <span
          v-if="prospect.married && spouse.retired"
          class="
            text-xxs text-orange-badge
            font-semibold
            bg-orange-bg
            rounded
            pr-2
            pl-1
            py-1
          "
        >
          Retired
        </span>
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">Full Name</span>
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main font-semibold">
          {{ prospect.userFullName }}
        </span>
      </div>
      <div class="w-9/24">
        <PlugForField
          :text="spouse.spouseFullName"
          plug="&mdash;"
          class="text-sm text-main font-semibold"
        />
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">Phone</span>
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main">
          {{ prospect.phone }}
        </span>
      </div>
      <div class="w-9/24">
        <PlugForField
          :text="spouse.phone"
          plug="&mdash;"
          class="text-sm text-main"
        />
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">Email</span>
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main">
          {{ prospect.email }}
        </span>
      </div>
      <div class="w-9/24">
        <PlugForField
          :text="spouse.email"
          plug="&mdash;"
          class="text-sm text-main"
        />
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold"> Date of Birth </span>
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main">
          {{ prospect.birthday }}
        </span>
      </div>
      <div class="w-9/24">
        <PlugForField
          :text="spouse.birthday"
          plug="&mdash;"
          class="text-sm text-main"
        />
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">
          Retiretment Date
        </span>
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main">
          {{ prospect.retirementDate }}
        </span>
      </div>
      <div class="w-9/24">
        <PlugForField
          :text="spouse.retirementDate"
          plug="&mdash;"
          class="text-sm text-main"
        />
      </div>
    </div>

    <div class="flex mb-10">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">Address</span>
      </div>
      <div class="w-18">
        <span class="text-sm text-main">
          {{ prospect.address }}
        </span>
      </div>
    </div>

    <!-- Employment History -->
    <div class="flex mb-7">
      <div class="w-6/24">
        <router-link
          :to="{ name: 'prospect-employment', params: { id: prospect.id } }"
          class="text-base text-main font-semibold"
        >
          Employment History
        </router-link>
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">Company Name</span>
      </div>
      <div class="w-9/24">
        <PlugForField
          :text="employmentProspect.companyName"
          plug="&mdash;"
          class="text-sm text-main"
        />
      </div>
      <div class="w-9/24">
        <PlugForField
          :text="employmentSpouse.companyName"
          plug="&mdash;"
          class="text-sm text-main"
        />
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">Occupation</span>
      </div>
      <div class="w-9/24">
        <PlugForField
          :text="employmentProspect.occupation"
          plug="&mdash;"
          class="text-sm text-main"
        />
      </div>
      <div class="w-9/24">
        <PlugForField
          :text="employmentSpouse.occupation"
          plug="&mdash;"
          class="text-sm text-main"
        />
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">Years</span>
      </div>
      <div class="w-9/24">
        <PlugForField
          :text="employmentProspect.years"
          plug="&mdash;"
          class="text-sm text-main"
        />
      </div>
      <div class="w-9/24">
        <PlugForField
          :text="employmentSpouse.years"
          plug="&mdash;"
          class="text-sm text-main"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { SpouseLastEmployment } from '@/dto/Member/SpouseLastEmployment'
import { MemberLastEmployment } from '@/dto/Member/MemberLastEmployment'
import { MemberDetailsSpouse } from '@/dto/Member/MemberDetailsSpouse'
import { MemberDetailsUser } from '@/dto/Member/MemberDetailsUser'

export default {
  name: 'ProspectBasicInformationGeneral',
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
}
</script>
