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
      <SwdButton v-if="document.status === 'process'" class="ml-2" primary main :`disabled="true">
        <SwdSpinner class="mr-2" />
        Processing
        <SwdSpinner class="mr-2" />
      </SwdButton>
      <el-button
        v-if="document.status === 'success' && document.type === 'pdf'"
        type="primary"
        size="small"
        plain
        @click="handlePictureCardPreview(document)"
      >
        Prewiev
      </el-button>
      <SwdButton v-if="document.status === 'success'" primary small @click="share">Share</SwdButton>
      <SwdButton v-if="document.status === 'success'" class="my-2" primary small @click="downloadDocuments"
        >Download</SwdButton
      >
      <el-button v-if="document.status === 'error'" type="danger" size="small" plain disabled>error</el-button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useDownloadClientReport } from '@/api/use-download-client-report'

export default {
  name: 'ItemDocuments',
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
      store.commit('globalComponents/setDocShare', props.document)
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

    const handlePictureCardPreview = (url) => {
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: true,
      })
      store.commit('globalComponents/setPreviewUrlPdf', url.link)
    }

    return {
      getContracts,
      share,
      downloadDocuments,
      clientReportPdf,
      errorClientReport,
      fetchingClientReport,
      getClientReport,
      handlePictureCardPreview,
    }
  },
}
</script>
