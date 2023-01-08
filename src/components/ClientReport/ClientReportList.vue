<template>
  <SwdWrapper>
    <ClientReportListHeader />
    <ClientReportListContent />
  </SwdWrapper>
</template>
<script>
import ClientReportListHeader from '@/components/ClientReport/ClientReportListHeader.vue'
import ClientReportListContent from '@/components/ClientReport/ClientReportListContent.vue'

export default {
  name: 'ClientReportList',
  components: {
    ClientReportListHeader,
    ClientReportListContent,
  },
}
</script>
