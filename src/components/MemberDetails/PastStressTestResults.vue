<template>
  <div class="p-5">
    <SwdSubHeader title="Past Stress Test Results" />
    <div class="p-5 border border-color-grey roundedlg">
      <NewProspectPdf :show-nav-btn="false" />
    </div>
  </div>
</template>
<script>
import NewProspectPdf from '@/components/NewProspect/StressTestResult/NewProspectPdf.vue'
export default {
  namer: 'PastStressTestResults',
  components: {
    NewProspectPdf,
  },
}
</script>
