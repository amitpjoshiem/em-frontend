<template>
  <div v-if="!isLoading">
    <div>
      <SwdUpload
        :upload-data="{ collection: 'stress_test' }"
        :file-list="stressTestDocument.data"
        :show-file-list="true"
        :auto-upload="true"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        @upload-success="handleSuccess"
        @upload-mounted="bindRef"
      >
        <template #main>
          <div class="flex">
            <el-button size="small" type="primary" class="mr-5">Click to upload</el-button>
            <div class="el-upload__tip">PDF files only</div>
          </div>
        </template>
      </SwdUpload>
    </div>
    <div class="flex justify-end my-6">
      <Button default-gray-btn text-btn="Back" class="mr-5" @click="backStep" />
      <Button default-blue-btn text-btn="Show Report" @click="saveStep" />
    </div>
  </div>
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

export default {
  name: 'NewProspectPdf',
  components: {
    SwdUpload,
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

    const handleRemove = (file, fileList) => {
      console.log(file, fileList)
    }

    const handlePreview = (file) => {
      console.log(file)
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
      isFetching,
      isError,
      stressTestDocument,

      handleRemove,
      handlePreview,
    }
  },
}
</script>
