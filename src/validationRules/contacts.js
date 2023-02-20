const rules = {
  first_name: [
    {
      required: true,
      message: 'Please input first name',
      trigger: 'blur',
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  last_name: [
    {
      required: true,
      message: 'Please input last name',
      trigger: 'blur',
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  email: [
    {
      required: true,
      type: 'email',
      message: 'Please enter valid email ID',
      trigger: 'blur',
    },
  ],
  phone: [{ required: true, len: 13, trigger: 'blur', message: 'Incorrect phone number' }],
}

export { rules }
