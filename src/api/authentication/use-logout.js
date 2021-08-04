import { useFetch } from '@/api/use-fetch'
import { useRemoveStoreAccessToken } from '@/utils/useRemoveStoreAccessToken.js'
import { ElNotification } from 'element-plus'

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
      ElNotification.error({
        title: 'Error',
        message: error.value,
        offset: 100,
      })
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
