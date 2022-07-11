import { fetcher } from '@/api/fetcher/fetcher'

function fetchAdvisorsList({ queryKey }) {
  const limit = queryKey[1].reactiveLimit
  const orderBy = queryKey[1].reactiveOrderBy ? queryKey[1].reactiveOrderBy : undefined
  const sortedBy = queryKey[1].reactiveSortedBy ? queryKey[1].reactiveSortedBy : undefined
  const page = queryKey[1].reactivePage ? queryKey[1].reactivePage.page : ''
  const company = queryKey[1].reactiveId ? queryKey[1].reactiveId : ''

  let search = undefined

  if (company) {
    search = `company.id:${company}`
  }

  const searchParams = {
    search,
    limit,
    page,
    orderBy,
    sortedBy,
  }

  return fetcher({
    url: `/users?include=avatar`,
    options: { method: 'GET', searchParams },
  })
}

export { fetchAdvisorsList }
