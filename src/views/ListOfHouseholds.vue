<template>
  <div class="p-5">
    <SwdSubHeader title="List of Households" />
    <ListContent :visible-tab="['all', 'opportunities', 'clients']" :context="context" />
  </div>
</template>

<script>
import ListContent from '@/components/ListOfHouseholds/ListContent.vue'
export default {
  name: 'ListOfHouseholds',
  components: {
    ListContent,
  },
  setup(_, { attrs }) {
    const context = attrs.context

    return {
      context,
    }
  },
}
</script>
