<template>
  <SwdWrapper>
    <SwdSubHeader title="List of Pre-Leads" />
    <ListContent :visible-tab="['all-pre-leads']" destination="pre_lead" />
  </SwdWrapper>
</template>

<script>
import ListContent from '@/components/ListOfHouseholds/ListContent.vue'
export default {
  name: 'ListPreLeads',
  components: {
    ListContent,
  },
}
</script>
