<template>
  <el-dialog v-model="dialogVisible" title="Info" width="50%" center custom-class="dialog-reload">
    <p>The application has a new version available.</p>
    <p>Please refresh the page to get latest updates</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="reloadPage">Reload</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { useModalReloadPage } from '@/components/ModalReloadPage/use-modal-reload-page.js'

export default defineComponent({
  setup() {
    const dialogVisible = ref(false)

    const { isShowModal, reloadPage } = useModalReloadPage()

    watchEffect(() => {
      if (isShowModal.value) {
        dialogVisible.value = isShowModal.value
      }
    })

    return {
      dialogVisible,
      reloadPage,
    }
  },
})
</script>
