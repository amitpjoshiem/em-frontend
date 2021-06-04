<template>
  <el-main>
    <div class="grid grid-cols-3 grid-flow-col gap-4">
      <div class="row-span-3 col-span-2 border border-red-500">
        <h3>Dashboard</h3>
      </div>
      <PipeLine />
      <LastActivity />
    </div>
  </el-main>
</template>

<script>
import PipeLine from '@/components/Dashboard/PipeLine.vue'
import LastActivity from '@/components/Dashboard/LastActivity.vue'

export default {
  name: 'Dashboard',
  components: {
    PipeLine,
    LastActivity,
  },
}
</script>
