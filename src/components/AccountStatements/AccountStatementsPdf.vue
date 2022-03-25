<template>
  <div v-if="!isFetching">
    <SwdUpload
      :upload-data="{ collection: 'assets_consolidation_docs' }"
      :file-list="assetsConsolidationDocs.data"
      :show-file-list="true"
      :auto-upload="true"
      :show-file-block="true"
      @upload-success="handleSuccess"
      @upload-mounted="bindRef"
      @open-prewiev="openPrewiev"
      @remove-media="removeMedia"
    >
      <template #main>
        <div class="flex my-5">
          <el-button size="small" type="primary" class="mr-5">Click to upload</el-button>
          <div class="el-upload__tip">PDF files only</div>
        </div>
        <div v-if="!assetsConsolidationDocs.data.length" class="text-gray03 pb-5">No documents uploaded</div>
      </template>
    </SwdUpload>
  </div>
  <el-skeleton v-else :rows="5" animated class="p-5" />
  <PrewiewPdfModal v-if="state.dialogVisible" :pdf-url="state.previewUrl" />
</template>

<script>
import IconDownRisk from '@/assets/svg/icon-down-risk.svg'
import IconUpRisk from '@/assets/svg/icon-up-risk.svg'
import SwdUpload from '@/components/Global/SwdUpload.vue'
import { reactive, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { createAssetsConsolidationDocs } from '@/api/vueQuery/create-assets-consolidation-docs'
import { useFetchAssetsConsolidationDocs } from '@/api/use-fetch-assets-consolidation-docs'
import { useMutation, useQueryClient } from 'vue-query'
import { deleteMedia } from '@/api/vueQuery/delete-media'
import PrewiewPdfModal from '@/components/NewProspect/StressTestResult/PrewievPdfModal.vue'

export default {
  name: 'AccountStatementsPdf',
  components: {
    SwdUpload,
    PrewiewPdfModal,
  },

  setup() {
    const store = useStore()
    const route = useRoute()
    const upload = ref(null)
    const queryClient = useQueryClient()
    const id = route.params.id

    const { isLoading, isFetching, isError, data: assetsConsolidationDocs } = useFetchAssetsConsolidationDocs(id)
    const { mutateAsync: createDoc, error } = useMutation(createAssetsConsolidationDocs)
    const { mutateAsync: deletePdf } = useMutation(deleteMedia)

    const state = reactive({
      file: '',
      uploadRef: null,
      dialogVisible: false,
      previewUrl: '',
    })

    const handleSuccess = async (res) => {
      const data = { uuids: [res.data.uuid] }
      const response = await createDoc({ id, data })
      if (!('error' in response)) {
        queryClient.invalidateQueries(['assetsConsolidationDocs', id])
      }
    }

    const bindRef = (ref) => {
      upload.value = ref.value
    }

    const openPrewiev = (pdfUrl) => {
      state.dialogVisible = true
      state.previewUrl = pdfUrl
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: true,
      })
    }

    watchEffect(() => {
      state.dialogVisible = store.state.globalComponents.dialog.showDialog.prewievPdf
    })

    const removeMedia = async (media) => {
      const res = await deletePdf(media)
      if (!('error' in res)) {
        queryClient.invalidateQueries(['assetsConsolidationDocs', id])
      }
    }

    return {
      IconDownRisk,
      IconUpRisk,
      state,
      handleSuccess,
      bindRef,
      createDoc,
      error,
      isLoading,
      isFetching,
      isError,
      assetsConsolidationDocs,
      openPrewiev,
      removeMedia,
    }
  },
}
</script>
