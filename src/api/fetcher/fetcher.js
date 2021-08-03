import { config } from '@/api/config'
import { apiClient } from '../api-client/ApiClient'

export const fetcher = async ({ url, data, options }) => {
  options = { ...options, ...config }
  const body = JSON.stringify(data)
  const response = await apiClient.fetch(url, { ...options, body })
  return response.json()
}
