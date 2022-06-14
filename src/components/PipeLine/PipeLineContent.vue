<template>
  <div class="flex mb-5 h-[250px]">
    <AssetsUnderManagement class="w-6/12 mr-2.5" />
    <NumberHouseholds class="w-6/12 ml-2.5" />
  </div>
  <HouseholdsStatistics class="mb-5 h-[223px]" />
  <OpportunityList />
</template>
<script>
import AssetsUnderManagement from '@/components/PipeLine/AssetsUnderManagement.vue'
import NumberHouseholds from '@/components/PipeLine//NumberHouseholds.vue'
import HouseholdsStatistics from '@/components/PipeLine//HouseholdsStatistics.vue'
import OpportunityList from '@/components/PipeLine//OpportunityList.vue'

export default {
  name: 'PipeLineContent',
  components: {
    AssetsUnderManagement,
    NumberHouseholds,
    HouseholdsStatistics,
    OpportunityList,
  },
}
</script>
