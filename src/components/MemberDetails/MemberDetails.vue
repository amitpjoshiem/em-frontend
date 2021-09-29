<template>
  <div class="p-5">
    <SwdSubHeader :title="getTitle" />
    <div class="flex my-5">
      <WidgetMemberDetails v-if="!isLoadingProspectDetails" :user="data" @updateMemberInfo="updateMemberInfo" />
      <el-skeleton v-else :rows="6" animated class="w-8/24 pr-5 h-[264px]" />
      <AssetsAllocation />
    </div>
    <div class="flex mb-5">
      <PastStressTestResults />
      <RetirementIncomePlan />
    </div>
    <OpportunityTable class="mb-10" :prospect="data ? data : {}" />
    <TableAssetsConsolidations class="mb-10" />
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import OpportunityTable from '@/components/MemberDetails/OpportunityTable.vue'
import TableAssetsConsolidations from '@/components/Table/TableAssetsConsolidations.vue'
import WidgetMemberDetails from '@/components/MemberDetails/WidgetMemberDetails.vue'
import AssetsAllocation from '@/components/MemberDetails/AssetsAllocation.vue'
import PastStressTestResults from '@/components/MemberDetails/PastStressTestResults.vue'
import RetirementIncomePlan from '@/components/MemberDetails/RetirementIncomePlan.vue'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { computed } from 'vue'
import { useQueryClient } from 'vue-query'

export default {
  name: 'MemberDetails',
  components: {
    OpportunityTable,
    TableAssetsConsolidations,
    WidgetMemberDetails,
    AssetsAllocation,
    PastStressTestResults,
    RetirementIncomePlan,
  },

  setup() {
    const route = useRoute()
    const id = route.params.id
    const queryClient = useQueryClient()

    const { isLoading: isLoadingProspectDetails, isError, data } = useProspectDetails(id)

    const getTitle = computed(() => {
      if (data.value && data.value.type === 'prospect') return 'Prospect details'
      return 'Client details'
    })

    const updateMemberInfo = () => {
      queryClient.invalidateQueries(['member'])
    }

    return {
      isLoadingProspectDetails,
      isError,
      data,
      getTitle,
      updateMemberInfo,
    }
  },
}
</script>
