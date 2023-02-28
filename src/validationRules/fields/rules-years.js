import { customValidate } from '../use-custom-validation'

export const rulesYears = {
  type: 'string',
  errorText: 'Please input years',
  required: true,
  trigger: 'change',
  validator: customValidate,
}
