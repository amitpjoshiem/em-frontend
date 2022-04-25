import { fetchTransport } from './FetchTransport'
import { tokenStorage } from './TokenStorage'
import store from '@/store'

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

const excludedRoutesCustomHeaders = [
  '/login',
  '/otps/verify',
  '/init',
  '/companies',
  '/logout',
  '/otps/resend',
  '/password/forgo',
  '/users/profile',
  '/refresh',
]
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
    this.token = Promise.resolve(token)
  }

  async getToken() {
    return await this.token
  }

  async refreshTokenCall() {
    this.status = API_CLIENT_STATUSES['pending']
    let options = { credentials: 'include', method: 'POST' }

    const response = await this.transport.fetch('/refresh', options)

    if (response.status === 200) {
      const res = await response.json()
      this.authenticate(res.access_token)
    } else {
      this.storage.setByKey('refresh_token_expired', true)
      document.location.href = '/logout'
    }

    return this.storage.getByKey('access_token')
  }

  async refreshToken() {
    this.token = this.status === API_CLIENT_STATUSES['pending'] ? this.token : this.refreshTokenCall()
  }

  getCustomHeader(url) {
    const customHeader = {}
    if (!excludedRoutesCustomHeaders.includes(url)) {
      customHeader['x-company'] = store.state.globalComponents.currentCompanyId
      const type = store.state.globalComponents.currentTypeUser

      if (type === 'advisor') {
        customHeader['x-user'] = store.state.globalComponents.advisorId
      }

      if (type === 'ceo') {
        customHeader['x-user'] = store.state.globalComponents.ceoId
      }

      if (type === 'superadmin') {
        customHeader['x-user'] = store.state.globalComponents.superAdminId
      }
    }
    return customHeader
  }

  async fetch(url, options) {
    try {
      options.headers = {
        ...config.headers,
        ...options.headers,
      }
      const token = await this.getToken()
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
          ...this.getCustomHeader(url),
        }
      }

      options['credentials'] = 'include'

      if (options.headers['Content-Type'] === 'multipart/form-data') delete options.headers['Content-Type']

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
