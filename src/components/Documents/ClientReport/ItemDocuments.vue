<template>
  <div class="flex justify-between">
    <div class="text-main w-7/12">
      <div v-if="getContracts.length" class="flex">
        <div>Contract:</div>
        <div class="ml-2">
          {{ getContracts }}
        </div>
      </div>
    </div>
    <div class="flex w-5/12 justify-end">
      <el-button v-if="document.status === 'process'" type="primary" size="small" plain disabled>
        <div class="flex items-center">
          <SwdSpinner />
          <span class="pl-2">processing</span>
        </div>
      </el-button>
      <el-button
        v-if="document.status === 'success' && document.type === 'pdf'"
        type="primary"
        size="small"
        plain
        @click="handlePictureCardPreview(document)"
      >
        Prewiev
      </el-button>
      <el-button v-if="document.status === 'success'" type="primary" plain size="small" @click="share">Share</el-button>
      <el-button v-if="document.status === 'success'" type="primary" plain size="small" @click="downloadDocuments">
        Download
      </el-button>
      <el-button v-if="document.status === 'error'" type="danger" size="small" plain disabled>error</el-button>
    </div>
  </div>
  <PrewiewPdfModal v-if="state.dialogVisible" :pdf-url="state.previewUrl" />
</template>

<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useDownloadClientReport } from '@/api/use-download-client-report'
import PrewiewPdfModal from '@/components/NewProspect/StressTestResult/PrewievPdfModal.vue'

export default {
  name: 'ItemDocuments',
  components: {
    PrewiewPdfModal,
  },
  props: {
    contracts: {
      type: Array,
      require: true,
      default: () => [],
    },
    document: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()

    const memberId = route.params.id

    const state = reactive({
      dialogVisible: false,
      previewUrl: '',
    })

    const {
      response: clientReportPdf,
      error: errorClientReport,
      fetching: fetchingClientReport,
      getClientReport,
    } = useDownloadClientReport(memberId)

    const getContracts = computed(() => {
      return props.contracts.map((item) => item.contract_number)
    })

    const share = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'shareFileEmailDialog',
        value: true,
      })
      store.commit('globalComponents/setPdfRegion', 'client-report')
      store.commit('globalComponents/setDocIdShare', props.document.id)
    }

    const downloadDocuments = async () => {
      const res = await fetch(props.document.link)
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', props.document.filename)
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
      setTimeout(function () {
        link.remove()
      }, 100)
    }

    const handlePictureCardPreview = (doc) => {
      state.previewUrl = doc.link
      state.dialogVisible = true
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: true,
      })
    }

    return {
      getContracts,
      share,
      downloadDocuments,
      clientReportPdf,
      errorClientReport,
      fetchingClientReport,
      getClientReport,
      state,
      handlePictureCardPreview,
    }
  },
}
</script>
