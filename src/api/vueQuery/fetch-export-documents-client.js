import { fetcher } from '@/api/fetcher/fetcher'

function fetchExportDocumentsClient({ queryKey }) {
  const id = queryKey[0][1]
  const typeRaw = queryKey[1].reactiveType
  let search = undefined

  if (typeRaw !== 'all') {
    search = `type:${typeRaw}`
  }

  return fetcher({
    url: `/client_reports/docs/${id}`,
    options: { method: 'GET', searchParams: { search } },
  })
}

export { fetchExportDocumentsClient }
