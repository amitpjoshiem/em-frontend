const rules = {
  contract_number: [
    {
      required: true,
      message: 'The field cannot be empty.',
      trigger: 'change',
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
}

export { rules }
