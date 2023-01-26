const rules = {
  name: [
    {
      required: true,
      message: 'Please input name',
      trigger: 'blur',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  first_name: [
    {
      required: true,
      message: 'Please input first name',
      trigger: 'blur',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  last_name: [
    {
      required: true,
      message: 'Please input last name',
      trigger: 'blur',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  type: [
    {
      required: true,
      message: 'Please select file type',
      trigger: 'change',
    },
  ],
}

export { rules }
