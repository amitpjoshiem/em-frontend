<template>
  <SwdDropDown class="ml-2" :options="actionsOptions" @select="handleSelect">
    <template #titleDropDown>
      <span class="cursor-pointer bg-white rounded flex justify-center items-center py-2 px-3 border border-color-grey">
        <InlineSvg :src="IconShare" />
      </span>
    </template>
  </SwdDropDown>
  <SwdShareDialog :pdf-region="pdfRegion" />
</template>

<script>
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import IconShare from '@/assets/svg/icon-share.svg'
import { useStore } from 'vuex'
import SwdShareDialog from '@/components/Global/SwdShareDialog.vue'
import { pdfConfig } from '@/config/pdf-config'

export default {
  name: 'ShareBtn',
  components: {
    SwdShareDialog,
  },
  props: {
    pdfRegion: {
      type: String,
      require: true,
      default: '',
    },
  },

  setup(props) {
    const store = useStore()

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

    const downloadPdf = () => {
      const elemRef = document.querySelector(`[data-pdf-region="${pdfConfig[props.pdfRegion].dataAttribute}"]`)
      html2canvas(elemRef).then((canvas) => {
        const doc = new jsPDF()
        doc.text(pdfConfig[props.pdfRegion].titleText, 90, 25)
        doc.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', ...pdfConfig[props.pdfRegion].jsDocOptions)
        doc.save('report')
      })
    }

    const actionsMap = {
      download: () => downloadPdf(),
      share: () => share(),
    }

    const share = () => {
      console.log("HERE")
      store.commit('globalComponents/setShowModal', {
        destination: 'shareFileEmailDialog',
        value: true,
      })
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
