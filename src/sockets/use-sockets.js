/* eslint-disable no-undef */
import { useStore } from 'vuex'
import { useNotificationChannel } from '@/api/use-notification-channel'

import { tokenStorage } from '@/api/api-client/TokenStorage'
import Centrifuge from 'centrifuge'

export async function useSockets() {
  const store = useStore()
  const token = tokenStorage.getByKey('access_token')
  const { response, getNotificationChannel } = useNotificationChannel()
  const centrifuge = new Centrifuge(
    `wss://${process.env.VUE_APP_WEBSOCKETS_SERVER}:${process.env.VUE_APP_WEBSOCKETS_PORT}/connection/websocket`
  )
  centrifuge.setConnectData({
    token,
  })
  centrifuge.connect()

  await getNotificationChannel()
  const channel = response.value.channel

  centrifuge.subscribe(channel, function (ctx) {
    store.dispatch('notifications/newNotifications', {
      value: ctx.data,
    })

    if (ctx.data.need_update !== null) {
      store.commit('globalComponents/setNeedUpdateContent', {
        value: ctx.data.need_update,
      })
    }
  })
}
