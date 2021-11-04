import { fetcher } from '@/api/fetcher/fetcher'

function fetchAssetsAccountsConfirm(id) {
  return fetcher({
    url: `/members/${id}/assets_accounts/confirm`,
    options: { method: 'POST' },
  })
}

export { fetchAssetsAccountsConfirm }
