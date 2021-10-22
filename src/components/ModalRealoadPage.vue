<template>
  <el-dialog v-model="dialogVisible" title="Info" width="50%" center>
    <!-- <el-dialog v-model="dialogVisible" title="Info" width="50%" :before-close="handleClose"> -->
    <p>The application has a new version available.</p>
    <p>Please refresh the page to get latest updates</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, computed } from 'vue'
// import { ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const dialogVisible = ref(false)
    const store = useStore()

    const isShowModal = computed(() => store.state.globalComponents.showDialogReloadPage)

    watchEffect(() => {
      if (isShowModal.value) {
        dialogVisible.value = isShowModal.value
        console.log('isShowModal - ', isShowModal)
      }
    })

    // const handleClose = (done) => {
    //   ElMessageBox.confirm('Are you sure to close this dialog?')
    //     .then(() => {
    //       done()
    //     })
    //     .catch(() => {
    //       // catch error
    //     })
    // }
    return {
      dialogVisible,
      // handleClose,
    }
  },
})
</script>
