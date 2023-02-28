<template>
  <el-skeleton v-if="isLoading" :rows="10" animated class="p-5" />
  <div v-else>
    <div class="flex w-full flex-wrap justify-between" data-pdf-region="client-report">
      <AddNewContract v-if="!$can('client', 'all')" />
      <template v-if="clientReport.length">
        <ContractListItem v-for="item in clientReport" :key="item.id" :contract="item" @refetch-list="refetchAllList" />
      </template>
    </div>
    <ClientReportTotal v-if="clientReport.length" />
    <div v-if="!isLoading && !clientReport.length" class="text-center">
      <p class="text-main text-xss py-5">No recently added documents</p>
    </div>
  </div>
</template>

<script>
import ContractListItem from '@/components/ClientReport/ContractListItem.vue'
import ClientReportTotal from '@/components/ClientReport/ClientReportTotal.vue'
import AddNewContract from '@/components/ClientReport/AddNewContract.vue'
import { useRoute } from 'vue-router'
import { useClientReportsAll } from '@/api/use-fetch-client-reports-all'

export default {
  name: 'ClientReportListContent',
  components: {
    ContractListItem,
    ClientReportTotal,
    AddNewContract,
  },
  setup() {
    const route = useRoute()

    const { isLoading, isError, data: clientReport, refetch } = useClientReportsAll(route.params.id)

    const refetchAllList = () => {
      refetch.value()
    }

    return {
      isLoading,
      isError,
      clientReport,
      refetchAllList,
    }
  },
}
</script>
