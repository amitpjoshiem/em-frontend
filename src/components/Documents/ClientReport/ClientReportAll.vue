<template>
  <div v-if="!isFetching" class="p-5">
    <template v-if="documents.length">
      <el-collapse>
        <el-collapse-item v-for="(item, index) in documents" :key="index" :name="index">
          <template #title>
            <ItemHeader :file-name="item.filename" :created-at="item.created_at" :type="item.type" />
          </template>
          <ItemDocuments :contracts="item.contracts" :status="item.status" :link="item.link" />
        </el-collapse-item>
      </el-collapse>
    </template>
  </div>
  <el-skeleton v-else :rows="5" animated class="p-5" />
</template>

<script>
import { useFetchExportDocumentsClient } from '@/api/use-fetch-export-documents-client.js'
import { useRoute } from 'vue-router'
import ItemHeader from '@/components/Documents/ClientReport/ItemHeader.vue'
import ItemDocuments from '@/components/Documents/ClientReport/ItemDocuments.vue'

export default {
  name: 'ClientReportAll',
  components: {
    ItemHeader,
    ItemDocuments,
  },
  setup() {
    const route = useRoute()

    const {
      isLoading,
      isError,
      isFetching,
      data: documents,
      refetch,
    } = useFetchExportDocumentsClient({ id: route.params.id, type: 'all' })

    return {
      isLoading,
      isError,
      isFetching,
      documents,
      refetch,
    }
  },
}
</script>
