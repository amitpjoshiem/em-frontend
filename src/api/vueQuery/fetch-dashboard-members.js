import { fetcher } from '@/api/fetcher/fetcher'

function fetchDashboardMembers() {
  return fetcher({
    url: `/dashboard/members/list`,
    options: { method: 'GET' },
  })
}

export { fetchDashboardMembers }
