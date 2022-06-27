import { fetcher } from '@/api/fetcher/fetcher'

function fetchAdminPanelAdvisorsByCompany({ queryKey }) {
  const id = queryKey[1].reactiveId
  return fetcher({
    url: `/admin/users/advisors/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchAdminPanelAdvisorsByCompany }
