<template>
  <div class="border box-border border-color-grey rounded-lg p-5">
    <div class="text-smm font-medium text-main">Account Statements</div>
    <AccountStatementsPdf />
  </div>
</template>
<script>
import AccountStatementsPdf from '@/components/NewProspect/AssetsConsolidations/AccountStatementsPdf.vue'
export default {
  name: 'AccountStatements',
  components: {
    AccountStatementsPdf,
  },
  setup() {},
}
</script>
