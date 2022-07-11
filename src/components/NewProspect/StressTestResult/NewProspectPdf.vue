<template>
  <div v-if="!isFetching">
    <SwdUpload
      :upload-data="{ collection: 'stress_test' }"
      :doc-list="stressTestDocument.data"
      :show-file-list="true"
      :auto-upload="true"
      :show-file-block="true"
      @upload-change="handleChange"
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
        <div v-if="isShowNoDocuments" class="text-gray03 text-center pb-5">No documents uploaded</div>
      </template>
    </SwdUpload>
    <div v-if="showNavBtn" class="flex justify-end my-6">
      <Button default-gray-btn text-btn="Back" class="mr-5" @click="backStep" />
      <Button default-blue-btn text-btn="Show Report" @click="saveStep" />
    </div>
  </div>
  <el-skeleton v-else :rows="10" animated class="p-5" />
  <PrewiewPdfModal v-if="state.dialogVisible" :pdf-url="state.previewUrl" />
</template>

<script>
import IconDownRisk from '@/assets/svg/icon-down-risk.svg'
import IconUpRisk from '@/assets/svg/icon-up-risk.svg'
import SwdUpload from '@/components/Global/SwdUpload.vue'
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { scrollTop } from '@/utils/scrollTop'
import { createStressTest } from '@/api/vueQuery/create-stress-test'
import { useMutation } from 'vue-query'
import { useFetchStressTest } from '@/api/use-fetch-stress-test.js'
import { deleteMedia } from '@/api/vueQuery/delete-media'
import { useQueryClient } from 'vue-query'
import PrewiewPdfModal from '@/components/NewProspect/StressTestResult/PrewievPdfModal.vue'
import { fetchStressTestConfirm } from '@/api/vueQuery/fetch-stress-test-confirm'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'NewProspectPdf',
  components: {
    SwdUpload,
    PrewiewPdfModal,
  },
  props: {
    showNavBtn: {
      type: Boolean,
      require: false,
      default: true,
    },
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const upload = ref(null)
    const inChangeFile = ref(false)
    const queryClient = useQueryClient()
    const id = route.params.id

    const { isLoading, isFetching, isError, data: stressTestDocument } = useFetchStressTest(id)
    const { mutateAsync: create, error } = useMutation(createStressTest)
    const { mutateAsync: deletePdf } = useMutation(deleteMedia)
    const { mutateAsync: stressTestConfirm } = useMutation(fetchStressTestConfirm)

    onMounted(() => {
      store.commit('newProspect/setStep', 6)
      scrollTop()
    })

    const state = reactive({
      file: '',
      uploadRef: null,
      dialogVisible: false,
      previewUrl: '',
    })

    const step = computed(() => store.state.newProspect.step)

    const saveStep = async () => {
      const res = await stressTestConfirm(route.params.id)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Opportunity update successfully',
        })
        router.push({ name: 'blueprint-report', params: { id: route.params.id } })
      }
    }

    const backStep = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({ name: 'add-assets-consolidations', params: { id: route.params.id } })
    }

    const handleSuccess = async (res) => {
      const data = { uuids: [res.data.uuid] }
      const response = await create({ id, data })
      if (!('error' in response)) {
        inChangeFile.value = false
        queryClient.invalidateQueries(['stressTest', id])
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
        queryClient.invalidateQueries(['stressTest', id])
      }
    }

    const handleChange = () => {
      inChangeFile.value = true
    }

    const isShowNoDocuments = computed(() => {
      return !stressTestDocument.value.data.length && !inChangeFile.value && !isFetching.value
    })

    return {
      IconDownRisk,
      IconUpRisk,
      saveStep,
      backStep,
      state,
      handleSuccess,
      bindRef,
      create,
      error,
      isLoading,
      isFetching,
      isError,
      stressTestDocument,
      openPrewiev,
      removeMedia,
      handleChange,
      isShowNoDocuments,
    }
  },
}
</script>
