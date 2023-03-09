import { allowApostropheSpecialCharacters } from '../use-custom-validation'

export const rulesCompanyName = {
  type: 'string',
  errorText: 'The field cannot be empty.',
  required: false,
  trigger: 'change',
  validator: allowApostropheSpecialCharacters,
  transform(value) {
    return value.trim()
  },
}
