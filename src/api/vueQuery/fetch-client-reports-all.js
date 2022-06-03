import { fetcher } from '@/api/fetcher/fetcher'

function fetchClientReportsAll({ queryKey }) {
  const dateRange = queryKey[1].reactiveDateRange ? queryKey[1].reactiveDateRange : ''
  const id = queryKey[1].reactiveId ? queryKey[1].reactiveId : ''

  let search = undefined

  if (dateRange) {
    search = `origination_date:${dateRange[0]},${dateRange[1]}&searchFields=origination_date:between`
  }

  const searchParams = {
    search,
  }

  return fetcher({
    url: `/client_reports/all/${id}`,
    options: { method: 'GET', searchParams },
  })
}

export { fetchClientReportsAll }
