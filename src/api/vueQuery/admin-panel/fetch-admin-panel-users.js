import { fetcher } from '@/api/fetcher/fetcher'

function fetchAdminPanelUsers({ queryKey }) {
  const limit = queryKey[1].reactiveLimit
  const page = queryKey[1].reactivePage ? queryKey[1].reactivePage.page : ''

  const roleFilter = queryKey[1].reactiveRoleFilter ? queryKey[1].reactiveRoleFilter : ''
  const companyFilter = queryKey[1].reactiveCompanyFilter ? queryKey[1].reactiveCompanyFilter : ''
  const userFilter = queryKey[1].reactiveUserFilter ? queryKey[1].reactiveUserFilter : ''
  const statusFilter = queryKey[1].reactiveUserStatusFilter ? queryKey[1].reactiveUserStatusFilter : ''

  let search = ''
  let deleted = ''
  let searchJoin = 'and'
  let name_search = undefined

  if (roleFilter) {
    search += `roles.id:${roleFilter};`
  }

  if (companyFilter) {
    search += `company.id:${companyFilter};`
  }

  if (userFilter) {
    name_search = userFilter
  }

  if (statusFilter) {
    deleted = statusFilter
  }

  const searchParams = {
    search,
    searchJoin,
    limit,
    page,
    name_search,
    deleted,
  }

  return fetcher({
    url: `/admin/users?include=avatar,roles,company`,
    options: { method: 'GET', searchParams },
  })
}

export { fetchAdminPanelUsers }
