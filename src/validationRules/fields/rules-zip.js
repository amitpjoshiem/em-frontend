export const rulesZip = [
  {
    required: true,
    message: 'The field cannot be empty.',
    trigger: 'change',
  },
  { min: 5, message: 'Length should be 5.', trigger: 'blur' },
]
