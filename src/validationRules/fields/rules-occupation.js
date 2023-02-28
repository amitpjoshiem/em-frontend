import { customValidate } from '../use-custom-validation'

export const rulesOccupation = {
  type: 'string',
  errorText: 'Please input occupation',
  required: true,
  trigger: 'change',
  validator: customValidate,
  transform(value) {
    return value.trim()
  },
}
