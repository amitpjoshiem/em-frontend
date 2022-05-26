<template>
  <div class="p-5">
    <SwdSubHeader title="Assistant Activity Log" />
    <LogsContent />
  </div>
</template>
<script>
import LogsContent from '@/components/Logs/LogsContent.vue'

export default {
  name: 'Logs',
  components: {
    LogsContent,
  },
}
</script>
