import { fetcher } from '@/api/fetcher/fetcher'

function fetchAssistens() {
  return fetcher({
    url: `/assistants`,
    options: { method: 'GET' },
  })
}

export { fetchAssistens }
