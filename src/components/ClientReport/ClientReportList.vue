<template>
  <SwdWrapper>
    <ClientReportListHeader />
    <el-skeleton v-if="isLoading" :rows="10" animated class="p-5" />
    <template v-else>
      <div class="flex w-full flex-wrap justify-between" data-pdf-region="client-report">
        <AddNewContract />
        <template v-if="clientReport">
          <ContractListItem v-for="item in clientReport" :key="item.id" :contract="item" />
        </template>
      </div>
      <ClientReportTotal />
    </template>
  </SwdWrapper>
</template>
<script>
import { useRoute } from 'vue-router'
import { useClientReportsAll } from '@/api/use-fetch-client-reports-all'
import IconEmptyUsers from '@/assets/svg/icon-empty-users.svg'
import ContractListItem from '@/components/ClientReport/ContractListItem.vue'
import ClientReportTotal from '@/components/ClientReport/ClientReportTotal.vue'
import AddNewContract from '@/components/ClientReport/AddNewContract.vue'
import ClientReportListHeader from '@/components/ClientReport/ClientReportListHeader.vue'

export default {
  name: 'ClientReportList',
  components: {
    ContractListItem,
    ClientReportTotal,
    AddNewContract,
    ClientReportListHeader,
  },
  setup() {
    const route = useRoute()

    const { isLoading, isError, data: clientReport } = useClientReportsAll(route.params.id)

    return {
      isLoading,
      isError,
      clientReport,
      IconEmptyUsers,
    }
  },
}
</script>
