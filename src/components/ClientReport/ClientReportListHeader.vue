<template>
  <div class="pb-5 flex">
    <div class="w-4/12">
      <BackButton text="Back" @click="$router.go(-1)" />
    </div>

    <div class="w-4/12 flex justify-center items-center">
      <SwdSpinner v-if="isLoadingProspectDetails" class="mr-2" />
      <span v-else class="text-title text-color-link font-semibold mr-2">{{ member.name }}</span>
      <span class="text-title text-main font-semibold">Client report</span>
    </div>

    <div class="flex items-center w-4/12 client-report-range">
      <el-date-picker
        v-model="dateRange"
        format="MM/DD/YYYY"
        value-format="YYYY-MM-DD"
        type="daterange"
        start-placeholder="Start date"
        end-placeholder="End date"
        size="small"
        @change="handleChange"
      />
      <ShareBtn pdf-region="client-report" />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useProspectDetails } from '@/api/use-prospect-details.js'

export default {
  name: 'ClientReportListHeader',
  setup() {
    const store = useStore()
    const dateRange = ref('')

    const { isLoading: isLoadingProspectDetails, isError: isErrorProspectDetails, data: member } = useProspectDetails()

    const handleChange = () => {
      store.commit('globalComponents/setDateRangeClientReport', dateRange.value)
    }

    return {
      handleChange,
      isLoadingProspectDetails,
      isErrorProspectDetails,
      member,
      dateRange,
    }
  },
}
</script>
