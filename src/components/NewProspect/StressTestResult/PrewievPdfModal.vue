<template>
  <el-dialog
    v-model="state.dialogVisible"
    title="Prewiev PDF"
    width="80%"
    custom-class="dialog-style pdf-viewer"
    :before-close="closeDialog"
  >
    <PdfViewer type="application/pdf" :src="pdfUrl" :page="1" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Close</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, watchEffect } from 'vue'
import PdfViewer from '@/components/NewProspect/StressTestResult/PdfViewer'

export default {
  name: 'PrewiewPdfModal',
  components: {
    PdfViewer,
  },
  props: {
    pdfUrl: {
      type: String,
      require: true,
      default: () => {},
    },
  },
  setup() {
    const store = useStore()

    const state = reactive({
      dialogVisible: false,
    })

    watchEffect(() => {
      state.dialogVisible = store.state.globalComponents.dialog.showDialog.prewievPdf
    })

    const closeDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: false,
      })
    }

    return {
      closeDialog,
      state,
    }
  },
}
</script>

<style>
.pdf-viewer .el-dialog__body {
  max-height: 70vh;
  overflow: scroll;
}
</style>
