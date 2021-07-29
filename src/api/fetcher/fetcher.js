// eslint-disable-next-line no-undef
const baseUrl = process.env.VUE_APP_API_URL
import { config } from '@/api/config'
import { authSerice } from './AuthService'

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
    const accessToken = await authSerice.getToken()
    if (accessToken) options.headers['Authorization'] = `Bearer ${accessToken}`
    const res = await fetch(newUrl, { ...options, body })
    if (res.status === 401) {
      authSerice.refreshToken()
      return fetcher({ url, data, options })
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
