<template>
  <div v-if="!isLoading && !isLoadingProspectDetails" class="p-5">
    <div class="pb-5 flex">
      <div class="w-3/12">
        <router-link :to="{ name: 'list-of-households' }">
          <BackButton text="Back" @click="$router.go(-1)" />
        </router-link>
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
        <ShareBtn pdf-region="client-report" />
      </div>
    </div>
    <div class="flex w-full flex-wrap justify-between" data-pdf-region="client-report">
      <CurrentYear v-for="item in clientReport.data.current_year" :key="item.id" :contract="item" />
    </div>
    <TotalInfo />
  </div>
  <el-skeleton v-else :rows="10" animated class="p-5" />
</template>
<script>
import { useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import CurrentYear from '@/components/ClientReport/CurrentYear.vue'
import TotalInfo from '@/components/ClientReport/TotalInfo.vue'
import { useClientReports } from '@/api/use-fetch-client-reports.js'
import { useProspectDetails } from '@/api/use-prospect-details.js'

export default {
  name: 'ClientReport',
  components: {
    CurrentYear,
    TotalInfo,
  },
  setup() {
    const route = useRoute()

    const state = reactive({
      value: '',
    })

    const { isLoading, isError, data: clientReport } = useClientReports(route.params.id)
    const { isLoading: isLoadingProspectDetails, isError: isErrorProspectDetails, data: member } = useProspectDetails()

    return {
      isLoading,
      isError,
      clientReport,
      isLoadingProspectDetails,
      isErrorProspectDetails,
      member,
      ...toRefs(state),
    }
  },
}
</script>
