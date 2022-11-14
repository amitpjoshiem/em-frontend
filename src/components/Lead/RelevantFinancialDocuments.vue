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
        <router-link v-if="!isReadOnlyLead" :to="{ name: `lead/dashboard` }" class="w-1/12 ml-4">
          <SwdButton primary main :disabled="!isStepCompleated">Save</SwdButton>
        </router-link>
      </template>
    </div>
  </SwdWrapper>
</template>

<script>
import LeadDocuments from './Upload/LeadDocuments.vue'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import { computed } from 'vue'
export default {
  name: 'RelevantFinancialDocuments',
  components: {
    LeadDocuments,
  },
  setup() {
    const { isLoading: isLoadingInfo, data: clientsInfo } = useFetchClietsInfo()

    const isReadOnlyLead = computed(() => {
      return clientsInfo.value.readonly
    })

    const isStepCompleated = computed(() => {
      return (
        clientsInfo.value.steps.investment_and_retirement_accounts &&
        clientsInfo.value.steps.life_insurance_annuity_and_long_terms_care_policies &&
        clientsInfo.value.steps.social_security_information
      )
    })

    return {
      isReadOnlyLead,
      clientsInfo,
      isLoadingInfo,
      isStepCompleated,
    }
  },
}
</script>
