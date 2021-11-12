<template>
  <div class="p-5">
    <SwdSubHeader title="Document import" />
    <div v-if="!isLoading">
      <DocumentExportItem v-for="(elem, index) in document.data" :key="index" :item="elem" />
    </div>
    <el-skeleton v-else :rows="10" animated />
  </div>
</template>
<script>
import { useFetchExcelDocuments } from '@/api/use-fetch-excel-documents.js'
import DocumentExportItem from '@/components/NewProspect/AssetsConsolidations/DocumentExportItem.vue'
import { useRoute } from 'vue-router'

export default {
  name: 'DocumentExport',
  components: {
    DocumentExportItem,
  },
  setup() {
    const route = useRoute()

    const { isLoading, isError, isFetching, data: document } = useFetchExcelDocuments(route.params.id)

    return {
      isLoading,
      isError,
      document,
      isFetching,
    }
  },
}
</script>
