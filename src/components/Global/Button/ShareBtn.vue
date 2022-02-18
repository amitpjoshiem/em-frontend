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
import { useRouter } from 'vue-router'
import { useDownloadBlueReport } from '@/api/use-download-blue-report'
import { useDownloadClientReport } from '@/api/use-download-client-report'
import { useRoute } from 'vue-router'
// import { useProspectDetails } from '@/api/use-prospect-details.js'

import { useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'

import { generatePdfClientReports } from '@/api/vueQuery/generate-pdf-client-reports'
import { generatePdfBlueReports } from '@/api/vueQuery/generate-pdf-blue-reports'
import { generateExcelClientReports } from '@/api/vueQuery/generate-excel-client-reports'
import { generateExcelBlueReports } from '@/api/vueQuery/generate-excel-blue-reports'

export default {
  name: 'ShareBtn',
  props: {
    pdfRegion: {
      type: String,
      require: true,
      default: '',
    },
    clientId: {
      type: String,
      require: false,
      default: '',
    },
    contracts: {
      type: String,
      require: false,
      default: '',
    },
  },

  setup(props) {
    const route = useRoute()
    const router = useRouter()

    const memberId = props.clientId ? props.clientId : route.params.id

    // const { isLoading: isLoadingProspectDetails, isError, data: member } = useProspectDetails()
    const { response: blueReportPdf, error, fetching, getBlueReport } = useDownloadBlueReport(memberId)
    const {
      response: clientReportPdf,
      error: errorClientReport,
      fetching: fetchingClientReport,
      getClientReport,
    } = useDownloadClientReport(memberId)

    const { mutateAsync: genPdfClientReports } = useMutation(generatePdfClientReports)

    const { mutateAsync: genPdfBlueReports } = useMutation(generatePdfBlueReports)

    const { mutateAsync: genExcelClientReports } = useMutation(generateExcelClientReports)

    const { mutateAsync: genExcelBlueReports } = useMutation(generateExcelBlueReports)

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
      let res = []
      const data = {}
      if (props.contracts) data.contracts = [props.contracts]
      if (props.pdfRegion === 'client-report') {
        res = await genPdfClientReports({ id: memberId, data })
      }

      if (props.pdfRegion === 'blue-report') {
        res = await genPdfBlueReports({ id: memberId, data })
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
      const data = {}
      if (props.contracts) data.contracts = [props.contracts]

      if (props.pdfRegion === 'client-report') {
        res = await genExcelClientReports({ id: memberId, data })
      }
      if (props.pdfRegion === 'blue-report') {
        res = await genExcelBlueReports({ id: memberId, data })
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
      if (props.pdfRegion === 'client-report')
        router.push({ name: 'all-report', params: { id: memberId }, query: { type: 'client' } })
      if (props.pdfRegion === 'blue-report')
        router.push({ name: 'all-report', params: { id: memberId }, query: { type: 'blueprint' } })
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
      // isLoadingProspectDetails,
      // isError,
      // member,
      clientReportPdf,
      errorClientReport,
      fetchingClientReport,
      getClientReport,
    }
  },
}
</script>
