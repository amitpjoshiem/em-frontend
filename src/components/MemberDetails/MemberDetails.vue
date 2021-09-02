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
      <div class="w-8/12">Asset Allocation</div>
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

export default {
  name: 'MemberDetails',
  components: {
    OpportunityTable,
    TableAssetsConsolidations,
    WidgetMemberDetails,
  },

  setup() {
    const route = useRoute()
    const id = route.params.id
    const queryClient = useQueryClient()

    const {
      isLoading: isLoadingProspectDetails,
      isError,
      data,
      refetch,
    } = useProspectDetails(id)

    const getTitle = computed(() => {
      if (data.value && data.value.type === 'prospect')
        return 'Prospect details'
      return 'Client details'
    })

    const updateMemberInfo = () => {
      queryClient.invalidateQueries(['member'])
      refetch
    }

    return {
      isLoadingProspectDetails,
      isError,
      data,
      getTitle,
      refetch,
      updateMemberInfo,
    }
  },
}
</script>
