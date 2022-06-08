<template>
  <div class="flex justify-end mb-4">
    <el-button v-if="$can('client', 'all')" type="primary" plain class="mr-10" size="small" @click="edit">
      Edit
    </el-button>
  </div>
  <div v-if="!isFetchingAdvisor && !isFetchingClient">
    <div v-if="data.value?.status === 'no_documents'" class="flex">
      <div>I want to skip and submit</div>
      <el-tag class="ml-4" type="success">Yes</el-tag>
    </div>
    <div v-else-if="data.value?.documents.length">
      <el-card v-for="item in data.value.documents" :key="item.id" class="mb-4">
        <div class="sm:flex sm:justify-between sm:items-center">
          <div class="flex">
            <img
              v-if="item.extension === 'excel'"
              src="../../../../assets/img/icon-excel.png"
              alt="excel"
              class="w-[50px] mr-5"
            />
            <img v-else src="../../../../assets/img/icon-pdf.png" alt="excel" class="w-[50px] mr-5" />
            <div class="flex flex-col justify-center">
              <span>{{ item.name }}</span>
              <span class="mt-1">{{ item.created_at }}</span>
            </div>
          </div>
          <div class="flex justify-end sm:block">
            <el-button
              v-if="item.extension === 'PDF'"
              type="primary"
              size="small"
              plain
              class="mr-5"
              @click="handlePictureCardPreview(item.url)"
            >
              Prewiev
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div v-else class="flex justify-center items-center py-2">
      <p class="text-gray03">No recently added documents</p>
    </div>
  </div>
  <div v-else class="flex justify-center items-center">
    <SwdSpinner large />
  </div>
  <PrewiewPdfModal v-if="state.dialogVisible" :pdf-url="state.previewUrl" />
</template>

<script>
import { useFetchClientDocuments } from '@/api/clients/use-fetch-clients-documents.js'
import { useFetchGetClientDocuments } from '@/api/use-fetch-get-clients-documents.js'
import PrewiewPdfModal from '@/components/NewProspect/StressTestResult/PrewievPdfModal.vue'
import { reactive, watchEffect, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'ListDocumentsClient',
  components: {
    PrewiewPdfModal,
  },
  props: {
    docCollections: {
      type: String,
      required: true,
      default: '',
    },
    page: {
      type: String,
      required: true,
      default: '',
    },
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const data = ref({})

    const {
      isLoading: isLoadingClient,
      isFetching: isFetchingClient,
      refetch: refetchClient,
      data: dataClient,
    } = useFetchClientDocuments(
      {
        collection: props.docCollections,
      },
      { enabled: false }
    )

    const {
      isLoading: isLoadingAdvisor,
      isFetching: isFetchingAdvisor,
      refetch: refetchAdvisor,
      data: dataAdvisor,
    } = useFetchGetClientDocuments(
      {
        collection: props.docCollections,
        id: route.params.id,
      },
      { enabled: false }
    )

    onMounted(async () => {
      if (route.params.id) {
        await refetchAdvisor.value()
        data.value = dataAdvisor
      } else {
        await refetchClient.value()
        data.value = dataClient
      }
    })

    const state = reactive({
      dialogVisible: false,
      previewUrl: '',
    })

    watchEffect(() => {
      state.dialogVisible = store.state.globalComponents.dialog.showDialog.prewievPdf
    })

    const handlePictureCardPreview = (url) => {
      state.previewUrl = url
      state.dialogVisible = true
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: true,
      })
    }

    const edit = () => {
      router.push({ name: props.page })
    }

    return {
      isLoadingClient,
      isFetchingClient,
      refetchClient,
      dataClient,
      isLoadingAdvisor,
      isFetchingAdvisor,
      refetchAdvisor,
      dataAdvisor,
      state,
      handlePictureCardPreview,
      edit,
      data,
    }
  },
}
</script>
