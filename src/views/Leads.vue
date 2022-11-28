<template>
  <SwdWrapper>
    <SwdSubHeader title="Client Welcome Checklists" />
    <ListContent :visible-tab="['all-leads', 'active-leads', 'deactivated-leads']" destination="leads" />
  </SwdWrapper>
</template>

<script>
import ListContent from '@/components/ListOfHouseholds/ListContent.vue'
export default {
  name: 'ListLeads',
  components: {
    ListContent,
  },
}
</script>
