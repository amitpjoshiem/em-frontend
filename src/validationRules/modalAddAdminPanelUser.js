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
      message: 'Please input first name',
      trigger: 'change',
    },
  ],
  last_name: [
    {
      required: true,
      message: 'Please input last name',
      trigger: 'change',
    },
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
      message: 'Please input first name',
      trigger: 'change',
    },
  ],
  position: [
    {
      required: true,
      message: 'Please input first name',
      trigger: 'change',
    },
  ],
  phone: [{ required: true, len: 14, trigger: 'blur', message: 'Incorrect phone number' }],
  npn: [
    {
      required: true,
      validator: validateNumber,
    },
    { trigger: 'blur' },
  ],
  advisors: [
    {
      required: true,
      message: 'Please select advisors',
      trigger: 'change',
    },
  ],
}

function validateNumber(rule, value, callback) {
  if (isNaN(value)) {
    callback(new Error('Data is not a number'))
  }

  if (rule.required && !value) {
    callback(new Error('The field cannot be empty'))
  }

  callback()
}

export { rules }
