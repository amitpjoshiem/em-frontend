export const rulesPhone = {
  len: 14,
  trigger: 'blur',
  message: 'Incorrect phone number',
}

export const rulesPhoneRequired = [
  { required: true, message: 'The field cannot be empty.', trigger: 'change' },
  { len: 14, trigger: 'blur', message: 'Incorrect phone number' },
]
