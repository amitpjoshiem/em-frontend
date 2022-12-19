const rules = {
  contract_number: [
    {
      required: true,
      message: 'Please contract ID',
      trigger: 'change',
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
}

export { rules }
