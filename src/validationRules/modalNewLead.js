const rules = {
  name: [
    {
      required: true,
      message: 'The field cannot be empty',
      trigger: 'blur',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'The field cannot be empty', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please enter valid email ID',
      trigger: 'blur',
    },
  ],
  phone: [{ required: true, len: 14, trigger: 'blur', message: 'Incorrect phone number' }],
}

export { rules }
