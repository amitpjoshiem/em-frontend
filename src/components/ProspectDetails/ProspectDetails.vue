<template>
  <div class="p-5">
    <SubHeader
      title="Prospect details"
      back-page="dashboard"
      back-page-title="Dashboard"
    />
    <div class="flex my-8">
      <WidgetProspectDetails
        v-if="!isLoadingWidgetProspectDetails"
        :user="data"
      />
      <el-skeleton v-else :rows="6" animated class="w-8/24 pr-5 h-[264px]" />
      <div class="w-8/12">Asset Allocation</div>
    </div>
    <OpportunityTable class="mb-10" />
    <!-- <TableAssetsConsolidations class="mb-10" /> -->
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import OpportunityTable from '@/components/ProspectDetails/OpportunityTable.vue'
// import TableAssetsConsolidations from '@/components/Table/TableAssetsConsolidations.vue'
import WidgetProspectDetails from '@/components/ProspectDetails/WidgetProspectDetails.vue'
import { useProspectDetails } from '@/api/use-prospect-details.js'

export default {
  name: 'ProspectDetails',
  components: {
    OpportunityTable,
    // TableAssetsConsolidations,
    WidgetProspectDetails,
  },
  setup() {
    const route = useRoute()
    const id = route.params.id

    const {
      isLoading: isLoadingWidgetProspectDetails,
      isError,
      data,
    } = useProspectDetails(id)

    return {
      isLoadingWidgetProspectDetails,
      isError,
      data,
    }
  },
}
</script>
