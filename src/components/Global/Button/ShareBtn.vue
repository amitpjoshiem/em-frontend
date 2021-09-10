<template>
  <DropDown class="ml-2" :options="actionsOptions" @select="handleSelect">
    <template #titleDropDown>
      <span class="cursor-pointer bg-white rounded flex justify-center items-center py-2 px-3 border border-color-grey">
        <InlineSvg :src="IconShare" />
      </span>
    </template>
  </DropDown>
</template>

<script>
import { useRoute } from 'vue-router'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import IconShare from '@/assets/svg/icon-share.svg'
export default {
  name: 'ShareBtn',
  setup() {
    const route = useRoute()
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

    const actionsMap = {
      download: () => downloadPdf(),
      share: () => console.log('share'),
    }

    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    const downloadPdf = () => {
      if (route.name === 'bluereport') downloadPdfBlueReport()
      if (route.name === 'clientreport') downloadPdfClientReport()
    }

    const downloadPdfBlueReport = () => {
      html2canvas(document.getElementById('blue-report')).then((canvas) => {
        const doc = new jsPDF()
        doc.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, 210, 150)
        doc.save('report')
      })
    }

    const downloadPdfClientReport = () => {
      html2canvas(document.getElementById('client-report')).then((canvas) => {
        const doc = new jsPDF()
        doc.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, 210, 130)
        doc.save('report')
      })
    }

    return {
      handleSelect,
      actionsOptions,
      IconShare,
    }
  },
}
</script>
