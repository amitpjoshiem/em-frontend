<template>
  <div v-if="!isLoading">
    <SwdUpload
      :upload-data="{ collection: 'stress_test' }"
      :file-list="stressTestDocument.data"
      :show-file-list="true"
      :auto-upload="true"
      :show-file-block="true"
      @upload-success="handleSuccess"
      @upload-mounted="bindRef"
      @open-prewiev="openPrewiev"
    >
      <template #main>
        <div class="flex">
          <el-button size="small" type="primary" class="mr-5">Click to upload</el-button>
          <div class="el-upload__tip">PDF files only</div>
        </div>
      </template>
    </SwdUpload>
    <div class="flex justify-end my-6">
      <Button default-gray-btn text-btn="Back" class="mr-5" @click="backStep" />
      <Button default-blue-btn text-btn="Show Report" @click="saveStep" />
    </div>
    <PrewiewPdfModal :pdf-url="state.previewUrl" />
  </div>
  <el-skeleton v-else :rows="10" animated class="p-5" />
</template>

<script>
import IconDownRisk from '@/assets/svg/icon-down-risk.svg'
import IconUpRisk from '@/assets/svg/icon-up-risk.svg'
import SwdUpload from '@/components/Global/SwdUpload.vue'
import { onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { scrollTop } from '@/utils/scrollTop'
import { createStressTest } from '@/api/vueQuery/create-stress-test'
import { useMutation } from 'vue-query'
import { useFetchStressTest } from '@/api/use-fetch-stress-test.js'

import PrewiewPdfModal from './PrewievPdfModal.vue'

export default {
  name: 'NewProspectPdf',
  components: {
    SwdUpload,
    PrewiewPdfModal,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const upload = ref(null)
    const id = route.params.id

    const { isLoading, isFetching, isError, data: stressTestDocument } = useFetchStressTest(id)
    const { mutateAsync: create, error } = useMutation(createStressTest)

    onMounted(() => {
      store.commit('newProspect/setStep', 5)
      scrollTop()
    })

    const state = reactive({
      file: '',
      uploadRef: null,
      dialogVisible: false,
      previewUrl: '',
    })

    const step = computed(() => store.state.newProspect.step)

    const saveStep = () => {
      router.push({ name: 'member-report', params: { id: route.params.id } })
    }

    const backStep = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({ name: 'assetsconsolidations', params: { id: route.params.id } })
    }

    const handleSuccess = async (res) => {
      const data = { uuids: [res.data.uuid] }
      await create({ id, data })
    }

    const bindRef = (ref) => {
      upload.value = ref.value
    }

    const openPrewiev = (pdfUrl) => {
      state.previewUrl = pdfUrl
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: true,
      })
    }

    // const handleRemove = (file, fileList) => {
    //   console.log(file, fileList)
    // }

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

      // handleRemove,
    }
  },
}
</script>
