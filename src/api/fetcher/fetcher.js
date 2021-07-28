// eslint-disable-next-line no-undef
const baseUrl = process.env.VUE_APP_API_URL
import { readFromStorage } from '@/utils/utilsLocalStorage'
import { config } from '@/api/config'
import useRefreshToken from './use-refresh-token'

export const fetcher = async ({ url, data, options }) => {
  options = { ...options, ...config }
  const body = JSON.stringify(data)
  const newUrl = new URL(baseUrl + url)
  if (options.searchParams) {
    Object.keys(options.searchParams).forEach((key) =>
      newUrl.searchParams.append(key, options.searchParams[key])
    )
  }

  try {
    const token = readFromStorage(localStorage, 'access_token')
    if (token) options.headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(newUrl, { ...options, body })
    if (res.status === 401 && !options.retry) {
      const refreshToken = await useRefreshToken()
      if (refreshToken) {
        fetcher({ url, data, options, retry: true })
      }
    }

    if (!res.ok) {
      throw res
    }

    return res.json()
  } catch (error) {
    console.log('ERROR', error)
    throw error
  }
}
