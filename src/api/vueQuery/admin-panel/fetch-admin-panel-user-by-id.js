import { fetcher } from '@/api/fetcher/fetcher'

function fetchAdminPanelUserById({ queryKey }) {
  const id = queryKey[1].reactiveId

  const include = '?include=transferFrom,transferTo,advisor'

  const searchParams = {
    include,
  }

  return fetcher({
    url: `/admin/users/find/${id}`,
    options: { method: 'GET', searchParams },
  })
}

export { fetchAdminPanelUserById }
