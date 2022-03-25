<template>
  <div class="p-5">
    <SwdSubHeader title="List of Leads" />
    <ListContent :visible-tab="['leads']" />
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
