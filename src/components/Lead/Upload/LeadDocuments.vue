<template>
  <SwdWrapper>
    <div v-if="!isLoading">
      <div class="mb-5">
        <el-checkbox
          v-model="state.availabilityDocuments"
          label="I want to skip and submit"
          size="large"
          @change="changeStatus"
        />
      </div>

      <div v-if="context === 'social_security_information'" class="text-main text-sm mb-5">
        You may need to sign up to get your
        <a target="_blank" href="https://www.ssa.gov/" class="text-blue-400 italic">Social Security Statement online</a>
        by clicking this link
      </div>

      <div v-if="!state.availabilityDocuments" class="min-h-[175px] mb-5 p-5 border border-main-gray rounded-md">
        <div v-if="!isFetching">
          <SwdUpload
            :upload-data="{ collection: context }"
            :doc-list="data.documents"
            :show-file-list="true"
            :auto-upload="true"
            :show-file-block="true"
            :disabled="state.availabilityDocuments"
            @upload-change="handleChange"
            @upload-success="handleSuccess"
            @upload-mounted="bindRef"
            @remove-media="removeMedia"
            @open-prewiev="openPrewiev"
          >
            <template #main>
              <div class="flex my-5 w-2/12">
                <SwdButton primary small>Click to upload</SwdButton>
              </div>
              <div v-if="isShowNoDocuments" class="text-main text-center pb-5">No documents uploaded</div>
            </template>
          </SwdUpload>
        </div>
        <el-skeleton v-else :rows="5" animated class="p-5" />
      </div>
      <div v-else class="min-h-[175px] mb-5 text-main flex flex-col items-center justify-center">
        <div class="bg-main-gray rounded-full w-16 h-16 flex flex-col items-center justify-center mb-3">
          <InlineSvg :src="IconEmptyUsers" />
        </div>
        <p>No recently added documents</p>
      </div>
    </div>
    <el-skeleton v-else :rows="5" animated />
  </SwdWrapper>
</template>

<script>
import { computed, reactive, ref, watchEffect } from 'vue'
import { useMutation, useQueryClient } from 'vue-query'
import { useStore } from 'vuex'
import { useFetchClientDocuments } from '@/api/clients/use-fetch-clients-documents.js'
import { updateStepsClients } from '@/api/vueQuery/clients/fetch-update-steps-clients'
import { uploadClientsDocs } from '@/api/vueQuery/clients/fetch-upload-clients-docs'
import { deleteMedia } from '@/api/vueQuery/delete-media'
import SwdUpload from '@/components/Global/SwdUpload.vue'
import IconEmptyUsers from '@/assets/svg/icon-empty-users.svg'

export default {
  name: 'LeadDocuments',
  components: {
    SwdUpload,
  },
  props: {
    context: {
      type: String,
      required: true,
      default: '',
    },
  },
  setup(props) {
    const store = useStore()
    const queryClient = useQueryClient()
    const upload = ref(null)
    const inChangeFile = ref(false)

    const state = reactive({
      file: '',
      uploadRef: null,
      availabilityDocuments: false,
    })

    const { isLoading, isFetching, isError, refetch, data } = useFetchClientDocuments({
      collection: props.context,
    })

    const { isLoading: isLoadingUpdateSteps, mutateAsync: updateSteps } = useMutation(updateStepsClients)
    const { mutateAsync: deleteDocument } = useMutation(deleteMedia)
    const { mutateAsync: uploadDoc } = useMutation(uploadClientsDocs)

    watchEffect(() => {
      if (isFetching.value === false && data.value.status === 'no_documents') state.availabilityDocuments = true
    })

    const bindRef = (ref) => {
      upload.value = ref.value
    }

    const changeStatus = async () => {
      let status = 'not_completed'

      if (state.availabilityDocuments) {
        status = 'no_documents'
      }
      if (!state.availabilityDocuments && data.value.documents.length) {
        status = 'completed'
      }

      await updateSteps({ [props.context]: status })
    }

    const removeMedia = async (media) => {
      const res = await deleteDocument(media)
      if (!('error' in res)) {
        await queryClient.invalidateQueries(['clientsDocuments', props.context])
      }
      if (!data.value.documents.length) changeStatus()
      console.log(data.value.documents.length)
    }

    const handleSuccess = async (res) => {
      const data = { uuids: [res.data.uuid] }
      const response = await uploadDoc({ collection: props.context, data })
      if (!('error' in response)) {
        inChangeFile.value = false
        queryClient.invalidateQueries(['clientsDocuments', props.context])
        changeStatus()
      }
    }

    const handleChange = () => {
      inChangeFile.value = true
    }

    const isShowNoDocuments = computed(() => {
      return !data.value.documents?.length && !inChangeFile.value && !isFetching.value
    })

    const openPrewiev = (url) => {
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: true,
      })
      store.commit('globalComponents/setPreviewUrlPdf', url)
    }

    return {
      state,
      bindRef,
      isLoading,
      isFetching,
      isError,
      refetch,
      data,
      IconEmptyUsers,
      changeStatus,
      handleChange,
      removeMedia,
      handleSuccess,
      isShowNoDocuments,
      openPrewiev,
      isLoadingUpdateSteps,
    }
  },
}
</script>
