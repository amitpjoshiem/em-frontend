<template>
  <el-dialog
    v-model="dialogVisible"
    title="Preview"
    width="90%"
    :before-close="closeDialog"
    destroy-on-close
    class="mt-10 sm:mt-40 lg:mt-16"
  >
    <div v-if="previewFile" class="overflow-y-scroll max-h-[65vh]">
      <img
        v-if="configImageExtension.includes(previewFile.extension.toLowerCase())"
        :src="previewFile.url"
        alt="preview-image"
      />
      <SwdPdfViewer
        v-if="previewFile.extension.toLowerCase() === 'pdf'"
        type="application/pdf"
        :src="previewFile.url"
        :page="1"
      />
      <iframe
        v-if="configMicrosoftExtension.includes(previewFile.extension.toLowerCase())"
        :src="getSrcMicrosoft"
        width="100%"
        height="500px;"
        frameborder="0"
      />
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
    const configMicrosoftExtension = ['doc', 'docx', 'xls', 'xlsx']

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
      configMicrosoftExtension,
      getSrcMicrosoft,
    }
  },
}
</script>
