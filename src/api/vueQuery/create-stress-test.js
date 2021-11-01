import { fetcher } from '@/api/fetcher/fetcher'

function createStressTest({ id, data }) {
  console.log('data - ', data)
  return fetcher({
    url: `/members/stress_test/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { createStressTest }
