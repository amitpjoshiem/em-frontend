import { useFetch } from '@/api/use-fetch'
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'

const useChangePassword = () => {
  // const store = useStore()
  // const router = useRouter()

  const { response, error, fetching, fetchData } = useFetch('/password', {
    method: 'PUT',
  })

  const changePassword = async (body) => {
    console.log('==========')
    console.log('body', body)
    await fetchData()
  }

  return {
    response,
    error,
    fetching,
    changePassword,
  }
}

export { useChangePassword }
