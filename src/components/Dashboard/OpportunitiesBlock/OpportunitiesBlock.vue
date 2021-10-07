<template>
  <div class="border border-color-grey rounded-t-xl mr-5 opportuniti-block">
    <OpportunitiesBlockHeader class="pt-5 pr-5 pl-5" />
    <div v-if="!isLoading">
      <div class="p-5">
        <OpportunitiesBlockChart />
        <OpportunitiesBlockTotal
          :percent="opportunity.data.percent"
          :total="opportunity.data.total"
          :up="opportunity.data.up"
        />
      </div>
    </div>
    <el-skeleton v-else :rows="5" animated class="p-5" />
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
    const { isLoading, isError, data: opportunity, refetch } = useDashboardOpportunities()

    return {
      isLoading,
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
  width: 600px;
}
</style>
