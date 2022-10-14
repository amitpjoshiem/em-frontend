<template>
  <div>
    <HeaderDashboardLead />
    <LeadInformation />
  </div>
</template>

<script>
import HeaderDashboardLead from '@/components/Lead/HeaderDashboardLead.vue'
import LeadInformation from '@/components/Lead/LeadInformation.vue'

export default {
  name: 'LeadDashboard',
  components: {
    HeaderDashboardLead,
    LeadInformation,
  },
}
</script>
