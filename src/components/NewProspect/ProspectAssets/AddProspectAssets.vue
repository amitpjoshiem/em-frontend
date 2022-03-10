<template>
  <div v-if="!fetchingMember && !isMemberAssetsLoading">
    <el-form ref="form" :model="ruleForm" status-icon label-position="top" :rules="rules">
      <!-- Current income -->
      <div class="border-b px-16 pb-7">
        <span class="text-main text-xl font-semibold">Current income</span>
        <div class="pt-5">
          <el-form-item label="Do you have a written income plan?" class="mr-20">
            <el-radio-group v-model="ruleForm.income.income_plan">
              <el-radio :label="true">Yes</el-radio>
              <el-radio :label="false">No</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="flex pb-2 mt-8">
            <div class="w-2/12"></div>
            <div class="w-5/12 text-gray03 text-xs">OWNER</div>
            <div v-if="isMarried" class="w-5/12 text-gray03 text-xs pl-2.5">SPOUSE</div>
          </div>

          <!-- Salary -->
          <ItemFormAssetsTwo
            v-model:member="ruleForm.income.member.salary"
            v-model:spouse="ruleForm.income.spouse.salary"
            prop-member="income.member.salary"
            prop-spouse="income.spouse.salary"
            title="Salary"
            :is-married="isMarried"
            :disabled="isLoadingUpdate"
            @blur="validateMemberAssetFieldAndUpdate"
          />

          <!-- Social Security -->
          <ItemFormAssetsTwo
            v-model:member="ruleForm.income.member.social_security"
            v-model:spouse="ruleForm.income.spouse.social_security"
            prop-member="income.member.social_security"
            prop-spouse="income.spouse.social_security"
            title="Social Security"
            :is-married="isMarried"
            :disabled="isLoadingUpdate"
            @blur="validateMemberAssetFieldAndUpdate"
          />

          <!-- Pension -->
          <ItemFormAssetsTwo
            v-model:member="ruleForm.income.member.pension"
            v-model:spouse="ruleForm.income.spouse.pension"
            prop-member="income.member.pension"
            prop-spouse="income.spouse.pension"
            title="Pension"
            :is-married="isMarried"
            :disabled="isLoadingUpdate"
            @blur="validateMemberAssetFieldAndUpdate"
          />

          <!-- Rental income -->
          <ItemFormAssetsTwo
            v-model:member="ruleForm.income.member.rental_income"
            v-model:spouse="ruleForm.income.spouse.rental_income"
            prop-member="income.member.rental_income"
            prop-spouse="income.spouse.rental_income"
            title="Rental income"
            :is-married="isMarried"
            :disabled="isLoadingUpdate"
            @blur="validateMemberAssetFieldAndUpdate"
          />

          <!-- RMD’s -->
          <ItemFormAssetsTwo
            v-model:member="ruleForm.income.member.rmds"
            v-model:spouse="ruleForm.income.spouse.rmds"
            prop-member="income.member.rmds"
            prop-spouse="income.spouse.rmds"
            title="RMD’s"
            :is-married="isMarried"
            :disabled="isLoadingUpdate"
            @blur="validateMemberAssetFieldAndUpdate"
          />

          <!-- Interest/Dividents -->
          <ItemFormAssetsTwo
            v-model:member="ruleForm.income.member.interest_dividends"
            v-model:spouse="ruleForm.income.spouse.interest_dividends"
            prop-member="income.member.interest_dividends"
            prop-spouse="income.spouse.interest_dividends"
            title="Interest/Dividents"
            :is-married="isMarried"
            :disabled="isLoadingUpdate"
            @blur="validateMemberAssetFieldAndUpdate"
          />

          <!-- Other -->
          <ItemFormAssetsTwo
            v-model:member="ruleForm.income.member.other"
            v-model:spouse="ruleForm.income.spouse.other"
            prop-member="income.member.other"
            prop-spouse="income.spouse.other"
            title="Other"
            :is-married="isMarried"
            :disabled="isLoadingUpdate"
            @blur="validateMemberAssetFieldAndUpdate"
          />
        </div>
      </div>

      <div class="border-b px-16 py-6">
        <span class="text-main text-xl font-semibold">Liquid assets</span>
        <div class="flex pb-2 mt-8">
          <div class="w-4/24" />
          <div class="w-5/24 text-gray03 text-xs">OWNER</div>
          <div v-if="isMarried" class="w-5/24 text-gray03 text-xs">SPOUSE</div>
          <div class="w-5/24 text-gray03 text-xs pl-2.5">O/NQ</div>
          <div class="w-5/24 text-gray03 text-xs pl-2.5">BALANCE</div>
        </div>

        <!-- Cash/Checking/ Savings/MM -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.liquid_assets.member.cash_checking_savings_mm"
          v-model:spouse="ruleForm.liquid_assets.spouse.cash_checking_savings_mm"
          v-model:onq="ruleForm.liquid_assets.o_nq.cash_checking_savings_mm"
          v-model:balance="ruleForm.liquid_assets.balance.cash_checking_savings_mm"
          prop-member="liquid_assets.member.cash_checking_savings_mm"
          prop-spouse="liquid_assets.spouse.cash_checking_savings_mm"
          prop-onq="liquid_assets.o_nq.cash_checking_savings_mm"
          prop-balance="liquid_assets.balance.cash_checking_savings_mm"
          title="Cash/Checking/ Savings/MM"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- CD’s -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.liquid_assets.member.cds"
          v-model:spouse="ruleForm.liquid_assets.spouse.cds"
          v-model:onq="ruleForm.liquid_assets.o_nq.cds"
          v-model:balance="ruleForm.liquid_assets.balance.cds"
          prop-member="liquid_assets.member.cds"
          prop-spouse="liquid_assets.spouse.cds"
          prop-onq="liquid_assets.o_nq.cds"
          prop-balance="liquid_assets.balance.cds"
          title="CD’s"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- 401k/IRA (if over 59) -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.liquid_assets.member.first_401k_ira_59"
          v-model:spouse="ruleForm.liquid_assets.spouse.first_401k_ira_59"
          v-model:onq="ruleForm.liquid_assets.o_nq.first_401k_ira_59"
          v-model:balance="ruleForm.liquid_assets.balance.first_401k_ira_59"
          prop-member="liquid_assets.member.first_401k_ira_59"
          prop-spouse="liquid_assets.spouse.first_401k_ira_59"
          prop-onq="liquid_assets.o_nq.first_401k_ira_59"
          prop-balance="liquid_assets.balance.first_401k_ira_59"
          title="401k/IRA (if over 59)"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- 401k/IRA -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.liquid_assets.member.first_401k_ira"
          v-model:spouse="ruleForm.liquid_assets.spouse.first_401k_ira"
          v-model:onq="ruleForm.liquid_assets.o_nq.first_401k_ira"
          v-model:balance="ruleForm.liquid_assets.balance.first_401k_ira"
          prop-member="liquid_assets.member.first_401k_ira"
          prop-spouse="liquid_assets.spouse.first_401k_ira"
          prop-onq="liquid_assets.o_nq.first_401k_ira"
          prop-balance="liquid_assets.balance.first_401k_ira"
          title="401k/IRA"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- 401k/IRA -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.liquid_assets.member.second_401k_ira"
          v-model:spouse="ruleForm.liquid_assets.spouse.second_401k_ira"
          v-model:onq="ruleForm.liquid_assets.o_nq.second_401k_ira"
          v-model:balance="ruleForm.liquid_assets.balance.second_401k_ira"
          prop-member="liquid_assets.member.second_401k_ira"
          prop-spouse="liquid_assets.spouse.second_401k_ira"
          prop-onq="liquid_assets.o_nq.second_401k_ira"
          prop-balance="liquid_assets.balance.second_401k_ira"
          title="401k/IRA"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- Stocks/Bonds/MF -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.liquid_assets.member.stocks_bonds_mf"
          v-model:spouse="ruleForm.liquid_assets.spouse.stocks_bonds_mf"
          v-model:onq="ruleForm.liquid_assets.o_nq.stocks_bonds_mf"
          v-model:balance="ruleForm.liquid_assets.balance.stocks_bonds_mf"
          prop-member="liquid_assets.member.stocks_bonds_mf"
          prop-spouse="liquid_assets.spouse.stocks_bonds_mf"
          prop-onq="liquid_assets.o_nq.stocks_bonds_mf"
          prop-balance="liquid_assets.balance.stocks_bonds_mf"
          title="Stocks/Bonds/MF"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- Stocks/Bonds/MF -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.liquid_assets.member.cash_value_life_insurance"
          v-model:spouse="ruleForm.liquid_assets.spouse.cash_value_life_insurance"
          v-model:onq="ruleForm.liquid_assets.o_nq.cash_value_life_insurance"
          v-model:balance="ruleForm.liquid_assets.balance.cash_value_life_insurance"
          prop-member="liquid_assets.member.cash_value_life_insurance"
          prop-spouse="liquid_assets.spouse.cash_value_life_insurance"
          prop-onq="liquid_assets.o_nq.cash_value_life_insurance"
          prop-balance="liquid_assets.balance.cash_value_life_insurance"
          title="Cash value life insurance"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- FA/VA not suject to penalty -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.liquid_assets.member.fa_va_not_subject_to_penalty"
          v-model:spouse="ruleForm.liquid_assets.spouse.fa_va_not_subject_to_penalty"
          v-model:onq="ruleForm.liquid_assets.o_nq.fa_va_not_subject_to_penalty"
          v-model:balance="ruleForm.liquid_assets.balance.fa_va_not_subject_to_penalty"
          prop-member="liquid_assets.member.fa_va_not_subject_to_penalty"
          prop-spouse="liquid_assets.spouse.fa_va_not_subject_to_penalty"
          prop-onq="liquid_assets.o_nq.fa_va_not_subject_to_penalty"
          prop-balance="liquid_assets.balance.fa_va_not_subject_to_penalty"
          title="FA/VA not suject to penalty"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- Gift/Inheritance -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.liquid_assets.member.gift_inheritance"
          v-model:spouse="ruleForm.liquid_assets.spouse.gift_inheritance"
          v-model:onq="ruleForm.liquid_assets.o_nq.gift_inheritance"
          v-model:balance="ruleForm.liquid_assets.balance.gift_inheritance"
          prop-member="liquid_assets.member.gift_inheritance"
          prop-spouse="liquid_assets.spouse.gift_inheritance"
          prop-onq="liquid_assets.o_nq.gift_inheritance"
          prop-balance="liquid_assets.balance.gift_inheritance"
          title="Gift/Inheritance"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- Lump sum pension -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.liquid_assets.member.lump_sum_pension"
          v-model:spouse="ruleForm.liquid_assets.spouse.lump_sum_pension"
          v-model:onq="ruleForm.liquid_assets.o_nq.lump_sum_pension"
          v-model:balance="ruleForm.liquid_assets.balance.lump_sum_pension"
          prop-member="liquid_assets.member.lump_sum_pension"
          prop-spouse="liquid_assets.spouse.lump_sum_pension"
          prop-onq="liquid_assets.o_nq.lump_sum_pension"
          prop-balance="liquid_assets.balance.lump_sum_pension"
          title="Lump sum pension"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- Other liquid assets -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.liquid_assets.member.other_liquid_assets"
          v-model:spouse="ruleForm.liquid_assets.spouse.other_liquid_assets"
          v-model:onq="ruleForm.liquid_assets.o_nq.other_liquid_assets"
          v-model:balance="ruleForm.liquid_assets.balance.other_liquid_assets"
          prop-member="liquid_assets.member.other_liquid_assets"
          prop-spouse="liquid_assets.spouse.other_liquid_assets"
          prop-onq="liquid_assets.o_nq.other_liquid_assets"
          prop-balance="liquid_assets.balance.other_liquid_assets"
          title="Other liquid assets"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- Total -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.liquid_assets.member.total"
          v-model:spouse="ruleForm.liquid_assets.spouse.total"
          v-model:onq="ruleForm.liquid_assets.o_nq.total"
          v-model:balance="ruleForm.liquid_assets.balance.total"
          prop-member="liquid_assets.member.total"
          prop-spouse="liquid_assets.spouse.total"
          prop-onq="liquid_assets.o_nq.total"
          prop-balance="liquid_assets.balance.total"
          title="Total"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />
      </div>

      <div class="border-b px-16 py-6">
        <span class="text-main text-xl font-semibold">Non-liquid assets</span>
        <div class="flex pb-2 mt-8">
          <div class="w-4/24" />
          <div class="w-5/24 text-gray03 text-xs">OWNER</div>
          <div v-if="isMarried" class="w-5/24 text-gray03 text-xs">SPOUSE</div>
          <div class="w-5/24 text-gray03 text-xs pl-2.5">O/NQ</div>
          <div class="w-5/24 text-gray03 text-xs pl-2.5">BALANCE</div>
        </div>

        <!-- Value of home -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.non_liquid_assets.member.value_of_home"
          v-model:spouse="ruleForm.non_liquid_assets.spouse.value_of_home"
          v-model:onq="ruleForm.non_liquid_assets.o_nq.value_of_home"
          v-model:balance="ruleForm.non_liquid_assets.balance.value_of_home"
          prop-member="non_liquid_assets.member.value_of_home"
          prop-spouse="non_liquid_assets.spouse.value_of_home"
          prop-onq="non_liquid_assets.o_nq.value_of_home"
          prop-balance="non_liquid_assets.balance.value_of_home"
          title="Value of home"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- 401k/IRA (if over 59) -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.non_liquid_assets.member.first_401k_ira_59"
          v-model:spouse="ruleForm.non_liquid_assets.spouse.first_401k_ira_59"
          v-model:onq="ruleForm.non_liquid_assets.o_nq.first_401k_ira_59"
          v-model:balance="ruleForm.non_liquid_assets.balance.first_401k_ira_59"
          prop-member="non_liquid_assets.member.first_401k_ira_59"
          prop-spouse="non_liquid_assets.spouse.first_401k_ira_59"
          prop-onq="non_liquid_assets.o_nq.first_401k_ira_59"
          prop-balance="non_liquid_assets.balance.first_401k_ira_59"
          title="401k/IRA (if over 59)"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- 401k/IRA -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.non_liquid_assets.member.first_401k_ira"
          v-model:spouse="ruleForm.non_liquid_assets.spouse.first_401k_ira"
          v-model:onq="ruleForm.non_liquid_assets.o_nq.first_401k_ira"
          v-model:balance="ruleForm.non_liquid_assets.balance.first_401k_ira"
          prop-member="non_liquid_assets.member.first_401k_ira"
          prop-spouse="non_liquid_assets.spouse.first_401k_ira"
          prop-onq="non_liquid_assets.o_nq.first_401k_ira"
          prop-balance="non_liquid_assets.balance.first_401k_ira"
          title="401k/IRA"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- 401k/IRA -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.non_liquid_assets.member.second_401k_ira"
          v-model:spouse="ruleForm.non_liquid_assets.spouse.second_401k_ira"
          v-model:onq="ruleForm.non_liquid_assets.o_nq.second_401k_ira"
          v-model:balance="ruleForm.non_liquid_assets.balance.second_401k_ira"
          prop-member="non_liquid_assets.member.second_401k_ira"
          prop-spouse="non_liquid_assets.spouse.second_401k_ira"
          prop-onq="non_liquid_assets.o_nq.second_401k_ira"
          prop-balance="non_liquid_assets.balance.second_401k_ira"
          title="401k/IRA"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- FA/VA suject to penalty -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.non_liquid_assets.member.fa_va_subject_to_penalty"
          v-model:spouse="ruleForm.non_liquid_assets.spouse.fa_va_subject_to_penalty"
          v-model:onq="ruleForm.non_liquid_assets.o_nq.fa_va_subject_to_penalty"
          v-model:balance="ruleForm.non_liquid_assets.balance.fa_va_subject_to_penalty"
          prop-member="non_liquid_assets.member.fa_va_subject_to_penalty"
          prop-spouse="non_liquid_assets.spouse.fa_va_subject_to_penalty"
          prop-onq="non_liquid_assets.o_nq.fa_va_subject_to_penalty"
          prop-balance="non_liquid_assets.balance.fa_va_subject_to_penalty"
          title="FA/VA suject to penalty"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- Other -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.non_liquid_assets.member.other"
          v-model:spouse="ruleForm.non_liquid_assets.spouse.other"
          v-model:onq="ruleForm.non_liquid_assets.o_nq.other"
          v-model:balance="ruleForm.non_liquid_assets.balance.other"
          prop-member="non_liquid_assets.member.other"
          prop-spouse="non_liquid_assets.spouse.other"
          prop-onq="non_liquid_assets.o_nq.other"
          prop-balance="non_liquid_assets.balance.other"
          title="Other"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />

        <!-- Total -->
        <ItemFormAssetsFour
          v-model:member="ruleForm.non_liquid_assets.member.total"
          v-model:spouse="ruleForm.non_liquid_assets.spouse.total"
          v-model:onq="ruleForm.non_liquid_assets.o_nq.total"
          v-model:balance="ruleForm.non_liquid_assets.balance.total"
          prop-member="non_liquid_assets.member.total"
          prop-spouse="non_liquid_assets.spouse.total"
          prop-onq="non_liquid_assets.o_nq.total"
          prop-balance="non_liquid_assets.balance.total"
          title="Total"
          :is-married="isMarried"
          :disabled="isLoadingUpdate"
          @blur="validateMemberAssetFieldAndUpdate"
        />
      </div>
      <div class="flex justify-end my-10">
        <div class="pr-3">
          <Button default-gray-btn text-btn="Back" @click="backStep" />
        </div>
        <el-button type="primary" @click="submitForm('ruleForm')"> Go to the assets accounts </el-button>
      </div>
    </el-form>
  </div>
  <el-skeleton v-else :rows="15" animated />
</template>

<script>
import { watchEffect, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, reactive, onMounted, watch } from 'vue'
import { createAssetsIncome } from '@/api/vueQuery/create-assets-income'
import { useMutation, useQueryClient } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { rules } from '@/validationRules/assetsRules.js'
import { scrollTop } from '@/utils/scrollTop'
import { useFetchMemberAssets } from '@/api/use-fetch-member-assets'
import { initialAssetsInformation } from '@/components/NewProspect/initialState/assetsInformation'
import { updateMembersAssets } from '@/api/vueQuery/update-members-assets'
import { useFetchMember } from '@/api/use-fetch-member'
import ItemFormAssetsTwo from '@/components/NewProspect/ProspectAssets/ItemFormAssetsTwo.vue'
import ItemFormAssetsFour from '@/components/NewProspect/ProspectAssets/ItemFormAssetsFour.vue'
import { setValueByPath } from '@/utils/setValueByPath'
import { getByPath } from '../../../utils/getByPath'

function setInitValue(ruleForm, memberAssets) {
  if (memberAssets?.data) {
    Object.assign(ruleForm, JSON.parse(JSON.stringify(memberAssets.data)))
  }
}

export default {
  name: 'AddProspectAssets',
  components: {
    ItemFormAssetsTwo,
    ItemFormAssetsFour,
  },
  setup() {
    const queryClient = useQueryClient()
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const form = ref()
    const step = computed(() => store.state.newProspect.step)
    const isUpdateMember = computed(() => !!route.params.id)

    let memberId

    const { response: memberAssets, isLoading: isMemberAssetsLoading } = useFetchMemberAssets(route.params.id)

    const { mutateAsync: create, isLoading, isError, isFetching, data, error } = useMutation(createAssetsIncome)

    const { isLoading: isLoadingUpdate, mutateAsync: updateMemberAssets } = useMutation(updateMembersAssets)

    const {
      response: member,
      error: errorMember,
      fetching: fetchingMember,
      getMember,
    } = useFetchMember(route.params.id)

    const ruleForm = reactive({
      income: {
        income_plan: true,
        member: {
          salary: '',
          social_security: '',
          pension: '',
          rental_income: '',
          rmds: '',
          interest_dividends: '',
          other: '',
        },
        spouse: {
          salary: '',
          social_security: '',
          pension: '',
          rental_income: '',
          rmds: '',
          interest_dividends: '',
          other: '',
        },
      },
      liquid_assets: {
        member: {
          gift_inheritance: '',
          first_401k_ira_59: '',
          cash_value_life_insurance: '',
          total: '',
          second_401k_ira: '',
          cash_checking_savings_mm: '',
          stocks_bonds_mf: '',
          first_401k_ira: '',
          other_liquid_assets: '',
          cds: '',
          lump_sum_pension: '',
          fa_va_not_subject_to_penalty: '',
        },
        spouse: {
          gift_inheritance: '',
          first_401k_ira_59: '',
          cash_value_life_insurance: '',
          total: '',
          second_401k_ira: '',
          cash_checking_savings_mm: '',
          stocks_bonds_mf: '',
          first_401k_ira: '',
          other_liquid_assets: '',
          cds: '',
          lump_sum_pension: '',
          fa_va_not_subject_to_penalty: '',
        },
        o_nq: {
          gift_inheritance: '',
          first_401k_ira_59: '',
          cash_value_life_insurance: '',
          total: '',
          second_401k_ira: '',
          cash_checking_savings_mm: '',
          stocks_bonds_mf: '',
          first_401k_ira: '',
          other_liquid_assets: '',
          cds: '',
          lump_sum_pension: '',
          fa_va_not_subject_to_penalty: '',
        },
        balance: {
          gift_inheritance: '',
          first_401k_ira_59: '',
          cash_value_life_insurance: '',
          total: '',
          second_401k_ira: '',
          cash_checking_savings_mm: '',
          stocks_bonds_mf: '',
          first_401k_ira: '',
          other_liquid_assets: '',
          cds: '',
          lump_sum_pension: '',
          fa_va_not_subject_to_penalty: '',
        },
      },
      non_liquid_assets: {
        member: {
          total: '',
          other: '',
          fa_va_subject_to_penalty: '',
          second_401k_ira: '',
          first_401k_ira: '',
          first_401k_ira_59: '',
          value_of_home: '',
        },
        spouse: {
          total: '',
          other: '',
          fa_va_subject_to_penalty: '',
          second_401k_ira: '',
          first_401k_ira: '',
          first_401k_ira_59: '',
          value_of_home: '',
        },
        o_nq: {
          total: '',
          other: '',
          fa_va_subject_to_penalty: '',
          second_401k_ira: '',
          first_401k_ira: '',
          first_401k_ira_59: '',
          value_of_home: '',
        },
        balance: {
          total: '',
          other: '',
          fa_va_subject_to_penalty: '',
          second_401k_ira: '',
          first_401k_ira: '',
          first_401k_ira_59: '',
          value_of_home: '',
        },
      },
      member_id: '',
    })

    onMounted(async () => {
      store.commit('newProspect/setStep', 2)
      scrollTop()
      if (route.params.id) {
        memberId = route.params.id
        ruleForm.member_id = memberId
        await getMember()
      }
    })

    watchEffect(() => {
      if (isMemberAssetsLoading.value === false) {
        setInitValue(ruleForm, memberAssets.value)
      }
    })

    const resetState = () => {
      Object.assign(ruleForm, initialAssetsInformation)
    }

    watch(isUpdateMember, (newValue, oldValue) => {
      if (newValue !== oldValue && newValue === false) {
        resetState()
      }
    })

    const backStep = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({ name: 'basic-information', params: { id: memberId } })
    }

    const isMarried = computed(() => {
      if (member?.value?.data) return member.value.data.married
      return false
    })

    const validateMemberAssetField = async (field, cb) => {
      form.value.validateField(field, async (error) => {
        if (!error) {
          cb()
        }
      })
    }

    const validateMemberAssetFieldAndUpdate = (field) => {
      validateMemberAssetField(field, updateSingleField.bind(null, field))
    }

    const updateSingleField = async (field) => {
      const patchObject = {}

      const newValue = getByPath(ruleForm, field)
      const oldValue = getByPath(memberAssets.value.data, field)

      if (Number(newValue) === Number(oldValue)) {
        return
      }

      setValueByPath(patchObject, field, newValue)
      setValueByPath(patchObject, 'member_id', memberId)

      updateOrCreateMemberAssets(patchObject)
    }

    const updateOrCreateMemberAssets = async (patchObject = ruleForm) => {
      let res

      if (isUpdateMember.value) {
        res = await updateMemberAssets(patchObject)
      } else {
        res = await create(patchObject)
      }
      queryClient.invalidateQueries(['MemberAssets', memberId])

      return res
    }

    const submitForm = async () => {
      const res = await updateOrCreateMemberAssets()

      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Opportunity update successfully',
        })
        store.commit('newProspect/setStep', step.value + 1)
        router.push({
          name: 'monthly-expense',
          params: { id: memberId },
        })
      } else {
        useAlert({
          title: 'Error',
          type: 'error',
          message: res.error.message,
        })
      }
    }

    return {
      ruleForm,
      backStep,
      create,
      isLoading,
      isError,
      isFetching,
      data,
      error,
      submitForm,
      rules,
      isUpdateMember,
      memberAssets,
      isMemberAssetsLoading,
      memberId,
      isMarried,
      member,
      errorMember,
      fetchingMember,
      updateOrCreateMemberAssets,
      form,
      validateMemberAssetFieldAndUpdate,
      isLoadingUpdate,
    }
  },
}
</script>
