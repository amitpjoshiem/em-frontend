<template>
  <div class="p-5">
    <SubHeader :title="getTitle" back-page="dashboard" />
    <div class="flex my-8">
      <WidgetMemberDetails
        v-if="!isLoadingProspectDetails"
        :user="data"
        @updateMemberInfo="updateMemberInfo"
      />
      <el-skeleton v-else :rows="6" animated class="w-8/24 pr-5 h-[264px]" />
      <div class="p-5 border border-color-grey box-border">
        <div>
          <span>Asset Allocation</span>
        </div>
        <div class="flex">
          <AssetsChart />
          <div class="flex ml-4">
            <div class="flex flex-col justify-center mr-3">
              <div class="bg-dark-blue-charts w-2 h-2 rounded-full" />
              <div class="bg-activity w-2 h-2 rounded-full my-6" />
              <div class="bg-color-error w-2 h-2 rounded-full" />
            </div>
            <div class="flex flex-col justify-center text-main text-xs mr-3">
              <div>Equities</div>
              <div class="py-4">Fixed Income</div>
              <div>Cash</div>
            </div>
            <div
              class="flex flex-col justify-center text-main text-xs font-medium"
            >
              <div>27%</div>
              <div class="py-4">59%</div>
              <div>14%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <OpportunityTable class="mb-10" :prospect="data" />
    <TableAssetsConsolidations class="mb-10" />
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import OpportunityTable from '@/components/MemberDetails/OpportunityTable.vue'
import TableAssetsConsolidations from '@/components/Table/TableAssetsConsolidations.vue'
import WidgetMemberDetails from '@/components/MemberDetails/WidgetMemberDetails.vue'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { computed } from 'vue'
import { useQueryClient } from 'vue-query'
import AssetsChart from '@/components/MemberDetails/Chart/AssetsChart.vue'

export default {
  name: 'MemberDetails',
  components: {
    OpportunityTable,
    TableAssetsConsolidations,
    WidgetMemberDetails,
    AssetsChart,
  },

  setup() {
    const route = useRoute()
    const id = route.params.id
    const queryClient = useQueryClient()

    const {
      isLoading: isLoadingProspectDetails,
      isError,
      data,
    } = useProspectDetails(id)

    const getTitle = computed(() => {
      if (data.value && data.value.type === 'prospect')
        return 'Prospect details'
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
