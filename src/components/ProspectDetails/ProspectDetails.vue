<template>
  <div class="p-5">
    <SubHeader
      title="Prospect details"
      back-page="dashboard"
      back-page-title="Dashboard"
    />
    <div class="flex my-8">
      <div class="w-4/12 pr-5">
        <div class="bg-widget-bg rounded-lg p-5">
          <div class="border-b pb-5">
            <div class="flex">
              <Avatar />
              <div class="flex flex-col ml-2">
                <span class="text-sm text-main font-medium"
                  >John &amp; Sarah Travis</span
                >
                <span
                  class="text-small text-activity-item font-medium uppercase"
                >
                  Prospect
                </span>
              </div>
            </div>
          </div>

          <div class="flex justify-between py-3">
            <div class="flex items-center">
              <span
                class="
                  w-6
                  h-6
                  rounded-md
                  flex
                  justify-center
                  items-center
                  bg-color-error
                "
              >
                <InlineSvg :src="IconProspectAge" />
              </span>
              <span class="ml-2 text-xs text-gray03">Age</span>
            </div>
            <div class="text-sm">
              <span class="text-gray03 pr-px">J</span>
              <span class="text-main pr-2">63</span>
              <span class="text-gray03 pr-px">S</span>
              <span class="text-main">58</span>
            </div>
          </div>

          <div class="flex justify-between">
            <div class="flex items-center">
              <span
                class="
                  w-6
                  h-6
                  rounded-md
                  flex
                  justify-center
                  items-center
                  bg-color-error
                "
              >
                <InlineSvg :src="IconTotal" />
              </span>
              <span class="ml-2 text-xs text-gray03">Total net worth:</span>
            </div>
            <div class="text-sm">
              <span class="text-main font-semibold">$900,000</span>
            </div>
          </div>

          <div class="flex justify-between pt-3">
            <div class="flex items-center">
              <span
                class="
                  w-6
                  h-6
                  rounded-md
                  flex
                  justify-center
                  items-center
                  bg-color-error
                "
              >
                <InlineSvg :src="IconGoal" />
              </span>
              <span class="ml-2 text-xs text-gray03">Goal:</span>
            </div>
            <div class="text-sm">
              <span class="text-main font-semibold">$1,200,000</span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-8/12">Asset Allocation</div>
    </div>
    <OpportunityTable class="mb-10" />
    <TableAssetsConsolidations />
  </div>
</template>
<script>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

import OpportunityTable from '@/components/ProspectDetails/OpportunityTable.vue'
import TableAssetsConsolidations from '@/components/Table/TableAssetsConsolidations.vue'

import IconProspectAge from '@/assets/svg/prospect-age.svg'
import IconTotal from '@/assets/svg/icon-total.svg'
import IconGoal from '@/assets/svg/icon-goal.svg'

export default {
  name: 'ProspectDetails',
  components: {
    OpportunityTable,
    TableAssetsConsolidations,
  },
  setup() {
    const route = useRoute()

    const data = reactive({
      id: '',
    })

    onMounted(() => {
      data.id = route.params.id
    })

    return {
      IconProspectAge,
      IconTotal,
      IconGoal,
    }
  },
}
</script>
