const rules = {
  role: [
    {
      required: true,
      message: 'Please select role',
      trigger: 'change',
    },
  ],
  company: [
    {
      required: true,
      message: 'Please select company',
      trigger: 'change',
    },
  ],
  first_name: [
    {
      required: true,
      message: 'Please input company',
      trigger: 'blur',
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  last_name: [
    {
      required: true,
      message: 'Please input domain',
      trigger: 'blur',
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
}

export { rules }
