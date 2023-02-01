<template>
  <el-dialog
    v-model="dialogVisible"
    title="Preview"
    width="90%"
    :before-close="closeDialog"
    destroy-on-close
    class="mt-10 sm:mt-40 lg:mt-40"
  >
    <div class="h-[600px]">
      <iframe :src="getSrcMicrosoft" width="100%" height="100%" frameborder="0" />
    </div>
    <div v-if="previewFile && false" class="overflow-y-scroll max-h-[500px]">
      <img v-if="configImageExtension.includes(previewFile.extension)" :src="previewFile.url" alt="preview-image" />
      <SwdPdfViewer v-if="previewFile.extension === 'pdf'" type="application/pdf" :src="previewFile.url" :page="1" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <div class="flex justify-end">
          <SwdButton class="px-4 py-1" info @click="closeDialog">Close</SwdButton>
        </div>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { useStore } from 'vuex'
import { ref, watchEffect, computed } from 'vue'
import SwdPdfViewer from '@/components/Global/SwdPdfViewer'

export default {
  name: 'SwdPreviewModal',
  components: {
    SwdPdfViewer,
  },
  setup() {
    const store = useStore()
    const dialogVisible = ref(false)
    const configImageExtension = ['jpeg', 'jpg', 'png']

    const previewFile = computed(() => {
      return store.state.globalComponents.previewFile
    })

    watchEffect(() => {
      dialogVisible.value = store.state.globalComponents.dialog.showDialog.previewModal
    })

    const closeDialog = () => {
      dialogVisible.value = false
      store.commit('globalComponents/setShowModal', {
        destination: 'previewModal',
        value: false,
      })
      store.commit('globalComponents/setPreviewFile', null)
    }

    const getSrcMicrosoft = computed(() => {
      return 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(previewFile.value.url)
    })

    return {
      closeDialog,
      previewFile,
      dialogVisible,
      configImageExtension,
      getSrcMicrosoft,
    }
  },
}
</script>
