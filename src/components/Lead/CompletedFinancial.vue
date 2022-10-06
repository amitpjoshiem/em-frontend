<template>
  <SwdWrapper>
    <NewLeadHeader />
    <StepsLead />
    <router-view />
  </SwdWrapper>
</template>

<script>
import StepsLead from '@/components/Lead/StepsLead.vue'
import NewLeadHeader from '@/components/Lead/AddLeadInformation/NewLeadHeader.vue'
export default {
  name: 'CompletedFinancial',
  components: {
    StepsLead,
    NewLeadHeader,
  },
  setup() {
    return {}
  },
}
</script>
