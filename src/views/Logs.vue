<template>
  <div class="p-5">
    <SwdSubHeader title="Logs" />
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
