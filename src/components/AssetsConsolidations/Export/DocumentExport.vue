<template>
  <div class="p-5">
    <SwdSubHeader title="Document import" />
    <div v-if="!isLoading">
      <template v-if="document.data.length">
        <DocumentExportItem v-for="(elem, index) in document.data" :key="index" :item="elem" />
      </template>
      <div v-else class="text-gray03 flex items-center flex-col mt-5">
        <div class="bg-widget-bg rounded-full w-16 h-16 flex flex-col items-center justify-center mb-3">
          <InlineSvg :src="IconEmptyUsers" />
        </div>
        <p>No recently added documents</p>
      </div>
    </div>
    <el-skeleton v-else :rows="10" animated />
  </div>
</template>
<script>
import { useFetchExcelDocuments } from '@/api/use-fetch-excel-documents.js'
import DocumentExportItem from '@/components/AssetsConsolidations/Export/DocumentExportItem.vue'
import { useRoute } from 'vue-router'
import IconEmptyUsers from '@/assets/svg/icon-empty-users.svg'
import { watchEffect } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'DocumentExport',
  components: {
    DocumentExportItem,
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const { isLoading, isError, isFetching, data: document, refetch } = useFetchExcelDocuments(route.params.id)

    watchEffect(() => {
      if (store.state.globalComponents.needUpdateContent?.value === 'assets_consolidation_excel_export') {
        refetch.value()
      }
    })

    return {
      isLoading,
      isError,
      document,
      isFetching,
      IconEmptyUsers,
      refetch,
    }
  },
}
</script>
