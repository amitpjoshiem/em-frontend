<template>
  <div class="p-5">
    <el-tabs v-model="data.activeName">
      <el-tab-pane ref="1" label="Profile settings" name="first">
        <ProfileSettings />
      </el-tab-pane>
      <el-tab-pane ref="2" label="Notifications settings" name="second">
        <InformationSettings />
      </el-tab-pane>
      <el-tab-pane label="Information" name="third">
        <NotificationsSettings />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProfileSettings from '@/components/Settings/ProfileSettings.vue'
import InformationSettings from '@/components/Settings/InformationSettings.vue'
import NotificationsSettings from '@/components/Settings/NotificationsSettings.vue'
import { reactive } from 'vue'

export default {
  name: 'Settings',
  components: {
    ProfileSettings,
    InformationSettings,
    NotificationsSettings,
  },
  setup() {
    const data = reactive({
      activeName: 'first',
    })

    return {
      data,
    }
  },
}
</script>
