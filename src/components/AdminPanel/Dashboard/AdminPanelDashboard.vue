<template>
  <div class="p-5">
    <SwdSubHeader title="Dashboard" :with-back-btn="false" />
    <div class="p-5 border rounded mb-4">
      <div class="pb-2 text-main font-semibold">Company employees:</div>
      <StatsAdvisors />
    </div>
    <div class="p-5 border rounded">
      <div class="pb-2 text-main font-semibold">Company clients:</div>
      <StatsMembers />
    </div>
  </div>
</template>

<script>
import StatsAdvisors from './StatsAdvisors.vue'
import StatsMembers from './StatsMembers.vue'
export default {
  name: 'AdminPanelDashboard',
  components: {
    StatsAdvisors,
    StatsMembers,
  },
  setup() {},
}
</script>
