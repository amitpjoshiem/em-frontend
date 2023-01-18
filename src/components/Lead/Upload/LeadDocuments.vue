<template>
  <SwdWrapper>
    <div v-if="!isLoading && !isLoadingInfo && !isFetching">
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

      <div v-if="!state.skipUpload && !isFetching" class="min-h-[175px] mb-5 p-5 border border-main-gray rounded-md">
        <SwdButton primary small class="w-3/12" @click="showModalAttachDoc">Attach document</SwdButton>
        <div v-if="!data.documents.length" class="text-center pt-12">
          <p>No recently added documents</p>
        </div>
        <div v-if="data.documents.length">
          <DocItem
            v-for="(item, index) in data.documents"
            :key="index"
            :doc="item"
            :collection="context"
            with-remove-btn
          />
        </div>
      </div>
    </div>
    <el-skeleton v-else :rows="5" animated />

    <div v-if="state.skipUpload" class="min-h-[175px] mb-5 text-main flex flex-col items-center justify-center">
      <div class="bg-main-gray rounded-full w-16 h-16 flex flex-col items-center justify-center mb-3">
        <InlineSvg :src="IconEmptyUsers" />
      </div>
      <p>No recently added documents</p>
    </div>
    <SwdModalUploadDocuments />
  </SwdWrapper>
</template>

<script>
import { computed, reactive, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useFetchClientDocuments } from '@/api/clients/use-fetch-clients-documents.js'
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import { useSetStatus } from '../use-set-status'
import IconEmptyUsers from '@/assets/svg/icon-empty-users.svg'
import DocItem from './DocItem.vue'
import SwdModalUploadDocuments from '@/components/Global/SwdModalUploadDocuments.vue'

export default {
  name: 'LeadDocuments',
  components: {
    DocItem,
    SwdModalUploadDocuments,
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
    const upload = ref(null)

    const { setStatus } = useSetStatus()

    const state = reactive({
      file: '',
      uploadRef: null,
      skipUpload: null,
    })

    const { isLoading, isFetching, isError, refetch, data } = useFetchClientDocuments({
      collection: props.context,
    })
    const { isLoading: isLoadingInfo, data: clientsInfo } = useFetchClietsInfo()

    watchEffect(() => {
      if (
        isLoading.value === false &&
        data.value.status === 'no_documents' &&
        !data.value.documents.length &&
        state.skipUpload === null
      ) {
        state.skipUpload = true
      }
      if (isFetching.value === false && !data.value.documents.length && !state.skipUpload) {
        state.skipUpload = false
        setStatus({ status: null, context: props.context })
      }
      if (!isFetching.value && !isLoading.value && data.value.documents.length) {
        setStatus({ status: 'completed', context: props.context })
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

    const isShowNoDocuments = computed(() => {
      return !data.value.documents?.length && !isFetching.value
    })

    const isReadOnlyLead = computed(() => {
      return clientsInfo.value.readonly
    })

    const showModalAttachDoc = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'modalUploadDocuments',
        value: true,
      })
      store.commit('globalComponents/setCollectionUploadMedia', props.context)
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
      isShowNoDocuments,
      isLoadingInfo,
      clientsInfo,
      isReadOnlyLead,
      changeSkip,
      showModalAttachDoc,
    }
  },
}
</script>
