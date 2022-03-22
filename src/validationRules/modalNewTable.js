const rules = {
  name: [
    {
      required: true,
      message: 'Please account name',
      trigger: 'blur',
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
}

export { rules }
