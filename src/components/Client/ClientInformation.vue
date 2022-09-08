<template>
  <div class="lg:max-w-5xl lg:my-0 lg:mx-auto lg:w-[960px]">
    <div v-if="isLoadingInfo">
      <el-skeleton :rows="15" animated />
    </div>
    <div v-else-if="isErrorInfo">An error has occurred: {{ error }}</div>
    <div v-else-if="clientsInfo" class="p-5 text-main">
      <div class="flex justify-center mb-8">
        <InlineSvg :src="IrisLogoStandart" width="250" height="100" />
      </div>
      <template v-if="clientsInfo.type === 'lead'">
        <div class="flex flex-col items-center">
          <div class="flex flex-col items-center text-center">
            <span class="text-lg">
              In order to conduct a proper analysis and make your visit productive, we ask that you provide the items
              listed below.
            </span>
            <span class="text-base my-5 sm:my-10">
              These items are essential for performing our fiduciary duty and providing the most appropriate financial
              advice.
            </span>
          </div>
        </div>
        <router-link
          :to="{ name: 'client-basic-information', params: { id: clientsInfo.member_id } }"
          class="flex items-center"
        >
          <el-card class="mb-4 w-full">
            <div class="flex items-center">
              <el-icon :size="25" class="mr-5">
                <circle-check-filled :color="clientsInfo.steps.completed_financial_fact_finder ? '#073763' : 'gray'" />
              </el-icon>
              <div class="text-xs sm:text-base text-main">Completed Financial Fact Finder</div>
            </div>
          </el-card>
        </router-link>

        <router-link :to="{ name: 'investment-retirement' }" class="flex items-center">
          <el-card class="mb-4 w-full">
            <div class="flex items-center">
              <el-icon :size="25" class="mr-5">
                <circle-check-filled
                  :color="clientsInfo.steps.investment_and_retirement_accounts ? '#073763' : 'gray'"
                />
              </el-icon>
              <div class="text-xs sm:text-base text-main">Upload your Investment/Retirement Statements Here</div>
            </div>
          </el-card>
        </router-link>

        <router-link :to="{ name: 'life-insurance' }" class="flex items-center">
          <el-card class="mb-4 w-full">
            <div class="flex items-center">
              <el-icon :size="25" class="mr-5">
                <circle-check-filled
                  :color="clientsInfo.steps.life_insurance_annuity_and_long_terms_care_policies ? '#073763' : 'gray'"
                />
              </el-icon>
              <div class="text-xs sm:text-base text-main">Upload your Life Insurance Statements Here</div>
            </div>
          </el-card>
        </router-link>

        <router-link :to="{ name: 'social-security' }" class="flex items-center">
          <el-card class="mb-4 w-full">
            <div class="flex items-center">
              <el-icon :size="25" class="mr-5">
                <circle-check-filled :color="clientsInfo.steps.social_security_information ? '#073763' : 'gray'" />
              </el-icon>
              <div class="text-xs sm:text-base text-main">Upload your Social Security Statements Here</div>
            </div>
          </el-card>
        </router-link>
      </template>
      <template v-else>
        <div class="flex flex-col items-center my-8">
          <InlineSvg :src="IconSuccesChanged" />
          <p class="my-5 text-center">Congratulations !</p>
          <p class="my-5 text-center">
            You have provided all the required information. Our Advisors will check all the details and will contact you
            nearest time.
          </p>
        </div>
      </template>

      <router-link :to="{ name: 'confirmation-page', params: { id: clientsInfo.member_id } }" class="flex">
        <el-card class="mb-4 w-full">
          <div class="flex items-center">
            <el-icon :size="25" class="mr-5">
              <document-checked color="#073763" />
            </el-icon>
            <div class="text-xs sm:text-base text-main">Confirmation Information</div>
          </div>
        </el-card>
      </router-link>
    </div>
  </div>
</template>

<script>
import { DocumentChecked, CircleCheckFilled } from '@element-plus/icons-vue'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import IconSuccesChanged from '@/assets/svg/icon-succes-changed.svg'
import IrisLogoStandart from '@/assets/svg/iris-logo-standard.svg'

export default {
  name: 'ClientInformation',
  components: {
    CircleCheckFilled,
    DocumentChecked,
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
      IconSuccesChanged,
      IrisLogoStandart,
    }
  },
}
</script>
