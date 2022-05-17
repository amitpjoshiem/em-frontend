<template>
  <div class="p-5">
    <SwdSubHeader title="List of Advisors" />
    <ListAdvisorsContent :visible-tab="['all']" />
  </div>
</template>

<script>
import ListAdvisorsContent from '@/components/SuperAdmin/ListOfAdvisors/ListAdvisorsContent.vue'
export default {
  name: 'ListOfAdvisors',
  components: {
    ListAdvisorsContent,
  },
}
</script>
