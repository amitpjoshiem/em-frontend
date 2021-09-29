import dayjs from 'dayjs'
import { reactive, computed, onUnmounted } from 'vue'

export function useTimer() {
  const state = reactive({
    timer: null,
    currentTime: '',
  })

  const stopTimer = () => {
    clearTimeout(state.timer)
  }

  const setTimer = () => {
    state.timer = setInterval(() => {
      state.currentTime--
    }, 1000)
  }

  const getFormatTime = computed(() => {
    return dayjs(state.currentTime).format('mm:ss')
  })

  onUnmounted(() => {
    stopTimer(state.timer)
  })

  const startTimer = (ttl) => {
    state.currentTime = ttl
    setTimer()
  }

  return {
    startTimer,
    getFormatTime,
  }
}
