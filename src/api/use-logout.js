import { useFetch } from '@/api/use-fetch'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// import { ElNotification } from 'element-plus'
import { removeFromStorage } from '@/utils/utilsLocalStorage'

const useLogout = () => {
  const router = useRouter()
  const store = useStore()

  const { response, error, fetching, fetchData } = useFetch('/logout', {
    method: 'DELETE',
  })

  const removeStoreAccessTokenAndRedirect = () => {
    removeFromStorage(localStorage, 'access_token')
    removeFromStorage(localStorage, 'otp-type')
    store.commit('auth/setAuthUser', false)
    router.push({ name: 'home' })
  }

  const logout = async (body) => {
    await fetchData({ body })

    removeStoreAccessTokenAndRedirect()

    // TODO: temporary solution
    // if (response.value.status === 202) {
    //   removeStoreAccessTokenAndRedirect()
    // } else {
    //   ElNotification.error({
    //     title: 'Error',
    //     message: error.value,
    //     offset: 100,
    //   })
    // }
  }

  return {
    response,
    error,
    fetching,
    logout,
  }
}

export { useLogout }
