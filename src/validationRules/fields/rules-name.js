import { customValidate } from '../use-custom-validation'

export const rulesName = [
  {
    errorText: 'Please input name',
    required: true,
    trigger: 'change',
    validator: customValidate,
  },
]
