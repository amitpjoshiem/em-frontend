<template>
  <div class="p-5">
    <SubHeader
      title="Prospect details"
      back-page="dashboard"
      back-page-title="Dashboard"
    />
    <div class="flex my-8">
      <WidgetProspectDetails />
      <div class="w-8/12">Asset Allocation</div>
    </div>
    <OpportunityTable class="mb-10" />
    <TableAssetsConsolidations />
  </div>
</template>
<script>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

import OpportunityTable from '@/components/ProspectDetails/OpportunityTable.vue'
import TableAssetsConsolidations from '@/components/Table/TableAssetsConsolidations.vue'
import WidgetProspectDetails from '@/components/ProspectDetails/WidgetProspectDetails.vue'

export default {
  name: 'ProspectDetails',
  components: {
    OpportunityTable,
    TableAssetsConsolidations,
    WidgetProspectDetails,
  },
  setup() {
    const route = useRoute()

    const data = reactive({
      id: '',
    })

    onMounted(() => {
      data.id = route.params.id
    })
  },
}
</script>
