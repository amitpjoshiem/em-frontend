<template>
  <SwdWrapper>
    <div v-if="!isLoading && !isLoadingInfo">
      <div class="mb-5">
        <el-checkbox
          v-model="state.skipUpload"
          label="I want to skip this document."
          size="large"
          :disabled="isReadOnlyLead"
          @change="changeSkip"
        />
      </div>

      <div v-if="context === 'social_security_information'" class="text-main text-sm mb-5">
        You may need to sign up to get your
        <a target="_blank" href="https://www.ssa.gov/" class="text-blue-400 italic">Social Security Statement online</a>
        by clicking this link
      </div>

      <div v-if="!state.skipUpload" class="min-h-[175px] mb-5 p-5 border border-main-gray rounded-md">
        <div v-if="!isFetching">
          <SwdUpload
            :upload-data="{ collection: context }"
            :doc-list="data.documents"
            :show-file-list="true"
            :auto-upload="true"
            :show-file-block="true"
            :disabled="state.skipUpload || isReadOnlyLead"
            :upload-before-hook="hookBeforeUploadFile"
            with-remove-btn
            @upload-change="handleChange"
            @upload-success="handleSuccess"
            @upload-mounted="bindRef"
            @remove-media="removeMedia"
            @open-prewiev="openPrewiev"
          >
            <template #main>
              <div class="my-5 flex items-center">
                <SwdButton primary small :disabled="isReadOnlyLead" class="w-2/12 mr-2">Click to upload</SwdButton>
                <p v-if="!isLoadingMediaRules" class="text-xxs">
                  <span v-if="mediaRules.data.allowed_types">
                    {{ mediaRules.data.allowed_types.join() }} files only
                  </span>
                  (max file size {{ mediaRules.data.size }}Mb)
                </p>
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
import { useFetchMediaRules } from '@/api/use-fetch-media-rules.js'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import { uploadClientsDocs } from '@/api/vueQuery/clients/fetch-upload-clients-docs'
import { deleteMedia } from '@/api/vueQuery/delete-media'
import { useBeforeUploadFile } from '@/hooks/use-before-upload-file'
import { useSetStatus } from '../use-set-status'
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

    const { beforeUploadFile } = useBeforeUploadFile()
    const { setStatus } = useSetStatus()

    const state = reactive({
      file: '',
      uploadRef: null,
      skipUpload: false,
    })

    const { isLoading, isFetching, isError, refetch, data } = useFetchClientDocuments({
      collection: props.context,
    })
    const { isLoading: isLoadingInfo, data: clientsInfo } = useFetchClietsInfo()
    const { isLoading: isLoadingMediaRules, data: mediaRules } = useFetchMediaRules({ collection: props.context })
    const { mutateAsync: deleteDocument } = useMutation(deleteMedia)
    const { mutateAsync: uploadDoc } = useMutation(uploadClientsDocs)

    watchEffect(() => {
      if (isFetching.value === false && data.value.status === 'no_documents' && !data.value.documents.length) {
        state.skipUpload = true
      }
    })

    const bindRef = (ref) => {
      upload.value = ref.value
    }

    const changeSkip = () => {
      if (state.skipUpload) setStatus({ status: 'no_documents', context: props.context })
      if (!state.skipUpload && data.value.documents.length) setStatus({ status: 'completed', context: props.context })
      if (!state.skipUpload && !data.value.documents.length) setStatus({ status: null, context: props.context })
    }

    const removeMedia = async (media) => {
      const res = await deleteDocument(media)
      if (!('error' in res)) {
        await queryClient.invalidateQueries(['clientsDocuments', props.context])
      }
      if (!data.value.documents.length) {
        state.skipUpload = false
        setStatus({ status: null, context: props.context })
      }
    }

    const handleSuccess = async (res) => {
      const data = { uuids: [res.data.uuid] }
      const response = await uploadDoc({ collection: props.context, data })
      if (!('error' in response)) {
        inChangeFile.value = false
        queryClient.invalidateQueries(['clientsDocuments', props.context])
        setStatus({ status: 'completed', context: props.context })
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

    const isReadOnlyLead = computed(() => {
      return clientsInfo.value.readonly
    })

    const hookBeforeUploadFile = (rawFile) => {
      return beforeUploadFile({ rawFile, rules: mediaRules.value.data })
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
      handleChange,
      removeMedia,
      handleSuccess,
      isShowNoDocuments,
      openPrewiev,
      isLoadingInfo,
      clientsInfo,
      isReadOnlyLead,
      changeSkip,
      hookBeforeUploadFile,
      isLoadingMediaRules,
      mediaRules,
    }
  },
}
</script>
