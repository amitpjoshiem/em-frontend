<template>
  <div class="p-5">
    <SwdSubHeader :title="getTitle" />
    <div class="flex my-5">
      <WidgetMemberDetails v-if="!isLoadingProspectDetails" :user="data" @updateMemberInfo="updateMemberInfo" />
      <el-skeleton v-else :rows="6" animated class="w-8/24 pr-5 h-[264px]" />
      <AssetsAllocation />
    </div>
    <div class="flex mb-5">
      <WidgetPastStress />
      <RetirementIncomePlan />
    </div>
    <OpportunityTable class="mb-10" :prospect="data ? data : {}" />
    <AssetsConsolidations class="mb-10" />
  </div>
</template>
<script>
import OpportunityTable from '@/components/MemberDetails/OpportunityTable.vue'
import WidgetMemberDetails from '@/components/MemberDetails/WidgetMemberDetails.vue'
import AssetsAllocation from '@/components/MemberDetails/AssetsAllocation.vue'
import WidgetPastStress from '@/components/MemberDetails/WidgetPastStress.vue'
import RetirementIncomePlan from '@/components/MemberDetails/RetirementIncomePlan.vue'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { computed } from 'vue'

import AssetsConsolidations from '@/components/NewProspect/AssetsConsolidations/AssetsConsolidations.vue'

export default {
  name: 'MemberDetails',
  components: {
    OpportunityTable,
    WidgetMemberDetails,
    AssetsAllocation,
    WidgetPastStress,
    RetirementIncomePlan,
    AssetsConsolidations,
  },

  setup() {
    const { isLoading: isLoadingProspectDetails, isError, data, updateMemberInfo } = useProspectDetails()

    const getTitle = computed(() => {
      if (data.value && data.value.type === 'prospect') return 'Prospect details'
      return 'Client details'
    })

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
