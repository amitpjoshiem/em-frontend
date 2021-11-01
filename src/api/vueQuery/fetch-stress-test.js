import { fetcher } from '@/api/fetcher/fetcher'

function fetchStressTest(id) {
  return fetcher({
    url: `/members/stress_test/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchStressTest }
