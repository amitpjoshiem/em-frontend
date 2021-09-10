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
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import IconShare from '@/assets/svg/icon-share.svg'
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

    const config = {
      'blue-report': {
        dataAttribute: 'blue-report',
        jsDocOptions: [0, 0, 210, 150],
      },
      'client-report': {
        dataAttribute: 'client-report',
        jsDocOptions: [0, 0, 210, 130],
      },
    }

    const downloadPdf = () => {
      const elemRef = document.querySelector(`[data-pdf-region="${config[props.pdfRegion].dataAttribute}"]`)
      html2canvas(elemRef).then((canvas) => {
        const doc = new jsPDF()
        doc.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', ...config[props.pdfRegion].jsDocOptions)
        doc.save('report')
      })
    }

    const actionsMap = {
      download: () => downloadPdf(),
      share: () => console.log('share'),
    }

    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    return {
      handleSelect,
      actionsOptions,
      IconShare,
    }
  },
}
</script>
