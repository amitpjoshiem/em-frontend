<template>
  <div class="p-5">
    <div v-if="!isFetchingMember && !isMemberAssetsLoading">
      <el-form ref="form" :model="ruleForm" label-position="top" :rules="rules">
        <!-- Current income -->
        <div class="pb-10">
          <div class="flex items-center mb-5">
            <InlineSvg v-show="isFocusCurrentIncome" :src="IconActive" />
            <InlineSvg v-show="!isFocusCurrentIncome" :src="IconNotActive" />
            <span class="text-main text-xl font-semibold ml-2">Current income</span>
          </div>
          <div
            class="border border-input-border rounded-lg p-5"
            :class="{ 'border-border-blue': isFocusCurrentIncome }"
          >
            <div class="pt-5">
              <el-form-item label="Do you have a written income plan?">
                <el-radio-group v-model="ruleForm.income.income_plan" @change="change">
                  <el-radio :label="true">Yes</el-radio>
                  <el-radio :label="false">No</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- Salary -->
              <ItemFormAssetsTwo
                v-model:member="ruleForm.income.member.salary"
                v-model:spouse="ruleForm.income.spouse.salary"
                prop-member="income.member.salary"
                prop-spouse="income.spouse.salary"
                title="Salary"
                :is-married="isMarried"
                :disabled="isLoadingUpdate"
                @change="change"
                @blur="blur('currentIncome')"
                @focus="focus('currentIncome')"
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
                @change="change"
                @blur="blur('currentIncome')"
                @focus="focus('currentIncome')"
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
                @change="change"
                @blur="blur('currentIncome')"
                @focus="focus('currentIncome')"
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
                @change="change"
                @blur="blur('currentIncome')"
                @focus="focus('currentIncome')"
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
                @change="change"
                @blur="blur('currentIncome')"
                @focus="focus('currentIncome')"
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
                @change="change"
                @blur="blur('currentIncome')"
                @focus="focus('currentIncome')"
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
                @change="change"
                @blur="blur('currentIncome')"
                @focus="focus('currentIncome')"
              />
            </div>
          </div>
        </div>

        <div class="pb-10">
          <div class="flex items-center mb-5">
            <InlineSvg v-show="isFocusLiquidAssets" :src="IconActive" />
            <InlineSvg v-show="!isFocusLiquidAssets" :src="IconNotActive" />
            <span class="text-main text-xl font-semibold ml-2">Liquid assets</span>
          </div>
          <div class="border border-input-border rounded-lg p-5" :class="{ 'border-border-blue': isFocusLiquidAssets }">
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
              @change="change"
              @blur="blur('liquidAssets')"
              @focus="focus('liquidAssets')"
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
              @change="change"
              @blur="blur('liquidAssets')"
              @focus="focus('liquidAssets')"
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
              @change="change"
              @blur="blur('liquidAssets')"
              @focus="focus('liquidAssets')"
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
              @change="change"
              @blur="blur('liquidAssets')"
              @focus="focus('liquidAssets')"
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
              @change="change"
              @blur="blur('liquidAssets')"
              @focus="focus('liquidAssets')"
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
              @change="change"
              @blur="blur('liquidAssets')"
              @focus="focus('liquidAssets')"
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
              @change="change"
              @blur="blur('liquidAssets')"
              @focus="focus('liquidAssets')"
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
              @change="change"
              @blur="blur('liquidAssets')"
              @focus="focus('liquidAssets')"
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
              @change="change"
              @blur="blur('liquidAssets')"
              @focus="focus('liquidAssets')"
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
              @change="change"
              @blur="blur('liquidAssets')"
              @focus="focus('liquidAssets')"
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
              @change="change"
              @blur="blur('liquidAssets')"
              @focus="focus('liquidAssets')"
            />

            <!-- Total -->
            <WidgetClientTotal
              :member="ruleForm.liquid_assets.member.total"
              :spouse="ruleForm.liquid_assets.spouse.total"
              :o-nq="ruleForm.liquid_assets.o_nq.total"
              :balance="ruleForm.liquid_assets.balance.total"
              :is-loading-update="isLoadingUpdate"
              :is-married="isMarried"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center mb-5">
            <InlineSvg v-show="isFocusNonLiquidAssets" :src="IconActive" />
            <InlineSvg v-show="!isFocusNonLiquidAssets" :src="IconNotActive" />
            <span class="text-main text-xl font-semibold ml-2">Non-liquid assets</span>
          </div>
          <!-- Value of home -->
          <div
            class="border border-input-border rounded-lg p-5"
            :class="{ 'border-border-blue': isFocusNonLiquidAssets }"
          >
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
              @change="change"
              @blur="blur('nonLiquidAssets')"
              @focus="focus('nonLiquidAssets')"
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
              @change="change"
              @blur="blur('nonLiquidAssets')"
              @focus="focus('nonLiquidAssets')"
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
              @change="change"
              @blur="blur('nonLiquidAssets')"
              @focus="focus('nonLiquidAssets')"
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
              @change="change"
              @blur="blur('nonLiquidAssets')"
              @focus="focus('nonLiquidAssets')"
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
              @change="change"
              @blur="blur('nonLiquidAssets')"
              @focus="focus('nonLiquidAssets')"
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
              @change="change"
              @blur="blur('nonLiquidAssets')"
              @focus="focus('nonLiquidAssets')"
            />

            <WidgetClientTotal
              :member="ruleForm.non_liquid_assets.member.total"
              :spouse="ruleForm.non_liquid_assets.spouse.total"
              :o-nq="ruleForm.non_liquid_assets.o_nq.total"
              :balance="ruleForm.non_liquid_assets.balance.total"
              :is-loading-update="isLoadingUpdate"
              :is-married="isMarried"
            />
          </div>
        </div>
        <div class="flex justify-end my-10">
          <div class="pr-3">
            <Button default-gray-btn text-btn="Back" @click="backStep" />
          </div>
          <el-button type="primary" @click="submitForm('ruleForm')">Go to the monthly expense</el-button>
        </div>
      </el-form>
    </div>
    <el-skeleton v-else :rows="15" animated />
  </div>
</template>

<script>
import { watchEffect, ref, computed, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

import { useMutation, useQueryClient } from 'vue-query'

import { useFetchMemberAssets } from '@/api/use-fetch-member-assets'
import { updateMembersAssets } from '@/api/vueQuery/update-members-assets'
import { useFetchMember } from '@/api/use-fetch-member'

import { scrollTop } from '@/utils/scrollTop'
import { useAlert } from '@/utils/use-alert'

import WidgetClientTotal from '@/components/Client/AddNewClient/Assets/WidgetClientTotal.vue'
import ItemFormAssetsTwo from '@/components/Client/AddNewClient/Assets/ItemFormAssetsTwo.vue'
import ItemFormAssetsFour from '@/components/Client/AddNewClient/Assets/ItemFormAssetsFour.vue'

import { useAssetsInfoHooks } from '@/hooks/use-assets-info-hooks'

import { rules } from '@/validationRules/assetsRules.js'

import IconActive from '@/assets/svg/icon-active.svg'
import IconNotActive from '@/assets/svg/icon-not-active.svg'

export default {
  name: 'AddAssets',
  components: {
    ItemFormAssetsTwo,
    ItemFormAssetsFour,
    WidgetClientTotal,
  },
  setup() {
    const queryClient = useQueryClient()
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const form = ref()
    const isFocusCurrentIncome = ref(false)
    const isFocusLiquidAssets = ref(false)
    const isFocusNonLiquidAssets = ref(false)
    const step = computed(() => store.state.newClient.step)

    const memberId = route.params.id

    const { response: memberAssets, isLoading: isMemberAssetsLoading } = useFetchMemberAssets(route.params.id)
    const { isLoading: isLoadingUpdate, mutateAsync: updateMemberAssets } = useMutation(updateMembersAssets)
    const { isFetching: isFetchingMember, data: member } = useFetchMember({ id: route.params.id })

    const { setInitValue, setTotal, isMarried } = useAssetsInfoHooks(member)

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
      store.commit('newClient/setStep', 2)
      scrollTop()
    })

    watchEffect(() => {
      if (isMemberAssetsLoading.value === false) {
        setInitValue({ ruleForm, memberAssets: memberAssets.value, id: memberId })
      }
    })

    const backStep = () => {
      store.commit('newClient/setStep', step.value - 1)
      router.push({ name: 'client-basic-information', params: { id: memberId } })
    }

    const change = async () => {
      const res = await updateMemberAssets(ruleForm)
      queryClient.invalidateQueries(['MemberAssets', memberId])

      setTotal(ruleForm, res.data)
    }

    const submitForm = async () => {
      useAlert({
        title: 'Success',
        type: 'success',
        message: 'Information update successfully',
      })
      store.commit('newClient/setStep', step.value + 1)
      router.push({
        name: 'client-expense-information',
        params: { id: memberId },
      })
    }

    const focus = (type) => {
      if (type === 'liquidAssets') isFocusLiquidAssets.value = true
      if (type === 'nonLiquidAssets') isFocusNonLiquidAssets.value = true
      if (type === 'currentIncome') isFocusCurrentIncome.value = true
    }

    const blur = (type) => {
      if (type === 'liquidAssets') isFocusLiquidAssets.value = false
      if (type === 'nonLiquidAssets') isFocusNonLiquidAssets.value = false
      if (type === 'currentIncome') isFocusCurrentIncome.value = false
    }

    return {
      ruleForm,
      backStep,
      submitForm,
      rules,
      isMemberAssetsLoading,
      isMarried,
      form,
      isLoadingUpdate,
      isFetchingMember,
      member,
      change,

      IconActive,
      IconNotActive,

      focus,
      blur,

      isFocusCurrentIncome,
      isFocusLiquidAssets,
      isFocusNonLiquidAssets,
    }
  },
}
</script>
