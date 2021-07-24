<template>
  <div class="p-5">
    <SubHeader
      title="Prospect details"
      back-page="dashboard"
      back-page-title="Dashboard"
    />
    <OpportunityTable />
  </div>
</template>
<script>
import OpportunityTable from '@/components/ProspectDetails/OpportunityTable.vue'
export default {
  name: 'ProspectDetails',
  components: {
    OpportunityTable,
  },
}
</script>
