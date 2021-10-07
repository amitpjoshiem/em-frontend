<template>
  <div class="px-5">
    <HeaderDashboard />
    <div class="flex">
      <div class="flex flex-col w-2/3">
        <OpportunitiesBlock />
        <TopMembers />
      </div>
      <div class="w-1/3 flex flex-col justify-between">
        <PipeLine />
        <LastActivity />
      </div>
    </div>
    <ListOfHouseholds />
  </div>
</template>

<script>
import PipeLine from '@/components/Dashboard/PipeLine.vue'
import HeaderDashboard from '@/components/Dashboard/HeaderDashboard.vue'
import LastActivity from '@/components/Dashboard/LastActivity/LastActivity.vue'
import OpportunitiesBlock from '@/components/Dashboard/OpportunitiesBlock/OpportunitiesBlock.vue'
import TopMembers from '@/components/Dashboard/TopMembers/TopMembers.vue'
import ListOfHouseholds from '@/components/Dashboard/ListOfHouseholds.vue'

export default {
  name: 'Dashboard',
  components: {
    PipeLine,
    LastActivity,
    OpportunitiesBlock,
    TopMembers,
    HeaderDashboard,
    ListOfHouseholds,
  },
}
</script>
