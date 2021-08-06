import { useFetch } from '@/api/use-fetch'
import { useStore } from 'vuex'

const useForgot = () => {
  const store = useStore()

  const { response, error, fetching, fetchData } = useFetch(
    '/password/forgot',
    {
      method: 'POST',
    }
  )

  const forgot = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
    store.commit('auth/setFormForgotStatus', true)
  }

  return {
    response,
    error,
    fetching,
    forgot,
  }
}

export { useForgot }
