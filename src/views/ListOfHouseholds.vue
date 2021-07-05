<template>
  <div>
    <ListHeader />
    <router-view />
  </div>
</template>

<script>
import ListHeader from '@/components/ListOfHouseholds/ListHeader.vue'
export default {
  name: 'ListOfHouseholds',
  components: {
    ListHeader,
  },
}
</script>
