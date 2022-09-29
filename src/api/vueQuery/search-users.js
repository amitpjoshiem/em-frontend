import { fetcher } from '@/api/fetcher/fetcher'

function fetchUsersSearch({ queryKey }) {
  const searchRaw = queryKey[1].reactiveSearch
  const companyFilter = queryKey[1].reactiveCompanyFilter ? queryKey[1].reactiveCompanyFilter : ''

  const search = `first_name:${searchRaw};last_namel:${searchRaw};company.id:${companyFilter}`

  return fetcher({
    url: `/users`,
    options: { method: 'GET', searchParams: { search } },
  })
}

export { fetchUsersSearch }
