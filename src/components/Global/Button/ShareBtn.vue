<template>
  <SwdDropDown class="ml-2" :options="actionsOptions" @select="handleSelect">
    <template #titleDropDown>
      <span class="cursor-pointer bg-white rounded flex justify-center items-center border border-color-grey px-2 py-2">
        <InlineSvg :src="IconShare" />
      </span>
    </template>
  </SwdDropDown>
</template>

<script>
// import { jsPDF } from 'jspdf'
// import html2canvas from 'html2canvas'
import IconShare from '@/assets/svg/icon-share.svg'
import { useStore } from 'vuex'
// import { pdfConfig } from '@/config/pdf-config'
import { useFetchBlueReport } from '@/api/use-fetch-blue-report'
// import { useRoute } from 'vue-router'
// import { useProspectDetails } from '@/api/use-prospect-details.js'

export default {
  name: 'ShareBtn',
  props: {
    pdfRegion: {
      type: String,
      require: true,
      default: '',
    },
    idReport: {
      type: String,
      require: true,
      default: () => '',
    },
  },

  setup(props) {
    const store = useStore()
    // const route = useRoute()

    // const { isLoading: isLoadingProspectDetails, isError, data: member } = useProspectDetails()
    const { response: blueReportPdf, error, fetching, getBlueReport } = useFetchBlueReport(props.idReport)

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
      if (props.pdfRegion === 'blue-report') {
        await getBlueReport()
        const res = await fetch(blueReportPdf.value.data.link)
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        // link.setAttribute('download', member.value.name + '.pdf')
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
        setTimeout(function () {
          link.remove()
        }, 100)

        return
      }

      if (props.pdfRegion === 'client-report') {
        console.log('generate pdf client-report')
        // const elemRef = document.querySelector(`[data-pdf-region="${pdfConfig[props.pdfRegion].dataAttribute}"]`)
        // html2canvas(elemRef).then((canvas) => {
        //   const doc = new jsPDF()
        //   doc.text(pdfConfig[props.pdfRegion].titleText, 90, 25)
        //   doc.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', ...pdfConfig[props.pdfRegion].jsDocOptions)
        //   doc.save('report')
        // })
      }
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
      // isLoadingProspectDetails,
      // isError,
      // member,
    }
  },
}
</script>
