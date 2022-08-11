<template>
  <SwdWrapper>
    <SwdSubHeader title="Activity" />
    <ActivityContent />
  </SwdWrapper>
</template>
<script>
import ActivityContent from '@/components/Activity/ActivityContent.vue'

export default {
  name: 'Activity',
  components: {
    ActivityContent,
  },
}
</script>
