export const rulesZip = [
  {
    required: true,
    message: 'The field cannot be empty.',
    trigger: 'change',
  },
  { min: 5, message: 'Invalid ZIP code.', trigger: 'blur' },
]
