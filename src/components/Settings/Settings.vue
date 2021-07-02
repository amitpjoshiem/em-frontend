<template>
  <div class="p-5">
    <el-tabs v-model="data.activeName">
      <el-tab-pane ref="1" label="Profile settings" name="profile">
        <ProfileSettings />
      </el-tab-pane>
      <el-tab-pane ref="2" label="Notifications settings" name="notifications">
        <NotificationsSettings />
      </el-tab-pane>
      <el-tab-pane label="Information" name="information">
        <InformationSettings />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProfileSettings from '@/components/Settings/ProfileSettings.vue'
import InformationSettings from '@/components/Settings/InformationSettings.vue'
import NotificationsSettings from '@/components/Settings/NotificationsSettings.vue'
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Settings',
  components: {
    ProfileSettings,
    InformationSettings,
    NotificationsSettings,
  },
  setup() {
    const route = useRoute()
    const data = reactive({
      activeName: '',
    })

    onMounted(() => {
      console.log('route.params - ', route.params)
      data.activeName = route.params.tab
    })

    return {
      data,
    }
  },
}
</script>
