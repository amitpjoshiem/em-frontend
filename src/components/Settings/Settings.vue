<template>
  <div class="pl-24 pt-14 text-main w-10/12">
    <div class="text-xl pb-8">Settings</div>
    <div>role: {{ getRole }}</div>
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
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'Settings',
  components: {
    NotificationsSettngs,
    OtpSettings,
  },
  setup() {
    const store = useStore()

    const getRole = computed(() => {
      return store.state.globalComponents.role
    })

    return {
      getRole,
    }
  },
}
</script>
