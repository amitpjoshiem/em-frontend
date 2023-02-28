import { customValidate } from '../use-custom-validation'

export const rulesLastName = {
  required: true,
  errorText: 'Please input last name',
  trigger: 'change',
  validator: customValidate,
}
