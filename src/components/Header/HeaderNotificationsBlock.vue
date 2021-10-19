<template>
  <div class="px-5">
    <el-badge :is-dot="hasNewNotification" class="item" type="primary" @click="showModalNotification">
      <InlineSvg :src="IconNotifications" class="cursor-pointer" />
    </el-badge>
    <ModalNotifications />
  </div>
</template>
<script>
import IconNotifications from '@/assets/svg/icon-notifications.svg'
import ModalNotifications from '@/components/Notifications/ModalNotifications.vue'
import { useNotification } from '@/components/Notifications/use-notifications'
import { useStore } from 'vuex'

export default {
  name: 'HeaderNotificationsBlock',
  components: {
    ModalNotifications,
  },
  setup() {
    const store = useStore()

    const { hasNewNotification } = useNotification()
    const showModalNotification = () => {
      if (hasNewNotification) store.commit('notifications/setShowModal', true)
    }

    return {
      hasNewNotification,
      IconNotifications,
      showModalNotification,
    }
  },
}
</script>
