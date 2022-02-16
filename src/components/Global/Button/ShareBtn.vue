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
// import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useDownloadBlueReport } from '@/api/use-download-blue-report'
import { useDownloadClientReport } from '@/api/use-download-client-report'
import { useRoute } from 'vue-router'
import { useProspectDetails } from '@/api/use-prospect-details.js'

import { useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'

import { generatePdfClientReports } from '@/api/vueQuery/generate-pdf-client-reports'

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
    // const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const memberId = route.params.id

    const { isLoading: isLoadingProspectDetails, isError, data: member } = useProspectDetails()
    const { response: blueReportPdf, error, fetching, getBlueReport } = useDownloadBlueReport(memberId)
    const {
      response: clientReportPdf,
      error: errorClientReport,
      fetching: fetchingClientReport,
      getClientReport,
    } = useDownloadClientReport(memberId)

    const {
      mutateAsync: genPdfClientReports,
      isLoading,
      isFetching,
      data,
      refetch,
    } = useMutation(generatePdfClientReports)

    const actionsOptions = [
      {
        title: 'Generate PDF',
        command: 'generate_pdf',
      },
      {
        title: 'Generate EXCEL',
        command: 'generate_excel',
      },
      {
        title: 'All documents',
        command: 'all_documents',
      },
      // {
      //   title: 'Download as PDF',
      //   command: 'download',
      // },
      // {
      //   title: 'Share as PDF',
      //   command: 'share',
      // },
    ]

    // const downloadPdf = async () => {
    //   let blob = null
    //   let res = null
    //   if (props.pdfRegion === 'blue-report') {
    //     await getBlueReport()
    //     res = await fetch(blueReportPdf.value.data.link)
    //   }

    //   if (props.pdfRegion === 'client-report') {
    //     await getClientReport()
    //     res = await fetch(clientReportPdf.value.data.link)
    //   }

    //   blob = await res.blob()
    //   const url = window.URL.createObjectURL(blob)
    //   const link = document.createElement('a')
    //   link.href = url
    //   link.setAttribute('download', member.value.name + '.pdf')
    //   link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
    //   setTimeout(function () {
    //     link.remove()
    //   }, 100)
    // }

    const actionsMap = {
      generate_pdf: () => generatePdf(),
      generate_excel: () => generateExcel(),
      all_documents: () => allDocuments(),
      // download: () => downloadPdf(),
      // share: () => share(),
    }

    const generatePdf = async () => {
      if (props.pdfRegion === 'client-report') {
        const res = await genPdfClientReports({ id: memberId })
        if (!('error' in res)) {
          useAlert({
            title: 'Success',
            type: 'success',
            message: 'Generate successfully',
          })
        }
        console.log('generatePdf')
      }
    }

    const generateExcel = () => {
      console.log('generateExcel')
    }

    const allDocuments = () => {
      console.log('allDocuments()')
      if (props.pdfRegion === 'client-report') router.push({ name: 'all-client-report', params: { id: memberId } })
    }

    // const share = () => {
    //   store.commit('globalComponents/setShowModal', {
    //     destination: 'shareFileEmailDialog',
    //     value: true,
    //   })
    //   store.commit('globalComponents/setPdfRegion', props.pdfRegion)
    // }

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

      generatePdfClientReports,
      isLoading,
      isFetching,
      data,
      refetch,
    }
  },
}
</script>
