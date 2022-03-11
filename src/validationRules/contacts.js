const rules = {
  name: [
    {
      required: true,
      message: 'Please input name',
      trigger: 'blur',
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  email: [
    {
      type: 'email',
      message: 'Please enter valid email ID',
      trigger: 'blur',
    },
  ],
  phone: [{ len: 14, trigger: 'blur', message: 'Incorrect phone number' }],
}

export { rules }
