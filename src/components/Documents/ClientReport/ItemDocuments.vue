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
    <div class="flex w-3/12 justify-end">
      <SwdButton v-if="document.status === 'process'" class="ml-2" primary small :disabled="true">
        <SwdSpinner class="mr-2" />
        Processing
      </SwdButton>
      <SwdButton
        v-if="document.status === 'success' && document.type === 'pdf'"
        class="mr-4 h-[24px]"
        primary
        small
        @click="handlePictureCardPreview(document)"
      >
        Preview
      </SwdButton>
      <SwdButton
        v-if="document.status === 'success' && !$can('client', 'all') && !$can('support', 'all')"
        class="h-[24px]"
        primary
        small
        @click="share"
      >
        Share
      </SwdButton>
      <SwdButton v-if="document.status === 'success'" class="ml-4 h-[24px]" primary small @click="downloadDocuments">
        Download
      </SwdButton>
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

      if (route.query.type === 'blueprint') {
        store.commit('globalComponents/setPdfRegion', 'blue-report')
      }
      if (route.query.type === 'client') {
        store.commit('globalComponents/setPdfRegion', 'client-report')
      }
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

    const handlePictureCardPreview = (file) => {
      store.commit('globalComponents/setShowModal', {
        destination: 'previewModal',
        value: true,
      })
      store.commit('globalComponents/setPreviewFile', file)
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
