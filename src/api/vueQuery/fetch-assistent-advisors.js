import { fetcher } from '@/api/fetcher/fetcher'

function fetchAssistentAdvisors() {
  return fetcher({
    url: `/advisors`,
    options: { method: 'GET' },
  })
}

export { fetchAssistentAdvisors }
