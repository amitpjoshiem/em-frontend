<template>
  <el-dialog v-model="state.dialogVisible" title="Succes" :before-close="closeDialog" class="modal-succes-style">
    <div class="flex flex-col items-center">
      <InlineSvg :src="IconSuccesChanged" />
      <span class="my-5 text-center">
        {{ text }}
      </span>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <SwdButton info main @click="closeDialog">Close</SwdButton>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import IconSuccesChanged from '@/assets/svg/icon-succes-changed.svg'
import { reactive, watchEffect } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'SwdModalSucces',
  props: {
    text: {
      type: String,
      require: false,
      default: 'Succes',
    },
  },
  setup() {
    const store = useStore()

    const state = reactive({
      dialogVisible: false,
    })

    const closeDialog = () => {
      state.dialogVisible = false
      store.commit('globalComponents/setShowModal', {
        destination: 'modalSucces',
        value: false,
      })
    }

    watchEffect(() => {
      state.dialogVisible = store.state.globalComponents.dialog.showDialog.modalSucces
    })

    return {
      IconSuccesChanged,
      state,
      closeDialog,
    }
  },
}
</script>

<style>
.modal-succes-style {
  width: 100%;
}
@media (min-width: 640px) {
  .modal-succes-style {
    width: 50%;
  }
}
</style>
