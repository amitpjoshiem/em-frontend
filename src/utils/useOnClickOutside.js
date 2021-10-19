import { onMounted, onBeforeUnmount } from 'vue'

export function useEventListener(target, event, handler) {
  onMounted(() => {
    target.addEventListener(event, handler)
  })

  onBeforeUnmount(() => {
    target.removeEventListener(event, handler)
  })
}

export function useOnClickOutside(rootEl, callback) {
  useEventListener(window, 'mouseup', (e) => {
    const clickedEl = e.target

    if (rootEl.value?.contains(clickedEl)) {
      return
    }

    callback()
  })
}
