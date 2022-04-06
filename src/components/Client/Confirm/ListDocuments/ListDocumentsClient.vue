<template>
  <div class="flex justify-end mb-4">
    <el-button type="primary" plain class="mr-10" size="small" @click="edit">Edit</el-button>
  </div>
  <div v-if="isLoading" class="flex justify-center items-center">
    <SwdSpinner large />
  </div>
  <div v-else-if="data.status === 'no_documents'" class="flex">
    <div>I want to skip and submit</div>
    <el-tag class="ml-4" type="success">Yes</el-tag>
  </div>
  <div v-else-if="data.documents.length">
    <el-card v-for="item in data.documents" :key="item.id" class="mb-4">
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
  <PrewiewPdfModal v-if="state.dialogVisible" :pdf-url="state.previewUrl" />
</template>

<script>
import { useFetchClientDocuments } from '@/api/clients/use-fetch-clients-documents.js'
import PrewiewPdfModal from '@/components/NewProspect/StressTestResult/PrewievPdfModal.vue'
import { reactive, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

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

    const { isLoading, isFetching, isError, refetch, data } = useFetchClientDocuments({
      collection: props.docCollections,
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
      isLoading,
      isFetching,
      isError,
      refetch,
      data,
      state,
      handlePictureCardPreview,
      edit,
    }
  },
}
</script>
