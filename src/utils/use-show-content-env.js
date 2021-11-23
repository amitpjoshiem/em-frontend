/* eslint-disable no-undef */
import { reactive } from 'vue'

export function useShowContentEnv() {
  const showContent = reactive({
    testNotificationsBtn: false,
    testSentryBtn: false,
  })

  if (process.env.NODE_ENV === 'development') {
    showContent.testNotificationsBtn = true
    showContent.testSentryBtn = true
    showContent.env = process.env.NODE_ENV
  }

  return { showContent }
}
