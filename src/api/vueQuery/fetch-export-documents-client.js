import { fetcher } from '@/api/fetcher/fetcher'
import { useRoute } from 'vue-router'

function fetchExportDocumentsClient({ queryKey }) {
  const route = useRoute()
  const id = route.params.id
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
