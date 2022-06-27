import { useQuery } from 'vue-query'
import { fetchAdminPanelRolesCompanies } from '../vueQuery/admin-panel/fetch-admin-panel-roles-companies.js'

import { reactive } from 'vue'

export const useFetchAdminPanelRolesCompanies = (options) => {
  const queryKey = reactive(['admin-panel-role-companies'])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchAdminPanelRolesCompanies,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
