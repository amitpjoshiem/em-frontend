const rules = {
  name: [
    {
      required: true,
      message: 'The field cannot be empty.',
      trigger: 'change',
      transform(value) {
        return value.trim()
      },
    },
  ],
  domain: [
    {
      required: true,
      message: 'The field cannot be empty.',
      trigger: 'change',
      transform(value) {
        return value.trim()
      },
    },
  ],
}

export { rules }
