import { computed, onMounted, onUnmounted, ref } from 'vue'

export const useBreakpoints = () => {
  let windowWidth = ref(window.innerWidth)

  const onWidthChange = () => (windowWidth.value = window.innerWidth)
  onMounted(() => window.addEventListener('resize', onWidthChange))
  onUnmounted(() => window.removeEventListener('resize', onWidthChange))

  const screenType = computed(() => {
    // if (windowWidth.value < 550) return 'xs'
    // if (windowWidth.value >= 550 && windowWidth.value < 1200) return 'md'
    // if (windowWidth.value >= 1200) return 'lg'
    if (windowWidth.value < 640) return 'sm'
    if (windowWidth.value >= 640 && windowWidth.value < 768) return 'md'
    if (windowWidth.value >= 768 && windowWidth.value < 1024) return 'lg'
    if (windowWidth.value >= 1024 && windowWidth.value < 1280) return 'xl'
    if (windowWidth.value >= 1280) return '2xl'
    return null
  })

  // const width = computed(() => windowWidth.value)

  return { screenType }
}
