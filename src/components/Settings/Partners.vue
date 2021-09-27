<template>
  <div class="pl-24 pt-14 text-main w-10/12">
    <div class="text-xl pb-8">Partners</div>
    <el-collapse accordion>
      <el-collapse-item title="SalesForce">
        <SalesForceSettings />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import SalesForceSettings from '@/components/Settings//SalesForceSettings.vue'

export default {
  name: 'Partners',
  components: {
    SalesForceSettings,
  },
}
</script>
