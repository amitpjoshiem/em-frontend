<template>
  <div class="flex">
    <AssetsUnderManagment class="w-6/12 mr-2.5" />
    <NumberHouseholds class="w-6/12 ml-2.5" />
  </div>
  <HouseholdsStatistics />
  <Allocation />
</template>
<script>
import AssetsUnderManagment from './AssetsUnderManagment.vue'
import NumberHouseholds from './NumberHouseholds.vue'
import HouseholdsStatistics from './HouseholdsStatistics.vue'
import Allocation from './Allocation.vue'

export default {
  name: 'PipeLineContent',
  components: {
    AssetsUnderManagment,
    NumberHouseholds,
    HouseholdsStatistics,
    Allocation,
  },
  setup() {},
}
</script>
