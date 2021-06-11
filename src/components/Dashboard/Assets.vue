<template>
  <div class="row-span-3 col-span-2 border border-color-grey p-5 rounded-xl">
    <AssetsHeader />
    <IncomeChart />
    <AssetsUsers />
  </div>
</template>

<script>
import AssetsHeader from '@/components/Dashboard/AssetsHeader.vue'
import IncomeChart from '@/components/Dashboard/IncomeChart.vue'
import AssetsUsers from '@/components/Dashboard/AssetsUsers.vue'

export default {
  components: {
    IncomeChart,
    AssetsUsers,
    AssetsHeader,
  },
}
</script>
