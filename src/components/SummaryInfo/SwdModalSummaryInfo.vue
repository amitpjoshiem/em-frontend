<template>
  <el-dialog
    v-model="dialogVisible"
    title="Summary Info"
    :before-close="closeDialog"
    width="75%"
    class="summary-info"
    destroy-on-close
  >
    <div v-if="isLoadingMember" class="flex justify-center items-center">
      <SwdSpinner large />
    </div>

    <div v-else>
      <GeneralInfo :member="member" />
      <AnnualReviewsInfo :annual-reviews="member.salesforce.annualReviews" />
      <HouseHoldInfo :member="member" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <div v-if="!isLoadingMember" class="flex justify-end">
          <SwdButton primary main class="mr-4" @click="details">
            {{ getTextBtn }}
          </SwdButton>
          <SwdButton info main @click="closeDialog">Close</SwdButton>
        </div>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { useFetchSummaryInfo } from '@/api/use-fetch-summary-info.js'
import GeneralInfo from './GeneralInfo.vue'
import AnnualReviewsInfo from './AnnualReviews/AnnualReviews.vue'
import HouseHoldInfo from './HouseHoldInfo.vue'
import { useGetDetails } from '@/hooks/use-get-details'

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

    const { getDetails } = useGetDetails()

    const closeDialog = () => {
      dialogVisible.value = false
      store.commit('globalComponents/setShowModal', {
        destination: 'modalSummaryInfo',
        value: false,
      })
    }

    watchEffect(() => {
      if (store.state.globalComponents.dialog.showDialog.modalSummaryInfo) {
        dialogVisible.value = store.state.globalComponents.dialog.showDialog.modalSummaryInfo
      }
      if (store.state.globalComponents.summaryInfoMemberId !== null) {
        refetch.value()
      }
    })

    const details = () => {
      closeDialog()
      getDetails({ member: member.value })
    }

    const getTextBtn = computed(() => {
      if (member.value.step !== 'default' || member.value.type === 'client') return 'More Details'
      return 'Onboarding'
    })

    return {
      dialogVisible,
      closeDialog,
      isLoadingMember,
      member,
      details,
      getTextBtn,
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
