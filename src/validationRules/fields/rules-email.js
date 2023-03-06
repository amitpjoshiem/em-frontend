export const rulesEmail = [
  { required: true, message: 'The field cannot be empty.', trigger: 'change' },
  {
    type: 'email',
    message: 'Please input correct e-mail address',
    trigger: 'blur',
  },
]
