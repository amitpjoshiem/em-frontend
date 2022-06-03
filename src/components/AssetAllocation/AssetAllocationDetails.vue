<template>
  <div class="px-5">
    <SwdSubHeader
      class="p-5"
      title="Asset Allocation Details"
      witch-info-btn
      info-btn-destination="AssetAllocationDetails"
    />
    <AssetAllocation />
    <Assets />
  </div>
</template>
<script>
import AssetAllocation from './AssetAllocation.vue'
import Assets from './Assets.vue'
export default {
  name: 'AssetAllocationDetails',
  components: {
    AssetAllocation,
    Assets,
  },
  setup() {},
}
</script>
