<template>
  <div v-if="!isLoading">
    <SwdUpload
      :upload-data="{ collection: 'stress_test' }"
      :doc-list="stressTestDocument.data"
      :show-file-list="true"
      :auto-upload="true"
      :show-file-block="true"
      :disabled="disabledUpload"
      :upload-before-hook="hookBeforeUploadFile"
      @upload-change="handleChange"
      @upload-success="handleSuccess"
      @upload-mounted="bindRef"
      @open-prewiev="openPrewiev"
      @remove-media="removeMedia"
    >
      <template v-if="!disabledUpload" #main>
        <div class="my-5 flex items-center">
          <SwdButton primary small class="w-2/12 mr-2">Click to upload</SwdButton>
          <p v-if="!isLoadingMediaRules" class="text-xxs">
            <span v-if="mediaRules.data.allowed_types">{{ mediaRules.data.allowed_types.join() }} files only</span>
            (max file size {{ mediaRules.data.size }}Mb)
          </p>
        </div>
        <div v-if="isShowNoDocuments" class="text-main text-center pb-5">No documents uploaded</div>
      </template>
    </SwdUpload>
    <div v-if="showNavBtn" class="flex justify-end my-6">
      <Button default-gray-btn text-btn="Back" class="mr-5" @click="backStep" />
      <SwdButton primary main @click="saveStep">Show Report</SwdButton>
    </div>
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
import { deleteMedia } from '@/api/vueQuery/delete-media'
import { useQueryClient } from 'vue-query'
import { fetchStressTestConfirm } from '@/api/vueQuery/fetch-stress-test-confirm'
import { useAlert } from '@/utils/use-alert'
import { useBeforeUploadFile } from '@/hooks/use-before-upload-file'
import { useFetchMediaRules } from '@/api/use-fetch-media-rules.js'

export default {
  name: 'NewProspectPdf',
  components: {
    SwdUpload,
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

    const { beforeUploadFile } = useBeforeUploadFile()

    const { isLoading, isError, data: stressTestDocument } = useFetchStressTest(id)
    const { isLoading: isLoadingMediaRules, data: mediaRules } = useFetchMediaRules({ collection: 'stress_test' })
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
        router.push({ name: `${route.meta.type}/blueprint-report`, params: { id: route.params.id } })
      }
    }

    const backStep = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({ name: `${route.meta.type}/assets-consolidations`, params: { id: route.params.id } })
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

    const openPrewiev = (url) => {
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: true,
      })
      store.commit('globalComponents/setPreviewUrlPdf', url)
    }

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
      return !stressTestDocument.value.data.length && !inChangeFile.value && !isLoading.value
    })

    const disabledUpload = computed(() => {
      if (store.state.globalComponents.role === 'client') return true
      return false
    })

    const hookBeforeUploadFile = (rawFile) => {
      return beforeUploadFile({ rawFile, rules: mediaRules.value.data })
    }

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
      isError,
      stressTestDocument,
      openPrewiev,
      removeMedia,
      handleChange,
      isShowNoDocuments,
      disabledUpload,
      hookBeforeUploadFile,
      isLoadingMediaRules,
      mediaRules,
    }
  },
}
</script>
