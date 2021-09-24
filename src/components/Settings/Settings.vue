<template>
  <div class="p-10 text-main">
    <div class="text-xl pb-8">Settings</div>
    <el-collapse accordion>
      <el-collapse-item title="Notifications">
        <NotificationsSettngs />
      </el-collapse-item>
      <el-collapse-item title="SalesForce">
        <SalesForceSettings />
      </el-collapse-item>
      <el-collapse-item title="TwoFA">
        <TwoFA />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import NotificationsSettngs from '@/components/Settings/NotificationsSettings.vue'
import SalesForceSettings from '@/components/Settings//SalesForceSettings.vue'
import TwoFA from '@/components/Settings//TwoFA.vue'

export default {
  name: 'Settings',
  components: {
    NotificationsSettngs,
    SalesForceSettings,
    TwoFA,
  },
  setup() {},
}
</script>
