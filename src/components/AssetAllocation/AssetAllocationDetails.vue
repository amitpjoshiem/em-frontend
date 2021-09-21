<template>
  <div class="px-5">
    <SubHeader class="p-5" title="Asset Allocation Details" back-page="member-details" />
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
