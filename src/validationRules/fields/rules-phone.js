export const rulesPhone = {
  len: 14,
  trigger: 'blur',
  message: 'Incorrect phone number',
}

export const rulesPhoneRequired = [
  { required: true, message: 'Please input phone number', trigger: 'change' },
  { len: 14, trigger: 'blur', message: 'Incorrect phone number' },
]
