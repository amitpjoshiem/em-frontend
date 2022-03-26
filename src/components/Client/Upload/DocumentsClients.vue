<template>
  <div class="p-5">
    <SwdSubHeader :title="getTitle" />
    <div v-if="!isLoading">
      <div class="mb-5">
        <el-checkbox
          v-model="state.availabilityDocuments"
          label="I want to skip and submit"
          size="large"
          @change="changeStatus"
        />
      </div>

      <div v-if="!state.availabilityDocuments" class="min-h-[175px] mb-5 p-5 border border-input-border rounded-md">
        <UploadClients
          :upload-data="{ collection }"
          :collection="collection"
          :file-list="data.documents"
          :disabled="state.availabilityDocuments"
          @upload-mounted="bindRef"
          @handle-refetch="refetch"
        >
          <template #main>
            <div class="flex my-5">
              <el-button size="small" type="primary" class="mr-5">Click to upload</el-button>
            </div>
          </template>
        </UploadClients>
      </div>
      <div v-else class="min-h-[175px] mb-5 text-gray03 flex flex-col items-center justify-center">
        <div class="bg-widget-bg rounded-full w-16 h-16 flex flex-col items-center justify-center mb-3">
          <InlineSvg :src="IconEmptyUsers" />
        </div>
        <p>No recently added documents</p>
      </div>
      <div class="flex justify-end">
        <el-button type="primary" plain @click="backStep">Back</el-button>
        <el-button type="success" plain :disabled="disabledSaveBtn" @click="saveStep">Save</el-button>
      </div>
    </div>
    <el-skeleton v-else :rows="15" animated />
  </div>
</template>

<script>
import { computed, reactive, ref, watchEffect } from 'vue'
import { useMutation } from 'vue-query'
import { useRouter } from 'vue-router'

import UploadClients from '../UploadClients.vue'

import { useFetchClientDocuments } from '@/api/clients/use-fetch-clients-documents.js'
import { updateStepsClients } from '@/api/vueQuery/clients/fetch-update-steps-clients'

import { useGetTile } from './hooks/use-get-title-hook'

import { useAlert } from '@/utils/use-alert'

import IconEmptyUsers from '@/assets/svg/icon-empty-users.svg'

export default {
  name: 'DocumentsClients',
  components: {
    UploadClients,
  },
  setup(_, { attrs }) {
    const router = useRouter()

    const collection = attrs.context

    const { isLoading, isFetching, isError, refetch, data } = useFetchClientDocuments({
      collection,
    })

    const { mutateAsync: updateSteps } = useMutation(updateStepsClients)

    const { getTitle } = useGetTile(collection)

    const upload = ref(null)

    const state = reactive({
      file: '',
      uploadRef: null,
      dialogVisible: false,
      previewUrl: '',
      availabilityDocuments: false,
    })

    const assetsConsolidationDocs = reactive({
      data: [],
    })

    watchEffect(() => {
      if (isFetching.value === false && data.value.status === 'no_documents') state.availabilityDocuments = true
    })

    const bindRef = (ref) => {
      upload.value = ref.value
    }

    const statusStep = computed(() => {
      if (state.availabilityDocuments) return 'no_documents'
      if (data.value.documents?.length) return 'completed'
      return 'not_completed'
    })

    const disabledSaveBtn = computed(() => {
      return !(state.availabilityDocuments || data.value.documents.length)
    })

    const saveStep = async () => {
      const res = await updateSteps({ [collection]: statusStep.value })
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Information update successfully',
        })
        router.push({
          name: 'client-dashboard',
        })
      }
    }

    const backStep = () => {
      router.push({ name: 'client-dashboard' })
    }

    const changeStatus = async () => {
      let status = 'not_completed'
      if (data.value.documents?.length && state.availabilityDocuments === 'false') status = 'no_documents'
      if (data.value.documents?.length && state.availabilityDocuments === 'true') status = 'completed'
      await updateSteps({ investment_and_retirement_accounts: status })
    }

    return {
      state,
      assetsConsolidationDocs,
      bindRef,
      isLoading,
      isFetching,
      isError,
      refetch,
      data,
      IconEmptyUsers,
      saveStep,
      disabledSaveBtn,
      changeStatus,
      backStep,
      collection,
      getTitle,
    }
  },
}
</script>
