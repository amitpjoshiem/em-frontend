<template>
  <el-dialog v-model="dialogVisible" title="Draft" width="40%" :before-close="closeDialog">
    <span>Do you want to recover data from a draft?</span>
    <template #footer>
      <div class="flex justify-between">
        <el-button plain type="danger" @click="handleDelete">Delete draft</el-button>
        <div>
          <el-button @click="closeDialog">Cancel</el-button>
          <el-button type="primary" @click="handleRestore"> Confirm </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { useStore } from 'vuex'
import { watchEffect, ref } from 'vue'

export default {
  name: 'ModalRestoreDraft',
  emits: ['restoreDraft', 'deleteDraft'],
  setup(_, { emit }) {
    const store = useStore()
    const dialogVisible = ref(false)

    watchEffect(() => {
      dialogVisible.value = store.state.globalComponents.dialog.showDialog.restoreDraft
    })

    const closeDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'restoreDraft',
        value: false,
      })
    }

    const handleRestore = () => {
      emit('restoreDraft')
      closeDialog()
    }

    const handleDelete = () => {
      emit('deleteDraft')
      closeDialog()
    }

    return {
      dialogVisible,
      closeDialog,
      handleRestore,
      handleDelete,
    }
  },
}
</script>
