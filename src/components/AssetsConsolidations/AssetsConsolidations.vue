<template>
  <SwdWrapper>
    <SwdSubHeader title="Assets Consolidations" />
    <TableAssetsConsolidations />
  </SwdWrapper>
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
