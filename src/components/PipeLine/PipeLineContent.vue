<template>
  <div>
    <div class="flex mb-5 h-[250px]">
      <NumberLeedsContent class="w-6/12 mr-2.5" />
      <NumberLeedsFilledDataContent class="w-6/12 ml-2.5" />
    </div>
    <div class="flex mb-5 h-[250px]">
      <NumberLeedsConvertedContent class="w-6/12 mr-2.5" />
      <InvestmentGrowth class="w-6/12 ml-2.5" />
    </div>
  </div>
  <div class="mb-5 h-[250px]">
    <!-- <NumberLeedsClosedContent /> -->
    <!-- <AssetsUnderManagement class="w-6/12 mr-2.5" /> -->
  </div>
  <!-- <HouseholdsStatistics class="mb-5 h-[250px]" /> -->
  <OpportunityList />
</template>
<script>
// import AssetsUnderManagement from '@/components/PipeLine/AssetsUnderManagement.vue'
import InvestmentGrowth from '@/components/PipeLine/InvestmentGrowth.vue'
// import HouseholdsStatistics from '@/components/PipeLine//HouseholdsStatistics.vue'
import OpportunityList from '@/components/PipeLine/OpportunityList.vue'
import NumberLeedsContent from '@/components/PipeLine/NumberLeedsContent.vue'
import NumberLeedsFilledDataContent from '@/components/PipeLine/NumberLeedsFilledDataContent.vue'
import NumberLeedsConvertedContent from '@/components/PipeLine/NumberLeedsConvertedContent.vue'
// import NumberLeedsClosedContent from '@/components/PipeLine/NumberLeedsClosedContent.vue'

export default {
  name: 'PipeLineContent',
  components: {
    // AssetsUnderManagement,
    InvestmentGrowth,
    // HouseholdsStatistics,
    OpportunityList,
    NumberLeedsContent,
    NumberLeedsFilledDataContent,
    NumberLeedsConvertedContent,
    // NumberLeedsClosedContent,
  },
}
</script>
