import { authSerice } from './AuthService'

// eslint-disable-next-line no-undef
const baseUrl = process.env.VUE_APP_API_URL

async function useRefreshToken() {
  const newUrl = new URL(baseUrl)

  return fetch(newUrl + '/refresh', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(async (res) => {
    if (res.status === 200) {
      const token = await res.json()
      authSerice.setToken(token.access_token)
      return Promise.resolve()
    }
    return Promise.reject()
  })
}

export default useRefreshToken
