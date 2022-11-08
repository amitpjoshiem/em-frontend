<template>
  <el-dialog v-model="dialogVisible" title="Summary Info" :before-close="closeDialog" width="75%">
    <div class="flex flex-col items-center">
      <span class="my-5 text-center"> SwdModalSummaryInfo </span>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <div class="flex justify-end">
          <SwdButton info main class="w-2/12" @click="closeDialog">Close</SwdButton>
        </div>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'SwdModalSummaryInfo',
  props: {
    text: {
      type: String,
      require: false,
      default: 'Succes',
    },
  },
  setup() {
    const store = useStore()
    const dialogVisible = ref(false)

    const closeDialog = () => {
      dialogVisible.value = false
      store.commit('globalComponents/setShowModal', {
        destination: 'modalSummaryInfo',
        value: false,
      })
    }

    watchEffect(() => {
      dialogVisible.value = store.state.globalComponents.dialog.showDialog.modalSummaryInfo
    })

    return {
      dialogVisible,
      closeDialog,
    }
  },
}
</script>
