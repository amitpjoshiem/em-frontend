<template>
  <div class="p-5">
    <SwdSubHeader :title="getTitle" witch-info-btn info-btn-destination="MemberDetails" />
    <div class="flex my-5">
      <div class="w-8/24 mr-5">
        <WidgetMemberDetails />
        <InfoSalesforceStatus />
      </div>
      <OpportunityTable class="w-16/24" />
    </div>
    <div class="flex mb-5">
      <!-- <RetirementIncomePlan /> -->
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
// import RetirementIncomePlan from '@/components/MemberDetails/RetirementIncomePlan.vue'
import WidgetFixedAnnuity from '@/components/MemberDetails/WidgetFixedAnnuity.vue'
import WidgetOther from '@/components/MemberDetails/WidgetOther.vue'
import InfoSalesforceStatus from '@/components/MemberDetails/InfoSalesforceStatus.vue'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { computed } from 'vue'

export default {
  name: 'MemberDetails',
  components: {
    OpportunityTable,
    WidgetMemberDetails,
    AssetsAllocation,
    WidgetPastStress,
    // RetirementIncomePlan,
    WidgetOther,
    InfoSalesforceStatus,
    WidgetFixedAnnuity,
  },

  setup() {
    const { isLoading: isLoadingProspectDetails, isError, data: member } = useProspectDetails()

    const getTitle = computed(() => {
      if (member.value && member.value.type === 'prospect') return 'Opportunity details'
      return 'Client details'
    })

    return {
      isLoadingProspectDetails,
      isError,
      member,
      getTitle,
    }
  },
}
</script>
