<template>
  <SwdWrapper>
    <div v-if="!isLoading">
      <div class="flex py-5">
        <div class="w-3/12">
          <BackButton text="Back" @click="$router.go(-1)" />
        </div>
        <div class="w-6/12 text-center">
          <span class="text-title text-main font-semibold">{{ getTitle }}</span>
        </div>
        <div class="w-3/12 flex justify-end">
          <ShareBtn pdf-region="client-report" :client-id="clientReport.member_id" :contracts="contractId" />
        </div>
      </div>
      <div>
        <div class="border rounded-md border-input-border p-5 mb-10">
          <ContractInfoYear :client-report="clientReport" :client-report-year="clientReportYear.value" />
          <ContractInfoSince :client-report="clientReport" :client-report-since="clientReportSince.value" />
        </div>
      </div>
      <div class="pr-5 w-96 total-info ml-auto mr-0 mb-5">
        <div class="bg-widget-bg rounded-md py-2 flex justify-between">
          <span class="pl-3 w-7/12">TDA Total Value</span>
          <span class="w-5/12 text-center">---</span>
        </div>
        <div class="bg-widget-bg rounded-md py-2 flex justify-between mt-3">
          <span class="pl-3 w-7/12">Total Current Value</span>
          <span class="w-5/12 text-center">---</span>
        </div>
      </div>
    </div>
    <el-skeleton v-else :rows="5" animated />
  </SwdWrapper>
</template>

<script>
import { useClientReport } from '@/api/use-fetch-client-report.js'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import ContractInfoYear from './ContractInfoYear.vue'
import ContractInfoSince from './ContractInfoSince.vue'
export default {
  name: 'ContractInfo',
  components: {
    ContractInfoYear,
    ContractInfoSince,
  },
  setup() {
    const route = useRoute()

    const contractId = route.params.id

    const { isLoading, isError, data: clientReport, clientReportYear, clientReportSince } = useClientReport(contractId)

    const getTitle = computed(() => {
      return 'Contract ' + clientReport.value.contractNumber
    })

    return {
      isLoading,
      isError,
      clientReport,
      clientReportYear,
      clientReportSince,
      getTitle,
      contractId,
    }
  },
}
</script>
