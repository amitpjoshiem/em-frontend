import { customValidate } from '../use-custom-validation'

export const rulesOccupation = [
  {
    type: 'string',
    errorText: 'The field cannot be empty',
    required: true,
    trigger: 'change',
    validator: customValidate,
  },
]
