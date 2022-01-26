<template>
  <div class="p-5 mb-5 flex">
    <div class="w-3/12">
      <BackButton text="Back" @click="$router.go(-1)" />
    </div>
    <div class="w-6/12 text-center">
      <span class="text-title text-main font-semibold">Contract info</span>
    </div>
    <div class="flex justify-end w-3/12">
      <ShareBtn pdf-region="client-report" />
    </div>
  </div>
  <div v-if="!isLoading">
    <div class="p-5">
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
  <el-skeleton v-else :rows="5" animated class="p-5" />
</template>

<script>
import { useClientReport } from '@/api/use-fetch-client-report.js'
import { useRoute } from 'vue-router'

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

    const {
      isLoading,
      isError,
      data: clientReport,
      clientReportYear,
      clientReportSince,
    } = useClientReport(route.params.id)

    return {
      isLoading,
      isError,
      clientReport,
      clientReportYear,
      clientReportSince,
    }
  },
}
</script>
