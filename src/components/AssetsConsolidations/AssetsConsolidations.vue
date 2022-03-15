<template>
  <div class="p-5">
    <SwdSubHeader title="Assets Consolidations" />
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
