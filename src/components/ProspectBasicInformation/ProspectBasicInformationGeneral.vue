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
      <div v-if="isProspectMarried" class="w-9/24">
        <span class="text-xs text-gray03 font-semibold mr-1">SPOUSE</span>
        <span
          v-if="!spouse.retired"
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
      <div v-if="isProspectMarried" class="w-9/24">
        <span class="text-sm text-main font-semibold">
          {{ spouse.spouseFullName }}
        </span>
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
      <div v-if="isProspectMarried" class="w-9/24">
        <span class="text-sm text-main">
          {{ spouse.phone }}
        </span>
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
      <div v-if="isProspectMarried" class="w-9/24">
        <span class="text-sm text-main">
          {{ spouse.email }}
        </span>
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
      <div v-if="isProspectMarried" class="w-9/24">
        <span class="text-sm text-main">
          {{ spouse.birthday }}
        </span>
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
      <div v-if="isProspectMarried" class="w-9/24">
        <span class="text-sm text-main">
          {{ spouse.retirementDate }}
        </span>
      </div>
    </div>

    <div class="flex mb-10">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">
          Retiretment Date
        </span>
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
          <!-- Forgot your password? -->
        </router-link>
        <!-- <span class="text-base text-main font-semibold">
          Employment History
        </span> -->
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">Company Name</span>
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main font-semibold">
          {{ employmentProspect.companyName }}</span
        >
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main font-semibold">{{
          employmentSpouse.companyName
        }}</span>
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">Occupation</span>
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main">{{
          employmentProspect.occupation
        }}</span>
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main">{{ employmentSpouse.occupation }}</span>
      </div>
    </div>

    <div class="flex mb-7">
      <div class="w-6/24">
        <span class="text-xss text-gray03 font-semibold">Years</span>
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main">{{ employmentProspect.years }}</span>
      </div>
      <div class="w-9/24">
        <span class="text-sm text-main">{{ employmentSpouse.years }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { SpouseLastEmployment } from '@/dto/Prospect/SpouseLastEmployment'
import { ProspectLastEmployment } from '@/dto/Prospect/ProspectLastEmployment'
import { ProspectDetailsSpouse } from '@/dto/Prospect/ProspectDetailsSpouse'
import { ProspectDetailsUser } from '@/dto/Prospect/ProspectDetailsUser'

export default {
  name: 'ProspectBasicInformationGeneral',
  props: {
    prospect: {
      type: ProspectDetailsUser,
      require: true,
      default: () => {},
    },
    spouse: {
      type: ProspectDetailsSpouse,
      require: true,
      default: () => {},
    },
    employmentProspect: {
      type: ProspectLastEmployment,
      require: true,
      default: () => {},
    },
    employmentSpouse: {
      type: SpouseLastEmployment,
      require: true,
      default: () => {},
    },
  },
  setup(props) {
    const isProspectMarried = computed(() => {
      return props.prospect.married
    })

    return {
      isProspectMarried,
    }
  },
}
</script>
