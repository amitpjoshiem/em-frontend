<template>
  <div class="p-5">
    <SwdSubHeader title="List of Households" />
    <ListContent :visible-tab="['all', 'opportunities', 'clients']" />
  </div>
</template>

<script>
import ListContent from '@/components/ListOfHouseholds/ListContent.vue'
export default {
  name: 'ListOfHouseholds',
  components: {
    ListContent,
  },
}
</script>
