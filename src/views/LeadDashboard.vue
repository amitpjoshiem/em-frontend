<template>
  <div>
    <HeaderDashboardLead />
    <LeadInformation />
  </div>
</template>

<script>
import HeaderDashboardLead from '@/components/Client/HeaderDashboardLead.vue'
import LeadInformation from '@/components/Client/LeadInformation.vue'

export default {
  name: 'LeadDashboard',
  components: {
    HeaderDashboardLead,
    LeadInformation,
  },
}
</script>
