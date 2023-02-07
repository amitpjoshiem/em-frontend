<template>
  <div v-if="!isLoading && !isFetching" class="pt-4">
    <SwdUpload
      :upload-data="{ collection: 'assets_consolidation_docs' }"
      :doc-list="assetsConsolidationDocs.data"
      :show-file-list="true"
      :auto-upload="true"
      :show-file-block="true"
      :disabled="disabledUpload"
      @upload-success="handleSuccess"
      @upload-change="handleChange"
      @upload-mounted="bindRef"
      @open-prewiev="openPrewiev"
      @remove-media="removeMedia"
    >
      <template #noDocuments>
        <div v-if="isShowNoDocuments" class="text-main text-center pt-5 pb-10">No documents uploaded</div>
      </template>
    </SwdUpload>
  </div>
  <el-skeleton v-else :rows="5" animated class="p-5" />
</template>

<script>
import IconDownRisk from '@/assets/svg/icon-down-risk.svg'
import IconUpRisk from '@/assets/svg/icon-up-risk.svg'
import SwdUpload from '@/components/Global/SwdUpload.vue'
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { createAssetsConsolidationDocs } from '@/api/vueQuery/create-assets-consolidation-docs'
import { useFetchAssetsConsolidationDocs } from '@/api/use-fetch-assets-consolidation-docs'
import { useMutation, useQueryClient } from 'vue-query'
import { deleteMedia } from '@/api/vueQuery/delete-media'

export default {
  name: 'AccountStatementsPdf',
  components: {
    SwdUpload,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const upload = ref(null)
    const queryClient = useQueryClient()
    const inChangeFile = ref(false)
    const id = route.params.id

    const { isLoading, isFetching, isError, data: assetsConsolidationDocs } = useFetchAssetsConsolidationDocs(id)
    const { mutateAsync: createDoc, error } = useMutation(createAssetsConsolidationDocs)
    const { mutateAsync: deletePdf } = useMutation(deleteMedia)

    const state = reactive({
      file: '',
      uploadRef: null,
    })

    const handleSuccess = async (res) => {
      const data = { uuids: [res.data.uuid] }
      const response = await createDoc({ id, data })
      if (!('error' in response)) {
        inChangeFile.value = false
        queryClient.invalidateQueries(['assetsConsolidationDocs', id])
      }
    }

    const handleChange = () => {
      inChangeFile.value = true
    }

    const bindRef = (ref) => {
      upload.value = ref.value
    }

    const openPrewiev = (file) => {
      store.commit('globalComponents/setShowModal', {
        destination: 'previewModal',
        value: true,
      })
      store.commit('globalComponents/setPreviewFile', file)
    }

    const removeMedia = async (media) => {
      const res = await deletePdf(media)
      if (!('error' in res)) {
        queryClient.invalidateQueries(['assetsConsolidationDocs', id])
      }
    }

    const isShowNoDocuments = computed(() => {
      return !assetsConsolidationDocs.value.data?.length && !inChangeFile.value && !isFetching.value
    })

    const disabledUpload = computed(() => {
      if (route.meta.type !== 'support' && route.meta.type !== 'client') return false
      return true
    })

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
      handleChange,
      isShowNoDocuments,
      inChangeFile,
      disabledUpload,
    }
  },
}
</script>
