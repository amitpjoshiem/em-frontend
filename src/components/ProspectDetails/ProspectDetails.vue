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
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

import OpportunityTable from '@/components/ProspectDetails/OpportunityTable.vue'
export default {
  name: 'ProspectDetails',
  components: {
    OpportunityTable,
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
