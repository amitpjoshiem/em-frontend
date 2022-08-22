<template>
  <div class="flex h-12 bg-main-gray">
    <div class="w-6/24 title">name</div>
    <div class="w-2/24 title">
      % of <br />
      Holdings
    </div>
    <div class="w-3/24 title">Amount</div>
    <div class="w-2/24 title">Management expence</div>
    <div class="w-2/24 title">Turnover</div>
    <div class="w-2/24 title">
      Trading <br />
      costs
    </div>
    <div class="w-2/24 title">Wrap Fee</div>
    <div class="w-2/24 title">
      Total cost <br />
      in %
    </div>
    <div class="w-3/24 title">
      Total cost <br />
      in $
    </div>
    <div v-if="isAddLine" class="w-1/24 title" />
  </div>
</template>

<script>
export default {
  name: 'HeaderTableAssetsConsolidations',
  props: {
    isAddLine: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
}
</script>

<style scoped>
.title {
  @apply text-small text-main flex items-center justify-center uppercase text-center;
  @apply border-r border-b border-t border-main-gray first:border-l;
}
</style>
