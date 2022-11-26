import { fetcher } from '@/api/fetcher/fetcher'

function connectTelegramBot(data) {
  return fetcher({
    url: `/telegram/login`,
    data,
    options: { method: 'POST' },
  })
}

export { connectTelegramBot }
