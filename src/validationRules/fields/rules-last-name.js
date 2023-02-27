import { customValidate } from '../use-custom-validation'

export const rulesLastName = [
  {
    required: true,
    errorText: 'Please input spouse last name',
    trigger: 'change',
    validator: customValidate,
  },
]
