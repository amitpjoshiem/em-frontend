import { allowApostrophe } from '../use-custom-symbol-validation'

export const rulesCompanyName = {
  type: 'string',
  errorText: 'The field cannot be empty.',
  required: false,
  trigger: 'change',
  validator: allowApostrophe,
  transform(value) {
    return value.trim()
  },
}
