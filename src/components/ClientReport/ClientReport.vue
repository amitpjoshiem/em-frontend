<template>
  <div v-if="!isLoading && !isLoadingProspectDetails" class="p-5">
    <div class="pb-5 flex">
      <div class="w-3/12">
        <BackButton text="Back" @click="$router.go(-1)" />
      </div>
      <div class="w-6/12 text-center">
        <span class="text-title text-color-link font-semibold">{{ member.name }}</span>
        <span class="text-title text-main font-semibold"> Client report</span>
      </div>
      <div class="flex items-center w-4/12">
        <div class="mr-2">
          <el-date-picker
            v-model="value"
            type="daterange"
            start-placeholder="Start date"
            end-placeholder="End date"
            size="small"
          />
        </div>
      </div>
      <ShareBtn pdf-region="client-report" />
    </div>
    <template v-if="clientReport.data.length">
      <div class="flex w-full flex-wrap justify-between" data-pdf-region="client-report">
        <ContractItem v-for="item in clientReport.data" :key="item.id" :contract="item" />
      </div>
      <TotalInfo />
    </template>

    <div v-else class="flex flex-col items-center justify-center mt-10">
      <div class="bg-widget-bg rounded-full w-16 h-16 flex flex-col items-center justify-center mb-3">
        <InlineSvg :src="IconEmptyUsers" />
      </div>
      <p class="text-gray03 font-semibold text-xss mt-3">No client reports available</p>
    </div>
  </div>
  <el-skeleton v-else :rows="10" animated class="p-5" />
</template>
<script>
import { useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import ContractItem from '@/components/ClientReport/ContractItem.vue'
import TotalInfo from '@/components/ClientReport/TotalInfo.vue'
import { useClientReportsAll } from '@/api/use-fetch-client-reports-all.js'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import IconEmptyUsers from '@/assets/svg/icon-empty-users.svg'

export default {
  name: 'ClientReport',
  components: {
    ContractItem,
    TotalInfo,
  },
  setup() {
    const route = useRoute()

    const state = reactive({
      value: '',
    })

    const { isLoading, isError, data: clientReport } = useClientReportsAll(route.params.id)
    const { isLoading: isLoadingProspectDetails, isError: isErrorProspectDetails, data: member } = useProspectDetails()

    return {
      isLoading,
      isError,
      clientReport,
      isLoadingProspectDetails,
      isErrorProspectDetails,
      member,
      IconEmptyUsers,
      ...toRefs(state),
    }
  },
}
</script>
