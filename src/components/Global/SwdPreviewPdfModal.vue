<template>
  <el-dialog
    v-model="state.dialogVisible"
    title="Prewiev PDF"
    width="90%"
    custom-class="dialog-style pdf-viewer"
    :before-close="closeDialog"
    destroy-on-close
  >
    <SwdPdfViewer type="application/pdf" :src="getPdfUrl" :page="1" />
    <template #footer>
      <span class="dialog-footer">
        <SwdButton class="ml-2" info @click="closeDialog">Close</SwdButton>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, watchEffect, computed } from 'vue'
import SwdPdfViewer from '@/components/Global/SwdPdfViewer'

export default {
  name: 'SwdPreviewPdfModal',
  components: {
    SwdPdfViewer,
  },
  setup() {
    const store = useStore()

    const state = reactive({
      dialogVisible: false,
    })

    const getPdfUrl = computed(() => {
      return store.state.globalComponents.previewUrl
    })

    watchEffect(() => {
      state.dialogVisible = store.state.globalComponents.dialog.showDialog.prewievPdf
    })

    const closeDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: false,
      })
      store.commit('globalComponents/setPreviewUrlPdf', null)
    }

    return {
      closeDialog,
      state,
      getPdfUrl,
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
