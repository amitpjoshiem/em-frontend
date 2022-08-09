<template>
  <SwdWrapper>
    <SwdSubHeader title="List of Advisors" />
    <ListAdvisorsContent :visible-tab="['all']" />
  </SwdWrapper>
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
