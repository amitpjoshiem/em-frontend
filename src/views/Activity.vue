<template>
  <div class="p-5">
    <SwdSubHeader title="Activity" />
    <ActivityContent />
  </div>
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
