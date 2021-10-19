<template>
  <div class="px-5">
    <el-badge :is-dot="hasNewNotification" class="item" type="primary" @click="showBlockNotification">
      <InlineSvg :src="IconNotifications" class="cursor-pointer" />
    </el-badge>

    <div
      v-if="isOpen"
      ref="modalRef"
      class="
        modal-notifications
        w-[480px]
        h-[350px]
        border border-input-border
        rounded-md
        bg-white
        absolute
        top-[75px]
        right-[125px]
        z-50
        shadow-xl
      "
    >
      <div class="border-b border-input-border">
        <div class="p-5 flex justify-between items-center">
          <span class="text-main font-semibold text-lg">Notifications</span>
          <span class="text-xss text-activity font-semibold cursor-pointer" @click="markAllRead">Mark all as read</span>
        </div>
      </div>
      <div class="h-[280px] overflow-y-scroll px-5">
        <div
          v-for="(item, index) in notifications"
          :key="index"
          class="py-5 border-b border-input-border flex justify-between"
        >
          <span class="text-main text-sm">
            {{ item.notification }}
          </span>
          <span class="text-gray03 text-xs">
            {{ item.timestamp }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import IconNotifications from '@/assets/svg/icon-notifications.svg'
import { useOnClickOutside } from '@/utils/useOnClickOutside'

export default {
  name: 'HeaderNotificationsBlock',
  setup() {
    const store = useStore()
    const modalRef = ref(null)
    const isOpen = ref(false)

    useOnClickOutside(modalRef, () => {
      isOpen.value = false
    })

    const hasNewNotification = computed(() => {
      return !!store.state.notifications.notifications.length
    })

    const showBlockNotification = () => {
      if (hasNewNotification.value) isOpen.value = true
    }

    const markAllRead = () => {
      store.commit('notifications/clearAllNoifications')
      isOpen.value = false
    }

    const notifications = computed(() => store.state.notifications.notifications)

    return {
      hasNewNotification,
      IconNotifications,
      showBlockNotification,
      modalRef,
      isOpen,
      notifications,
      markAllRead,
    }
  },
}
</script>

<style>
.modal-notifications:after {
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #ffffff transparent;
  position: absolute;
  right: 17px;
  top: -9px;
}
.modal-notifications:before {
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #d4ddeb transparent;
  position: absolute;
  right: 17px;
  top: -10px;
}
</style>
