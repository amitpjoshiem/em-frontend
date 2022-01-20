import { fetcher } from '@/api/fetcher/fetcher'

function userPhoneSendVerify(data) {
  return fetcher({
    url: `/users/phone/send_verify`,
    data,
    options: { method: 'POST' },
  })
}

export { userPhoneSendVerify }
