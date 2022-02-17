<template>
  <div class="flex justify-between">
    <div class="text-main w-7/12">
      <div class="flex">
        <div>Contract:</div>
        <div class="ml-2">
          {{ getContracts }}
        </div>
      </div>
    </div>
    <div class="flex w-5/12 justify-end">
      <el-button v-if="status === 'process'" type="primary" size="small" plain disabled>
        <div class="flex items-center">
          <SwdSpinner />
          <span class="pl-2">processing</span>
        </div>
      </el-button>
      <el-button v-if="status === 'success'" type="success" plain @click="share">Share</el-button>
      <el-button v-if="status === 'success'" type="primary" plain @click="downloadDocuments">Download</el-button>
      <el-button v-if="status === 'error'" type="danger" size="small" plain disabled>error</el-button>
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
      type: Object,
      require: true,
      default: () => {},
    },
    status: {
      type: String,
      require: true,
      default: '',
    },
    link: {
      type: String,
      require: true,
      default: '',
    },
    id: {
      type: String,
      require: true,
      default: '',
    },
    filename: {
      type: String,
      require: true,
      default: '',
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
      store.commit('globalComponents/setDocIdShare', props.id)
    }

    const downloadDocuments = async () => {
      const res = await fetch(props.link)
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', props.filename)
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
      setTimeout(function () {
        link.remove()
      }, 100)
    }

    return {
      getContracts,
      share,
      downloadDocuments,

      clientReportPdf,
      errorClientReport,
      fetchingClientReport,
      getClientReport,
    }
  },
}
</script>
