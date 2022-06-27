import { fetcher } from '@/api/fetcher/fetcher'

function fetchAdminPanelUserById({ queryKey }) {
  const id = queryKey[1].reactiveId
  return fetcher({
    url: `/admin/users/find/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchAdminPanelUserById }
