import { useStore } from 'vuex'
import { useFetchCompanies } from '@/api/use-fetch-companies'

export async function useCompanies() {
  const store = useStore()

  const { response, getCompanies } = useFetchCompanies()

  await getCompanies()

  store.commit('globalComponents/setCompanies', response.value.data)
  store.commit('globalComponents/setCurrentCompany', response.value.data[0])
}
