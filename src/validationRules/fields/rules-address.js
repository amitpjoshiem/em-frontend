import { customValidate } from '../use-custom-validation'

export const rulesAddress = {
  errorText: 'Please input address',
  required: true,
  trigger: 'change',
  validator: customValidate,
  transform(value) {
    return value.trim()
  },
}
