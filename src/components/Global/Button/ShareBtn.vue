<template>
  <SwdDropDown class="ml-2" :options="actionsOptions" @select="handleSelect">
    <template #titleDropDown>
      <span class="cursor-pointer bg-white rounded flex justify-center items-center py-2 px-3 border border-color-grey">
        <InlineSvg :src="IconShare" />
      </span>
    </template>
  </SwdDropDown>
  <SwdShareDialog />
</template>

<script>
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import IconShare from '@/assets/svg/icon-share.svg'
import { useStore } from 'vuex'
import SwdShareDialog from '@/components/Global/SwdShareDialog.vue'

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

    const config = {
      'blue-report': {
        dataAttribute: 'blue-report',
        jsDocOptions: [10, 40, 190, 130],
        titleText: 'Blueprint report',
      },
      'client-report': {
        dataAttribute: 'client-report',
        jsDocOptions: [10, 40, 190, 80],
        titleText: 'Client report',
      },
    }

    const downloadPdf = () => {
      const elemRef = document.querySelector(`[data-pdf-region="${config[props.pdfRegion].dataAttribute}"]`)
      html2canvas(elemRef).then((canvas) => {
        const doc = new jsPDF()
        doc.text(config[props.pdfRegion].titleText, 90, 25)
        doc.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', ...config[props.pdfRegion].jsDocOptions)
        doc.save('report')
      })
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
