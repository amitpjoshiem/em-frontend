<template>
  <SwdWrapper>
    <SwdSubHeader title="Revenue Dashboard" />
    <PipeLineContent />
  </SwdWrapper>
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
