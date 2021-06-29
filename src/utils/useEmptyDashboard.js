import { computed } from 'vue'
import { useStore } from 'vuex'

export function useEmptyDashboard() {
  const store = useStore()
  return computed(() => store.state.dashboard.isEmptyDashboard)
}
