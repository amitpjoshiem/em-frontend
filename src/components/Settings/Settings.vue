<template>
  <div class="pl-24 pt-14 text-main w-10/12">
    <div class="text-xl pb-8">Settings</div>
    <el-collapse accordion>
      <el-collapse-item title="Notifications">
        <NotificationsSettngs />
      </el-collapse-item>
      <el-collapse-item title="TwoFA">
        <TwoFA />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import NotificationsSettngs from '@/components/Settings/NotificationsSettings.vue'
import TwoFA from '@/components/Settings//TwoFA.vue'

export default {
  name: 'Settings',
  components: {
    NotificationsSettngs,
    TwoFA,
  },
}
</script>
