import { fetcher } from '@/api/fetcher/fetcher'

function userPhoneVerify(data) {
  return fetcher({
    url: `/users/phone/verify`,
    data,
    options: { method: 'POST' },
  })
}

export { userPhoneVerify }
