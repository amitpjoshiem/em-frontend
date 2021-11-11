<template>
  <el-button size="mini" type="success" plain @click="exportExcel">Export to Excel</el-button>
  <el-dialog v-model="state.dialogVisible" title="Export to Excel" width="40%" :before-close="closeDialog">
    <div class="flex flex-col items-center">
      <InlineSvg :src="IconSuccesChanged" />
      <div class="pt-8">Export to Excel success</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Close</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { reactive } from 'vue'
import IconSuccesChanged from '@/assets/svg/icon-succes-changed.svg'
import { createAssetssConsolidationsExcel } from '@/api/vueQuery/create-assets-consolidations-excel'
import { useMutation } from 'vue-query'
import { useRoute } from 'vue-router'

export default {
  name: 'ExportExcel',
  setup() {
    const route = useRoute()

    const memberId = route.params.id

    const state = reactive({
      dialogVisible: false,
    })

    const { mutateAsync: create, isLoading, isError, isFetching, data } = useMutation(createAssetssConsolidationsExcel)

    const closeDialog = () => {
      state.dialogVisible = false
    }

    const exportExcel = async () => {
      const res = await create(memberId)
      if (!('error' in res)) {
        state.dialogVisible = true
      }
    }

    return {
      exportExcel,
      state,
      closeDialog,
      IconSuccesChanged,

      create,
      isLoading,
      isError,
      isFetching,
      data,
    }
  },
}
</script>
