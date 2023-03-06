const rules = {
  name: [
    {
      required: true,
      message: 'The field cannot be empty.',
      trigger: 'blur',
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
}

export { rules }
