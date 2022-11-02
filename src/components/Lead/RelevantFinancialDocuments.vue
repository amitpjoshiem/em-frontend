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
      <router-link :to="{ name: `lead/dashboard` }">
        <SwdButton info main>Back</SwdButton>
      </router-link>
    </div>
  </SwdWrapper>
</template>

<script>
import LeadDocuments from './Upload/LeadDocuments.vue'

export default {
  name: 'RelevantFinancialDocuments',
  components: {
    LeadDocuments,
  },
}
</script>
