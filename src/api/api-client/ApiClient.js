import { fetchTransport } from './FetchTransport'
import { tokenStorage } from './TokenStorage'

const API_CLIENT_STATUSES = {
  auth: 'authenticated',
  pending: 'pending',
  unauth: 'unauthorized',
}

class ApiClient {
  /**
   *
   * @param {FetchTransport} transport
   * @param {LocalStorage} tokenStorage
   */
  constructor(transport, tokenStorage) {
    this.status = API_CLIENT_STATUSES['unauth']
    this.transport = transport
    this.storage = tokenStorage
    this.token = Promise.resolve(this.storage.getByKey('access_token'))
  }

  authenticate(token) {
    this.storage.setByKey('access_token', token)
    this.status = API_CLIENT_STATUSES['auth']
  }

  async getToken() {
    return this.token
  }

  async refreshTokenCall() {
    this.status = API_CLIENT_STATUSES['pending']
    const refresh_token = this.storage.getByKey('refresh_token')
    const response = await this.transport.fetch('/refresh', {
      body: { refresh_token },
    })

    if (response.status === 200) {
      this.authenticate(response.data.access_token)
      this.status = API_CLIENT_STATUSES['auth']
    }

    return this.token
  }

  async refreshToken() {
    this.token =
      this.status === API_CLIENT_STATUSES['pending']
        ? this.token
        : this.refreshTokenCall()
  }

  async fetch(url, options) {
    try {
      const token = await this.getToken()
      if (token) options.headers['Authorization'] = `Bearer ${token}`
      const response = await this.transport.fetch(url, options)

      if (response.status === 401) {
        this.refreshToken()
        return this.fetch(url, options)
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const apiClient = new ApiClient(fetchTransport, tokenStorage)
