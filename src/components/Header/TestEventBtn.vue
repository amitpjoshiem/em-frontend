<template>
  <el-dropdown class="mr-4 cursor-pointer" trigger="click" @command="handleCommand">
    <el-button type="info" plain>
      Test event
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="sendTestNotifications">test send notifications</el-dropdown-item>
        <el-dropdown-item command="sendTestSentry">test sentry</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { ArrowDown } from '@element-plus/icons-vue'
import { useNotificationTest } from '@/api/use-notification-test'

export default {
  name: 'TestEventBtn',
  components: {
    ArrowDown,
  },
  setup() {
    const { response, error, fetching, getNotificationTest } = useNotificationTest()

    const throwError = () => {
      throw new Error('Sentry Error')
    }

    const handleCommand = (command) => {
      if (command === 'sendTestNotifications') getNotificationTest()
      if (command === 'sendTestSentry') throwError()
    }

    return {
      handleCommand,
      response,
      error,
      fetching,
    }
  },
}
</script>
