<template>
  <div class="p-5">
    <SubHeader
      title="Prospect details"
      back-page="dashboard"
      back-page-title="Dashboard"
    />
    <div class="flex my-8">
      <WidgetProspectDetails
        v-if="!isLaodingWidgetProspectDetails"
        :user="data"
      />
      <el-skeleton v-else :rows="6" animated class="w-8/24 pr-5 h-[264px]" />
      <div class="w-8/12">Asset Allocation</div>
    </div>
    <OpportunityTable class="mb-10" />
    <div>
      {{ data }}
    </div>
    <TableAssetsConsolidations />
  </div>
</template>
<script>
import { useRoute } from 'vue-router'

import OpportunityTable from '@/components/ProspectDetails/OpportunityTable.vue'
import WidgetProspectDetails from '@/components/ProspectDetails/WidgetProspectDetails.vue'

import { useProspectDetails } from '@/api/use-prospect-details.js'

export default {
  name: 'ProspectDetails',
  components: {
    OpportunityTable,
    WidgetProspectDetails,
  },
  setup() {
    const route = useRoute()
    const id = route.params.id

    const {
      isLoading: isLaodingWidgetProspectDetails,
      isError,
      data,
    } = useProspectDetails(id)

    return {
      isLaodingWidgetProspectDetails,
      isError,
      data,
    }
  },
}
</script>
