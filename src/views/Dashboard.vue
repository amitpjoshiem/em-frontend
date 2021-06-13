<template>
  <div class="container px-5">
    <HeaderDashboard />
    <div class="grid grid-cols-3 grid-flow-col gap-4">
      <Assets />
      <PipeLine />
      <LastActivity />
    </div>
    <ListOfHouseholds />
  </div>
</template>

<script>
import PipeLine from '@/components/Dashboard/PipeLine.vue'
import HeaderDashboard from '@/components/Dashboard/HeaderDashboard.vue'
import LastActivity from '@/components/Dashboard/LastActivity.vue'
import Assets from '@/components/Dashboard/Assets.vue'
import ListOfHouseholds from '@/components/Dashboard/ListOfHouseholds.vue'

export default {
  name: 'Dashboard',
  components: {
    PipeLine,
    LastActivity,
    Assets,
    HeaderDashboard,
    ListOfHouseholds,
  },
}
</script>
