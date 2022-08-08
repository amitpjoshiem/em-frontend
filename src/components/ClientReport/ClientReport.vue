<template>
  <SwdWrapper>
    <div class="pb-5 flex">
      <div class="w-4/12">
        <BackButton text="Back" @click="$router.go(-1)" />
      </div>

      <div class="w-4/12 flex justify-center items-center">
        <SwdSpinner v-if="isLoadingProspectDetails" class="mr-2" />
        <span v-else class="text-title text-color-link font-semibold mr-2">{{ member.name }}</span>
        <span class="text-title text-main font-semibold">Client report</span>
      </div>

      <div class="flex items-center w-4/12 client-report-range">
        <el-date-picker
          v-model="dateRange"
          format="MM/DD/YYYY"
          value-format="YYYY-MM-DD"
          type="daterange"
          start-placeholder="Start date"
          end-placeholder="End date"
          size="small"
          @change="handleChange"
        />
        <ShareBtn pdf-region="client-report" />
      </div>
    </div>

    <el-skeleton v-if="isLoading" :rows="10" animated class="p-5" />
    <SwdErrorBlock v-else-if="isErrorProspectDetails" />

    <template v-else-if="clientReport">
      <div class="flex w-full flex-wrap justify-between" data-pdf-region="client-report">
        <ContractItem v-for="item in clientReport" :key="item.id" :contract="item" />
      </div>
      <TotalInfo />
    </template>

    <div v-else class="flex flex-col items-center justify-center mt-10">
      <div class="bg-widget-bg rounded-full w-16 h-16 flex flex-col items-center justify-center mb-3">
        <InlineSvg :src="IconEmptyUsers" />
      </div>
      <p class="text-gray03 font-semibold text-xss mt-3">No client reports available</p>
    </div>
  </SwdWrapper>
</template>
<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ContractItem from '@/components/ClientReport/ContractItem.vue'
import TotalInfo from '@/components/ClientReport/TotalInfo.vue'
import { useClientReportsAll } from '@/api/use-fetch-client-reports-all'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import IconEmptyUsers from '@/assets/svg/icon-empty-users.svg'

export default {
  name: 'ClientReport',
  components: {
    ContractItem,
    TotalInfo,
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const dateRange = ref('')

    const { isLoading, isError, data: clientReport } = useClientReportsAll(route.params.id)
    const { isLoading: isLoadingProspectDetails, isError: isErrorProspectDetails, data: member } = useProspectDetails()

    const handleChange = () => {
      store.commit('globalComponents/setDateRangeClientReport', dateRange.value)
    }

    return {
      isLoading,
      isError,
      clientReport,
      isLoadingProspectDetails,
      isErrorProspectDetails,
      member,
      IconEmptyUsers,
      dateRange,
      handleChange,
    }
  },
}
</script>

<style>
.client-report-range .el-range-editor--small.el-input__wrapper {
  height: 28px;
}
</style>
