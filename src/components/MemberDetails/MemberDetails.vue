<template>
  <SwdWrapper>
    <SwdSubHeader
      :title="getTitle"
      witch-info-btn
      info-btn-destination="MemberDetails"
      :loading="isLoadingProspectDetails"
    />
    <div v-if="isLoadingProspectDetails" class="flex items-center justify-center">
      <SwdSpinner />
    </div>
    <MemberStage
      v-else-if="!isLoadingProspectDetails && member.type === 'prospect'"
      :current-stage="salesforce.value.stage"
    />

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
  </SwdWrapper>
</template>
<script>
import OpportunityTable from '@/components/MemberDetails/OpportunityTable.vue'
import WidgetMemberDetails from '@/components/MemberDetails/WidgetMemberDetails.vue'
import AssetsAllocation from '@/components/MemberDetails/AssetsAllocation.vue'
import WidgetPastStress from '@/components/MemberDetails/WidgetPastStress.vue'
import WidgetFixedAnnuity from '@/components/MemberDetails/WidgetFixedAnnuity.vue'
import WidgetOther from '@/components/MemberDetails/WidgetOther.vue'
import MemberStage from '@/components/MemberDetails/MemberStage.vue'
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
    MemberStage,
  },

  setup() {
    const { isLoading: isLoadingProspectDetails, isError, data: member, salesforce } = useProspectDetails()
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
      salesforce,
    }
  },
}
</script>
