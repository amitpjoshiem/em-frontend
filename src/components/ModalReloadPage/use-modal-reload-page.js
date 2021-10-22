import { computed } from 'vue'
import { useStore } from 'vuex'

export const useModalReloadPage = () => {
  const store = useStore()

  const isShowModal = computed(() => store.state.globalComponents.showDialogReloadPage)

  const reloadPage = () => {
    window.location.reload()
  }

  const hideModal = () => {
    store.commit('globalComponents/setShowDialogRealodPage', false)
  }

  return {
    isShowModal,
    reloadPage,
    hideModal,
  }
}
