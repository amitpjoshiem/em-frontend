export const rulesEmail = [
  { required: true, message: 'The field cannot be empty', trigger: 'change' },
  {
    type: 'email',
    message: 'Please enter valid email ID',
    trigger: 'blur',
  },
]
