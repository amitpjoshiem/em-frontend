import { useFetch } from '@/api/use-fetch'
import { useStore } from 'vuex'

const useTwofa = () => {
  const store = useStore()

  const { response, error, fetching, fetchData } = useFetch('/otps/verify', {
    method: 'POST',
  })

  const forgot = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
    store.commit('auth/setAuthUser', true)
  }

  return {
    response,
    error,
    fetching,
    forgot,
  }
}

export { useTwofa }

// /otps/google/qr

// ввести код из приложения и отправить на бек

// /otps/change
// body:{
//   service: google или email
//   code: (который в инпуте) (этот код для гугл аутх)
// }

// логин для кода с почты
// /otps/verify
// {
//   code: ''
// }
