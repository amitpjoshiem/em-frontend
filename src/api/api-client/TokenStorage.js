class TokenStorage {
  constructor() {
    this.storage = localStorage
  }
  getByKey(key) {
    this.storage.getItem(key)
  }

  setByKey(key, value) {
    this.storage.setItem(key, value)
  }

  removeByKey(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

export const tokenStorage = new TokenStorage()
