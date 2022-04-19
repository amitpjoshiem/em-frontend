import { useFetch } from '@/api/use-fetch'
import { useAlert } from '@/utils/use-alert'
import { useSetRole } from '@/hooks/use-set-role.js'

const useOtp = () => {
  const { response, error, fetching, fetchData } = useFetch('/otps/verify', {
    method: 'POST',
  })

  const { setRole } = useSetRole()

  const otpAuth = async (body) => {
    await fetchData({ body })
    storeAccessRole()
  }

  const storeAccessRole = () => {
    if (error.value !== null) {
      useAlert({
        type: 'error',
        title: 'Error',
        message: error.value,
      })
      return
    }
    setRole()
  }

  return {
    response,
    error,
    fetching,
    otpAuth,
  }
}

export { useOtp }
