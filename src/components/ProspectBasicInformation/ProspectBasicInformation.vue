<template>
  <SubHeader
    class="p-5"
    title="Prospect Details"
    back-page="prospect-details"
    back-page-title="Prospect details"
  />
  <el-skeleton v-if="isLoading" :rows="11" animated class="p-5" />

  <div v-else class="p-5">
    <div>
      <div class="flex items-center">
        <Avatar :size="'big'" :link="prospect.avatar" />
        <span class="text-main text-xl font-semibold ml-7">
          {{ prospect.userFullName }}
        </span>
      </div>
    </div>

    <ProspectBasicInformationGeneral
      :prospect="prospect"
      :spouse="spouse.value"
      :employment-prospect="employmentProspect.value"
      :employment-spouse="employmentSpouse.value"
    />

    <!-- Housing Information -->
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
import ProspectBasicInformationGeneral from '@/components/ProspectBasicInformation/ProspectBasicInformationGeneral.vue'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { useRoute } from 'vue-router'

export default {
  name: 'ProspectBasicInformation',
  components: {
    ProspectBasicInformationGeneral,
  },
  setup() {
    const route = useRoute()
    const id = route.params.id

    const {
      isLoading,
      isError,
      data,
      house,
      spouse,
      employment,
      other,
      employmentProspect,
      employmentSpouse,
    } = useProspectDetails(id)

    return {
      isLoading,
      isError,
      house,
      spouse,
      employment,
      other,
      prospect: data,
      employmentProspect,
      employmentSpouse,
    }
  },
}
</script>
