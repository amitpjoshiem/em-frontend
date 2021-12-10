<template>
  <div class="p-5">
    <SwdSubHeader :title="getTitle" />
    <div v-if="!isLoadingProspectDetails" class="flex my-5">
      <div class="w-8/24 mr-5">
        <WidgetMemberDetails :user="member" @updateMemberInfo="updateMemberInfo" />
        <!-- <InfoSalesforceAcc /> -->
      </div>
      <AssetsAllocation class="w-10/24" />
      <WidgetOther :other="other" />
    </div>
    <el-skeleton v-else :rows="6" animated class="pr-5 h-[264px]" />
    <div class="flex mb-5">
      <WidgetPastStress />
      <RetirementIncomePlan />
    </div>
    <OpportunityTable class="mb-10" :prospect="member ? member : {}" />
  </div>
</template>
<script>
import OpportunityTable from '@/components/MemberDetails/OpportunityTable.vue'
import WidgetMemberDetails from '@/components/MemberDetails/WidgetMemberDetails.vue'
import AssetsAllocation from '@/components/MemberDetails/AssetsAllocation.vue'
import WidgetPastStress from '@/components/MemberDetails/WidgetPastStress.vue'
import RetirementIncomePlan from '@/components/MemberDetails/RetirementIncomePlan.vue'
import WidgetOther from '@/components/MemberDetails/WidgetOther.vue'
// import InfoSalesforceAcc from '@/components/MemberDetails/InfoSalesforceAcc.vue'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { computed } from 'vue'

export default {
  name: 'MemberDetails',
  components: {
    OpportunityTable,
    WidgetMemberDetails,
    AssetsAllocation,
    WidgetPastStress,
    RetirementIncomePlan,
    WidgetOther,
    // InfoSalesforceAcc,
  },

  setup() {
    const { isLoading: isLoadingProspectDetails, isError, data: member, updateMemberInfo, other } = useProspectDetails()

    const getTitle = computed(() => {
      if (member.value && member.value.type === 'prospect') return 'Prospect details'
      return 'Client details'
    })

    return {
      isLoadingProspectDetails,
      isError,
      member,
      getTitle,
      updateMemberInfo,
      other,
    }
  },
}
</script>
