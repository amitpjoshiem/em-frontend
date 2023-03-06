import { customValidate } from '../use-custom-validation'

export const rulesLastName = {
  required: true,
  errorText: 'The field cannot be empty.',
  trigger: 'change',
  validator: customValidate,
  transform(value) {
    return value.trim()
  },
}
