<template>
  <div class="container px-5">
    <HeaderDashboard />
    <div class="flex">
      <Assets class="w-2/3" />
      <div class="w-1/3 flex flex-col justify-between">
        <PipeLine />
        <LastActivity />
      </div>
    </div>
  </div>
</template>

<script>
import PipeLine from '@/components/Dashboard/PipeLine.vue'
import HeaderDashboard from '@/components/Dashboard/HeaderDashboard.vue'
import LastActivity from '@/components/Dashboard/LastActivity.vue'
import Assets from '@/components/Dashboard/Assets.vue'

export default {
  name: 'Dashboard',
  components: {
    PipeLine,
    LastActivity,
    Assets,
    HeaderDashboard,
  },
}
</script>
