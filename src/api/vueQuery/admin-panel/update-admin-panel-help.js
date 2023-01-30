import { fetcher } from '@/api/fetcher/fetcher'

function updateAdminPanelHelp({ type, data }) {
  return fetcher({
    url: `/admin/clients/help/${type}`,
    data,
    options: { method: 'PATCH' },
  })
}

export { updateAdminPanelHelp }
