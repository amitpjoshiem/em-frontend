<template>
  <SwdWrapper>
    <SwdSubHeader title="List of Prospects" />
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
