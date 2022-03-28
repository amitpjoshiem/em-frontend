<template>
  <div v-if="isLoadingInfo">
    <el-skeleton :rows="15" animated />
  </div>
  <div v-else-if="isErrorInfo">An error has occurred: {{ error }}</div>
  <div v-else-if="clientsInfo" class="p-5 mb-20 text-main">
    <div class="flex flex-col items-center">
      <img src="../../assets/img/swd-logo-blue.png" alt="excel" class="w-[150px]" />
      <div class="flex flex-col items-center text-center">
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
      :to="{ name: 'client-basic-information', params: { id: clientsInfo.member_id } }"
      class="flex items-center"
    >
      <el-card class="mb-4 w-full">
        <div class="flex items-center">
          <el-icon :size="25" class="mr-5">
            <circle-check-filled :color="clientsInfo.steps.completed_financial_fact_finder ? '#4cd972' : 'gray'" />
          </el-icon>
          <div class="text-xs sm:text-base text-main">Completed Financial Fact Finder</div>
        </div>
      </el-card>
    </router-link>

    <router-link :to="{ name: 'investment-retirement' }" class="flex items-center">
      <el-card class="mb-4 w-full">
        <div class="flex items-center">
          <el-icon :size="25" class="mr-5">
            <circle-check-filled :color="clientsInfo.steps.investment_and_retirement_accounts ? '#4cd972' : 'gray'" />
          </el-icon>
          <div class="text-xs sm:text-base text-main">Investment and Retirement Accounts (most recent statements)</div>
        </div>
      </el-card>
    </router-link>

    <router-link :to="{ name: 'life-insurance' }" class="flex items-center">
      <el-card class="mb-4 w-full">
        <div class="flex items-center">
          <el-icon :size="25" class="mr-5">
            <circle-check-filled
              :color="clientsInfo.steps.life_insurance_annuity_and_long_terms_care_policies ? '#4cd972' : 'gray'"
            />
          </el-icon>
          <div class="text-xs sm:text-base text-main">
            Life Insurance, Annuity, and Long Term Care Policies (most recent statements)
          </div>
        </div>
      </el-card>
    </router-link>

    <router-link :to="{ name: 'social-security' }" class="flex items-center">
      <el-card class="mb-4 w-full">
        <div class="flex items-center">
          <el-icon :size="25" class="mr-5">
            <circle-check-filled :color="clientsInfo.steps.social_security_information ? '#4cd972' : 'gray'" />
          </el-icon>
          <div class="text-xs sm:text-base text-main">Social Security Information/Statement(s)</div>
        </div>
      </el-card>
    </router-link>

    <router-link :to="{ name: 'list-stock' }" class="flex">
      <el-card class="mb-8 w-full">
        <div class="flex items-center">
          <el-icon :size="25" class="mr-5">
            <circle-check-filled :color="clientsInfo.steps.list_of_stock_certificates_or_bonds ? '#4cd972' : 'gray'" />
          </el-icon>
          <div class="text-xs sm:text-base text-main">List of Stock Certificates or Bonds</div>
        </div>
      </el-card>
    </router-link>

    <div class="flex justify-end">
      <el-button type="primary" plain :disabled="getDisabledBtn" @click="send">Send information</el-button>
    </div>
  </div>
  <SwdModalSucces
    text="Thank you for entering all the details. The advisor will receive the information and will contact you."
  />
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { CircleCheckFilled } from '@element-plus/icons-vue'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import { sendAllInformation } from '@/api/vueQuery/clients/fetch-send-all-information'
import { useMutation } from 'vue-query'
import SwdModalSucces from '@/components/Global/SwdModalSucces.vue'

export default {
  name: 'ClientInformation',
  components: {
    CircleCheckFilled,
    SwdModalSucces,
  },
  setup() {
    const store = useStore()

    const {
      isLoading: isLoadingInfo,
      fetching: fetchingInfo,
      isError: isErrorInfo,
      data: clientsInfo,
    } = useFetchClietsInfo()

    const { mutateAsync: sendInformation } = useMutation(sendAllInformation)

    const getDisabledBtn = computed(() => {
      const values = Object.values(clientsInfo.value.steps).find((item) => item === false)
      if (values === undefined) return false
      return true
    })

    const send = async () => {
      const res = sendInformation()
      if (!('error' in res)) {
        store.commit('globalComponents/setShowModal', {
          destination: 'modalSucces',
          value: true,
        })
      }
    }

    return {
      isLoadingInfo,
      fetchingInfo,
      isErrorInfo,
      clientsInfo,

      getDisabledBtn,
      send,
    }
  },
}
</script>
