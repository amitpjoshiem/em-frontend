import { fetchTransport } from './FetchTransport'
import { tokenStorage } from './TokenStorage'

const API_CLIENT_STATUSES = {
  auth: 'authenticated',
  pending: 'pending',
  unauth: 'unauthorized',
}
const config = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
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
    this.token = Promise.resolve(this.storage.getByKey('access_token'))
  }

  async getToken() {
    return this.token
    // return Promise.resolve(this.storage.getByKey('access_token'))
  }

  async refreshTokenCall() {
    this.status = API_CLIENT_STATUSES['pending']
    const response = await this.transport.fetch('/refresh')

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
      options.headers = {
        ...config.headers,
        ...options.headers,
      }
      const token = await this.getToken()
      console.log('TOKEN', token)
      console.log('THIS', this)
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        }
      }

      options['credentials'] = 'include'
      const response = await this.transport.fetch(url, {
        ...options,
      })

      if (response.status === 401) {
        this.refreshToken()
        return this.fetch(url, options)
      }

      return response
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}

export const apiClient = new ApiClient(fetchTransport, tokenStorage)
