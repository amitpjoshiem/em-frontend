// eslint-disable-next-line no-undef
const baseUrl = process.env.VUE_APP_API_URL

function useRefreshToken() {
  const newUrl = new URL(baseUrl)

  return fetch(newUrl + '/refresh', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.status === 200) {
      const token = res.json()
      console.log('res.json - ', res.json)
      localStorage.setItem('access_token', token)
      return Promise.resolve()
    }
    return Promise.reject()
  })
}

export default useRefreshToken
