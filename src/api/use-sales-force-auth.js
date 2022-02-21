// import { useFetch } from '@/api/use-fetch'

// const useSalesForceAuth = () => {
//   const { response, error, fetching, fetchData } = useFetch('/salesforce/auth/settings', {
//     method: 'GET',
//   })

//   const getSalesForceAuth = async (body) => {
//     await fetchData({ body })
//     if (error.value !== null) return
//   }

//   return {
//     response,
//     error,
//     fetching,
//     getSalesForceAuth,
//   }
// }

// export { useSalesForceAuth }

import { useQuery } from 'vue-query'
import { fetchSalesForceAuth } from './vueQuery/fetch-sales-force-auth'

export const useSalesForceAuth = () => {
  const { isLoading, fetching, isError, refetch, data } = useQuery(['salesForceAuth'], () => {
    return fetchSalesForceAuth()
  })

  return {
    isLoading,
    fetching,
    isError,
    refetch,
    data,
  }
}
