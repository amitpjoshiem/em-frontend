import { useFetch } from '@/api/use-fetch'
import { useRemoveStoreAccessToken } from '@/utils/useRemoveStoreAccessToken.js'
import { useAlert } from '@/utils/use-alert'

const useLogout = () => {
  const { response, error, fetching, fetchData } = useFetch('/logout', {
    method: 'DELETE',
  })

  const removeAccessToken = useRemoveStoreAccessToken()
  const logout = async (body) => {
    await fetchData({ body })

    if (response.value.status === 202) {
      removeAccessToken()
    } else {
      useAlert({ title: 'error', type: 'error', message: error.value })
    }
  }

  return {
    response,
    error,
    fetching,
    logout,
  }
}

export { useLogout }
