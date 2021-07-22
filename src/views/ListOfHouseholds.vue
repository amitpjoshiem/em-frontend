<template>
  <div class="p-5">
    <SubHeader title="List of Households" back-page="dashboard" />
    <ListContent />
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
