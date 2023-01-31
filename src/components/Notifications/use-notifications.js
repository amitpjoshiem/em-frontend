import { computed } from 'vue'
import { useStore } from 'vuex'
import { useAlert } from '@/utils/use-alert'

export const useNotification = () => {
  const store = useStore()

  const hasNewNotification = computed(() => {
    return store.state.notifications.notifications.length !== 0
  })

  const notifications = computed(() => store.state.notifications.notifications)

  const markAllNotificationsAsRead = () => {
    store.commit('notifications/clearAllNoifications')
    store.commit('notifications/setShowModal', false)
    useAlert({
      title: 'Success',
      type: 'success',
      message: 'All notifications have been read.',
    })
  }

  const showModalNotification = () => {
    if (hasNewNotification.value) store.commit('notifications/setShowModal', true)
  }

  const closeModalNotification = () => {
    store.commit('notifications/setShowModal', false)
  }

  const isShowModalNotification = computed(() => {
    return store.state.notifications.showModal
  })

  return {
    hasNewNotification,
    notifications,
    markAllNotificationsAsRead,
    showModalNotification,
    closeModalNotification,
    isShowModalNotification,
  }
}
