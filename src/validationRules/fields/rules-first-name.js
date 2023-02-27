import { customValidate } from '../use-custom-validation'

export const rulesFirstName = [
  {
    required: true,
    errorText: 'Please input spouse first name',
    trigger: 'change',
    validator: customValidate,
  },
]
