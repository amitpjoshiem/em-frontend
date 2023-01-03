<template>
  <SwdWrapper>
    <SwdSubHeader title="Upload Relevant Financial Documents" />
    <!-- Investment/Retirement Statements -->
    <div class="border border-main-blue rounded p-4 my-8">
      <div class="text-center text-main font-semibold py-4">Investment/Retirement Statements</div>
      <div>
        <LeadDocuments context="investment_and_retirement_accounts" />
      </div>
    </div>

    <!-- Life Insurance Statements -->
    <div class="border border-main-blue rounded p-4 mb-8">
      <div class="text-center text-main font-semibold py-4">Life Insurance Statements</div>
      <div>
        <LeadDocuments context="life_insurance_annuity_and_long_terms_care_policies" />
      </div>
    </div>

    <!-- Social Security Statements -->
    <div class="border border-main-blue rounded p-4 mb-8">
      <div class="text-center text-main font-semibold py-4">Social Security Statements</div>
      <div>
        <LeadDocuments context="social_security_information" />
      </div>
    </div>

    <div class="flex justify-end my-8">
      <SwdSpinner v-if="isLoadingInfo" />
      <template v-else>
        <router-link :to="{ name: `lead/dashboard` }" class="w-1/12">
          <SwdButton info main>Back</SwdButton>
        </router-link>
        <SwdButton primary main :disabled="isDisabledSaveBtn" class="ml-4" @click="saveStep">
          <SwdSpinner v-show="isLoadingUpdateSteps" class="mr-2" />
          Save
        </SwdButton>
      </template>
    </div>
  </SwdWrapper>
</template>

<script>
import LeadDocuments from './Upload/LeadDocuments.vue'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { updateStepsClients } from '@/api/vueQuery/clients/fetch-update-steps-clients'
import { useMutation, useQueryClient } from 'vue-query'
export default {
  name: 'RelevantFinancialDocuments',
  components: {
    LeadDocuments,
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const queryClient = useQueryClient()

    const { isLoading: isLoadingInfo, data: clientsInfo } = useFetchClietsInfo()
    const { isLoading: isLoadingUpdateSteps, mutateAsync: updateSteps } = useMutation(updateStepsClients)

    const isReadOnlyLead = computed(() => {
      return clientsInfo.value.readonly
    })

    const saveStep = async () => {
      if (!isDisabledSaveBtn.value) {
        const res_investment = await updateSteps({
          ['investment_and_retirement_accounts']: store.state.globalComponents.uploadInvestmentDocsStatus,
        })
        const res_life = await updateSteps({
          ['life_insurance_annuity_and_long_terms_care_policies']: store.state.globalComponents.uploadLifeDocsStatus,
        })
        const res_social = await updateSteps({
          ['social_security_information']: store.state.globalComponents.uploadSocialDocsStatus,
        })
        if (!('error' in res_investment) && !('error' in res_life) && !('error' in res_social)) {
          queryClient.invalidateQueries(['clients-info'])
          router.push({ name: `lead/dashboard` })
        }
      }
    }

    const isDisabledSaveBtn = computed(() => {
      return (
        isLoadingUpdateSteps.value ||
        store.state.globalComponents.uploadInvestmentDocsStatus === null ||
        store.state.globalComponents.uploadLifeDocsStatus === null ||
        store.state.globalComponents.uploadSocialDocsStatus === null
      )
    })

    return {
      isReadOnlyLead,
      clientsInfo,
      isLoadingInfo,
      isDisabledSaveBtn,
      saveStep,
      isLoadingUpdateSteps,
    }
  },
}
</script>
