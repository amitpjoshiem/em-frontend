import { readFromStorage, saveToStorage } from '../../utils/utilsLocalStorage'
import useRefreshToken from './use-refresh-token'

class AuthServise {
  constructor() {
    this.isRefreshing = false
    this.token = Promise.resolve(readFromStorage(localStorage, 'access_token'))
  }
  async getToken() {
    return await this.token
  }

  async test() {
    this.isRefreshing = true

    await useRefreshToken()

    this.isRefreshing = false
    return readFromStorage(localStorage, 'access_token')
  }

  refreshToken() {
    this.token = this.isRefreshing ? this.token : this.test()
  }

  setToken(token) {
    saveToStorage(localStorage, 'access_token', token)
    this.token = Promise.resolve(token)
  }
}

export const authSerice = new AuthServise()
