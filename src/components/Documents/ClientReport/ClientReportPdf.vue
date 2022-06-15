<template>
  <el-skeleton v-if="isLoadingClient || isLoadingBlueprint" :rows="5" animated class="p-5" />
  <SwdErrorBlock v-else-if="isErrorClient || isErrorBlueprint" />
  <div v-else-if="getDocuments" class="p-5">
    <el-collapse v-if="getDocuments && getDocuments.length">
      <el-collapse-item v-for="(item, index) in getDocuments" :key="index" :name="index">
        <template #title>
          <ItemHeader :file-name="item.filename" :created-at="item.created_at" :type="item.type" />
        </template>
        <ItemDocuments :document="item" :contracts="item.contracts ? item.contracts : []" />
      </el-collapse-item>
    </el-collapse>
    <div v-else class="text-gray03 flex items-center flex-col mt-5">
      <div class="bg-widget-bg rounded-full w-16 h-16 flex flex-col items-center justify-center mb-3">
        <InlineSvg :src="IconEmptyUsers" />
      </div>
      <p>No recently added documents</p>
    </div>
  </div>
</template>

<script>
import { useFetchExportDocumentsClient } from '@/api/use-fetch-export-documents-client.js'
import { useFetchExportDocumentsBlueprint } from '@/api/use-fetch-export-documents-blueprint.js'
import { onMounted, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ItemHeader from '@/components/Documents/ClientReport/ItemHeader.vue'
import ItemDocuments from '@/components/Documents/ClientReport/ItemDocuments.vue'
import IconEmptyUsers from '@/assets/svg/icon-empty-users.svg'
import { useStore } from 'vuex'

export default {
  name: 'ClientReportPdf',
  components: {
    ItemHeader,
    ItemDocuments,
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const {
      isLoading: isLoadingClient,
      isError: isErrorClient,
      isFetching: isFetchingClient,
      data: documentsClient,
      refetch: refetchClientReports,
    } = useFetchExportDocumentsClient({ id: route.params.id, type: 'pdf' }, { enabled: false })

    const {
      isLoading: isLoadingBlueprint,
      isError: isErrorBlueprint,
      isFetching: isFetchingBlueprint,
      data: documentsBlueprint,
      refetch: refetchClientBlueprint,
    } = useFetchExportDocumentsBlueprint({ id: route.params.id, type: 'pdf' }, { enabled: false })

    onMounted(() => {
      if (route.query.type === 'client') {
        refetchClientReports.value()
        return
      }
      if (route.query.type === 'blueprint') {
        refetchClientBlueprint.value()
        return
      }
    })

    const getDocuments = computed(() => {
      if (route.query.type === 'client') {
        return documentsClient.value
      }
      return documentsBlueprint.value
    })

    watchEffect(() => {
      if (store.state.globalComponents.needUpdateContent?.value === 'client_report_pdf_export') {
        refetchClientReports.value()
      }
      if (store.state.globalComponents.needUpdateContent?.value === 'blueprint_doc_export') {
        refetchClientBlueprint.value()
      }
    })

    return {
      isLoadingClient,
      isErrorClient,
      isFetchingClient,
      documentsClient,
      refetchClientReports,

      isLoadingBlueprint,
      isErrorBlueprint,
      isFetchingBlueprint,
      documentsBlueprint,
      refetchClientBlueprint,

      getDocuments,
      IconEmptyUsers,
    }
  },
}
</script>
