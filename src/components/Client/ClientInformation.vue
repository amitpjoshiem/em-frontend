<template>
  <div v-if="isLoadingInfo">
    <el-skeleton :rows="15" animated />
  </div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="clientsInfo" class="p-5 mb-20">
    <div class="flex flex-col items-center">
      <img src="../../assets/img/swd-logo-blue.png" alt="excel" class="w-[150px]" />
      <div class="flex flex-col items-center text-center text-main">
        <span class="text-lg">
          In order to conducta proper analysis and make your visit productive, we ask that you providethe items listed
          below
        </span>
        <span class="text-base my-5 sm:my-10">
          These items are essential for performing our fiduciary duty and providing the most appropiate financial advice
        </span>
      </div>
    </div>

    <router-link
      :to="{ name: 'client-basic-information' }"
      class="flex items-center border border-input-border rounded-md p-5 mb-4 sm:mb-10"
    >
      <el-icon :size="25" class="mr-5">
        <circle-check-filled :color="clientsInfo.steps.completed_financial_fact_finder ? 'green' : 'gray'" />
      </el-icon>
      <span class="text-xs sm:text-base">Completed Financial Fact Finder</span>
    </router-link>

    <router-link
      :to="{ name: 'investment-retirement' }"
      class="flex items-center border border-input-border rounded-md p-5 mb-4 sm:mb-10"
    >
      <el-icon :size="25" class="mr-5">
        <circle-check-filled :color="clientsInfo.steps.investment_and_retirement_accounts ? 'green' : 'gray'" />
      </el-icon>
      <span class="text-xs sm:text-base">Investment and Retirement Accounts (most recent statements)</span>
    </router-link>

    <router-link
      :to="{ name: 'life-insurance' }"
      class="flex items-center border border-input-border rounded-md p-5 mb-4 sm:mb-10"
    >
      <el-icon :size="25" class="mr-5">
        <circle-check-filled
          :color="clientsInfo.steps.life_insurance_annuity_and_long_terms_care_policies ? 'green' : 'gray'"
        />
      </el-icon>
      <span class="text-xs sm:text-base"
        >Life Insurance, Annuity, and Long Term Care Policies (most recent statements)</span
      >
    </router-link>

    <router-link
      :to="{ name: 'social-security' }"
      class="flex items-center border border-input-border rounded-md p-5 mb-4 sm:mb-10"
    >
      <el-icon :size="25" class="mr-5">
        <circle-check-filled :color="clientsInfo.steps.social_security_information ? 'green' : 'gray'" />
      </el-icon>
      <span class="text-xs sm:text-base">Social Security Information/Statement(s)</span>
    </router-link>

    <router-link
      :to="{ name: 'list-stock' }"
      class="flex items-center border border-input-border rounded-md p-5 mb-4 sm:mb-10"
    >
      <el-icon :size="25" class="mr-5">
        <circle-check-filled :color="clientsInfo.steps.list_of_stock_certificates_or_bonds ? 'green' : 'gray'" />
      </el-icon>
      <span class="text-xs sm:text-base">List of Stock Certificates or Bonds</span>
    </router-link>

    <div class="flex justify-end">
      <el-button type="primary" plain disabled>Send information</el-button>
    </div>
  </div>
</template>

<script>
import { CircleCheckFilled } from '@element-plus/icons-vue'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'

export default {
  name: 'ClientInformation',
  components: {
    CircleCheckFilled,
  },
  setup() {
    const {
      isLoading: isLoadingInfo,
      fetching: fetchingInfo,
      isError: isErrorInfo,
      data: clientsInfo,
    } = useFetchClietsInfo()

    return {
      isLoadingInfo,
      fetchingInfo,
      isErrorInfo,
      clientsInfo,
    }
  },
}
</script>
