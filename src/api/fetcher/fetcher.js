// eslint-disable-next-line no-undef
const baseUrl = process.env.VUE_APP_API_URL
import { readFromStorage } from '@/utils/utilsLocalStorage'
import { config } from '@/api/config'

export const fetcher =
  ({ url, options }) =>
  async () => {
    options = { ...options, ...config }
    const newUrl = new URL(baseUrl + url)
    Object.keys(options.searchParams).forEach((key) =>
      newUrl.searchParams.append(key, options.searchParams[key])
    )

    const token = readFromStorage(localStorage, 'access_token')
    if (token) options.headers['Authorization'] = `Bearer ${token}`
    return fetch(newUrl, options).then((response) => response.json())
  }
