<template>
  <div class="p-5">
    <SwdSubHeader title="Revenue Dashboard" />
    <PipeLineContent />
  </div>
</template>
<script>
import PipeLineContent from '@/components/PipeLine/PipeLineContent.vue'

export default {
  name: 'PipeLine',
  components: {
    PipeLineContent,
  },
}
</script>
