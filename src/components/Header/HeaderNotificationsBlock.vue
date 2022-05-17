<template>
  <div class="border-l border-color-grey h-16" />
  <div class="px-3">
    <el-badge :is-dot="hasNewNotification" class="item" type="primary" @click="showModalNotification">
      <InlineSvg :src="IconNotifications" class="cursor-pointer" />
    </el-badge>
    <ModalNotifications />
  </div>
  <div class="border-l border-color-grey h-16" />
</template>
<script>
import IconNotifications from '@/assets/svg/icon-notifications.svg'
import ModalNotifications from '@/components/Notifications/ModalNotifications.vue'
import { useNotification } from '@/components/Notifications/use-notifications'

export default {
  name: 'HeaderNotificationsBlock',
  components: {
    ModalNotifications,
  },
  setup() {
    const { hasNewNotification, showModalNotification } = useNotification()

    return {
      hasNewNotification,
      IconNotifications,
      showModalNotification,
    }
  },
}
</script>
