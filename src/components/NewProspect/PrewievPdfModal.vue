<template>
  <el-dialog
    v-model="dialogVisible"
    title="Prewiev PDF"
    width="80%"
    custom-class="dialog-style"
    :before-close="closeDialog"
  >
    <iframe type="application/pdf" :src="pdfUrl" width="750" height="450" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Close</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { useStore } from 'vuex'
import { computed, watchEffect } from 'vue'

export default {
  name: 'PrewiewPdfModal',
  props: {
    pdfUrl: {
      type: String,
      require: true,
      default: () => {},
    },
  },
  setup() {
    const store = useStore()

    const dialogVisible = computed(() => {
      return store.state.globalComponents.dialog.showDialog.prewievPdf
    })

    watchEffect(() => {
      dialogVisible.value = store.state.globalComponents.dialog.showDialog.prewievPdf
    })

    const closeDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'prewievPdf',
        value: false,
      })
    }

    return {
      closeDialog,
      dialogVisible,
    }
  },
}
</script>
