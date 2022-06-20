const rules = {
  name: [
    {
      required: true,
      message: 'Please input company',
      trigger: 'blur',
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  domain: [
    {
      required: true,
      message: 'Please input domain',
      trigger: 'blur',
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
}

export { rules }
