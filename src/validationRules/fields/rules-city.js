import { customValidate } from '../use-custom-validation'

export const rulesCity = {
  errorText: 'The field cannot be empty.',
  required: true,
  trigger: 'change',
  validator: customValidate,
  transform(value) {
    return value.trim()
  },
}
