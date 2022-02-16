<template>
  <SwdDropDown class="ml-2" :options="actionsOptions" @select="handleSelect">
    <template #titleDropDown>
      <span
        class="
          cursor-pointer
          bg-white
          rounded
          flex
          justify-center
          items-center
          border border-color-grey
          pr-[7px]
          pl-[6px]
          py-[6px]
        "
      >
        <InlineSvg :src="IconShare" />
      </span>
    </template>
  </SwdDropDown>
</template>

<script>
import IconShare from '@/assets/svg/icon-share.svg'
import { useStore } from 'vuex'
import { useDownloadBlueReport } from '@/api/use-download-blue-report'
import { useDownloadClientReport } from '@/api/use-download-client-report'
import { useRoute } from 'vue-router'
import { useProspectDetails } from '@/api/use-prospect-details.js'

export default {
  name: 'ShareBtn',
  props: {
    pdfRegion: {
      type: String,
      require: true,
      default: '',
    },
  },

  setup(props) {
    const store = useStore()
    const route = useRoute()

    const id = route.params.id

    const { isLoading: isLoadingProspectDetails, isError, data: member } = useProspectDetails()
    const { response: blueReportPdf, error, fetching, getBlueReport } = useDownloadBlueReport(id)
    const {
      response: clientReportPdf,
      error: errorClientReport,
      fetching: fetchingClientReport,
      getClientReport,
    } = useDownloadClientReport(id)

    const actionsOptions = [
      {
        title: 'Download as PDF',
        command: 'download',
      },
      {
        title: 'Share as PDF',
        command: 'share',
      },
    ]

    const downloadPdf = async () => {
      let blob = null
      let res = null
      if (props.pdfRegion === 'blue-report') {
        await getBlueReport()
        res = await fetch(blueReportPdf.value.data.link)
      }

      if (props.pdfRegion === 'client-report') {
        await getClientReport()
        res = await fetch(clientReportPdf.value.data.link)
      }

      blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', member.value.name + '.pdf')
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
      setTimeout(function () {
        link.remove()
      }, 100)
    }

    const actionsMap = {
      download: () => downloadPdf(),
      share: () => share(),
    }

    const share = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'shareFileEmailDialog',
        value: true,
      })
      store.commit('globalComponents/setPdfRegion', props.pdfRegion)
    }

    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    return {
      handleSelect,
      actionsOptions,
      IconShare,
      blueReportPdf,
      error,
      fetching,
      getBlueReport,
      isLoadingProspectDetails,
      isError,
      member,
      clientReportPdf,
      errorClientReport,
      fetchingClientReport,
      getClientReport,
    }
  },
}
</script>
