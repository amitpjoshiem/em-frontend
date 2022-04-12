<template>
  <div class="p-5">
    <SwdSubHeader title="List of Leads" />
    <ListContent :visible-tab="['all-leads', 'active-leads', 'deactivated-leads']" />
  </div>
</template>

<script>
import ListContent from '@/components/ListOfHouseholds/ListContent.vue'
export default {
  name: 'ListOfLeads',
  components: {
    ListContent,
  },
}
</script>
