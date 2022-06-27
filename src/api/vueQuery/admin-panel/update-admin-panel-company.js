import { fetcher } from '@/api/fetcher/fetcher'

function updateAdminPanelCompany({ id, data }) {
  return fetcher({
    url: `/admin/companies/${id}`,
    data,
    options: { method: 'PATCH' },
  })
}

export { updateAdminPanelCompany }
