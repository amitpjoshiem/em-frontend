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
import { generateExcelClientReports } from '@/api/vueQuery/generate-excel-client-reports'

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

    const { mutateAsync: genPdfClientReports } = useMutation(generatePdfClientReports)

    const { mutateAsync: genExcelClientReports } = useMutation(generateExcelClientReports)

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
    ]

    const actionsMap = {
      generate_pdf: () => generatePdf(),
      generate_excel: () => generateExcel(),
      all_documents: () => allDocuments(),
    }

    const generatePdf = async () => {
      console.log('props.pdfRegion - ', props.pdfRegion)
      let res = []
      if (props.pdfRegion === 'client-report') {
        res = await genPdfClientReports({ id: memberId })
      }

      if (props.pdfRegion === 'blue-report') {
        console.log('===')
        // res = await genPdfClientReports({ id: memberId })
      }

      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Generate successfully',
        })
      }
    }

    const generateExcel = async () => {
      let res = []
      if (props.pdfRegion === 'client-report') {
        res = await genExcelClientReports({ id: memberId })
      }

      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Generate successfully',
        })
      }
    }

    const allDocuments = () => {
      if (props.pdfRegion === 'client-report') router.push({ name: 'all-client-report', params: { id: memberId } })
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
