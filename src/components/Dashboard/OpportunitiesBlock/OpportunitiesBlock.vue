<template>
  <div class="border border-color-grey rounded-xl mr-5 opportuniti-block">
    <OpportunitiesBlockHeader class="pt-5 pr-5 pl-5" />
    <div v-if="!isLoading">
      <div class="p-5">
        <OpportunitiesBlockChart />
        <OpportunitiesBlockTotal />
      </div>
      <OpportunitiesBlockUsers />
    </div>
    <el-skeleton v-else :rows="11" animated class="p-5" />
  </div>
</template>

<script>
import OpportunitiesBlockHeader from '@/components/Dashboard/OpportunitiesBlock/OpportunitiesBlockHeader.vue'
import OpportunitiesBlockChart from '@/components/Dashboard/OpportunitiesBlock/OpportunitiesBlockChart.vue'
import OpportunitiesBlockUsers from '@/components/Dashboard/OpportunitiesBlock/OpportunitiesBlockUsers.vue'
import OpportunitiesBlockTotal from '@/components/Dashboard/OpportunitiesBlock/OpportunitiesBlockTotal.vue'
import { useDashboardOpportunities } from '@/api/use-dashboard-opportunities.js'

export default {
  name: 'OpportunitiesBlock',
  components: {
    OpportunitiesBlockChart,
    OpportunitiesBlockUsers,
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
  height: 500px;
  width: 600px;
}
</style>
