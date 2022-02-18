import { fetcher } from '@/api/fetcher/fetcher'

function fetchExportDocumentsClient({ queryKey }) {
  const id = queryKey[0][1]
  const typeRaw = queryKey[1].reactiveType
  const sortedBy = queryKey[1].reactiveSortedBy ? queryKey[1].reactiveSortedBy : undefined
  const orderBy = queryKey[1].reactiveOrderBy ? queryKey[1].reactiveOrderBy : undefined

  let search = undefined

  if (typeRaw !== 'all') {
    search = `type:${typeRaw}`
  }

  return fetcher({
    url: `/client_reports/docs/${id}`,
    options: { method: 'GET', searchParams: { search, sortedBy, orderBy } },
  })
}

export { fetchExportDocumentsClient }
