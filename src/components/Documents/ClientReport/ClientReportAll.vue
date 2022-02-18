<template>
  <div v-if="!isFetchingClient && !isFetchingBlueprint" class="p-5">
    <template v-if="getDocuments && getDocuments.length">
      <el-collapse>
        <el-collapse-item v-for="(item, index) in getDocuments" :key="index" :name="index">
          <template #title>
            <ItemHeader :file-name="item.filename" :created-at="item.created_at" :type="item.type" />
          </template>
          <ItemDocuments
            :id="item.id"
            :contracts="item.contracts ? item.contracts : []"
            :status="item.status"
            :link="item.link"
            :file-name="item.filename"
          />
        </el-collapse-item>
      </el-collapse>
    </template>
    <div v-else class="text-gray03 flex items-center flex-col mt-5">
      <div class="bg-widget-bg rounded-full w-16 h-16 flex flex-col items-center justify-center mb-3">
        <InlineSvg :src="IconEmptyUsers" />
      </div>
      <p>No recently added documents</p>
    </div>
  </div>
  <el-skeleton v-else :rows="5" animated class="p-5" />
</template>

<script>
import { useFetchExportDocumentsClient } from '@/api/use-fetch-export-documents-client.js'
import { useFetchExportDocumentsBlueprint } from '@/api/use-fetch-export-documents-blueprint.js'
import { useRoute } from 'vue-router'
import ItemHeader from '@/components/Documents/ClientReport/ItemHeader.vue'
import ItemDocuments from '@/components/Documents/ClientReport/ItemDocuments.vue'
import { onMounted, computed } from 'vue'
import IconEmptyUsers from '@/assets/svg/icon-empty-users.svg'

export default {
  name: 'ClientReportAll',
  components: {
    ItemHeader,
    ItemDocuments,
  },
  setup() {
    const route = useRoute()

    const {
      isLoading: isLoadingClient,
      isError: isErrorClient,
      isFetching: isFetchingClient,
      data: documentsClient,
      refetch: refetchClientReports,
    } = useFetchExportDocumentsClient({ id: route.params.id, type: 'all' }, { enabled: false })

    const {
      isLoading: isLoadingBlueprint,
      isError: isErrorBlueprint,
      isFetching: isFetchingBlueprint,
      data: documentsBlueprint,
      refetch: refetchClientBlueprint,
    } = useFetchExportDocumentsBlueprint({ id: route.params.id, type: 'all' }, { enabled: false })

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
