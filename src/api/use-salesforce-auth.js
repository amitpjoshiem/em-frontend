// import { useQuery } from 'vue-query'
// import { fetchSalesForceAuth } from './vueQuery/fetch-salesforce-auth'

// export const useSalesForceAuth = () => {
//   const { isLoading, isError, data } = useQuery(['salesforce/auth'], () => {
//     return fetchSalesForceAuth()
//   })

//   return {
//     isLoading,
//     isError,
//     data,
//   }
// }

import { useFetch } from '@/api/use-fetch'

const useSalesForceAuth = () => {
  const { response, error, fetching, fetchData } = useFetch(
    '/salesforce/auth/settings',
    {
      method: 'GET',
    }
  )

  const getSalesForceAuth = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
  }

  return {
    response,
    error,
    fetching,
    getSalesForceAuth,
  }
}

export { useSalesForceAuth }
