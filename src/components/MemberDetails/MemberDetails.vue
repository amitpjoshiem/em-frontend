<template>
  <SwdWrapper>
    <SwdSubHeader
      v-if="!$can('client', 'all') && !$can('support', 'all')"
      :title="getTitle"
      witch-info-btn
      info-btn-destination="MemberDetails"
      :loading="isLoadingProspectDetails"
    />
    <div v-else-if="member?.name" class="flex justify-center w-full">
      <span class="text-2xl font-semibold">Welcome, {{ member.name }}</span>
    </div>

    <template v-if="$can('advisor', 'all') || $can('admin', 'all') || $can('ceo', 'all')">
      <div v-if="isLoadingProspectDetails" class="flex items-center justify-center">
        <SwdSpinner />
      </div>
      <MemberStage
        v-else-if="!isLoadingProspectDetails && member.type === 'prospect'"
        :current-stage="salesforce.value.stage"
      />
    </template>

    <div class="flex my-5">
      <div class="w-8/24 mr-5">
        <WidgetMemberDetails />
        <InfoSalesforceStatus v-if="showContent.infoSalesforceStatus && $can('advisor', 'all')" />
      </div>
      <OpportunityTable class="w-16/24" />
    </div>
    <!-- <div class="flex mb-5">
      <WidgetFixedAnnuity />
    </div> -->
    <div class="flex">
      <WidgetPastStress />
      <WidgetAssetsAllocation />
      <WidgetOther />
    </div>
  </SwdWrapper>
</template>
<script>
import OpportunityTable from '@/components/MemberDetails/OpportunityTable.vue'
import WidgetMemberDetails from '@/components/MemberDetails/WidgetMemberDetails.vue'
import WidgetAssetsAllocation from '@/components/MemberDetails/WidgetAssetsAllocation.vue'
import WidgetPastStress from '@/components/MemberDetails/WidgetPastStress.vue'
// import WidgetFixedAnnuity from '@/components/MemberDetails/WidgetFixedAnnuity.vue'
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
    WidgetAssetsAllocation,
    WidgetPastStress,
    WidgetOther,
    InfoSalesforceStatus,
    // WidgetFixedAnnuity,
    MemberStage,
  },

  setup() {
    const { isLoading: isLoadingProspectDetails, isError, data: member, salesforce } = useProspectDetails()
    const { showContent } = useShowContentEnv()

    const getTitle = computed(() => {
      if (member.value && member.value.type === 'prospect') return 'Opportunity details'
      if (member.value && member.value.name) return member.value.name + ' details'
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
