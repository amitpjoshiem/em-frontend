import { fetcher } from '@/api/fetcher/fetcher'

function fetchAdminPanelUsers({ queryKey }) {
  const limit = queryKey[1].reactiveLimit
  const page = queryKey[1].reactivePage ? queryKey[1].reactivePage.page : ''

  const roleFilter = queryKey[1].reactiveRoleFilter ? queryKey[1].reactiveRoleFilter : ''
  const companyFilter = queryKey[1].reactiveCompanyilter ? queryKey[1].reactiveCompanyilter : ''

  let search = undefined

  if (roleFilter) {
    search = `roles.id:${roleFilter}`
  }

  if (companyFilter) {
    search = `company.id:${companyFilter}`
  }

  const searchParams = {
    search,
    limit,
    page,
  }

  return fetcher({
    url: `/admin/users`,
    options: { method: 'GET', searchParams },
  })
}

export { fetchAdminPanelUsers }
