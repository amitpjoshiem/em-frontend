<template>
  <div class="p-5">
    <SwdSubHeader title="List of Advisors" />
    <ListContent :visible-tab="['all']" />
  </div>
</template>

<script>
import ListContent from '@/components/SuperAdmin/ListOfAdvisors/ListContent.vue'
export default {
  name: 'ListOfAdvisors',
  components: {
    ListContent,
  },
}
</script>
