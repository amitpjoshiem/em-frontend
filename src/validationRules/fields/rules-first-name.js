import { customValidate } from '../use-custom-validation'

export const rulesFirstName = {
  required: true,
  errorText: 'Please input first name',
  trigger: 'change',
  validator: customValidate,
}
