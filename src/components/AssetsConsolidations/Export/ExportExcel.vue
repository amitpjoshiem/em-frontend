<template>
  <SwdButton primary small @click="exportExcel">Export to Excel</SwdButton>
  <el-dialog v-model="state.dialogVisible" title="Export to Excel" width="45%" :before-close="closeDialog">
    <div class="flex flex-col items-center">
      <InlineSvg :src="IconSuccesChanged" />
      <div class="pt-8">Export to Excel success.</div>
      <div class="pt-2">
        <span>You can find the file created in the</span>
        <router-link
          :to="{ name: `${route.meta.type}/document-export`, params: { id: memberId } }"
          class="text-activity"
        >
          List of documents.
        </router-link>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <SwdButton primary main class="ml-2" @click="closeDialog">Close</SwdButton>
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
      memberId,
      create,
      isLoading,
      isError,
      isFetching,
      data,
      route,
    }
  },
}
</script>
