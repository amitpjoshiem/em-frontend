<template>
  <div class="p-5">
    <SwdSubHeader title="Fixed Index Annuity Details" />
    <AnnuityIndexDetailsBasic />
    <AnnuityIndexDetailsDeposits />
    <InvestmentPackageList />
  </div>
</template>
<script>
import InvestmentPackageList from '@/components/AnnuityIndex/InvestmentPackageList.vue'
import AnnuityIndexDetailsBasic from '@/components/AnnuityIndex/AnnuityIndexDetailsBasic.vue'
import AnnuityIndexDetailsDeposits from '@/components/AnnuityIndex/AnnuityIndexDetailsDeposits.vue'

export default {
  name: 'AnnuityIndexDetails',
  components: {
    InvestmentPackageList,
    AnnuityIndexDetailsBasic,
    AnnuityIndexDetailsDeposits,
  },
  setup() {},
}
</script>
