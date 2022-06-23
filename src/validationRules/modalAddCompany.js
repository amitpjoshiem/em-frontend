const rules = {
  role: [
    {
      required: true,
      message: 'Please select role',
      trigger: 'change',
    },
  ],
  company_id: [
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
  username: [
    {
      required: true,
      message: 'Please input username',
      trigger: 'blur',
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  phone: [
    {
      required: true,
      message: 'Please input NPN',
      trigger: 'blur',
    },
    { len: 14, trigger: 'blur', message: 'Incorrect phone number' },
  ],
  npn: [
    {
      required: true,
      message: 'Please input NPN',
      trigger: 'blur',
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  position: [
    {
      required: true,
      message: 'Please input NPN',
      trigger: 'blur',
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
}

export { rules }
