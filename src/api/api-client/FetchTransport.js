class FetchTransport {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async fetch(url, options) {
    const absoluteUrl = new URL(this.baseUrl + url)
    if (options?.searchParams) {
      Object.keys(options.searchParams).forEach((key) => {
        if (options.searchParams[key] !== undefined) absoluteUrl.searchParams.append(key, options.searchParams[key])
      })
    }
    const response = await fetch(absoluteUrl, options)
    return response
  }
}

// eslint-disable-next-line no-undef
export const fetchTransport = new FetchTransport(process.env.VUE_APP_API_URL)
