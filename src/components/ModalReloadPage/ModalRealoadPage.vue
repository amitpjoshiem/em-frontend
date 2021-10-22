<template>
  <el-dialog v-model="isShowModal" title="Info" width="50%" center custom-class="dialog-reload">
    <p>The application has a new version available.</p>
    <p>Please refresh the page to get latest updates</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hideModal">Cancel</el-button>
        <el-button type="primary" @click="reloadPage">Reload</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { useModalReloadPage } from '@/components/ModalReloadPage/use-modal-reload-page.js'

export default defineComponent({
  setup() {
    const { isShowModal, reloadPage, hideModal } = useModalReloadPage()

    return {
      reloadPage,
      isShowModal,
      hideModal,
    }
  },
})
</script>
