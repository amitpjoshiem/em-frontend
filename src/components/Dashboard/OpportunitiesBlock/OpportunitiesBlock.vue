<template>
  <div class="border border-color-grey rounded-t-xl mr-5 opportuniti-block">
    <OpportunitiesBlockHeader class="pt-5 pr-5 pl-5" />
    <el-skeleton v-if="isLoading" :rows="5" animated class="p-5" />
    <SwdErrorBlock v-else-if="isError" />
    <div v-else-if="opportunity" class="p-5">
      <OpportunitiesBlockChart :values="opportunity.data.values" />
      <OpportunitiesBlockTotal
        :percent="opportunity.data.percent"
        :total="opportunity.data.total"
        :up="opportunity.data.up"
      />
    </div>
  </div>
</template>

<script>
import OpportunitiesBlockHeader from '@/components/Dashboard/OpportunitiesBlock/OpportunitiesBlockHeader.vue'
import OpportunitiesBlockChart from '@/components/Dashboard/OpportunitiesBlock/OpportunitiesBlockChart.vue'
import OpportunitiesBlockTotal from '@/components/Dashboard/OpportunitiesBlock/OpportunitiesBlockTotal.vue'
import { useDashboardOpportunities } from '@/api/use-dashboard-opportunities.js'

export default {
  name: 'OpportunitiesBlock',
  components: {
    OpportunitiesBlockChart,
    OpportunitiesBlockHeader,
    OpportunitiesBlockTotal,
  },
  setup() {
    const { isLoading, isFetching, isError, data: opportunity, refetch } = useDashboardOpportunities()

    return {
      isLoading,
      isFetching,
      isError,
      opportunity,
      refetch,
    }
  },
}
</script>
<style>
.opportuniti-block {
  height: 300px;
}
</style>
