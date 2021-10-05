<template>
  <div class="border border-color-grey rounded-xl mr-5">
    <AssetsHeader class="pt-5 pr-5 pl-5" />
    <div class="p-5">
      <IncomeChart />
      <IncomeTotal />
    </div>
    <AssetsUsers />
  </div>
</template>

<script>
import AssetsHeader from '@/components/Dashboard/AssetsHeader.vue'
import IncomeChart from '@/components/Dashboard/IncomeChart.vue'
import AssetsUsers from '@/components/Dashboard/AssetsUsers.vue'
import IncomeTotal from '@/components/Dashboard/IncomeTotal.vue'

export default {
  components: {
    IncomeChart,
    AssetsUsers,
    AssetsHeader,
    IncomeTotal,
  },
}
</script>
