import { customValidate } from '../use-custom-validation'

export const rulesCity = [
  {
    errorText: 'Please input city',
    required: true,
    trigger: 'change',
    validator: customValidate,
  },
]
