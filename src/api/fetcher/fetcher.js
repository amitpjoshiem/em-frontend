import { config } from '@/api/config'
import { apiClient } from '@/api/api-client/ApiClient'
import { showErrorResponse } from '@/hooks/use-show-error-response'

function getBody(data, options) {
  const contentType = options.headers['Content-Type']
  return contentType === 'application/json' ? JSON.stringify(data) : data
}

export const fetcher = async ({ url, data, options }) => {
  options = { ...config, ...options }
  const body = getBody(data, options)
  try {
    const response = await apiClient.fetch(url, { ...options, body })
    if (!response.ok) {
      const body = await response.json()
      throw body.errors
      // throw new Error(body.message)
    }
    if (response.status === 204) return { succes: true }
    return response.json()
  } catch (error) {
    showErrorResponse(error)
    // useAlert({
    //   type: 'error',
    //   title: 'Error',
    //   message: error.message,
    // })
    return { error }
  }
}
