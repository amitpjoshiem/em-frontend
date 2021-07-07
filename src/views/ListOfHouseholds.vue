<template>
  <div class="p-5">
    <ListHeader />
    <ListContent />
  </div>
</template>

<script>
import ListHeader from '@/components/ListOfHouseholds/ListHeader.vue'
import ListContent from '@/components/ListOfHouseholds/ListContent.vue'
export default {
  name: 'ListOfHouseholds',
  components: {
    ListHeader,
    ListContent,
  },
}
</script>
