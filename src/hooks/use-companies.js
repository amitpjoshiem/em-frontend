import { useStore } from 'vuex'
import { useFetchCompanies } from '@/api/use-fetch-companies'

export function useSetCompanies() {
  const store = useStore()

  const { response, getCompanies } = useFetchCompanies()

  const setCompanies = async () => {
    await getCompanies()

    store.commit('globalComponents/setCompanies', response.value.data)
    store.commit('globalComponents/setCurrentCompany', response.value.data[0])
  }

  return { setCompanies }
}
