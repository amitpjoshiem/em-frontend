<template>
  <div class="p-5">
    <SwdSubHeader
      :title="getTitle"
      witch-info-btn
      info-btn-destination="MemberDetails"
      :loading="isLoadingProspectDetails"
    />
    <MemberStep v-if="!isLoadingProspectDetails && member.type === 'prospect'" />
    <div class="flex my-5">
      <div class="w-8/24 mr-5">
        <WidgetMemberDetails />
        <InfoSalesforceStatus v-if="showContent.infoSalesforceStatus" />
      </div>
      <OpportunityTable class="w-16/24" />
    </div>
    <div class="flex mb-5">
      <WidgetFixedAnnuity />
    </div>
    <div class="flex">
      <WidgetPastStress />
      <AssetsAllocation />
      <WidgetOther />
    </div>
  </div>
</template>
<script>
import OpportunityTable from '@/components/MemberDetails/OpportunityTable.vue'
import WidgetMemberDetails from '@/components/MemberDetails/WidgetMemberDetails.vue'
import AssetsAllocation from '@/components/MemberDetails/AssetsAllocation.vue'
import WidgetPastStress from '@/components/MemberDetails/WidgetPastStress.vue'
import WidgetFixedAnnuity from '@/components/MemberDetails/WidgetFixedAnnuity.vue'
import WidgetOther from '@/components/MemberDetails/WidgetOther.vue'
import MemberStep from '@/components/MemberDetails/MemberStep.vue'
import InfoSalesforceStatus from '@/components/MemberDetails/InfoSalesforceStatus.vue'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { computed } from 'vue'
import { useShowContentEnv } from '@/hooks/use-show-content-env'

export default {
  name: 'MemberDetails',
  components: {
    OpportunityTable,
    WidgetMemberDetails,
    AssetsAllocation,
    WidgetPastStress,
    WidgetOther,
    InfoSalesforceStatus,
    WidgetFixedAnnuity,
    MemberStep,
  },

  setup() {
    const { isLoading: isLoadingProspectDetails, isError, data: member } = useProspectDetails()
    const { showContent } = useShowContentEnv()

    const getTitle = computed(() => {
      if (member.value && member.value.type === 'prospect') return 'Opportunity details'
      return 'Client details'
    })

    return {
      isLoadingProspectDetails,
      isError,
      member,
      getTitle,
      showContent,
    }
  },
}
</script>
