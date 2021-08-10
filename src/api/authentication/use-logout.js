import { useFetch } from '@/api/use-fetch'
import { useRemoveStoreAccessToken } from '@/utils/useRemoveStoreAccessToken.js'

const useLogout = () => {
  const { response, error, fetching, fetchData } = useFetch('/logout', {
    method: 'DELETE',
  })

  const removeAccessToken = useRemoveStoreAccessToken()
  const logout = async (body) => {
    await fetchData({ body })
    removeAccessToken()
  }

  return {
    response,
    error,
    fetching,
    logout,
  }
}

export { useLogout }
