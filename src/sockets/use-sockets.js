/* eslint-disable no-undef */
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { useStore } from 'vuex'
import { useNotificationChannel } from '@/api/use-notification-channel'

window.Pusher = Pusher

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_WEBSOCKETS_KEY,
  wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
  wsPort: 6001,
  wssPort: 6001,
  forceTLS: false,
  disableStats: true,
  encrypted: true,
})

export async function useSockets() {
  const store = useStore()

  const { response, getNotificationChannel } = useNotificationChannel()

  await getNotificationChannel()
  const echo_channel = response.value.channel
  console.log('echo_channel - ', echo_channel)
  window.Echo.channel(echo_channel).listen('.notification', (e) => {
    store.dispatch('notifications/newNotifications', {
      value: e,
    })
  })
}
