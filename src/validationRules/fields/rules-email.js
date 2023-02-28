export const rulesEmail = [
  { required: true, message: 'Please input e-mail', trigger: 'change' },
  {
    type: 'email',
    message: 'Please input correct e-mail address',
    trigger: 'blur',
  },
]
