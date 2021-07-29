class FetchTransport {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.client = window.fetch
  }

  async fetch(url, options) {
    const absoluteUrl = new URL(url, this.baseUrl)
    const response = this.client.fetch(absoluteUrl, options)
    const data = response.status !== 204 ? await response.json() : {}

    return {
      data,
      status: response.status,
    }
  }
}

export const fetchTransport = new FetchTransport()
