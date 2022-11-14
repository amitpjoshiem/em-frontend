<template>
  <el-dialog
    v-model="dialogVisible"
    title="Info"
    width="50%"
    center
    :show-close="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <div class="info-read-only">
      Thank you for submitting all the required detail. Your information is under review at the moment, our advisor will
      connect with you nearest time. You cannot change your details when it is under review.
    </div>
    <template #footer>
      <span class="dialog-footer">
        <div class="flex justify-end">
          <div class="pr-3">
            <Button default-gray-btn text-btn="Close" @click="handleClose" />
          </div>
        </div>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ModalReadOnly',
  setup() {
    const store = useStore()

    const dialogVisible = ref(false)

    watchEffect(() => {
      dialogVisible.value = store.state.globalComponents.showModalReadOnly
    })

    const handleClose = () => {
      store.commit('globalComponents/setShowModalReadOnly', false)
    }

    return {
      dialogVisible,
      handleClose,
    }
  },
})
</script>

<style scoped>
.info-read-only {
  word-break: break-word;
}
</style>
