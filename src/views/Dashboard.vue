<template>
  <el-main>
    <div class="grid grid-cols-3 grid-flow-col gap-4">
      <div
        class="row-span-3 col-span-2 border border-color-border p-5 rounded-xl"
      >
        <Assets />
      </div>
      <PipeLine />
      <LastActivity />
    </div>
  </el-main>
</template>

<script>
import PipeLine from '@/components/Dashboard/PipeLine.vue'
import LastActivity from '@/components/Dashboard/LastActivity.vue'
import Assets from '@/components/Dashboard/Assets.vue'

export default {
  name: 'Dashboard',
  components: {
    PipeLine,
    LastActivity,
    Assets,
  },
}
</script>
