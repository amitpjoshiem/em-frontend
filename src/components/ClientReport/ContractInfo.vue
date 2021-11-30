<template>
  <SwdSubHeader class="p-5" title="Contract info" />
  <div class="p-5">
    <div class="border rounded-md border-input-border p-5 mb-10">
      <ContractInfoYear />
      <ContractInfoSince />
    </div>
    <div class="border rounded-md border-input-border p-5 mb-10">
      <ContractInfoYear />
      <ContractInfoSince />
    </div>
    <div class="border rounded-md border-input-border p-5 mb-10">
      <ContractInfoYear />
      <ContractInfoSince />
    </div>
  </div>

  <div class="pr-5 w-96 total-info ml-auto mr-0 mb-5">
    <div class="bg-widget-bg rounded-md py-2 flex justify-between">
      <span class="pl-3 w-7/12">TDA Total Value</span>
      <span class="w-5/12 text-center">$999,999,99</span>
    </div>
    <div class="bg-widget-bg rounded-md py-2 flex justify-between mt-3">
      <span class="pl-3 w-7/12">Total Current Value</span>
      <span class="w-5/12 text-center">$999,999,99</span>
    </div>
  </div>
</template>

<script>
import ContractInfoYear from './ContractInfoYear.vue'
import ContractInfoSince from './ContractInfoSince.vue'
export default {
  name: 'ContractInfo',
  components: {
    ContractInfoYear,
    ContractInfoSince,
  },
  setup() {},
}
</script>
