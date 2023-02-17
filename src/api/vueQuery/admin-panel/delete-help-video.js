import { fetcher } from '@/api/fetcher/fetcher'

function deleteAdminPanelHelpVideo({ section }) {
  return fetcher({
    url: `/admin/clients/help/${section}`,
    options: { method: 'DELETE' },
  })
}

export { deleteAdminPanelHelpVideo }
