/* eslint-disable no-undef */
import { reactive } from 'vue'

export function useShowContentEnv() {
  const showContent = reactive({
    testNotificationsBtn: false,
    testSentryBtn: false,
    showRole: false,
  })

  if (process.env.VUE_APP_ENV === 'development' || process.env.NODE_ENV === 'development') {
    showContent.testNotificationsBtn = true
    showContent.testSentryBtn = true
    showContent.showRole = true
  }

  return { showContent }
}
