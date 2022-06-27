import { fetcher } from '@/api/fetcher/fetcher'

function fetchAdminPanelUsers({ queryKey }) {
  const limit = queryKey[1].reactiveLimit
  const page = queryKey[1].reactivePage ? queryKey[1].reactivePage.page : ''

  const roleFilter = queryKey[1].reactiveRoleFilter ? queryKey[1].reactiveRoleFilter : ''
  const companyFilter = queryKey[1].reactiveCompanyilter ? queryKey[1].reactiveCompanyilter : ''

  let search = undefined
  let searchJoin = undefined

  if (roleFilter) {
    search = `roles.id:${roleFilter}`
  }

  if (companyFilter) {
    search = `company.id:${companyFilter}`
  }

  if (roleFilter && companyFilter) {
    search = `roles.id:${roleFilter}` + ';' + `company.id:${companyFilter}`
    searchJoin = 'and'
  }

  const searchParams = {
    search,
    searchJoin,
    limit,
    page,
  }

  return fetcher({
    url: `/admin/users`,
    options: { method: 'GET', searchParams },
  })
}

export { fetchAdminPanelUsers }
