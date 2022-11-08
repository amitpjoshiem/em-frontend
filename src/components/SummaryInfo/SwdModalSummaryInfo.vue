<template>
  <el-dialog
    v-model="dialogVisible"
    title="Summary Info"
    :before-close="closeDialog"
    width="75%"
    custom-class="summary-info"
    destroy-on-close
  >
    <div v-if="isLoadingMember" class="flex justify-center items-center">
      <SwdSpinner large />
    </div>

    <div v-else>
      <GeneralInfo :member="member" />
      <AnnualReviewsInfo :member="member" />
      <HouseHoldInfo :member="member" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <div class="flex justify-end">
          <SwdButton primary main class="w-2/12 mr-4" @click="getDetails">Details</SwdButton>
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
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'SwdModalSummaryInfo',
  components: {
    GeneralInfo,
    AnnualReviewsInfo,
    HouseHoldInfo,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const dialogVisible = ref(false)

    const { isLoading: isLoadingMember, data: member, refetch } = useFetchSummaryInfo({ enabled: false })

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

    const getDetails = () => {
      closeDialog()
      if (member.value.type === 'client') {
        router.push({ name: `${route.meta.type}/member-details`, params: { id: member.value.id } })
        return
      }

      if (member.value.step === 'default') {
        router.push({ name: 'basic-information', params: { id: member.value.id } })
        return
      }

      if (member.value.step !== 'default') {
        router.push({ name: `${route.meta.type}/member-details`, params: { id: member.value.id } })
        return
      }
    }

    return {
      dialogVisible,
      closeDialog,
      isLoadingMember,
      member,
      getDetails,
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
