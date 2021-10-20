<template>
  <div
    v-if="isShowModalNotification"
    ref="modalRef"
    class="
      modal-notifications
      w-[480px]
      h-[350px]
      border border-color-grey
      rounded-md
      bg-white
      absolute
      top-[75px]
      right-[125px]
      z-50
      shadow-xl
    "
  >
    <div class="border-b border-color-grey">
      <div class="p-5 flex justify-between items-center">
        <span class="text-main font-semibold text-lg">Notifications</span>
        <span class="text-xss text-activity font-semibold cursor-pointer" @click="markAllNotificationsAsRead">
          Mark all as read
        </span>
      </div>
    </div>
    <div class="h-[280px] overflow-y-scroll px-5">
      <div
        v-for="(item, index) in notifications"
        :key="index"
        class="py-5 border-b border-color-grey flex justify-between"
      >
        <span class="text-main text-sm" v-html="item.notification" />
        <span class="text-gray03 text-xs">
          {{ item.timestamp }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { useOnClickOutside } from '@/utils/useOnClickOutside'
import { ref } from 'vue'
import { useNotification } from '@/components/Notifications/use-notifications'

export default {
  name: 'ModalNotifications',
  setup() {
    const {
      notifications,
      hasNewNotification,
      markAllNotificationsAsRead,
      isShowModalNotification,
      closeModalNotification,
    } = useNotification()

    const modalRef = ref(null)
    useOnClickOutside(modalRef, closeModalNotification)

    return {
      modalRef,
      notifications,
      hasNewNotification,
      isShowModalNotification,
      markAllNotificationsAsRead,
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
