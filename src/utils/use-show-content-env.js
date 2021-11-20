/* eslint-disable no-undef */
import { reactive } from 'vue'

export function useShowContentEnv() {
  const showContent = reactive({
    testNotificationsBtn: false,
  })

  if (process.env.NODE_ENV === 'development') {
    showContent.testNotificationsBtn = true
  }

  return { showContent }
}
