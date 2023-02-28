const rules = {
  name: [
    {
      required: true,
      message: 'Please input name',
      trigger: 'change',
      transform(value) {
        return value.trim()
      },
    },
  ],
  domain: [
    {
      required: true,
      message: 'Please input domai',
      trigger: 'change',
      transform(value) {
        return value.trim()
      },
    },
  ],
}

export { rules }
