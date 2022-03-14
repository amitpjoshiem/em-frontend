<template>
  <div class="p-5">
    <SwdSubHeader title="AssetsConsolidations" />
    <TableAssetsConsolidations />
  </div>
</template>

<script>
import TableAssetsConsolidations from '@/components/AssetsConsolidations/TableAssetsConsolidations.vue'
export default {
  name: 'AssetsConsolidations',
  components: {
    TableAssetsConsolidations,
  },
  setup() {},
}
</script>
