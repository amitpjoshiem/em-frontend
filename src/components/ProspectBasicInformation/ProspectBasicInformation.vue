<template>
  <div v-if="!isLoading" class="p-5">
    <SubHeader
      title="New opportunity"
      back-page="prospect-details"
      back-page-title="Prospect details"
    />
    <div>
      <div class="flex mb-12">
        <Avatar />
        <span>{{ prospect.userFullName }}</span>
      </div>
      <div class="border border-color-grey rounded p-10">
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
          <div v-if="haveSpouse" class="w-9/24">
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
          <div v-if="haveSpouse" class="w-9/24">
            <span class="text-sm text-main font-semibold">
              {{ spouse.value.spouseFullName }}
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
          <div v-if="haveSpouse" class="w-9/24">
            <span class="text-sm text-main">
              {{ spouse.value.phone }}
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
          <div v-if="haveSpouse" class="w-9/24">
            <span class="text-sm text-main">
              {{ spouse.value.email }}
            </span>
          </div>
        </div>

        <div class="flex mb-7">
          <div class="w-6/24">
            <span class="text-xss text-gray03 font-semibold">
              Date of Birth
            </span>
          </div>
          <div class="w-9/24">
            <span class="text-sm text-main">
              {{ prospect.birthday }}
            </span>
          </div>
          <div v-if="haveSpouse" class="w-9/24">
            <span class="text-sm text-main">
              {{ spouse.value.birthday }}
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
          <div v-if="haveSpouse" class="w-9/24">
            <span class="text-sm text-main">
              {{ spouse.value.retirementDate }}
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
            <span class="text-base text-main font-semibold">
              Employment History
            </span>
          </div>
        </div>

        <div class="flex mb-7">
          <div class="w-6/24">
            <span class="text-xss text-gray03 font-semibold">Company Name</span>
          </div>
          <div class="w-9/24">
            <span class="text-sm text-main font-semibold"> Acme Inc </span>
          </div>
          <div class="w-9/24">
            <span class="text-sm text-main font-semibold"> Acme Inc </span>
          </div>
        </div>

        <div class="flex mb-7">
          <div class="w-6/24">
            <span class="text-xss text-gray03 font-semibold">Occupation</span>
          </div>
          <div class="w-9/24">
            <span class="text-sm text-main">Marketing</span>
          </div>
          <div class="w-9/24">
            <span class="text-sm text-main">Marketing</span>
          </div>
        </div>

        <div class="flex mb-7">
          <div class="w-6/24">
            <span class="text-xss text-gray03 font-semibold">Years</span>
          </div>
          <div class="w-9/24">
            <span class="text-sm text-main">6</span>
          </div>
          <div class="w-9/24">
            <span class="text-sm text-main">6</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex mt-10">
      <div class="w-6/12 border border-color-grey rounded p-10 mr-2">
        <span class="text-base text-main font-semibold">
          Housing Information
        </span>
        <span
          class="
            text-border-green text-xxs
            font-semibold
            bg-light-green
            rounded
            pr-2
            pl-1
            py-1
            capitalize
          "
        >
          {{ house.value.type }}
        </span>

        <div class="flex justify-between my-7">
          <span class="text-gray03 text-xss font-semibold">Market Value</span>
          <span class="text-main text-sm font-semibold">
            ${{ house.value.marketValue }}
          </span>
        </div>
        <div class="flex justify-between mb-7">
          <span class="text-gray03 text-xss font-semibold">Total Debt</span>
          <span class="text-main text-sm"> ${{ house.value.totalDebt }} </span>
        </div>
        <div class="flex justify-between mb-7">
          <span class="text-gray03 text-xss font-semibold">
            Remaining mortgage amount
          </span>
          <span class="text-main text-sm">
            ${{ house.value.remainingMortgageAmount }}
          </span>
        </div>
        <div
          v-if="house.value.type === 'rent'"
          class="flex justify-between mb-7"
        >
          <span class="text-gray03 text-xss font-semibold">
            Monthly payment
          </span>
          <span class="text-main text-sm">
            ${{ house.value.monthlyPayment }}
          </span>
        </div>
        <div class="flex justify-between mb-7">
          <span class="text-gray03 text-xss font-semibold">
            Total monthly expenses
          </span>
          <span class="text-main text-sm">
            ${{ house.value.totalMonthlyExpenses }}
          </span>
        </div>
      </div>

      <div class="w-6/12 border border-color-grey rounded p-10 mr-2">
        <span class="text-base text-main font-semibold">Other</span>

        <div class="flex justify-between my-7">
          <span class="text-gray03 text-xss font-semibold">Risk Tolerance</span>
          <span class="text-main text-sm font-semibold capitalize">
            {{ other.value.risk }}
          </span>
        </div>
        <div class="flex justify-between mb-7">
          <span class="text-gray03 text-xss font-semibold">
            Specific questions
          </span>
          <span class="text-main text-sm"> {{ other.value.questions }} </span>
        </div>
        <div class="flex justify-between mb-7">
          <span class="text-gray03 text-xss font-semibold">
            Goal for retirement
          </span>
          <span class="text-main text-sm"> {{ other.value.retirement }} </span>
        </div>
        <div class="flex justify-between mb-7">
          <span class="text-gray03 text-xss font-semibold">
            Goal for retirement money
          </span>
          <span class="text-main text-sm">
            {{ other.value.retirementMoney }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'ProspectBasicInformation',
  setup() {
    const route = useRoute()
    const id = route.params.id

    const { isLoading, isError, data, house, spouse, employment, other } =
      useProspectDetails(id)

    const haveSpouse = computed(() => {
      return Object.keys(spouse.value).length !== 0
    })

    return {
      isLoading,
      isError,
      house,
      spouse,
      employment,
      other,
      prospect: data,
      haveSpouse,
    }
  },
}
</script>
