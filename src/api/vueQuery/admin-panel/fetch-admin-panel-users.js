import { fetcher } from '@/api/fetcher/fetcher'

function fetchAdminPanelUsers({ queryKey }) {
  const limit = queryKey[1].reactiveLimit
  const page = queryKey[1].reactivePage ? queryKey[1].reactivePage.page : ''

  const roleFilter = queryKey[1].reactiveRoleFilter ? queryKey[1].reactiveRoleFilter : ''
  const companyFilter = queryKey[1].reactiveCompanyFilter ? queryKey[1].reactiveCompanyFilter : ''
  const userFilter = queryKey[1].reactiveUserFilter ? queryKey[1].reactiveUserFilter : ''

  let search = ''
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

  const searchParams = {
    search,
    searchJoin,
    limit,
    page,
    name_search,
  }

  return fetcher({
    url: `/admin/users`,
    options: { method: 'GET', searchParams },
  })
}

export { fetchAdminPanelUsers }
