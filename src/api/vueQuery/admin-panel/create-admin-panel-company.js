import { fetcher } from '@/api/fetcher/fetcher'

function createAdminPanelCompanies(data) {
  return fetcher({
    url: `/admin/companies`,
    data,
    options: { method: 'POST' },
  })
}

export { createAdminPanelCompanies }
