<template>
  <div class="p-5">
    <SwdSubHeader title="Pipe Line" />
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
