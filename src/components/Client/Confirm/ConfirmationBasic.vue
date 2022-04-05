<template>
  <div v-if="!isFetchingMember && !isFetchingConfirmation">
    <el-form ref="form" :model="ruleForm" label-position="top">
      <el-card class="mb-4 w-full sm:p-5">
        <div>
          <div class="mb-5 text-main font-semibold">General Info</div>
          <div class="sm:flex sm:flex-wrap lg:flex-row text-sm mb-4">
            <!-- CLIENT -->
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-5/12">
              <div class="pr-2 text-gray-500">Name:</div>
              <SwdStubForText :text="member.name" plug="&mdash;" class="text-sm text-main" />
            </div>
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-4/12">
              <div class="pr-2 text-gray-500">E-mail:</div>
              <div class="text-main">{{ member.email }}</div>
            </div>
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-3/12">
              <span class="text-gray-500 pr-2">Age:</span>
              <SwdStubForText :text="member.age" plug="&mdash;" class="text-sm text-main" />
            </div>
            <!-- SPOUSE -->
            <template v-if="member.married">
              <div class="flex text-main mb-2 sm:w-6/12 xl:w-5/12">
                <div class="pr-2 text-gray-500">Spouse Name:</div>
                <div class="text-main">{{ member.spouse.name }}</div>
              </div>
              <div class="flex text-main mb-2 sm:w-6/12 xl:w-4/12">
                <div class="pr-2 text-gray-500">Spouse e-mail:</div>
                <div class="text-main">{{ member.spouse.email }}</div>
              </div>
              <div class="flex text-main mb-2 sm:w-6/12 xl:w-3/12">
                <span class="text-gray-500 pr-2">Spouse Age:</span>
                <span class="">{{ member.spouse.age }}</span>
              </div>
            </template>

            <!-- ADDRESS -->
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-5/12">
              <div class="pr-2 text-gray-500">Address:</div>
              <SwdStubForText :text="member.address" plug="&mdash;" class="text-sm text-main" />
            </div>
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-4/12">
              <div class="pr-2 text-gray-500">City:</div>
              <SwdStubForText :text="member.city" plug="&mdash;" class="text-sm text-main" />
            </div>
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-3/12">
              <span class="text-gray-500 pr-2">State:</span>
              <SwdStubForText :text="member.state" plug="&mdash;" class="text-sm text-main" />
            </div>
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-5/12">
              <span class="text-gray-500 pr-2">Zip:</span>
              <SwdStubForText :text="member.zip" plug="&mdash;" class="text-sm text-main" />
            </div>

            <!-- RETIRED -->
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-4/12">
              <div class="pr-2 text-gray-500">Retired:</div>
              <div class="text-main">
                <SwdRetiredLabel :retired="member.retired" />
              </div>
            </div>
            <div v-if="member.married" class="flex text-main mb-2 sm:w-6/12 xl:w-3/12">
              <div class="pr-2 text-gray-500">Spouse retired:</div>
              <div class="text-main">
                <SwdRetiredLabel :retired="member.spouse.retired" />
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="mb-4 w-full sm:p-5">
        <el-form-item class="mb-4">
          <el-radio-group v-model="ruleForm.consultation" class="flex flex-col items-start">
            <el-radio label="want_consultation_and_book"
              >Yes, I want a Free Consultation & Copy of Matt`s Book
            </el-radio>
            <el-radio label="want_consultation">Yes, I want a Free Consultation </el-radio>
            <el-radio label="dont_want_consultation">No, I don't want a Free Consultation </el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- I Currently Have -->
        <el-form-item label="I Currently Have:" class="mb-4">
          <el-checkbox v-model="ruleForm.currently_have.cds" label="CDs" class="w-full sm:w-4/12 lg:w-3/12 mr-0" />
          <el-checkbox
            v-model="ruleForm.currently_have.bonds_or_bonds_funds"
            label="Bounds or Bound Funds"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
          <el-checkbox
            v-model="ruleForm.currently_have.ira_tsa_401_403"
            label="IRA/TSA/401(k)/403(b)"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
          <el-checkbox
            v-model="ruleForm.currently_have.annuity"
            label="An Annuity"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
          <el-checkbox
            v-model="ruleForm.currently_have.variable_annuity"
            label="A Variable Annuity"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
          <el-checkbox
            v-model="ruleForm.currently_have.long_term_care_insurance"
            label="Long Term Core Insurance"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
          <el-checkbox
            v-model="ruleForm.currently_have.life_insurance"
            label="Life Insurance"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
          <el-checkbox
            v-model="ruleForm.currently_have.mutual_funds_or_stocks"
            label="Mutual Funds or Stocks"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
          <el-checkbox
            v-model="ruleForm.currently_have.dormant_accounts"
            label="Dormant Accounts"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
        </el-form-item>

        <!-- I Want More Info About: -->
        <el-form-item label="I Currently Have:">
          <el-checkbox
            v-model="ruleForm.more_info_about.indexed_annuities"
            label="Indexed Annuities"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
          <el-checkbox
            v-model="ruleForm.more_info_about.strategic_wealth_report"
            label="Strategic Wealth Reports"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
          <el-checkbox
            v-model="ruleForm.more_info_about.rule_of_100"
            label="The rule of 100"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
          <el-checkbox
            v-model="ruleForm.more_info_about.moving_my_ira"
            label="Moving me IRA"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
          <el-checkbox
            v-model="ruleForm.more_info_about.rolling_over_my_401_403"
            label="Roling Over My 401/403"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
          <el-checkbox
            v-model="ruleForm.more_info_about.retirement_income_analysis"
            label="Retirement Income Analysis"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
          <el-checkbox
            v-model="ruleForm.more_info_about.securing_my_money"
            label="Securing me Money"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
          <el-checkbox
            v-model="ruleForm.more_info_about.tax_free_accounts"
            label="Tax Free Accounts"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
          <el-checkbox
            v-model="ruleForm.more_info_about.my_variable_annuity"
            label="Me Variable Annuity"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
          />
        </el-form-item>
      </el-card>
    </el-form>
  </div>
  <el-skeleton v-else :rows="10" animated class="lg:w-[1024px]" />
</template>

<script>
import { useFetchMember } from '@/api/use-fetch-member.js'
import { useFetchClietsConfirmation } from '@/api/clients/use-fetch-confirmation.js'
import { updateStepsClients } from '@/api/vueQuery/clients/fetch-update-steps-clients'
import { updateConfirmation } from '@/api/vueQuery/clients/fetch-update-confirmation'

import { useMutation } from 'vue-query'

import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, ref, watchEffect, onMounted } from 'vue'

import { useAlert } from '@/utils/use-alert'
import { scrollTop } from '@/utils/scrollTop'

import { useConfirmationInfoHooks } from '@/hooks/use-confirmation-info-hooks'

export default {
  name: 'ConfirmationInformation',
  setup() {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    const form = ref(null)

    const { isFetching: isFetchingMember, data: member } = useFetchMember({ id: route.params.id })

    const { isFetching: isFetchingConfirmation, data: confirmationData } = useFetchClietsConfirmation()

    const { isLoading: isLoadingUpdateSteps, mutateAsync: updateSteps } = useMutation(updateStepsClients)
    const { isLoading: isLoadingUpdateConfirmation, mutateAsync: updateCinfirmationInfo } =
      useMutation(updateConfirmation)

    const { setInitValueMember, setInitValueConfirmInfo } = useConfirmationInfoHooks()

    const ruleForm = reactive({
      consultation: 'want_consultation_and_book',
      currently_have: {
        cds: false,
        annuity: false,
        life_insurance: false,
        bonds_or_bonds_funds: false,
        variable_annuity: false,
        mutual_funds_or_stocks: false,
        ira_tsa_401_403: false,
        ong_term_care_insurance: false,
        dormant_accounts: false,
      },
      more_info_about: {
        indexed_annuities: false,
        moving_my_ira: false,
        securing_my_money: false,
        strategic_wealth_report: false,
        rolling_over_my_401_403: false,
        tax_free_accounts: false,
        rule_of_100: false,
        retirement_income_analysis: false,
        my_variable_annuity: false,
      },
    })

    // const step = computed(() => store.state.newClient.step)

    onMounted(async () => {
      store.commit('newClient/setStep', 4)
      scrollTop()
    })

    watchEffect(() => {
      if (isFetchingConfirmation.value === false) setInitValueConfirmInfo(ruleForm, confirmationData.value)
      if (isFetchingMember.value === false) setInitValueMember(ruleForm, member.value)
    })

    // const backStep = () => {
    //   store.commit('newClient/setStep', step.value - 1)
    //   router.push({ name: 'client-expense-information', params: { id: route.params.id } })
    // }

    const saveConfirmation = async () => {
      const formConfirmation = {
        currently_have: ruleForm.currently_have,
        more_info_about: ruleForm.more_info_about,
        consultation: ruleForm.consultation,
      }
      const resUpdateConfirmation = await updateCinfirmationInfo(formConfirmation)

      if (!('error' in resUpdateConfirmation)) {
        const resUpdateSteps = await updateSteps({ completed_financial_fact_finder: 'completed' })
        if (!('error' in resUpdateSteps)) {
          useAlert({
            title: 'Success',
            type: 'success',
            message: 'Information update successfully',
          })

          router.push({
            name: 'client-dashboard',
            params: { id: route.params.id },
          })
        }
      }
    }

    // const isDisabledSaveBtn = computed(() => {
    //   return isLoadingUpdateSteps.value || isLoadingUpdateConfirmation.value
    // })

    return {
      ruleForm,
      form,
      isFetchingMember,
      member,
      // backStep,
      saveConfirmation,
      isFetchingConfirmation,
      isLoadingUpdateSteps,
      isLoadingUpdateConfirmation,
      // isDisabledSaveBtn,
    }
  },
}
</script>
