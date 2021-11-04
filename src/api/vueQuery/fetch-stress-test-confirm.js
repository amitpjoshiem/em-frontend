import { fetcher } from '@/api/fetcher/fetcher'

function fetchStressTestConfirm(id) {
  return fetcher({
    url: `/members/stress_test/${id}/confirm`,
    options: { method: 'POST' },
  })
}

export { fetchStressTestConfirm }
