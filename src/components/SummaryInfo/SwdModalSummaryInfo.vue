<template>
  <el-dialog
    v-model="dialogVisible"
    title="Summary Info"
    :before-close="closeDialog"
    width="75%"
    custom-class="summary-info"
  >
    <SwdSpinner v-if="isLoadingMember" />

    <div v-else>
      <GeneralInfo :member="member" />
      <AnnualReviewsInfo :member="member" />
      <HouseHoldInfo :member="member" />
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
import { useFetchSummaryInfo } from '@/api/use-fetch-summary-info.js'
import GeneralInfo from './GeneralInfo.vue'
import AnnualReviewsInfo from './AnnualReviewsInfo.vue'
import HouseHoldInfo from './HouseHoldInfo.vue'

export default {
  name: 'SwdModalSummaryInfo',
  components: {
    GeneralInfo,
    AnnualReviewsInfo,
    HouseHoldInfo,
  },
  setup() {
    const store = useStore()
    const dialogVisible = ref(false)

    const { isLoading: isLoadingMember, data: member, refetch } = useFetchSummaryInfo({ enabled: false })

    const closeDialog = () => {
      dialogVisible.value = false
      store.commit('globalComponents/setShowModal', {
        destination: 'modalSummaryInfo',
        value: false,
      })
      store.commit('globalComponents/setSummaryInfoMemberId', null)
    }

    watchEffect(() => {
      if (store.state.globalComponents.dialog.showDialog.modalSummaryInfo) {
        dialogVisible.value = store.state.globalComponents.dialog.showDialog.modalSummaryInfo
      }
      if (store.state.globalComponents.summaryInfoMemberId) {
        refetch.value()
      }
    })

    return {
      dialogVisible,
      closeDialog,
      isLoadingMember,
      member,
    }
  },
}
</script>

<style>
.summary-info .el-dialog__body {
  height: 70vh;
  overflow-y: scroll;
}

.summary-info {
  margin-top: 10vh !important;
}
</style>
