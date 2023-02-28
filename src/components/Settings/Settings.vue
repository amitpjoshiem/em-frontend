<template>
  <div class="pl-24 pt-14 text-main w-10/12">
    <div class="text-xl pb-8">Settings</div>
    <el-collapse accordion>
      <el-collapse-item v-if="$can('advisor', 'all')" title="Notifications">
        <NotificationsSettngs />
      </el-collapse-item>
      <el-collapse-item title="2FA">
        <OtpSettings />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import NotificationsSettngs from '@/components/Settings/NotificationsSettings.vue'
import OtpSettings from '@/components/Settings/OtpSettings.vue'

export default {
  name: 'Settings',
  components: {
    NotificationsSettngs,
    OtpSettings,
  },
}
</script>
