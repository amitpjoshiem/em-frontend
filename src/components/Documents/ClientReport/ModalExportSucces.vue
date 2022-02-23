<template>
  <el-dialog v-model="state.dialogVisible" title="Export report" width="45%" :before-close="closeDialog">
    <div class="flex flex-col items-center">
      <InlineSvg :src="IconSuccesChanged" />
      <div class="pt-8">Export success.</div>
      <div class="pt-2">
        <span>You can find the file created in the</span>
        <span class="text-activity cursor-pointer" @click="goAllList"> List of documents.</span>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Close</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import IconSuccesChanged from '@/assets/svg/icon-succes-changed.svg'
import { computed, reactive, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'ModalExportSucces',
  setup() {
    const store = useStore()
    const router = useRouter()

    const state = reactive({
      dialogVisible: false,
    })

    const closeDialog = () => {
      state.dialogVisible = false
      store.commit('globalComponents/setShowModal', {
        destination: 'exportSucces',
        value: false,
      })
    }

    const getParams = computed(() => {
      return store.state.globalComponents.memberId
    })

    const getType = computed(() => {
      if (store.state.globalComponents.pdfRegion === 'client-report') return 'client'
      return 'blueprint'
    })

    const goAllList = () => {
      closeDialog()
      router.push({ name: 'all-report', params: { id: getParams.value }, query: { type: getType.value } })
    }

    watchEffect(() => {
      state.dialogVisible = store.state.globalComponents.dialog.showDialog.exportSucces
    })

    return {
      IconSuccesChanged,
      state,
      closeDialog,
      getParams,
      getType,
      goAllList,
    }
  },
}
</script>
