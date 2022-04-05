<template>
  <div>
    <div class="flex justify-end mb-4">
      <el-button type="primary" plain class="mr-10" size="small" @click="edit">Edit</el-button>
    </div>
    <div v-if="!isFetchingMember && !isMemberAssetsLoading">
      <div class="border-b pb-7">
        <span class="text-main text-xl font-semibold">Current income</span>
        <div class="pt-5">
          <div class="flex">
            <div>Do you have a written income plan?</div>
            <el-tag v-if="assets.data.income.income_plan" class="ml-4" type="success">Yes</el-tag>
            <el-tag v-else class="ml-4" type="danger">No</el-tag>
          </div>

          <!-- Salary -->
          <ItemValueAssetsTwo
            :member="assets.data.income.member.salary"
            :spouse="assets.data.income.spouse.salary"
            title="Salary"
            :is-married="isMarried"
          />

          <!-- Social Security -->
          <ItemValueAssetsTwo
            :member="assets.data.income.member.social_security"
            :spouse="assets.data.income.spouse.social_security"
            title="Social Security"
            :is-married="isMarried"
          />

          <!-- Pension -->
          <ItemValueAssetsTwo
            :member="assets.data.income.member.pension"
            :spouse="assets.data.income.spouse.pension"
            title="Pension"
            :is-married="isMarried"
          />

          <!-- Rental income -->
          <ItemValueAssetsTwo
            :member="assets.data.income.member.rental_income"
            :spouse="assets.data.income.spouse.rental_income"
            title="Rental income"
            :is-married="isMarried"
          />

          <!-- RMD’s -->
          <ItemValueAssetsTwo
            :member="assets.data.income.member.rmds"
            :spouse="assets.data.income.spouse.rmds"
            title="RMD’s"
            :is-married="isMarried"
          />

          <!-- Interest/Dividents -->
          <ItemValueAssetsTwo
            :member="assets.data.income.member.interest_dividends"
            :spouse="assets.data.income.spouse.interest_dividends"
            title="Interest/Dividents"
            :is-married="isMarried"
          />

          <!-- Other -->
          <ItemValueAssetsTwo
            :member="assets.data.income.member.other"
            :spouse="assets.data.income.spouse.other"
            title="Other"
            :is-married="isMarried"
          />
        </div>
      </div>

      <div class="border-b py-6">
        <span class="text-main text-xl font-semibold mb-2">Liquid assets</span>
        <!-- Cash/Checking/ Savings/MM -->
        <ItemValueAssetsFour
          :member="assets.data.liquid_assets.member.cash_checking_savings_mm"
          :spouse="assets.data.liquid_assets.spouse.cash_checking_savings_mm"
          :onq="assets.data.liquid_assets.o_nq.cash_checking_savings_mm"
          :balance="assets.data.liquid_assets.balance.cash_checking_savings_mm"
          title="Other"
          :is-married="isMarried"
        />

        <!-- CD’s -->
        <ItemValueAssetsFour
          :member="assets.data.liquid_assets.member.cds"
          :spouse="assets.data.liquid_assets.spouse.cds"
          :onq="assets.data.liquid_assets.o_nq.cds"
          :balance="assets.data.liquid_assets.balance.cds"
          title="CD’s"
          :is-married="isMarried"
        />

        <!-- 401k/IRA (if over 59) -->
        <ItemValueAssetsFour
          :member="assets.data.liquid_assets.member.first_401k_ira_59"
          :spouse="assets.data.liquid_assets.spouse.first_401k_ira_59"
          :onq="assets.data.liquid_assets.o_nq.first_401k_ira_59"
          :balance="assets.data.liquid_assets.balance.first_401k_ira_59"
          title="401k/IRA (if over 59)"
          :is-married="isMarried"
        />

        <!-- 401k/IRA -->
        <ItemValueAssetsFour
          :member="assets.data.liquid_assets.member.first_401k_ira"
          :spouse="assets.data.liquid_assets.spouse.first_401k_ira"
          :onq="assets.data.liquid_assets.o_nq.first_401k_ira"
          :balance="assets.data.liquid_assets.balance.first_401k_ira"
          title="401k/IRA"
          :is-married="isMarried"
        />

        <!-- 401k/IRA -->
        <ItemValueAssetsFour
          :member="assets.data.liquid_assets.member.second_401k_ira"
          :spouse="assets.data.liquid_assets.spouse.second_401k_ira"
          :onq="assets.data.liquid_assets.o_nq.second_401k_ira"
          :balance="assets.data.liquid_assets.balance.second_401k_ira"
          title="401k/IRA"
          :is-married="isMarried"
        />

        <!-- Stocks/Bonds/MF -->
        <ItemValueAssetsFour
          :member="assets.data.liquid_assets.member.stocks_bonds_mf"
          :spouse="assets.data.liquid_assets.spouse.stocks_bonds_mf"
          :onq="assets.data.liquid_assets.o_nq.stocks_bonds_mf"
          :balance="assets.data.liquid_assets.balance.stocks_bonds_mf"
          title="Stocks/Bonds/MF"
          :is-married="isMarried"
        />

        <!-- Cash value life insurance -->
        <ItemValueAssetsFour
          :member="assets.data.liquid_assets.member.cash_value_life_insurance"
          :spouse="assets.data.liquid_assets.spouse.cash_value_life_insurance"
          :onq="assets.data.liquid_assets.o_nq.cash_value_life_insurance"
          :balance="assets.data.liquid_assets.balance.cash_value_life_insurance"
          title="Cash value life insurance"
          :is-married="isMarried"
        />

        <!-- FA/VA not suject to penalty -->
        <ItemValueAssetsFour
          :member="assets.data.liquid_assets.member.fa_va_not_subject_to_penalty"
          :spouse="assets.data.liquid_assets.spouse.fa_va_not_subject_to_penalty"
          :onq="assets.data.liquid_assets.o_nq.fa_va_not_subject_to_penalty"
          :balance="assets.data.liquid_assets.balance.fa_va_not_subject_to_penalty"
          title="FA/VA not suject to penalty"
          :is-married="isMarried"
        />

        <!-- Gift/Inheritance -->
        <ItemValueAssetsFour
          :member="assets.data.liquid_assets.member.gift_inheritance"
          :spouse="assets.data.liquid_assets.spouse.gift_inheritance"
          :onq="assets.data.liquid_assets.o_nq.gift_inheritance"
          :balance="assets.data.liquid_assets.balance.gift_inheritance"
          title="Gift/Inheritance"
          :is-married="isMarried"
        />

        <!-- Lump sum pension -->
        <ItemValueAssetsFour
          :member="assets.data.liquid_assets.member.lump_sum_pension"
          :spouse="assets.data.liquid_assets.spouse.lump_sum_pension"
          :onq="assets.data.liquid_assets.o_nq.lump_sum_pension"
          :balance="assets.data.liquid_assets.balance.lump_sum_pension"
          title="Lump sum pension"
          :is-married="isMarried"
        />

        <!-- Other liquid assets -->
        <ItemValueAssetsFour
          :member="assets.data.liquid_assets.member.other_liquid_assets"
          :spouse="assets.data.liquid_assets.spouse.other_liquid_assets"
          :onq="assets.data.liquid_assets.o_nq.other_liquid_assets"
          :balance="assets.data.liquid_assets.balance.other_liquid_assets"
          title="Other liquid assets"
          :is-married="isMarried"
        />

        <!-- Total -->
        <WidgetClientTotal
          :member="assets.data.liquid_assets.member.total"
          :spouse="assets.data.liquid_assets.spouse.total"
          :o-nq="assets.data.liquid_assets.o_nq.total"
          :balance="assets.data.liquid_assets.balance.total"
          :is-married="isMarried"
        />
      </div>

      <div class="border-b py-6">
        <span class="text-main text-xl font-semibold mb-2">Non-liquid assets</span>
        <!-- Value of home -->
        <ItemValueAssetsFour
          :member="assets.data.non_liquid_assets.member.value_of_home"
          :spouse="assets.data.non_liquid_assets.spouse.value_of_home"
          :onq="assets.data.non_liquid_assets.o_nq.value_of_home"
          :balance="assets.data.non_liquid_assets.balance.value_of_home"
          title="Value of home"
          :is-married="isMarried"
        />

        <!-- 401k/IRA (if over 59) -->
        <ItemValueAssetsFour
          :member="assets.data.non_liquid_assets.member.first_401k_ira_59"
          :spouse="assets.data.non_liquid_assets.spouse.first_401k_ira_59"
          :onq="assets.data.non_liquid_assets.o_nq.first_401k_ira_59"
          :balance="assets.data.non_liquid_assets.balance.first_401k_ira_59"
          title="401k/IRA (if over 59)"
          :is-married="isMarried"
        />

        <!-- 401k/IRA -->
        <ItemValueAssetsFour
          :member="assets.data.non_liquid_assets.member.first_401k_ira"
          :spouse="assets.data.non_liquid_assets.spouse.first_401k_ira"
          :onq="assets.data.non_liquid_assets.o_nq.first_401k_ira"
          :balance="assets.data.non_liquid_assets.balance.first_401k_ira"
          title="401k/IRA"
          :is-married="isMarried"
        />

        <!-- 401k/IRA -->
        <ItemValueAssetsFour
          :member="assets.data.non_liquid_assets.member.second_401k_ira"
          :spouse="assets.data.non_liquid_assets.spouse.second_401k_ira"
          :onq="assets.data.non_liquid_assets.o_nq.second_401k_ira"
          :balance="assets.data.non_liquid_assets.balance.second_401k_ira"
          title="401k/IRA"
          :is-married="isMarried"
        />

        <!-- FA/VA suject to penalty -->
        <ItemValueAssetsFour
          :member="assets.data.non_liquid_assets.member.fa_va_subject_to_penalty"
          :spouse="assets.data.non_liquid_assets.spouse.fa_va_subject_to_penalty"
          :onq="assets.data.non_liquid_assets.o_nq.fa_va_subject_to_penalty"
          :balance="assets.data.non_liquid_assets.balance.fa_va_subject_to_penalty"
          title="FA/VA suject to penalty"
          :is-married="isMarried"
        />

        <!-- Other -->
        <ItemValueAssetsFour
          :member="assets.data.non_liquid_assets.member.other"
          :spouse="assets.data.non_liquid_assets.spouse.other"
          :onq="assets.data.non_liquid_assets.o_nq.other"
          :balance="assets.data.non_liquid_assets.balance.other"
          title="Other"
          :is-married="isMarried"
        />

        <WidgetClientTotal
          :member="assets.data.non_liquid_assets.member.total"
          :spouse="assets.data.non_liquid_assets.spouse.total"
          :o-nq="assets.data.non_liquid_assets.o_nq.total"
          :balance="assets.data.non_liquid_assets.balance.total"
          :is-married="isMarried"
        />
      </div>
    </div>
    <div v-else class="flex justify-center items-center">
      <SwdSpinner large />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useFetchMemberAssets } from '@/api/use-fetch-member-assets'
import { useFetchMember } from '@/api/use-fetch-member'

import WidgetClientTotal from './WidgetClientTotal.vue'
import ItemValueAssetsTwo from './ItemValueAssetsTwo.vue'
import ItemValueAssetsFour from './ItemValueAssetsFour.vue'

import { useAssetsInfoHooks } from '@/hooks/use-assets-info-hooks'

export default {
  name: 'AddAssets',
  components: {
    ItemValueAssetsTwo,
    ItemValueAssetsFour,
    WidgetClientTotal,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const form = ref()

    const { response: assets, isLoading: isMemberAssetsLoading } = useFetchMemberAssets(route.params.id)
    const { isFetching: isFetchingMember, data: member } = useFetchMember({ id: route.params.id })

    const { isMarried } = useAssetsInfoHooks(member)

    const edit = () => {
      router.push({ name: 'client-assets-information', params: { id: route.params.id } })
    }

    return {
      assets,
      isMemberAssetsLoading,
      isMarried,
      form,
      isFetchingMember,
      member,
      edit,
    }
  },
}
</script>
