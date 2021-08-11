import { config } from '@/api/config'
import { apiClient } from '@/api/api-client/ApiClient'
import { useAlert } from '@/utils/use-alert'

export const fetcher = async ({ url, data, options }) => {
  options = { ...options, ...config }
  const body = JSON.stringify(data)
  try {
    const response = await apiClient.fetch(url, { ...options, body })
    if (!response.ok) {
      const body = await response.json()
      throw new Error(body.message)
    }
    return response.json()
  } catch (error) {
    useAlert({
      type: 'error',
      title: 'Error',
      message: error.message,
    })
    return { error }
  }
}
