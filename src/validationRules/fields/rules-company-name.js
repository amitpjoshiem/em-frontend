import { customValidate } from '../use-custom-validation'

export const rulesCompanyName = {
  type: 'string',
  errorText: 'Please input company name',
  required: false,
  trigger: 'change',
  validator: customValidate,
}
